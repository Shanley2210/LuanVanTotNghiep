const { where, Op } = require('sequelize');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const moment = require('moment');

const sendFinishExamEmail = async (dataSend) => {
    const {
        email,
        patientName,
        doctorName,
        diagnosis,
        treatment,
        prescription,
        reExamDate,
        fileName
    } = dataSend;

    const subject = 'Kết quả khám bệnh & Đơn thuốc';

    // Format ngày tái khám nếu có
    const reExamString = reExamDate
        ? moment(reExamDate).format('DD/MM/YYYY')
        : 'Theo chỉ định sau';

    const text = `Xin chào ${patientName},\nCuộc hẹn khám bệnh của bạn đã hoàn tất.`;

    const html = `
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
            <h3 style="color:#0078d7;margin-bottom:15px;">Xin chào ${patientName},</h3>
            <p>Cảm ơn bạn đã sử dụng dịch vụ khám chữa bệnh của chúng tôi.</p>
            <p>Bác sĩ <strong>${doctorName}</strong> đã hoàn tất hồ sơ khám bệnh của bạn với các thông tin chi tiết dưới đây:</p>

            <div style="background:#f9f9f9;padding:15px;border-left: 4px solid #0078d7;margin: 15px 0;">
                <p style="margin: 5px 0;"><strong>🩺 Chẩn đoán:</strong> ${diagnosis}</p>
                <p style="margin: 5px 0;"><strong>📝 Hướng điều trị/Lời dặn:</strong> ${treatment}</p>
                ${
                    reExamDate
                        ? `<p style="margin: 5px 0; color: #d35400;"><strong>📅 Lịch tái khám:</strong> ${reExamString}</p>`
                        : ''
                }
            </div>

            ${
                prescription
                    ? `
            <div style="margin-top: 15px;">
                <p><strong>💊 Thông tin đơn thuốc:</strong></p>
                <pre style="background:#eee;padding:10px;border-radius:5px;font-family:inherit;white-space: pre-wrap;">${prescription}</pre>
            </div>
            `
                    : ''
            }

            <p style="margin-top:20px;">Chúc bạn sớm bình phục và có thật nhiều sức khỏe!</p>
            <p style="font-style:italic;color:#777;font-size:12px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        </div>
    `;

    await sendMail(email, subject, text, html);
};

const getAllDoctorsService = (page, limit, status = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;
            let whereCondition = {};
            if (status) {
                whereCondition.status = status;
            }

            const { count, rows } = await db.Doctor.findAndCountAll({
                where: whereCondition,
                offset: offset,
                limit: limit,
                distinct: true,
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    },
                    {
                        model: db.Specialty,
                        as: 'specialty',
                        attributes: ['id', 'name']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            if (!rows || rows.length === 0) {
                return resolve({
                    errCode: 0,
                    message: 'No doctors found',
                    data: [],
                    meta: {
                        page: page,
                        limit: limit,
                        totalRows: 0,
                        totalPages: 0
                    }
                });
            }

            const totalPages = Math.ceil(count / limit);

            return resolve({
                errCode: 0,
                message: 'Get doctors successful',
                data: rows,
                meta: {
                    page: page,
                    limit: limit,
                    totalRows: count,
                    totalPages: totalPages
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctor = await db.Doctor.findOne({
                where: { id: doctorId },
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    },
                    {
                        model: db.Specialty,
                        as: 'specialty',
                        attributes: ['name']
                    }
                ]
            });

            if (!doctor) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Doctor not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get doctor successful',
                data: doctor
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getSchedulesService = async (userId, date, start, end) => {
    try {
        const doctor = await db.Doctor.findOne({
            where: { userId },
            attributes: ['id']
        });

        if (!doctor) {
            return { errCode: 2, errMessage: 'Doctor not found' };
        }

        const queryConditions = {
            doctorId: doctor.id,
            status: 'active'
        };

        const parseDateRange = (value) => {
            const d = new Date(value);
            const startDate = new Date(d.setHours(0, 0, 0, 0));
            const endDate = new Date(d.setHours(23, 59, 59, 999));
            return { startDate, endDate };
        };

        if (date) {
            const { startDate, endDate } = parseDateRange(date);
            queryConditions.workDate = {
                [Op.between]: [startDate, endDate]
            };
        }

        if (start && end) {
            const { startDate } = parseDateRange(start);
            const { endDate } = parseDateRange(end);
            queryConditions.workDate = {
                [Op.between]: [startDate, endDate]
            };
        }

        if (!date && !(start && end)) {
            queryConditions.workDate = { [Op.gte]: new Date() };
        }

        const schedules = await db.Schedule.findAll({
            where: queryConditions,
            attributes: ['id', 'name', 'workDate', 'shift'],
            include: [
                {
                    model: db.Slot,
                    as: 'slots',
                    attributes: [
                        'id',
                        'startTime',
                        'endTime',
                        'capacity',
                        'status'
                    ],
                    required: false,
                    include: [
                        {
                            model: db.Appointment,
                            as: 'appointments',
                            where: {
                                status: {
                                    [Op.ne]: 'pending'
                                }
                            },
                            required: false,
                            attributes: [
                                'id',
                                'patientName',
                                'patientGender',
                                'patientPhone',
                                'patientEmail',
                                'patientDob',
                                'patientEthnicity',
                                'patientAddress',
                                'reason'
                            ]
                        }
                    ]
                }
            ],
            raw: false,
            nest: true
        });

        return {
            errCode: 0,
            message: 'Get schedules successful',
            data: schedules
        };
    } catch (e) {
        throw e;
    }
};

const getSlotsService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            const slots = await db.Slot.findAll({
                where: {
                    doctorId: doctorId,
                    startTime: {
                        [Op.between]: [startOfDay, endOfDay]
                    }
                },
                order: [['startTime', 'ASC']]
            });

            if (!slots) {
                return resolve({
                    errCode: 3,
                    errMessage: 'Slot not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get slots successful',
                data: slots
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getDoctorBySpecialtyService = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const specialty = await db.Specialty.findOne({
                where: { id: specialtyId }
            });

            if (!specialty) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Specialty not found'
                });
            }

            const doctors = await db.Doctor.findAll({
                where: { specialtyId: specialtyId },
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    }
                ]
            });

            if (doctors.length === 0) {
                return resolve({
                    errCode: 3,
                    errMessage: 'Doctor not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get doctors successful',
                data: doctors
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getAppointmentsService = async (userId, page, limit, status, date) => {
    try {
        const doctor = await db.Doctor.findOne({
            where: { userId: userId },
            attributes: ['id']
        });

        if (!doctor) {
            return {
                errCode: 1,
                errEnMessage: 'Doctor not found',
                errViMessage: 'Bác sĩ không tồn tại'
            };
        }

        const doctorId = doctor.id;
        const offset = (page - 1) * limit;

        let appointmentCondition = {
            doctorId: doctorId
        };
        if (status) {
            appointmentCondition.status = status;
        }

        let slotCondition = {};
        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            slotCondition.startTime = {
                [Op.between]: [startDate, endDate]
            };
        }

        const { count, rows } = await db.Appointment.findAndCountAll({
            where: appointmentCondition,
            offset: offset,
            limit: limit,
            distinct: true,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: [
                        'dob',
                        'gender',
                        'ethnicity',
                        'address',
                        'insuranceTerm',
                        'insuranceNumber',
                        'familyAddress',
                        'notePMH'
                    ],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Slot,
                    as: 'slot',
                    attributes: ['startTime', 'endTime'],
                    where: slotCondition,
                    required: !!date
                },
                {
                    model: db.Service,
                    as: 'service',
                    attributes: ['durationMinutes', 'name', 'price']
                }
            ]
        });

        if (!rows || rows.length === 0) {
            return {
                errCode: 0,
                message: 'No appointments found',
                data: [],
                meta: {
                    page: page,
                    limit: limit,
                    totalRows: 0,
                    totalPages: 0
                }
            };
        }

        const totalPages = Math.ceil(count / limit);

        return {
            errCode: 0,
            message: 'Get appointments successful',
            data: rows,
            meta: {
                page: page,
                limit: limit,
                totalRows: count,
                totalPages: totalPages
            }
        };
    } catch (e) {
        throw e;
    }
};

const getDoctorByServiceService = (serviceId, page, limit, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            let whereCondition = { serviceId: serviceId };
            if (status) {
                whereCondition.status = status;
            }

            const { count, rows } = await db.DoctorService.findAndCountAll({
                where: whereCondition,
                limit: limit,
                offset: offset,
                attributes: ['price', 'status'],
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone']
                            },
                            {
                                model: db.Specialty,
                                as: 'specialty',
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                raw: false,
                nest: true
            });

            if (!rows || rows.length === 0) {
                return resolve({
                    errCode: 0,
                    message: 'No doctors found',
                    data: [],
                    meta: {
                        page: page,
                        limit: limit,
                        totalRows: 0,
                        totalPages: 0
                    }
                });
            }

            const totalPages = Math.ceil(count / limit);

            return resolve({
                errCode: 0,
                message: 'Get doctors by service successful',
                data: rows,
                meta: {
                    page: page,
                    limit: limit,
                    totalRows: count,
                    totalPages: totalPages
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const toggleSlotService = async (userId, slotId) => {
    const trans = await db.sequelize.transaction();

    try {
        const doctor = await db.Doctor.findOne({
            where: { userId: userId },
            transaction: trans
        });

        const doctorId = doctor.id;

        const slot = await db.Slot.findOne({
            where: { id: slotId, doctorId: doctorId },
            lock: trans.LOCK.UPDATE,
            transaction: trans
        });

        if (!slot) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Slot not found or invalid doctor',
                errViMessage:
                    'Khung giờ không tồn tại hoặc không phải khung giờ của bác sĩ'
            };
        }

        if (slot.status === 'close') {
            await slot.update({ status: 'available' }, { transaction: trans });
            await trans.commit();
            return {
                errCode: 0,
                enMessage: 'Slot has been opened',
                viMessage: 'Slot đã được mở'
            };
        }

        const appointments = await db.Appointment.findAll({
            where: { slotId: slotId },
            transaction: trans
        });

        if (appointments.length > 0) {
            await trans.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Slot has appointments',
                errViMessage: 'Khung giờ đã có lịch hẹn'
            };
        }

        await slot.update({ status: 'close' }, { transaction: trans });
        await trans.commit();

        return {
            errCode: 0,
            enMessage: 'Slot has been closed',
            viMessage: 'Slot đã được đóng'
        };
    } catch (e) {
        await trans.rollback();
        throw e;
    }
};

const closeSlotsByDateService = async (userId, dateStr) => {
    const trans = await db.sequelize.transaction();
    try {
        const doctor = await db.Doctor.findOne({
            where: { userId: userId },
            transaction: trans
        });

        if (!doctor) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Doctor info not found',
                errViMessage: 'Không tìm thấy thông tin bác sĩ'
            };
        }

        const startDate = new Date(dateStr);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateStr);
        endDate.setHours(23, 59, 59, 999);

        const schedules = await db.Schedule.findAll({
            where: {
                doctorId: doctor.id,
                workDate: {
                    [Op.between]: [startDate, endDate]
                }
            },
            transaction: trans
        });

        if (!schedules || schedules.length === 0) {
            await trans.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Schedule not found for this date',
                errViMessage: 'Không tìm thấy lịch làm việc cho ngày này'
            };
        }

        const scheduleIds = schedules.map((s) => s.id);

        const bookedAppointments = await db.Appointment.findAll({
            where: {
                doctorId: doctor.id
            },
            include: [
                {
                    model: db.Slot,
                    as: 'slot',
                    where: {
                        scheduleId: { [Op.in]: scheduleIds }
                    },
                    attributes: []
                }
            ],
            attributes: ['slotId'],
            transaction: trans
        });

        const bookedSlotIds = bookedAppointments.map((app) => app.slotId);

        const result = await db.Slot.update(
            { status: 'close' },
            {
                where: {
                    scheduleId: { [Op.in]: scheduleIds },
                    id: { [Op.notIn]: bookedSlotIds },
                    status: { [Op.ne]: 'close' }
                },
                transaction: trans
            }
        );

        await trans.commit();

        return {
            errCode: 0,
            enMessage: `Closed ${result[0]} slots successfully`,
            viMessage: `Đã đóng thành công ${result[0]} slot (trừ các slot đã có khách đặt)`
        };
    } catch (e) {
        await trans.rollback();
        throw e;
    }
};

const openSlotsByDateService = async (userId, dateStr) => {
    const trans = await db.sequelize.transaction();
    try {
        const doctor = await db.Doctor.findOne({
            where: { userId: userId },
            transaction: trans
        });

        if (!doctor) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Doctor info not found',
                errViMessage: 'Không tìm thấy thông tin bác sĩ'
            };
        }

        const startDate = new Date(dateStr);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateStr);
        endDate.setHours(23, 59, 59, 999);

        const schedules = await db.Schedule.findAll({
            where: {
                doctorId: doctor.id,
                workDate: {
                    [Op.between]: [startDate, endDate]
                }
            },
            transaction: trans
        });

        if (!schedules || schedules.length === 0) {
            await trans.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Schedule not found for this date',
                errViMessage: 'Không tìm thấy lịch làm việc cho ngày này'
            };
        }

        const scheduleIds = schedules.map((s) => s.id);

        const bookedAppointments = await db.Appointment.findAll({
            where: {
                doctorId: doctor.id
            },
            include: [
                {
                    model: db.Slot,
                    as: 'slot',
                    where: {
                        scheduleId: { [Op.in]: scheduleIds }
                    },
                    attributes: []
                }
            ],
            attributes: ['slotId'],
            transaction: trans
        });

        const bookedSlotIds = bookedAppointments.map((app) => app.slotId);

        const result = await db.Slot.update(
            { status: 'available' },
            {
                where: {
                    scheduleId: { [Op.in]: scheduleIds },
                    id: { [Op.notIn]: bookedSlotIds },
                    status: 'close'
                },
                transaction: trans
            }
        );

        await trans.commit();

        return {
            errCode: 0,
            enMessage: `Opened ${result[0]} slots successfully`,
            viMessage: `Đã mở lại thành công ${result[0]} slot`
        };
    } catch (e) {
        await trans.rollback();
        throw e;
    }
};

const getAppointmentDetailService = async (appointmentId) => {
    try {
        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: [
                        'dob',
                        'gender',
                        'ethnicity',
                        'address',
                        'insuranceTerm',
                        'insuranceNumber',
                        'familyAddress',
                        'notePMH'
                    ],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Slot,
                    as: 'slot',
                    attributes: ['startTime', 'endTime']
                },
                {
                    model: db.Service,
                    as: 'service',
                    attributes: ['durationMinutes', 'name', 'price']
                }
            ]
        });

        if (!appointment) {
            return {
                errCode: 2,
                errEnMessage: 'Appointment not found',
                errViMessage: 'Lịch hẹn không tồn tại'
            };
        }

        return {
            errCode: 0,
            message: 'Get appointment detail successful',
            data: appointment
        };
    } catch (e) {
        throw e;
    }
};

const completeExamService = async (data) => {
    const trans = await db.sequelize.transaction();

    try {
        const appointment = await db.Appointment.findOne({
            where: { id: data.appointmentId },
            include: [
                {
                    model: db.Doctor,
                    as: 'doctor',
                    include: [
                        { model: db.User, as: 'user', attributes: ['name'] }
                    ]
                }
            ],
            transaction: trans
        });

        if (!appointment) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Appointment not found',
                errViMessage: 'Lịch hẹn không tồn tại'
            };
        }

        await appointment.update(
            { status: 'completed' },
            { transaction: trans }
        );

        if (appointment.queueId) {
            await db.Queue.update(
                { status: 'completed' },
                {
                    where: { id: appointment.queueId },
                    transaction: trans
                }
            );
        }

        await db.Record.create(
            {
                appointmentId: data.appointmentId,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,

                symptoms: data.s, // S
                physicalExam: data.o, // O
                diagnosis: data.a, // A
                treatment: data.p, // P

                prescription: data.prescription || null,
                reExamDate: data.reExamDate || null
            },
            { transaction: trans }
        );

        await trans.commit();

        const doctorName = appointment.doctor?.user?.name || 'Bác sĩ';
        const patientEmail = appointment.patientEmail;
        const patientName = appointment.patientName;

        if (patientEmail) {
            await sendFinishExamEmail({
                email: patientEmail,
                patientName: patientName,
                doctorName: doctorName,
                diagnosis: data.a,
                treatment: data.p,
                prescription: data.prescription,
                reExamDate: data.reExamDate
            });
        }

        return {
            errCode: 0,
            enMessage: 'Save exam record successful',
            viMessage: 'Lưu dữ liệu khám bệnh thành công'
        };
    } catch (e) {
        if (!trans.finished) await trans.rollback();
        console.error('Error in completeExamService:', e);
        throw e;
    }
};

module.exports = {
    getAllDoctorsService,
    getDoctorByIdService,
    getSchedulesService,
    getSlotsService,
    getDoctorBySpecialtyService,
    getAppointmentsService,
    getDoctorByServiceService,
    toggleSlotService,
    closeSlotsByDateService,
    openSlotsByDateService,
    getAppointmentDetailService,
    completeExamService
};
