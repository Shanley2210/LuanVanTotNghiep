const { where, Op } = require('sequelize');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const sendConfirmAppointment = async (email, id, name) => {
    const subject = 'Xác nhận lịch hẹn';

    const text = `Kính gửi ${name || 'Quý khách hàng'},
        Lịch hẹn của bạn đã được cập nhật trạng thái.`;

    const html = `
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
            <h3 style="color:#e74c3c;margin-bottom:15px;">Kính gửi ${
                name || 'Quý khách hàng'
            },</h3>

            <p style="margin-bottom:10px;">
                Lịch hẹn của bạn với Mã lịch hẹn 
                <span style="color:#e74c3c;font-weight:bold;">${id}</span> 
                đã được 
                <span style="color:#e74c3c;font-weight:bold;">xác nhận</span>. 
                Vui lòng đến đúng giờ theo lịch đã đặt.
            </p>

            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                <li style="margin-bottom:8px;">
                    <strong>Mã lịch hẹn:</strong>
                    <span style="color:#e74c3c;font-weight:bold;">${id}</span>
                </li>
                <li style="margin-bottom:8px;">
                    <strong>Trạng thái mới:</strong>
                    <span style="color:#e74c3c;font-weight:600;">Đã xác nhận</span>
                </li>   
            </ul>

            <p style="margin-bottom:5px;">Trân trọng,</p>
            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
        </div>
    `;

    await sendMail(email, subject, text, html);
};

const sendAppontment = async (
    email,
    id,
    name,
    type,
    target,
    time,
    finalPrice,
    deposit,
    status,
) => {
    const subject = 'Đã đặt lịch hẹn';
    const text = `Kính gửi ${
        name || 'Quý khách hàng'
    },\n. Chúng tôi xác nhận bạn đẫ đặt lịch hẹn thành công.`;

    const html = `
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
            <h3 style="color:#0078d7;margin-bottom:15px;">Kính gửi ${
                name || 'Quý khách hàng'
            },</h3>
            <p style="margin-bottom:10px;">Chúng tôi xin xác nhận bạn đã đặt lịch hẹn thành công với các chi tiết sau:</p>

            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                <li style="margin-bottom:8px;"><strong>Mã lịch hẹn:</strong> <span style="color:#0078d7;font-weight:bold;">${id}</span></li>
                <li style="margin-bottom:8px;"><strong>Loại lịch hẹn:</strong> ${type}</li>
                <li style="margin-bottom:8px;"><strong>Đối tượng/Dịch vụ:</strong> ${target}</li>
                <li style="margin-bottom:8px;"><strong>Thời gian đặt lịch:</strong> ${time}</li>
                
                <li style="margin-bottom:8px;"><strong>Tổng chi phí dự kiến:</strong> ${finalPrice.toLocaleString(
                    'vi-VN',
                )} VNĐ</li>
                <li style="margin-bottom:8px;"><strong>Tiền cọc cần thanh toán (20%):</strong> 
                <span style="color:#0078d7;font-weight:bold;">${deposit.toLocaleString(
                    'vi-VN',
                )} VNĐ</span>
                </li>
                <li style="margin-bottom:8px;"><strong>Trạng thái:</strong> <span style="color:#e67e22;font-weight:600;">${status}</span></li>
            </ul>

            <p style="margin-bottom:10px;">Vui lòng thanh toán tiền cọc để xác nhận lịch hẹn chính thức.</p>
            <p style="margin-bottom:5px;">Trân trọng,</p>
            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
        </div>
    `;

    await sendMail(email, subject, text, html);
};

const sendUpdateAppointment = async (
    email,
    id,
    name,
    type,
    target,
    time,
    finalPrice,
    deposit,
    status,
) => {
    const subject = 'Cập nhật lịch hẹn';
    const text = `Kính gửi ${
        name || 'Quý khách hàng'
    },\n. Chúng tôi xác nhận đẫ cập nhật lịch hẹn.`;

    const html = `
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
            <h3 style="color:#2980b9;margin-bottom:15px;">Kính gửi ${
                name || 'Quý khách hàng'
            },</h3>
            <p style="margin-bottom:10px;">Chúng tôi xin xác nhận bạn đã CẬP NHẬT lịch hẹn thành công với các chi tiết **mới nhất** sau:</p>

            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                <li style="margin-bottom:8px;"><strong>Mã lịch hẹn:</strong> <span style="color:#2980b9;font-weight:bold;">${id}</span></li>
                <li style="margin-bottom:8px;"><strong>Loại lịch hẹn:</strong> ${type}</li>
                <li style="margin-bottom:8px;"><strong>Đối tượng/Dịch vụ:</strong> ${target}</li>
                
                ${
                    time
                        ? `<li style="margin-bottom:8px;"><strong>Thời gian cập nhật:</strong> <span style="font-weight:bold; color:#0078d7;">${time}</span></li>`
                        : ''
                }

                <li style="margin-bottom:8px;"><strong>Tổng chi phí dự kiến:</strong> ${finalPrice.toLocaleString(
                    'vi-VN',
                )} VNĐ</li>
                <li style="margin-bottom:8px;"><strong>Tiền cọc cần thanh toán (20%):</strong> 
                <span style="color:#0078d7;font-weight:bold;">${deposit.toLocaleString(
                    'vi-VN',
                )} VNĐ</span>
                </li>
                <li style="margin-bottom:8px;"><strong>Trạng thái:</strong> <span style="color:#e67e22;font-weight:600;">${status}</span></li>
            </ul>
            
            <p style="margin-bottom:10px;">Vui lòng kiểm tra lại chi tiết. Nếu có thắc mắc, vui lòng liên hệ chúng tôi.</p>
            <p style="margin-bottom:5px;">Trân trọng,</p>
            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
        </div>
    `;

    await sendMail(email, subject, text, html);
};

const salt = bcrypt.genSaltSync(10);

const getNewAppointmentsService = (page, limit, status, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            let appointmentCondition = {};
            if (status) {
                appointmentCondition.status = status;
            }

            let slotCondition = {};
            if (date) {
                const inputDate = new Date(isNaN(date) ? date : parseInt(date));

                const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
                const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

                slotCondition.startTime = {
                    [Op.between]: [startOfDay, endOfDay],
                };
            }

            const { count, rows } = await db.Appointment.findAndCountAll({
                where: appointmentCondition,
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        attributes: ['id', 'price', 'image'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone'],
                            },
                            {
                                model: db.Specialty,
                                as: 'specialty',
                                attributes: ['name'],
                            },
                        ],
                    },
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: ['id', 'gender', 'dob', 'address'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone'],
                            },
                        ],
                    },
                    {
                        model: db.Service,
                        as: 'service',
                        attributes: ['name', 'price', 'durationMinutes'],
                    },
                    {
                        model: db.Slot,
                        as: 'slot',
                        attributes: ['startTime', 'endTime', 'status'],
                        where: slotCondition,
                        required: !!date,
                    },
                    {
                        model: db.Queue,
                        as: 'queue',
                        attributes: ['id', 'number', 'status'],
                    },
                ],
                raw: false,
                nest: true,
            });

            resolve({
                errCode: 0,
                message: 'Get new appointments successful',
                data: rows,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    limit: limit,
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};

const confirmAppointmentService = (appointmentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: ['id'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['email', 'name'],
                            },
                        ],
                    },
                ],
            });

            if (!appointment) {
                return resolve({
                    errCode: 1,
                    errEnMessage: 'Appointment not found',
                    errViMessage: 'Lịch hẹn không tồn tại',
                });
            }

            if (appointment.status !== 'deposited') {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Appointment status is not deposited',
                    errViMessage: 'Trạng thái lịch hẹn không hợp lệ',
                });
            }

            await appointment.update({ status: 'confirmed' });

            sendConfirmAppointment(
                appointment.patient.user.email,
                appointment.id,
                appointment.patient.user.name,
            );

            return resolve({
                errCode: 0,
                enMessage: 'Confirm appointment successful',
                viMessage: 'Xác nhận lịch hẹn thành công',
            });
        } catch (e) {}
    });
};

const checkInService = async (appointmentId, userId) => {
    const t = await db.sequelize.transaction();

    try {
        const user = await db.User.findOne({
            where: { id: userId },
            include: [
                {
                    model: db.Receptionist,
                    as: 'receptionist',
                    attributes: ['id'],
                },
            ],
            transaction: t,
        });

        if (!user || !user.receptionist) {
            await t.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Receptionist not found or invalid user',
                errViMessage: 'Người dùng không phải là lễ tân',
            };
        }

        const receptionistId = user.receptionist.id;

        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            include: [
                {
                    model: db.Slot,
                    as: 'slot',
                    attributes: ['id', 'doctorId', 'startTime'],
                },
            ],
            transaction: t,
        });

        if (!appointment) {
            await t.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Appointment not found',
                errViMessage: 'Lịch hẹn không tồn tại',
            };
        }

        if (appointment.status !== 'confirmed') {
            await t.rollback();
            return {
                errCode: 4,
                errEnMessage: 'Appointment status is not confirmed',
                errViMessage: 'Lịch hẹn chưa xác nhận hoặc đã check-in rồi',
            };
        }

        if (!appointment.slot) {
            await t.rollback();
            return {
                errCode: 5,
                errEnMessage: 'Slot data not found',
                errViMessage: 'Dữ liệu slot bị thiếu',
            };
        }

        const currentSlotTime = new Date(appointment.slot.startTime);
        const doctorId = appointment.slot.doctorId;

        const startOfDay = new Date(currentSlotTime);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(currentSlotTime);
        endOfDay.setHours(23, 59, 59, 999);

        const previousSlotsCount = await db.Slot.count({
            where: {
                doctorId: doctorId,
                startTime: {
                    [Op.between]: [startOfDay, endOfDay],
                    [Op.lt]: currentSlotTime,
                },
            },
            transaction: t,
        });

        const slotOrderNumber = previousSlotsCount + 1;

        const newQueue = await db.Queue.create(
            {
                receptionistId: receptionistId,
                number: slotOrderNumber,
                status: 'waiting',
            },
            { transaction: t },
        );

        await appointment.update(
            {
                status: 'checked_in',
                queueId: newQueue.id,
            },
            { transaction: t },
        );

        await t.commit();

        return {
            errCode: 0,
            enMessage: 'Check-in successful',
            viMessage: 'Check-in thành công',
            queueNumber: slotOrderNumber,
        };
    } catch (e) {
        await t.rollback();
        console.error(e);
        throw e;
    }
};

const createAppointmentByReceptionistService = async (data) => {
    const trans = await db.sequelize.transaction();

    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: data.email }, { phone: data.phone }],
            },
            transaction: trans,
        });

        if (!user) {
            const hashPassword = bcrypt.hashSync(data.phone, salt);

            const defaultRole = await db.Role.findOne({
                where: { name: 'Patient' },
                transaction: trans,
            });

            user = await db.User.create(
                {
                    email: data.email,
                    password: hashPassword,
                    name: data.name,
                    phone: data.phone,
                    verify: true,
                },
                { transaction: trans },
            );

            if (defaultRole) {
                await db.UserRole.create(
                    {
                        userId: user.id,
                        roleId: defaultRole.id,
                    },
                    { transaction: trans },
                );
            }
        }

        let patient = await db.Patient.findOne({
            where: { userId: user.id },
            transaction: trans,
        });

        if (!patient) {
            patient = await db.Patient.create(
                {
                    userId: user.id,
                    dob: data.dob,
                    gender: data.gender,
                    ethnicity: data.ethnicity,
                    address: data.address,
                    insuranceTerm: data.insuranceTerm,
                    insuranceNumber: data.insuranceNumber,
                    familyAddress: data.familyAddress,
                    notePMH: data.notePMH,
                },
                { transaction: trans },
            );
        }

        const patientId = patient.id;
        let finalDoctorId = data.doctorId || null;
        let finalPrice = 0;
        let targetString = '';
        let slotsToBook = [];
        let currentSlot = null;

        if (data.slotId) {
            let whereClause = { id: data.slotId };
            if (finalDoctorId) whereClause.doctorId = finalDoctorId;

            currentSlot = await db.Slot.findOne({
                where: whereClause,
                lock: trans.LOCK.UPDATE,
                transaction: trans,
            });

            if (!currentSlot) {
                await trans.rollback();
                return {
                    errCode: 4,
                    errViMessage: 'Khung giờ không tồn tại hoặc sai bác sĩ',
                    errEnMessage:
                        'Start slot not found or does not match doctor',
                };
            }
            finalDoctorId = currentSlot.doctorId;
        }

        if (data.serviceId) {
            const serviceInfo = await db.Service.findOne({
                where: { id: data.serviceId },
                transaction: trans,
            });
            if (!serviceInfo) {
                await trans.rollback();
                return {
                    errCode: 5,
                    errViMessage: 'Dịch vụ không tồn tại',
                    errEnMessage: 'Service not found',
                };
            }
            finalPrice = Number(serviceInfo.price);
            targetString = `Dịch vụ: ${serviceInfo.name}`;

            if (finalDoctorId) {
                const docService = await db.DoctorService.findOne({
                    where: {
                        doctorId: finalDoctorId,
                        serviceId: data.serviceId,
                    },
                    include: [
                        {
                            model: db.Doctor,
                            as: 'doctor',
                            include: [{ model: db.User, as: 'user' }],
                        },
                    ],
                    transaction: trans,
                });

                if (!docService) {
                    await trans.rollback();
                    return {
                        errCode: 6,
                        errViMessage:
                            'Bác sĩ này không thực hiện dịch vụ đã chọn',
                        errEnMessage:
                            'Doctor does not provide the selected service',
                    };
                }
                if (docService.price) finalPrice = Number(docService.price);
                targetString += ` - BS. ${docService.doctor.user.name}`;
            }

            if (currentSlot) {
                const start = moment(currentSlot.startTime);
                const end = moment(currentSlot.endTime);
                const slotDurationMinutes = end.diff(start) / 60000;
                const serviceDurationMinutes =
                    Number(serviceInfo.durationMinutes) || 30;
                const neededSlotCount = Math.ceil(
                    serviceDurationMinutes / slotDurationMinutes,
                );

                if (neededSlotCount > 1) {
                    const allSlots = await db.Slot.findAll({
                        where: {
                            doctorId: finalDoctorId,
                            scheduleId: currentSlot.scheduleId,
                        },
                        order: [['startTime', 'ASC']],
                        transaction: trans,
                    });

                    const startIndex = allSlots.findIndex(
                        (s) => s.id === currentSlot.id,
                    );
                    if (
                        startIndex === -1 ||
                        startIndex + neededSlotCount > allSlots.length
                    ) {
                        await trans.rollback();
                        return {
                            errCode: 8,
                            errViMessage:
                                'Không đủ thời gian còn lại trong ca để thực hiện dịch vụ',
                            errEnMessage:
                                'Not enough time left in the schedule to perform the service',
                        };
                    }

                    for (let i = 0; i < neededSlotCount; i++) {
                        const nextSlot = allSlots[startIndex + i];

                        if (
                            nextSlot.status !== 'available' &&
                            nextSlot.capacity < 1
                        ) {
                            await trans.rollback();
                            return {
                                errCode: 9,
                                errViMessage:
                                    'Khoảng thời gian liên tiếp đã bị bận',
                                errEnMessage:
                                    'Consecutive time slots are booked',
                            };
                        }
                        slotsToBook.push(nextSlot);
                    }
                } else {
                    if (
                        currentSlot.status !== 'available' ||
                        currentSlot.capacity < 1
                    ) {
                        await trans.rollback();
                        return {
                            errCode: 4,
                            errViMessage: 'Khung giờ đã đầy',
                            errEnMessage: 'Start slot is full',
                        };
                    }
                    slotsToBook.push(currentSlot);
                }
            }
        } else if (finalDoctorId) {
            const doctorInfo = await db.Doctor.findOne({
                where: { id: finalDoctorId },
                include: [{ model: db.User, as: 'user' }],
                transaction: trans,
            });
            finalPrice = Number(doctorInfo.price);
            targetString = `Khám bác sĩ: ${doctorInfo.user.name}`;

            if (currentSlot) {
                if (
                    currentSlot.status !== 'available' ||
                    currentSlot.capacity < 1
                ) {
                    await trans.rollback();
                    return {
                        errCode: 4,
                        errViMessage: 'Khung giờ đã đầy',
                        errEnMessage: 'Start slot is full',
                    };
                }
                slotsToBook.push(currentSlot);
            }
        } else {
            await trans.rollback();
            return {
                errCode: 2,
                errViMessage: 'Thiếu thông tin bác sĩ hoặc dịch vụ',
                errEnMessage: 'Missing doctor or service information',
            };
        }

        if (slotsToBook.length > 0) {
            const slotIds = slotsToBook.map((s) => s.id);

            const checkDuplicate = await db.Appointment.findOne({
                where: {
                    patientId: patientId,
                    slotId: { [Op.in]: slotIds },
                    status: ['pending', 'confirmed', 'succeeded'],
                },
                transaction: trans,
            });

            if (checkDuplicate) {
                await trans.rollback();
                return {
                    errCode: 7,
                    errViMessage: 'Bệnh nhân đã có lịch hẹn trùng vào giờ này',
                    errEnMessage:
                        'Patient already has an appointment at this time',
                };
            }

            for (const slot of slotsToBook) {
                slot.capacity = 0;
                slot.status = 'full';
                await slot.save({ transaction: trans });
            }
        }

        const deposit = finalPrice * 0.2;

        const newAppointment = await db.Appointment.create(
            {
                doctorId: finalDoctorId,
                patientId: patientId,
                slotId: data.slotId || null,
                serviceId: data.serviceId || null,
                status: 'confirmed',
                deposit: deposit,
                deposited: 0,
                type: data.serviceId ? 'service' : 'doctor',
                finalPrice: finalPrice,
                bookingFor: 'self',
                patientName: user.name,
                patientDob: patient.dob
                    ? moment(patient.dob).format('YYYY-MM-DD')
                    : null,
                patientEthnicity: patient.ethnicity,
                patientGender: patient.gender,
                patientPhone: user.phone,
                patientEmail: user.email,
                patientAddress: patient.address,
                reason: data.reason || 'Đặt trực tiếp tại quầy lễ tân',
            },
            { transaction: trans },
        );

        await trans.commit();

        let timeString = '';
        if (slotsToBook.length > 0) {
            const sStart = moment(slotsToBook[0].startTime).format('HH:mm');
            const sEnd = moment(
                slotsToBook[slotsToBook.length - 1].endTime,
            ).format('HH:mm DD/MM/YYYY');
            timeString = `${sStart} - ${sEnd}`;
        }
        const createdTime = moment(newAppointment.createdAt)
            .locale('vi')
            .format('llll');

        await sendAppontment(
            user.email,
            newAppointment.id,
            user.name,
            data.serviceId ? 'service' : 'doctor',
            `${targetString} (${timeString})`,
            createdTime,
            finalPrice,
            deposit,
            'Đã xác nhận (Tại quầy)',
        ).catch(console.error);

        return {
            errCode: 0,
            viMessage: 'Đặt lịch thành công cho bệnh nhân',
            enMessage: 'Create appointment successful',
        };
    } catch (e) {
        await trans.rollback();
        console.error(e);
        throw e;
    }
};

const calculateBookingDetails = async (doctorId, serviceId, slotId, trans) => {
    let finalDoctorId = doctorId || null;
    let slotsToBook = [];
    let currentSlot = null;

    if (slotId) {
        let whereClause = { id: slotId };
        if (finalDoctorId) whereClause.doctorId = finalDoctorId;

        currentSlot = await db.Slot.findOne({
            where: whereClause,
            lock: trans.LOCK.UPDATE,
            transaction: trans,
        });

        if (!currentSlot) {
            throw {
                code: 4,
                en: 'Start slot not found or does not match doctor',
                vi: 'Khung giờ bắt đầu không tồn tại hoặc không khớp với bác sĩ',
            };
        }
        finalDoctorId = currentSlot.doctorId;
    }

    if (serviceId) {
        const serviceInfo = await db.Service.findOne({
            where: { id: serviceId },
            transaction: trans,
        });
        if (!serviceInfo) {
            throw {
                code: 5,
                en: 'Service not found',
                vi: 'Dịch vụ không tồn tại',
            };
        }

        let finalPrice = Number(serviceInfo.price);
        let target = `Dịch vụ: ${serviceInfo.name}`;

        if (finalDoctorId) {
            const docService = await db.DoctorService.findOne({
                where: { doctorId: finalDoctorId, serviceId: serviceId },
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        include: [{ model: db.User, as: 'user', attributes: ['name'] }],
                    },
                ],
                transaction: trans,
            });

            if (!docService) {
                throw {
                    code: 6,
                    en: 'Doctor does not perform this service',
                    vi: 'Bác sĩ này không thực hiện dịch vụ đã chọn',
                };
            }

            if (docService.price) finalPrice = Number(docService.price);
            target += ` - BS. ${docService.doctor.user.name}`;
        }

        if (currentSlot) {
            const start = moment(currentSlot.startTime);
            const end = moment(currentSlot.endTime);
            const slotDurationMinutes = end.diff(start) / 60000;
            const serviceDurationMinutes = Number(serviceInfo.durationMinutes) || 30;
            const neededSlotCount = Math.ceil(serviceDurationMinutes / slotDurationMinutes);

            if (neededSlotCount > 1) {
                const allSlotsOfDay = await db.Slot.findAll({
                    where: {
                        doctorId: finalDoctorId,
                        scheduleId: currentSlot.scheduleId,
                    },
                    order: [['startTime', 'ASC']],
                    transaction: trans,
                });

                const startIndex = allSlotsOfDay.findIndex((s) => s.id === currentSlot.id);

                if (startIndex === -1) {
                    throw { code: 99, en: 'Slot sync error', vi: 'Lỗi đồng bộ dữ liệu slot' };
                }

                if (startIndex + neededSlotCount > allSlotsOfDay.length) {
                    throw {
                        code: 8,
                        en: 'Not enough time remaining in the schedule',
                        vi: 'Không đủ thời gian làm việc còn lại trong ca này',
                    };
                }

                for (let i = 0; i < neededSlotCount; i++) {
                    const nextSlot = allSlotsOfDay[startIndex + i];

                    if (nextSlot.status !== 'available' && nextSlot.capacity < 1) {
                        if (nextSlot.id !== currentSlot.id) {
                            throw {
                                code: 9,
                                en: 'Consecutive slots are busy',
                                vi: 'Khoảng thời gian liên tiếp đã bị đặt trước',
                            };
                        } else {
                            throw { code: 4, en: 'Start slot full', vi: 'Khung giờ bắt đầu đã đầy' };
                        }
                    }
                    slotsToBook.push(nextSlot);
                }
            } else {
                if (currentSlot.status !== 'available' && currentSlot.capacity < 1) {
                    throw { code: 4, en: 'Slot full', vi: 'Khung giờ đã đầy' };
                }
                slotsToBook.push(currentSlot);
            }
        }

        return {
            type: 'service',
            finalPrice,
            target,
            finalDoctorId,
            slotsToBook,
        };
    }

    if (finalDoctorId) {
        const doctorInfo = await db.Doctor.findOne({
            where: { id: finalDoctorId },
            include: [{ model: db.User, as: 'user', attributes: ['name'] }],
            transaction: trans,
        });

        if (!doctorInfo) {
            throw { code: 3, en: 'Doctor not found', vi: 'Bác sĩ không tồn tại' };
        }

        if (currentSlot) {
            if (currentSlot.status !== 'available' && currentSlot.capacity < 1) {
                throw { code: 4, en: 'Slot full', vi: 'Khung giờ đã đầy' };
            }
            slotsToBook.push(currentSlot);
        }

        return {
            type: 'doctor',
            finalPrice: Number(doctorInfo.price),
            target: `Khám bác sĩ: ${doctorInfo.user.name}`,
            finalDoctorId,
            slotsToBook,
        };
    }

    throw { code: 2, en: 'Invalid info', vi: 'Thông tin đặt lịch không hợp lệ' };
};
const updateAppointmentByReceptionistService = async (appointmentId, data) => {
    const trans = await db.sequelize.transaction();
    try {
        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email'],
                        },
                    ],
                },
            ],
            lock: trans.LOCK.UPDATE,
            transaction: trans,
        });

        if (!appointment) {
            await trans.rollback();
            return {
                errCode: 1,
                errViMessage: 'Lịch hẹn không tồn tại',
                errEnMessage: 'Appointment not found',
            };
        }

        if (!['pending', 'deposited', 'confirmed'].includes(appointment.status)) {
            await trans.rollback();
            return {
                errCode: 2,
                errViMessage: 'Không thể cập nhật lịch hẹn ở trạng thái hiện tại (Đã hoàn thành hoặc hủy)',
                errEnMessage: 'Cannot update appointment in current status',
            };
        }

        let isReschedule = false;
        let newBookingDetails = null;

        // Kiểm tra thay đổi chuyên môn (Slot, Service, Doctor)
        if (
            (data.slotId && data.slotId != appointment.slotId) ||
            (data.serviceId && data.serviceId != appointment.serviceId) ||
            (data.doctorId && data.doctorId != appointment.doctorId)
        ) {
            isReschedule = true;

            // 1. Giải phóng slot cũ
            const oldStartSlot = await db.Slot.findOne({
                where: { id: appointment.slotId },
                transaction: trans,
            });

            if (oldStartSlot) {
                let slotsToRelease = [oldStartSlot];

                if (appointment.type === 'service' && appointment.serviceId) {
                    const oldService = await db.Service.findOne({
                        where: { id: appointment.serviceId },
                        transaction: trans,
                    });

                    if (oldService) {
                        const start = moment(oldStartSlot.startTime);
                        const end = moment(oldStartSlot.endTime);
                        const slotDurationMinutes = end.diff(start) / 60000;
                        const serviceDurationMinutes = Number(oldService.durationMinutes) || 30;
                        const neededSlotCount = Math.ceil(serviceDurationMinutes / slotDurationMinutes);

                        if (neededSlotCount > 1) {
                            const allSlotsOfDay = await db.Slot.findAll({
                                where: {
                                    doctorId: appointment.doctorId,
                                    scheduleId: oldStartSlot.scheduleId,
                                },
                                order: [['startTime', 'ASC']],
                                transaction: trans,
                            });

                            const startIndex = allSlotsOfDay.findIndex((s) => s.id === oldStartSlot.id);
                            if (startIndex !== -1) {
                                for (let i = 1; i < neededSlotCount; i++) {
                                    if (allSlotsOfDay[startIndex + i]) {
                                        slotsToRelease.push(allSlotsOfDay[startIndex + i]);
                                    }
                                }
                            }
                        }
                    }
                }

                for (const slot of slotsToRelease) {
                    slot.capacity = 1;
                    slot.status = 'available';
                    await slot.save({ transaction: trans });
                }
            }

            // 2. Tính toán lại slot/giá mới
            try {
                newBookingDetails = await calculateBookingDetails(
                    data.doctorId || appointment.doctorId,
                    data.serviceId || appointment.serviceId,
                    data.slotId || appointment.slotId,
                    trans
                );
            } catch (error) {
                console.error("Calculate Error:", error);
                await trans.rollback();
                return {
                    errCode: error.code || -1,
                    errMessage: error.vi || 'Lỗi tính toán lịch hẹn mới',
                };
            }

            const { slotsToBook, finalPrice, type, target, finalDoctorId } = newBookingDetails;

            // 3. Check trùng lịch
            if (slotsToBook && slotsToBook.length > 0) {
                const newSlotIds = slotsToBook.map((s) => s.id);
                const checkDuplicate = await db.Appointment.findOne({
                    where: {
                        patientId: appointment.patientId,
                        slotId: { [Op.in]: newSlotIds },
                        status: ['pending', 'confirmed', 'succeeded'],
                        id: { [Op.ne]: appointmentId },
                    },
                    transaction: trans,
                });

                if (checkDuplicate) {
                    await trans.rollback();
                    return {
                        errCode: 7,
                        errViMessage: 'Bệnh nhân đã có lịch hẹn trùng vào khoảng thời gian mới!',
                        errEnMessage: 'Patient already has an appointment at this time',
                    };
                }

                for (const slot of slotsToBook) {
                    slot.capacity = 0;
                    slot.status = 'full';
                    await slot.save({ transaction: trans });
                }
            }

            // --- CẬP NHẬT THÔNG TIN VÀ TRẠNG THÁI ---
            appointment.doctorId = finalDoctorId;
            appointment.slotId = slotsToBook[0].id;
            appointment.serviceId = data.serviceId || appointment.serviceId;
            
            // Cập nhật giá và tiền cọc yêu cầu
            appointment.finalPrice = finalPrice;
            const newRequiredDeposit = finalPrice * 0.2;
            appointment.deposit = newRequiredDeposit;
            appointment.type = type;

            // *** LOGIC CHECK TIỀN CỌC MỚI ***
            // Nếu số tiền đã đóng (deposited) >= số tiền cọc yêu cầu mới -> Giữ trạng thái 'deposited'
            // Ngược lại -> 'pending' (cần đóng thêm)
            const currentDeposited = Number(appointment.deposited) || 0;
            if (currentDeposited >= newRequiredDeposit) {
                appointment.status = 'deposited';
            } else {
                appointment.status = 'pending';
            }
        }

        // Cập nhật thông tin hành chính (nếu có)
        const bookingInfo = data.bookingInfo;
        if (bookingInfo) {
            if (bookingInfo.reason) appointment.reason = bookingInfo.reason;
            if (bookingInfo.patientName) appointment.patientName = bookingInfo.patientName;
            if (bookingInfo.patientPhone) appointment.patientPhone = bookingInfo.patientPhone;
            if (bookingInfo.patientGender) appointment.patientGender = bookingInfo.patientGender;
            if (bookingInfo.patientAddress) appointment.patientAddress = bookingInfo.patientAddress;
            if (bookingInfo.patientDob) appointment.patientDob = bookingInfo.patientDob;
        }

        await appointment.save({ transaction: trans });
        await trans.commit();

        // Gửi email
        const recipientEmail = appointment.bookingFor === 'relative'
            ? appointment.patientEmail || appointment.patient.user.email
            : appointment.patient.user.email;

        let timeString = '';
        if (isReschedule && newBookingDetails) {
            const { slotsToBook } = newBookingDetails;
            const start = moment(slotsToBook[0].startTime).format('HH:mm');
            const end = moment(slotsToBook[slotsToBook.length - 1].endTime).format('HH:mm DD/MM/YYYY');
            timeString = `${start} - ${end}`;
        } else {
            const currentSlot = await db.Slot.findByPk(appointment.slotId);
            if (currentSlot) {
                timeString = moment(currentSlot.startTime).format('HH:mm DD/MM/YYYY');
            }
        }

        const mailTarget = isReschedule
            ? newBookingDetails.target
            : 'Cập nhật thông tin lịch hẹn';

        sendUpdateAppointment(
            recipientEmail,
            appointment.id,
            appointment.patientName,
            appointment.type,
            `${mailTarget} (${timeString})`,
            moment(appointment.updatedAt).format('llll'),
            appointment.finalPrice,
            appointment.deposit,
            appointment.status // Gửi đúng status vừa cập nhật (deposited hoặc pending)
        ).catch(console.error);

        return {
            errCode: 0,
            viMessage: `Cập nhật thành công. Trạng thái: ${appointment.status === 'deposited' ? 'Đã cọc' : 'Chờ đặt cọc'}`,
            enMessage: `Update successful. Status: ${appointment.status}`,
        };
    } catch (e) {
        if (!trans.finished) await trans.rollback();
        console.error("System Error in Receptionist Update:", e);
        return {
            errCode: -1,
            errMessage: 'Lỗi hệ thống',
        };
    }
};

module.exports = {
    getNewAppointmentsService,
    confirmAppointmentService,
    checkInService,
    createAppointmentByReceptionistService,
    updateAppointmentByReceptionistService,
};
