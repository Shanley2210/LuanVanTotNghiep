const { verify } = require('jsonwebtoken');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const moment = require('moment');
const { where, Op } = require('sequelize');
require('moment/locale/vi');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const sendAppontment = async (
    email,
    id,
    name,
    type,
    target,
    time,
    finalPrice,
    deposit,
    status
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
                    'vi-VN'
                )} VNĐ</li>
                <li style="margin-bottom:8px;"><strong>Tiền cọc cần thanh toán (20%):</strong> 
                <span style="color:#0078d7;font-weight:bold;">${deposit.toLocaleString(
                    'vi-VN'
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
    status
) => {
    const subject = 'Cập nhật lịch hẹn';
    const text = `Kính gửi ${
        name || 'Quý khách hàng'
    },\n. Chúng tôi xác nhận bạn đẫ cập nhật lịch hẹn thành công.`;

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
                    'vi-VN'
                )} VNĐ</li>
                <li style="margin-bottom:8px;"><strong>Tiền cọc cần thanh toán (20%):</strong> 
                <span style="color:#0078d7;font-weight:bold;">${deposit.toLocaleString(
                    'vi-VN'
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

const sendCancelAppontment = async (email, id, name, status) => {
    const subject = 'Xác nhận HỦY LỊCH HẸN';
    const text = `Kính gửi ${
        name || 'Quý khách hàng'
    },\n. Lịch hẹn của bạn đã được hủy thành công.`;

    const html = `
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
            <h3 style="color:#e74c3c;margin-bottom:15px;">Kính gửi ${
                name || 'Quý khách hàng'
            },</h3>
            <p style="margin-bottom:10px;">Chúng tôi xác nhận lịch hẹn của bạn với Mã lịch hẹn <span style="color:#e74c3c;font-weight:bold;">${id}</span> đã được **HỦY BỎ** thành công.</p>

            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                <li style="margin-bottom:8px;"><strong>Mã lịch hẹn:</strong> <span style="color:#e74c3c;font-weight:bold;">${id}</span></li>
                <li style="margin-bottom:8px;"><strong>Trạng thái mới:</strong> <span style="color:#e74c3c;font-weight:600;">${status.toUpperCase()}</span></li>
                <li style="margin-bottom:8px;"><strong>Thông báo:</strong> Tiền cọc (nếu có) sẽ được xử lý hoàn trả theo chính sách của phòng khám.</li>
            </ul>
            
            <p style="margin-bottom:5px;">Trân trọng,</p>
            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
        </div>
    `;

    await sendMail(email, subject, text, html);
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
            transaction: trans
        });

        if (!currentSlot) {
            throw {
                code: 4,
                en: 'Start slot not found or does not match doctor',
                vi: 'Khung giờ bắt đầu không tồn tại hoặc không khớp với bác sĩ'
            };
        }

        finalDoctorId = currentSlot.doctorId;
    }

    if (serviceId) {
        const serviceInfo = await db.Service.findOne({
            where: { id: serviceId }
        });
        if (!serviceInfo) {
            throw {
                code: 5,
                en: 'Service not found',
                vi: 'Dịch vụ không tồn tại'
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
                        include: [
                            { model: db.User, as: 'user', attributes: ['name'] }
                        ]
                    }
                ],
                transaction: trans
            });

            if (!docService) {
                throw {
                    code: 6,
                    en: 'Doctor does not perform this service',
                    vi: 'Bác sĩ này không thực hiện dịch vụ đã chọn'
                };
            }

            if (docService.price) finalPrice = Number(docService.price);
            target += ` - BS. ${docService.doctor.user.name}`;
        }

        if (currentSlot) {
            const start = moment(currentSlot.startTime);
            const end = moment(currentSlot.endTime);
            const slotDurationMs = end.diff(start);
            const slotDurationMinutes = slotDurationMs / 60000;

            const serviceDurationMinutes =
                Number(serviceInfo.durationMinutes) || 30;
            const neededSlotCount = Math.ceil(
                serviceDurationMinutes / slotDurationMinutes
            );

            if (neededSlotCount > 1) {
                const allSlotsOfDay = await db.Slot.findAll({
                    where: {
                        doctorId: finalDoctorId,
                        scheduleId: currentSlot.scheduleId
                    },
                    order: [['startTime', 'ASC']],
                    transaction: trans
                });

                const startIndex = allSlotsOfDay.findIndex(
                    (s) => s.id === currentSlot.id
                );

                if (startIndex === -1) {
                    throw {
                        code: 99,
                        en: 'Slot sync error',
                        vi: 'Lỗi đồng bộ dữ liệu slot'
                    };
                }

                if (startIndex + neededSlotCount > allSlotsOfDay.length) {
                    throw {
                        code: 8,
                        en: 'Not enough time remaining in the schedule',
                        vi: 'Không đủ thời gian làm việc còn lại trong ca này'
                    };
                }

                for (let i = 0; i < neededSlotCount; i++) {
                    const nextSlot = allSlotsOfDay[startIndex + i];

                    // 1. Kiểm tra Slot có trống không
                    if (
                        nextSlot.status !== 'available' &&
                        nextSlot.capacity < 1
                    ) {
                        if (nextSlot.id !== currentSlot.id) {
                            throw {
                                code: 9,
                                en: 'Consecutive slots are busy',
                                vi: 'Khoảng thời gian liên tiếp đã bị đặt trước'
                            };
                        } else {
                            throw {
                                code: 4,
                                en: 'Start slot full',
                                vi: 'Khung giờ bắt đầu đã đầy'
                            };
                        }
                    }

                    if (i > 0) {
                        const prevSlot = slotsToBook[i - 1];
                        const prevEndTime = moment(prevSlot.endTime);
                        const nextStartTime = moment(nextSlot.startTime);

                        if (!prevEndTime.isSame(nextStartTime)) {
                            throw {
                                code: 10,
                                en: 'Slots are not consecutive (break time)',
                                vi: 'Dịch vụ yêu cầu thời gian liên tục nhưng có khoảng nghỉ giữa các slot'
                            };
                        }
                    }

                    slotsToBook.push(nextSlot);
                }
            } else {
                if (
                    currentSlot.status !== 'available' ||
                    currentSlot.capacity < 1
                ) {
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
            slotsToBook
        };
    }

    if (finalDoctorId) {
        const doctorInfo = await db.Doctor.findOne({
            where: { id: finalDoctorId },
            include: [{ model: db.User, as: 'user', attributes: ['name'] }]
        });

        if (!doctorInfo) {
            throw {
                code: 3,
                en: 'Doctor not found',
                vi: 'Bác sĩ không tồn tại'
            };
        }

        if (currentSlot) {
            if (
                currentSlot.status !== 'available' ||
                currentSlot.capacity < 1
            ) {
                throw { code: 4, en: 'Slot full', vi: 'Khung giờ đã đầy' };
            }
            slotsToBook.push(currentSlot);
        }

        return {
            type: 'doctor',
            finalPrice: Number(doctorInfo.price),
            target: `Khám bác sĩ: ${doctorInfo.user.name}`,
            finalDoctorId,
            slotsToBook
        };
    }

    throw {
        code: 2,
        en: 'Invalid info',
        vi: 'Thông tin đặt lịch không hợp lệ'
    };
};

const getDetailPatientService = async (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await db.Patient.findOne({
            where: { userId: userId },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'email', 'phone']
                }
            ]
        });

        if (!user) {
            return resolve({
                errCode: 2,
                errMessage: 'User not found'
            });
        }

        return resolve({
            errCode: 0,
            message: 'Get user successful',
            data: user
        });
    });
};

const createProfilePatientService = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingPatient = await db.Patient.findOne({
                where: { userId: userId }
            });

            if (existingPatient) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Patient already exists',
                    errViMessage: 'Bệnh nhân đã tồn tại'
                });
            }

            const patientData = {
                userId: userId,
                dob: data.dob,
                gender: data.gender,
                ethnicity: data.ethnicity,
                address: data.address,
                insuranceTerm: data.insuranceTerm,
                insuranceNumber: data.insuranceNumber,
                familyAddress: data.familyAddress,
                notePMH: data.notePMH
            };

            const newPatient = await db.Patient.create(patientData);

            return resolve({
                errCode: 0,
                viMessage: 'Tạo profile bệnh nhân thành công',
                enMessage: 'Create profile patient successful',
                data: newPatient
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const updateProfilePatientService = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const patient = await db.Patient.findOne({
                where: { userId: userId }
            });

            if (!patient) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'User not found',
                    errViMessage: 'Bệnh nhân không tồn tại'
                });
            }

            const patientData = {};
            if (data.dob !== undefined) patientData.dob = data.dob;
            if (data.gender !== undefined) patientData.gender = data.gender;
            if (data.ethnicity !== undefined)
                patientData.ethnicity = data.ethnicity;
            if (data.address !== undefined) patientData.address = data.address;
            if (data.insuranceTerm !== undefined)
                patientData.insuranceTerm = data.insuranceTerm;
            if (data.insuranceNumber !== undefined)
                patientData.insuranceNumber = data.insuranceNumber;
            if (data.familyAddress !== undefined)
                patientData.familyAddress = data.familyAddress;
            if (data.notePMH !== undefined) patientData.notePMH = data.notePMH;

            await db.Patient.update(patientData, {
                where: { userId: userId }
            });

            return resolve({
                errCode: 0,
                enMessage: 'Update patient successful',
                viMessage: 'Cập nhật profile bệnh nhân thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getAppointmentsService = async (userId, page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findPatient = await db.User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: ['id']
                    }
                ]
            });

            if (!findPatient || !findPatient.patient) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Patient not found for this user'
                });
            }

            const patientId = findPatient.patient.id;
            const offset = (page - 1) * limit;

            const { count, rows } = await db.Appointment.findAndCountAll({
                where: { patientId: patientId },
                offset: offset,
                limit: limit,
                distinct: true,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        attributes: ['id', 'image'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone']
                            },
                            {
                                model: db.Specialty,
                                as: 'specialty',
                                attributes: ['name', 'description', 'image']
                            }
                        ]
                    },
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: ['id', 'notePMH'],
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
                        attributes: ['id', 'doctorId', 'startTime', 'endTime']
                    },
                    {
                        model: db.Queue,
                        as: 'queue',
                        include: [
                            {
                                model: db.Receptionist,
                                as: 'receptionist'
                            }
                        ]
                    },
                    {
                        model: db.Service,
                        as: 'service',
                        attributes: [
                            'id',
                            'name',
                            'price',
                            'durationMinutes',
                            'price'
                        ]
                    },
                    {
                        model: db.Record,
                        as: 'record'
                    },
                    {
                        model: db.Payment,
                        as: 'payment'
                    }
                ],
                raw: false,
                nest: true
            });

            if (!rows || rows.length === 0) {
                return resolve({
                    errCode: 0,
                    message: 'Appointment not found',
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
                message: 'Get appointments successful',
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

const createAppointmentService = async (data) => {
    const { userId, doctorId, slotId, serviceId, bookingInfo } = data;

    const trans = await db.sequelize.transaction();

    try {
        const findPatient = await db.User.findOne({
            where: { id: userId },
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: ['id', 'gender', 'dob', 'ethnicity', 'address']
                }
            ],
            transaction: trans
        });

        if (!findPatient || !findPatient.patient) {
            await trans.rollback();
            return {
                errCode: 1,
                errEnMessage: 'Patient not found or profile not created.',
                errViMessage: 'Không tìm thấy bệnh nhân hoặc chưa tạo hồ sơ'
            };
        }
        const patientId = findPatient.patient.id;

        let bookingDetails;
        try {
            bookingDetails = await calculateBookingDetails(
                doctorId,
                serviceId,
                slotId,
                trans
            );
        } catch (error) {
            await trans.rollback();
            return {
                errCode: error.code || -1,
                errEnMessage: error.en || 'Error calculating booking',
                errViMessage: error.vi || 'Lỗi tính toán đặt lịch'
            };
        }

        const { type, finalPrice, target, finalDoctorId, slotsToBook } =
            bookingDetails;

        if (slotsToBook && slotsToBook.length > 0) {
            const slotIdsToBook = slotsToBook.map((s) => s.id);

            const checkDuplicate = await db.Appointment.findOne({
                where: {
                    patientId: patientId,
                    slotId: { [Op.in]: slotIdsToBook },
                    status: ['pending', 'confirmed', 'succeeded']
                },
                transaction: trans
            });

            if (checkDuplicate) {
                await trans.rollback();
                return {
                    errCode: 7,
                    errEnMessage: 'Duplicate appointment in these slots.',
                    errViMessage:
                        'Bạn đã có lịch hẹn trùng vào khoảng thời gian này rồi!'
                };
            }

            for (const slot of slotsToBook) {
                slot.capacity = 0;
                slot.status = 'full';
                await slot.save({ transaction: trans });
            }
        }

        let deposit = finalPrice * 0.2;
        let appointmentData = {
            doctorId: finalDoctorId,
            patientId: patientId,
            slotId: slotId || null,
            serviceId: serviceId || null,
            status: 'pending',
            deposit: deposit,
            deposited: 0,
            type: type,
            finalPrice: finalPrice,
            bookingFor: bookingInfo.bookingFor,
            reason: bookingInfo.reason
        };

        if (bookingInfo.bookingFor === 'relative') {
            appointmentData.patientName = bookingInfo.patientName;
            appointmentData.patientGender = bookingInfo.patientGender;
            appointmentData.patientPhone = bookingInfo.patientPhone;
            appointmentData.patientEmail = bookingInfo.patientEmail;
            appointmentData.patientDob = bookingInfo.patientDob;
            appointmentData.patientEthnicity = bookingInfo.patientEthnicity;
            appointmentData.patientAddress = bookingInfo.patientAddress;
        } else {
            appointmentData.patientName = findPatient.name;
            appointmentData.patientGender = findPatient.patient.gender;
            appointmentData.patientPhone = findPatient.phone;
            appointmentData.patientEmail = findPatient.email;
            appointmentData.patientDob = findPatient.patient.dob
                ? moment(findPatient.patient.dob).format('YYYY-MM-DD')
                : '';
            appointmentData.patientEthnicity = findPatient.patient.ethnicity;
            appointmentData.patientAddress = findPatient.patient.address;
        }

        const appointment = await db.Appointment.create(appointmentData, {
            transaction: trans
        });

        await trans.commit();

        const patientInfoForEmail = await db.Patient.findOne({
            where: { id: patientId },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ]
        });

        const appointmentCreatedTime = moment(appointment.createdAt)
            .locale('vi')
            .format('llll');

        const patientNameDisplay =
            bookingInfo.bookingFor === 'relative'
                ? bookingInfo.patientName
                : patientInfoForEmail.user.name;

        let timeString = '';
        if (slotsToBook.length > 0) {
            const firstSlotStart = moment(slotsToBook[0].startTime).format(
                'HH:mm'
            );
            const lastSlotEnd = moment(
                slotsToBook[slotsToBook.length - 1].endTime
            ).format('HH:mm DD/MM/YYYY');
            timeString = `${firstSlotStart} - ${lastSlotEnd}`;
        }

        await sendAppontment(
            patientInfoForEmail.user.email,
            appointment.id,
            patientNameDisplay,
            type,
            `${target} (${timeString})`,
            appointmentCreatedTime,
            finalPrice,
            deposit,
            'pending'
        );

        return {
            errCode: 0,
            enMessage: 'Create appointment successful',
            viMessage: 'Tạo lịch hẹn thành công'
        };
    } catch (e) {
        if (!trans.finished) await trans.rollback();

        console.error(e);
        throw e;
    }
};

const updateAppointmentService = async (userId, appointmentId, data) => {
    const trans = await db.sequelize.transaction();
    try {
        const findPatient = await db.User.findOne({
            where: { id: userId },
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: ['id', 'gender', 'dob', 'ethnicity', 'address']
                }
            ],
            transaction: trans
        });

        if (!findPatient || !findPatient.patient) {
            await trans.rollback();
            return resolve({
                errCode: 1,
                errEnMessage: 'Patient not found or profile not created.',
                errViMessage: 'Không tìm thấy bệnh nhân hoặc chưa tạo hồ sơ'
            });
        }

        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    where: { userId: userId }
                }
            ],
            lock: trans.LOCK.UPDATE,
            transaction: trans
        });

        if (!appointment) {
            await trans.rollback();
            return {
                errCode: 1,
                errEnMessage: 'Appointment not found or unauthorized',
                errViMessage:
                    'Lịch hẹn không tồn tại hoặc không có quyền truy cập'
            };
        }

        if (!['pending', 'deposited'].includes(appointment.status)) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Cannot update appointment in current status',
                errViMessage:
                    'Không thể cập nhật lịch hẹn ở trạng thái hiện tại'
            };
        }

        let isReschedule = false;
        let newBookingDetails = null;

        if (
            (data.slotId && data.slotId !== appointment.slotId) ||
            (data.serviceId && data.serviceId !== appointment.serviceId) ||
            (data.doctorId && data.doctorId !== appointment.doctorId)
        ) {
            isReschedule = true;

            const oldStartSlot = await db.Slot.findOne({
                where: { id: appointment.slotId },
                transaction: trans
            });

            if (oldStartSlot) {
                let slotsToRelease = [oldStartSlot];

                if (appointment.type === 'service' && appointment.serviceId) {
                    const oldService = await db.Service.findOne({
                        where: { id: appointment.serviceId },
                        transaction: trans
                    });

                    if (oldService) {
                        const start = moment(oldStartSlot.startTime);
                        const end = moment(oldStartSlot.endTime);
                        const slotDurationMinutes = end.diff(start) / 60000;
                        const serviceDurationMinutes =
                            Number(oldService.durationMinutes) || 30;
                        const neededSlotCount = Math.ceil(
                            serviceDurationMinutes / slotDurationMinutes
                        );

                        if (neededSlotCount > 1) {
                            const allSlotsOfDay = await db.Slot.findAll({
                                where: {
                                    doctorId: appointment.doctorId,
                                    scheduleId: oldStartSlot.scheduleId
                                },
                                order: [['startTime', 'ASC']],
                                transaction: trans
                            });

                            const startIndex = allSlotsOfDay.findIndex(
                                (s) => s.id === oldStartSlot.id
                            );
                            if (startIndex !== -1) {
                                for (let i = 1; i < neededSlotCount; i++) {
                                    if (allSlotsOfDay[startIndex + i]) {
                                        slotsToRelease.push(
                                            allSlotsOfDay[startIndex + i]
                                        );
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

            try {
                newBookingDetails = await calculateBookingDetails(
                    data.doctorId || appointment.doctorId,
                    data.serviceId || appointment.serviceId,
                    data.slotId || appointment.slotId,
                    trans
                );
            } catch (error) {
                await trans.rollback();
                return {
                    errCode: error.code || -1,
                    errEnMessage: error.en || 'Error calculating new booking',
                    errViMessage: error.vi || 'Lỗi tính toán lịch hẹn mới'
                };
            }

            const { slotsToBook, finalPrice, type, target, finalDoctorId } =
                newBookingDetails;

            if (slotsToBook && slotsToBook.length > 0) {
                const newSlotIds = slotsToBook.map((s) => s.id);
                const checkDuplicate = await db.Appointment.findOne({
                    where: {
                        patientId: appointment.patientId,
                        slotId: { [Op.in]: newSlotIds },
                        status: ['pending', 'confirmed', 'succeeded'],
                        id: { [Op.ne]: appointmentId }
                    },
                    transaction: trans
                });

                if (checkDuplicate) {
                    await trans.rollback();
                    return {
                        errCode: 7,
                        errEnMessage: 'Duplicate appointment in new slots.',
                        errViMessage:
                            'Bạn đã có lịch hẹn trùng vào khoảng thời gian mới!'
                    };
                }

                for (const slot of slotsToBook) {
                    slot.capacity = 0;
                    slot.status = 'full';
                    await slot.save({ transaction: trans });
                }
            }

            appointment.doctorId = finalDoctorId;
            appointment.slotId = slotsToBook[0].id;
            appointment.serviceId = data.serviceId || appointment.serviceId;
            appointment.finalPrice = finalPrice;
            appointment.deposit = finalPrice * 0.2;
            appointment.type = type;
        }

        const bookingInfo = data.bookingInfo;
        if (bookingInfo) {
            if (bookingInfo.reason) appointment.reason = bookingInfo.reason;
            if (bookingInfo.bookingFor)
                appointment.bookingFor = bookingInfo.bookingFor;

            if (bookingInfo.bookingFor === 'relative') {
                appointment.patientName = bookingInfo.patientName;
                appointment.patientGender = bookingInfo.patientGender;
                appointment.patientPhone = bookingInfo.patientPhone;
                appointment.patientEmail = bookingInfo.patientEmail;
                appointment.patientDob = bookingInfo.patientDob;
                appointment.patientEthnicity = bookingInfo.patientEthnicity;
                appointment.patientAddress = bookingInfo.patientAddress;
            } else {
                appointment.patientName = findPatient.name;
                appointment.patientGender = findPatient.patient.gender;
                appointment.patientPhone = findPatient.phone;
                appointment.patientEmail = findPatient.email;
                appointment.patientDob = findPatient.patient.dob
                    ? moment(findPatient.patient.dob).format('YYYY-MM-DD')
                    : '';
                appointment.patientEthnicity = findPatient.patient.ethnicity;
                appointment.patientAddress = findPatient.patient.address;
            }
        }

        await appointment.save({ transaction: trans });

        await trans.commit();

        const user = await db.User.findOne({ where: { id: userId } });

        let timeString = '';
        if (isReschedule && newBookingDetails) {
            const { slotsToBook } = newBookingDetails;
            const start = moment(slotsToBook[0].startTime).format('HH:mm');
            const end = moment(
                slotsToBook[slotsToBook.length - 1].endTime
            ).format('HH:mm DD/MM/YYYY');
            timeString = `${start} - ${end}`;
        } else {
            const currentSlot = await db.Slot.findByPk(appointment.slotId);
            if (currentSlot)
                timeString = moment(currentSlot.startTime).format(
                    'HH:mm DD/MM/YYYY'
                );
        }

        const mailTarget = isReschedule
            ? newBookingDetails.target
            : 'Dịch vụ đã đặt (Thông tin cập nhật)';

        await sendUpdateAppointment(
            user.email,
            appointment.id,
            appointment.patientName,
            appointment.type,
            `${mailTarget} (${timeString})`,
            moment(appointment.updatedAt).format('llll'),
            appointment.finalPrice,
            appointment.deposit,
            'updated'
        );

        return {
            errCode: 0,
            enMessage: 'Update appointment successful',
            viMessage: 'Cập nhật lịch hẹn thành công'
        };
    } catch (e) {
        if (!trans.finished) await trans.rollback();
        console.error(e);
        return {
            errCode: -1,
            errEnMessage: 'Error from server',
            errViMessage: 'Lỗi từ máy chủ'
        };
    }
};

const deleteAppointmentService = async (userId, appointmentId) => {
    const trans = await db.sequelize.transaction();

    try {
        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            lock: trans.LOCK.UPDATE,
            transaction: trans
        });

        if (!appointment) {
            await trans.rollback();
            return {
                errCode: 1,
                errEnMessage: 'Appointment not found',
                errViMessage: 'Lịch hẹn không tồn tại'
            };
        }

        const patient = await db.Patient.findOne({
            where: { userId: userId },
            transaction: trans
        });

        const patientId = patient.id;

        if (appointment.patientId !== patientId) {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'You are not the owner of this appointment',
                errViMessage: 'Bạn không có quyền truy cập lịch hẹn này'
            };
        }

        if (
            appointment.status !== 'pending' &&
            appointment.status !== 'deposited'
        ) {
            await trans.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Cannot cancel this appointment',
                errViMessage: 'Không thể hủy lịch hẹn này'
            };
        }

        if (appointment.slotId) {
            const oldSlot = await db.Slot.findOne({
                where: { id: appointment.slotId },
                lock: trans.LOCK.UPDATE,
                transaction: trans
            });

            if (oldSlot) {
                oldSlot.capacity += 1;
                oldSlot.status = 'available';

                await oldSlot.save({ transaction: trans });
            }
        }

        await db.Appointment.update(
            { status: 'cancelled' },
            { where: { id: appointmentId }, transaction: trans }
        );

        await trans.commit();

        const patientInfo = await db.Patient.findOne({
            where: { userId: userId },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'email', 'phone']
                }
            ]
        });

        await sendCancelAppontment(
            patientInfo.user.email,
            appointment.id,
            patientInfo.user.name,
            'cancelled'
        );

        return {
            errCode: 0,
            enMessage: 'Cancel appointment successful',
            viMessage: 'Hủy lịch hẹn thành công'
        };
    } catch (e) {
        await trans.rollback();
        throw e;
    }
};

const searchPublicService = async (q, page, limit) => {
    try {
        const searchKeyWord = `%${q.trim()}%`;
        const offset = (page - 1) * limit;

        const doctors = await db.Doctor.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'email', 'phone'],
                    where: {
                        name: { [Op.like]: searchKeyWord }
                    }
                },
                {
                    model: db.Specialty,
                    as: 'specialty',
                    attributes: ['name']
                }
            ],
            attributes: ['id', 'image', 'degree', 'price'],
            raw: true,
            nest: true
        });

        const specialties = await db.Specialty.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                name: { [Op.like]: searchKeyWord }
            },
            attributes: ['id', 'name', 'description', 'image'],
            raw: true,
            nest: true
        });

        const services = await db.Service.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                name: { [Op.like]: searchKeyWord }
            },
            attributes: [
                'id',
                'name',
                'price',
                'description',
                'durationMinutes'
            ],
            raw: true,
            nest: true
        });

        return {
            errCode: 0,
            enMessage: 'Search successful',
            viMessage: 'Tìm kiếm thành công',
            data: {
                doctors: { count: doctors.count, rows: doctors.rows },
                specialties: {
                    count: specialties.count,
                    rows: specialties.rows
                },
                services: { count: services.count, rows: services.rows },
                meta: {
                    page: page,
                    limit: limit,
                    totalRows:
                        doctors.count + specialties.count + services.count,
                    totalPages: Math.ceil(
                        (doctors.count + specialties.count + services.count) /
                            limit
                    )
                }
            }
        };
    } catch (e) {
        throw e;
    }
};

const fakePaymentService = (appointmentId) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            if (!appointmentId) {
                await t.rollback();
                resolve({
                    errCode: 1,
                    errEnMessage: 'Missing required parameter',
                    errViMessage: 'Thiếu tham số yêu cầu'
                });
                return;
            }

            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                transaction: t,
                lock: true
            });

            if (!appointment) {
                await t.rollback();
                resolve({
                    errCode: 2,
                    errEnMessage: 'Appointment not found',
                    errViMessage: 'Lịch hẹn không tồn tại'
                });
                return;
            }

            await appointment.update(
                {
                    status: 'deposited',
                    deposited: appointment.deposit
                },
                { transaction: t }
            );

            await db.Payment.create(
                {
                    appointmentId: appointment.id,
                    amount: appointment.deposit,
                    method: 'fake_method',
                    type: 'deposit',
                    status: 'success',
                    txnRef: `FAKE-${Date.now()}`,
                    callback_data: { info: 'Fake payment for testing' }
                },
                { transaction: t }
            );

            await t.commit();

            resolve({
                errCode: 0,
                enMessage: 'Fake payment succeed!',
                viMessage: 'Thanh toán giả mạo thành công!'
            });
        } catch (e) {
            await t.rollback();
            reject(e);
        }
    });
};

const getRecordService = async (userId, recordId) => {
    try {
        const patient = await db.Patient.findOne({
            where: { userId: userId }
        });

        if (!patient) {
            return {
                errCode: 2,
                errEnMessage: 'Patient not found',
                errViMessage: 'Bệnh nhân không tồn tại'
            };
        }

        const patientId = patient.id;

        const record = await db.Record.findOne({
            where: { id: recordId, patientId: patientId },
            include: [
                {
                    model: db.Doctor,
                    as: 'doctor',
                    attributes: [],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name']
                        },
                        {
                            model: db.Specialty,
                            as: 'specialty',
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: ['address'],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Appointment,
                    as: 'appointment',
                    attributes: [
                        'patientName',
                        'patientGender',
                        'patientPhone',
                        'patientDob',
                        'patientAddress'
                    ]
                }
            ]
        });

        if (!record) {
            return {
                errCode: 3,
                errEnMessage: 'Record not found',
                errViMessage: 'Bệnh án không tồn tại'
            };
        }

        return {
            errCode: 0,
            enMessage: 'Get record successful',
            viMessage: 'Lấy hồ sơ thành công',
            data: record
        };
    } catch (e) {
        throw e;
    }
};

const downloadRecordService = async (userId, recordId) => {
    try {
        const patient = await db.Patient.findOne({
            where: { userId: userId },
            attributes: ['id']
        });

        if (!patient)
            return {
                errCode: 2,
                errEnMessage: 'Patient not found',
                errViMessage: 'Bệnh nhân không tồn tại'
            };

        const record = await db.Record.findOne({
            where: { id: recordId, patientId: patient.id },
            include: [
                {
                    model: db.Doctor,
                    as: 'doctor',
                    attributes: ['degree'],
                    include: [
                        { model: db.User, as: 'user', attributes: ['name'] },
                        {
                            model: db.Specialty,
                            as: 'specialty',
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: db.Patient,
                    as: 'patient',
                    attributes: ['id'],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Appointment,
                    as: 'appointment',
                    attributes: [
                        'patientName',
                        'patientGender',
                        'patientPhone',
                        'patientDob',
                        'patientAddress'
                    ]
                }
            ],
            raw: false,
            nest: true
        });

        if (!record)
            return {
                errCode: 2,
                errEnMessage: 'Record not found',
                errViMessage: 'Bệnh án không tồn tại'
            };

        const doc = new PDFDocument({ margin: 40, size: 'A4' });

        // Load fonts (giữ nguyên logic của bạn)
        const fontRegular = path.join(__dirname, '../fonts/Roboto-Regular.ttf');
        const fontBold = path.join(__dirname, '../fonts/Roboto-Bold.ttf');
        try {
            doc.registerFont('Roboto-Regular', fontRegular);
            doc.registerFont('Roboto-Bold', fontBold);
        } catch (e) {
            console.warn('Font error');
        }

        const COLORS = {
            PRIMARY: '#0f172a',
            SECONDARY: '#64748b',
            ACCENT: '#3b82f6',
            BG_LIGHT: '#f8fafc',
            BG_RED_LIGHT: '#fef2f2',
            BG_BLUE_LIGHT: '#eff6ff',
            BORDER: '#e2e8f0',
            DARK_BOX: '#0f172a',
            TEXT_WHITE: '#ffffff',
            RED_TEXT: '#ef4444',
            BLUE_TEXT: '#1d4ed8'
        };

        const drawLine = (posY) => {
            doc.strokeColor(COLORS.BORDER)
                .lineWidth(1)
                .moveTo(40, posY)
                .lineTo(555, posY)
                .stroke();
        };

        let y = 30; // Bắt đầu cao hơn một chút

        // --- HEADER ---
        doc.font('Roboto-Bold')
            .fontSize(10)
            .fillColor(COLORS.SECONDARY)
            .text('HỒ SƠ Y TẾ ĐIỆN TỬ', 40, y);
        y += 15;
        doc.font('Roboto-Bold')
            .fontSize(22)
            .fillColor(COLORS.PRIMARY)
            .text(`PHIẾU KHÁM #${record.id}`, 40, y);
        doc.fontSize(9)
            .font('Roboto-Regular')
            .text(
                `Ngày tạo: ${new Date().toLocaleString('vi-VN')}`,
                40,
                y + 28
            );

        y += 45;
        drawLine(y);
        y += 15;

        // --- PHẦN 1: NGƯỜI ĐẶT LỊCH (Compact) ---
        doc.font('Roboto-Bold')
            .fontSize(10)
            .fillColor(COLORS.ACCENT)
            .text('NGƯỜI ĐẶT LỊCH', 40, y);
        y += 15;

        const bookerName = record.patient?.user?.name?.toUpperCase() || '---';
        const bookerPhone = record.patient?.user?.phone || '---';
        const bookerEmail = record.patient?.user?.email || '---';

        // In hàng ngang để tiết kiệm diện tích
        doc.font('Roboto-Bold')
            .fontSize(9)
            .fillColor(COLORS.SECONDARY)
            .text('HỌ TÊN:', 40, y);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(bookerName, 90, y);

        doc.font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('SĐT:', 250, y);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(bookerPhone, 280, y);

        doc.font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('EMAIL:', 380, y);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(bookerEmail, 420, y);

        y += 20;
        drawLine(y);
        y += 15;

        // --- PHẦN 2: BỆNH NHÂN & BÁC SĨ ---
        const col1X = 40;
        const col2X = 300;

        // Cột Trái: Bệnh nhân
        doc.font('Roboto-Bold')
            .fontSize(10)
            .fillColor(COLORS.SECONDARY)
            .text('BỆNH NHÂN', col1X, y);
        y += 15;
        doc.font('Roboto-Bold')
            .fontSize(14)
            .fillColor(COLORS.PRIMARY)
            .text(
                record.appointment?.patientName?.toUpperCase() || 'KHÔNG RÕ',
                col1X,
                y
            );

        let subY = y + 20;
        // Gom nhóm thông tin bệnh nhân
        doc.fontSize(9)
            .font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('MÃ BN:', col1X, subY);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(record.patientId, col1X + 40, subY);

        const gender =
            record.appointment?.patientGender === 'M' ||
            record.appointment?.patientGender === '1'
                ? 'Nam'
                : 'Nữ';
        doc.font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('GT:', col1X + 100, subY);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(gender, col1X + 120, subY);

        subY += 15;
        doc.font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('ĐỊA CHỈ:', col1X, subY);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(
                record.appointment?.patientAddress || '--',
                col1X + 45,
                subY,
                { width: 200 }
            );

        // Cột Phải: Bác sĩ
        let rightY = y - 15; // Căn chỉnh lại với tiêu đề Bệnh nhân
        doc.font('Roboto-Bold')
            .fontSize(10)
            .fillColor(COLORS.ACCENT)
            .text('BÁC SĨ KHÁM', col2X, rightY);
        rightY += 15;
        doc.font('Roboto-Bold')
            .fontSize(14)
            .fillColor(COLORS.PRIMARY)
            .text(
                record.doctor?.user?.name?.toUpperCase() || '---',
                col2X,
                rightY
            );

        let rightSubY = rightY + 20;
        doc.fontSize(9)
            .font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('KHOA:', col2X, rightSubY);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text('Nội Tổng Quát', col2X + 40, rightSubY); // Hardcode hoặc lấy từ DB

        rightSubY += 15;
        doc.font('Roboto-Bold')
            .fillColor(COLORS.SECONDARY)
            .text('MÃ HẸN:', col2X, rightSubY);
        doc.font('Roboto-Regular')
            .fillColor(COLORS.PRIMARY)
            .text(`APP-${record.appointmentId}`, col2X + 45, rightSubY);

        // Chọn vị trí Y thấp nhất giữa 2 cột để tiếp tục
        y = Math.max(subY + 20, rightSubY + 20);

        // --- CÁC BOX (Đã giảm chiều cao) ---
        // Hàm vẽ box tùy chỉnh height
        const drawBox = (
            posX,
            posY,
            title,
            content,
            type = 'default',
            height = 75
        ) => {
            const boxWidth = 250;
            let bgColor = COLORS.BG_LIGHT;
            let titleColor = COLORS.SECONDARY;

            if (type === 'red') {
                bgColor = COLORS.BG_RED_LIGHT;
                titleColor = COLORS.RED_TEXT;
            } else if (type === 'blue') {
                bgColor = COLORS.BG_BLUE_LIGHT;
                titleColor = COLORS.BLUE_TEXT;
            }

            doc.rect(posX, posY, boxWidth, height).fillAndStroke(
                bgColor,
                COLORS.BG_LIGHT
            );
            doc.font('Roboto-Bold')
                .fontSize(8)
                .fillColor(titleColor)
                .text(title.toUpperCase(), posX + 8, posY + 8);
            doc.font('Roboto-Regular')
                .fontSize(9)
                .fillColor(COLORS.PRIMARY)
                .text(content || 'Không ghi nhận', posX + 8, posY + 25, {
                    width: boxWidth - 16,
                    height: height - 30,
                    ellipsis: true
                });
        };

        const boxHeight = 75; // Giảm từ 100 xuống 75
        const boxGap = 85; // Khoảng cách nhảy y

        drawBox(
            40,
            y,
            'I. TRIỆU CHỨNG (SUBJECTIVE)',
            record.symptoms,
            'default',
            boxHeight
        );
        drawBox(
            305,
            y,
            'II. KHÁM THỰC THỂ (OBJECTIVE)',
            record.physicalExam,
            'default',
            boxHeight
        );

        y += boxGap; // Nhảy xuống

        drawBox(40, y, 'III. CHẨN ĐOÁN', record.diagnosis, 'red', boxHeight);
        drawBox(
            305,
            y,
            'IV. HƯỚNG ĐIỀU TRỊ',
            record.treatment,
            'blue',
            boxHeight
        );

        y += boxGap + 10; // Khoảng cách tới đơn thuốc

        // --- ĐƠN THUỐC (Giảm chiều cao) ---
        doc.font('Roboto-Bold')
            .fontSize(12)
            .fillColor(COLORS.PRIMARY)
            .text('ĐƠN THUỐC', 40, y);
        y += 15;

        const presHeight = 120; // Giảm từ 150 xuống 120
        doc.rect(40, y, 515, presHeight).fill(COLORS.DARK_BOX);

        doc.fillColor(COLORS.TEXT_WHITE).fontSize(9).font('Roboto-Regular');
        let textY = y + 15;
        if (record.prescription) {
            const lines = record.prescription.split('\n');
            // Chỉ in tối đa 7 dòng để không tràn box
            lines.slice(0, 7).forEach((line) => {
                doc.text(line, 55, textY);
                textY += 14;
            });
        } else {
            doc.text('Không có đơn thuốc.', 55, textY);
        }

        y += presHeight + 15; // Nhảy xuống dưới box đơn thuốc

        // --- HẸN TÁI KHÁM & CHỮ KÝ ---
        // Kiểm tra nếu y quá thấp (gần hết trang) thì add trang mới (Safety check)
        if (y > 750) {
            doc.addPage();
            y = 40;
        }

        // Box hẹn tái khám
        doc.rect(40, y, 140, 45).stroke(COLORS.BORDER); // Giảm size box
        doc.font('Roboto-Bold')
            .fontSize(8)
            .fillColor(COLORS.SECONDARY)
            .text('HẸN TÁI KHÁM', 50, y + 8);
        const reExamDate = record.reExamDate
            ? new Date(record.reExamDate).toLocaleDateString('vi-VN')
            : '---';
        doc.font('Roboto-Bold')
            .fontSize(12)
            .fillColor(COLORS.PRIMARY)
            .text(reExamDate, 50, y + 22);

        // Chữ ký bác sĩ
        doc.font('Roboto-Bold')
            .fontSize(10)
            .fillColor(COLORS.PRIMARY)
            .text('BS. TRẦN THỊ BÌNH', 400, y + 30, {
                align: 'center',
                width: 150
            });

        // Con dấu
        const stampPath = path.join(__dirname, '../assets/images/stamp.png');
        if (fs.existsSync(stampPath)) {
            doc.image(stampPath, 435, y - 25, { width: 80 });
        } else {
            const circleX = 475;
            const circleY = y + 35;
            doc.circle(circleX, circleY, 30)
                .lineWidth(2)
                .strokeColor(COLORS.RED_TEXT)
                .stroke();
            doc.font('Roboto-Bold')
                .fontSize(7)
                .fillColor(COLORS.RED_TEXT)
                .text('ĐÃ KIỂM TRA\nXÁC THỰC', circleX - 25, circleY - 8, {
                    width: 50,
                    align: 'center'
                });
        }

        // --- FOOTER (Cố định ở đáy) ---
        doc.page.margins.bottom = 0;
        doc.rect(0, 820, 595, 22).fill(COLORS.PRIMARY);
        doc.fontSize(8)
            .fillColor(COLORS.TEXT_WHITE)
            .text('BẢO MẬT THÔNG TIN NGƯỜI BỆNH THEO TIÊU CHUẨN ISO', 40, 827);

        return { errCode: 0, doc: doc };
    } catch (e) {
        console.error('Error generating PDF:', e);
        throw e;
    }
};

module.exports = {
    getDetailPatientService,
    createProfilePatientService,
    updateProfilePatientService,
    createAppointmentService,
    getAppointmentsService,
    updateAppointmentService,
    deleteAppointmentService,
    searchPublicService,
    fakePaymentService,
    getRecordService,
    downloadRecordService
};
