const { verify } = require('jsonwebtoken');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const moment = require('moment');
const { where, Op } = require('sequelize');
require('moment/locale/vi');

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
    let slotsToBook = []; // Danh sách các slot cần khóa
    let currentSlot = null; // Slot bắt đầu

    // 1. Lấy thông tin Slot bắt đầu
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

        // Cập nhật lại doctorId chính xác từ slot
        finalDoctorId = currentSlot.doctorId;
    }

    // 2. LOGIC XỬ LÝ THEO DỊCH VỤ (SERVICE) - HỖ TRỢ MULTI-SLOT
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

        // Xử lý giá và tên bác sĩ nếu có
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

        // --- LOGIC TÍNH TOÁN SLOT THEO THỜI LƯỢNG THỰC TẾ ---
        if (currentSlot) {
            // Tính thời lượng của 1 slot dựa trên startTime và endTime trong DB
            const start = moment(currentSlot.startTime);
            const end = moment(currentSlot.endTime);
            const slotDurationMs = end.diff(start); // Thời lượng slot tính bằng mili giây
            const slotDurationMinutes = slotDurationMs / 60000; // Đổi ra phút (thường là 30)

            // Tính số slot cần thiết (Service duration / Slot duration)
            const serviceDurationMinutes =
                Number(serviceInfo.durationMinutes) || 30;
            const neededSlotCount = Math.ceil(
                serviceDurationMinutes / slotDurationMinutes
            );

            if (neededSlotCount > 1) {
                // Lấy tất cả slot của bác sĩ trong ngày đó (hoặc cùng scheduleId)
                // Quan trọng: Sắp xếp theo startTime để đảm bảo thứ tự thời gian
                const allSlotsOfDay = await db.Slot.findAll({
                    where: {
                        doctorId: finalDoctorId,
                        scheduleId: currentSlot.scheduleId // Lấy cùng lịch trình để đảm bảo cùng ngày
                        // Hoặc dùng: startTime: { [Op.gte]: startOfToday, [Op.lte]: endOfToday }
                    },
                    order: [['startTime', 'ASC']],
                    transaction: trans
                });

                // Tìm vị trí của slot bắt đầu trong danh sách đã sort
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

                // Kiểm tra xem có đủ slot phía sau không
                if (startIndex + neededSlotCount > allSlotsOfDay.length) {
                    throw {
                        code: 8,
                        en: 'Not enough time remaining in the schedule',
                        vi: 'Không đủ thời gian làm việc còn lại trong ca này'
                    };
                }

                // Duyệt qua các slot cần thiết để kiểm tra tính liên tục và sẵn sàng
                for (let i = 0; i < neededSlotCount; i++) {
                    const nextSlot = allSlotsOfDay[startIndex + i];

                    // 1. Kiểm tra Slot có trống không
                    if (
                        nextSlot.status !== 'available' &&
                        nextSlot.capacity < 1
                    ) {
                        // Nếu là slot bắt đầu (currentSlot) thì bỏ qua check này (vì nó đang được chọn)
                        // Nhưng nếu các slot tiếp theo bị full thì lỗi
                        if (nextSlot.id !== currentSlot.id) {
                            throw {
                                code: 9,
                                en: 'Consecutive slots are busy',
                                vi: 'Khoảng thời gian liên tiếp đã bị đặt trước'
                            };
                        } else {
                            // Slot bắt đầu đã full
                            throw {
                                code: 4,
                                en: 'Start slot full',
                                vi: 'Khung giờ bắt đầu đã đầy'
                            };
                        }
                    }

                    // 2. Kiểm tra tính LIÊN TỤC (Slot sau phải bắt đầu ngay khi Slot trước kết thúc)
                    if (i > 0) {
                        const prevSlot = slotsToBook[i - 1];
                        const prevEndTime = moment(prevSlot.endTime);
                        const nextStartTime = moment(nextSlot.startTime);

                        // Cho phép sai số nhỏ (ví dụ 1 phút) hoặc bắt buộc khớp tuyệt đối
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
                // Nếu dịch vụ ngắn (<= thời lượng 1 slot), chỉ cần slot hiện tại
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

    // 3. LOGIC XỬ LÝ THEO BÁC SĨ (KHÁM THƯỜNG - 1 SLOT)
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

module.exports = {
    getDetailPatientService,
    createProfilePatientService,
    updateProfilePatientService,
    createAppointmentService,
    getAppointmentsService,
    updateAppointmentService,
    deleteAppointmentService,
    fakePaymentService
};
