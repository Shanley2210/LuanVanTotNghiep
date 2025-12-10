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
        const serviceInfo = await db.Service.findOne({ where: { id: serviceId } });
        if (!serviceInfo) {
            throw { code: 5, en: 'Service not found', vi: 'Dịch vụ không tồn tại' };
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
                        include: [{ model: db.User, as: 'user', attributes: ['name'] }]
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
            const serviceDurationMinutes = Number(serviceInfo.durationMinutes) || 30;
            const neededSlotCount = Math.ceil(serviceDurationMinutes / slotDurationMinutes);

            if (neededSlotCount > 1) {
                // Lấy tất cả slot của bác sĩ trong ngày đó (hoặc cùng scheduleId)
                // Quan trọng: Sắp xếp theo startTime để đảm bảo thứ tự thời gian
                const allSlotsOfDay = await db.Slot.findAll({
                    where: {
                        doctorId: finalDoctorId,
                        scheduleId: currentSlot.scheduleId, // Lấy cùng lịch trình để đảm bảo cùng ngày
                        // Hoặc dùng: startTime: { [Op.gte]: startOfToday, [Op.lte]: endOfToday }
                    },
                    order: [['startTime', 'ASC']], 
                    transaction: trans
                });

                // Tìm vị trí của slot bắt đầu trong danh sách đã sort
                const startIndex = allSlotsOfDay.findIndex(s => s.id === currentSlot.id);

                if (startIndex === -1) {
                     throw { code: 99, en: 'Slot sync error', vi: 'Lỗi đồng bộ dữ liệu slot' };
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
                    if (nextSlot.status !== 'available' && nextSlot.capacity < 1) {
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
                            throw { code: 4, en: 'Start slot full', vi: 'Khung giờ bắt đầu đã đầy' };
                         }
                    }

                    // 2. Kiểm tra tính LIÊN TỤC (Slot sau phải bắt đầu ngay khi Slot trước kết thúc)
                    if (i > 0) {
                        const prevSlot = slotsToBook[i-1];
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
                if (currentSlot.status !== 'available' || currentSlot.capacity < 1) {
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
            throw { code: 3, en: 'Doctor not found', vi: 'Bác sĩ không tồn tại' };
        }

        if (currentSlot) {
            if (currentSlot.status !== 'available' || currentSlot.capacity < 1) {
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

    throw { code: 2, en: 'Invalid info', vi: 'Thông tin đặt lịch không hợp lệ' };
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

const getAppointmentsService = async (patientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const appointments = await db.Appointment.findAll({
                where: { patientId: patientId },
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        attributes: ['id', 'room', 'price'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name']
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

            if (!appointments) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Appointment not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get appointments successful',
                data: appointments
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const createAppointmentService = async (data) => {
    const { userId, doctorId, slotId, serviceId, bookingInfo } = data;

    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            // BƯỚC 1: LẤY THÔNG TIN BỆNH NHÂN
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
            const patientId = findPatient.patient.id;

            // BƯỚC 2: TÍNH TOÁN VÀ VALIDATE SLOT/DỊCH VỤ
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
                return resolve({
                    errCode: error.code || -1,
                    errEnMessage: error.en || 'Error calculating booking',
                    errViMessage: error.vi || 'Lỗi tính toán đặt lịch'
                });
            }

            const { type, finalPrice, target, finalDoctorId, slotsToBook } = bookingDetails;

            // BƯỚC 3: KIỂM TRA TRÙNG LỊCH CHO TẤT CẢ CÁC SLOT SẼ BOOK
            if (slotsToBook && slotsToBook.length > 0) {
                // Lấy ra danh sách ID của các slot sẽ book
                const slotIdsToBook = slotsToBook.map(s => s.id);
                
                const checkDuplicate = await db.Appointment.findOne({
                    where: {
                        patientId: patientId,
                        slotId: { [Op.in]: slotIdsToBook }, // Check nếu bệnh nhân đã book bất kỳ slot nào trong list này
                        status: ['pending', 'confirmed', 'succeeded']
                    },
                    transaction: trans
                });

                if (checkDuplicate) {
                    await trans.rollback();
                    return resolve({
                        errCode: 7,
                        errEnMessage: 'Duplicate appointment in these slots.',
                        errViMessage: 'Bạn đã có lịch hẹn trùng vào khoảng thời gian này rồi!'
                    });
                }

                // BƯỚC 4: CẬP NHẬT TRẠNG THÁI SLOT (FULL)
                for (const slot of slotsToBook) {
                    slot.capacity = 0;
                    slot.status = 'full'; // Hoặc trạng thái bận
                    await slot.save({ transaction: trans });
                }
            }

            // BƯỚC 5: LƯU APPOINTMENT
            let deposit = finalPrice * 0.2;
            let appointmentData = {
                doctorId: finalDoctorId,
                patientId: patientId,
                slotId: slotId || null, // Vẫn lưu slot bắt đầu làm mốc
                serviceId: serviceId || null,
                status: 'pending',
                deposit: deposit,
                deposited: 0,
                type: type,
                finalPrice: finalPrice,
                bookingFor: bookingInfo.bookingFor,
                reason: bookingInfo.reason,
                // Thêm trường endTime cho Appointment nếu cần thiết (optional)
                // endTime: slotsToBook.length > 0 ? slotsToBook[slotsToBook.length-1].endTime : null
            };

            // Mapping thông tin bệnh nhân
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

            // BƯỚC 6: GỬI EMAIL
            const patientInfoForEmail = await db.Patient.findOne({
                where: { id: patientId },
                include: [{ model: db.User, as: 'user', attributes: ['name', 'email'] }]
            });

            const appointmentCreatedTime = moment(appointment.createdAt)
                .locale('vi')
                .format('llll');

            const patientNameDisplay =
                bookingInfo.bookingFor === 'relative'
                    ? bookingInfo.patientName
                    : patientInfoForEmail.user.name;

            // Xây dựng nội dung thời gian hiển thị trong email
            // Ví dụ: 19:00 - 20:00 (nếu book 2 slot)
            let timeString = '';
            if (slotsToBook.length > 0) {
                const firstSlotStart = moment(slotsToBook[0].startTime).format('HH:mm');
                const lastSlotEnd = moment(slotsToBook[slotsToBook.length - 1].endTime).format('HH:mm DD/MM/YYYY');
                timeString = `${firstSlotStart} - ${lastSlotEnd}`;
            }

            // Gọi hàm gửi email
            // Lưu ý: target nên update thêm timeString để email rõ ràng hơn
            await sendAppontment(
                patientInfoForEmail.user.email,
                appointment.id,
                patientNameDisplay,
                type,
                `${target} (${timeString})`, // Thêm giờ vào tên dịch vụ trong mail
                appointmentCreatedTime,
                finalPrice,
                deposit,
                'pending'
            );

            return resolve({
                errCode: 0,
                enMessage: 'Create appointment successful',
                viMessage: 'Tạo lịch hẹn thành công'
            });

        } catch (e) {
            if (!trans.finished) await trans.rollback();
            // Log lỗi ra console để debug nếu cần
            console.error(e);
            return reject(e);
        }
    });
};

const updateAppointmentService = async (userId, appointmentId, data) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const findPatient = await db.User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: ['id']
                    }
                ],
                transaction: trans
            });

            if (!findPatient || !findPatient.patient) {
                await trans.rollback();
                return resolve({
                    errCode: 1,
                    errMessage: 'Patient not found or profile not created.'
                });
            }

            const patientId = findPatient.patient.id;

            const oldAppointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                lock: trans.LOCK.UPDATE,
                transaction: trans
            });

            if (!oldAppointment) {
                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'Appointment not found'
                });
            }

            if (oldAppointment.patientId !== patientId) {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errMessage: 'You are not the owner of this appointment'
                });
            }

            if (
                oldAppointment.status !== 'pending' &&
                oldAppointment.status !== 'deposited'
            ) {
                await trans.rollback();
                return resolve({
                    errCode: 4,
                    errMessage: 'You can not update this appointment'
                });
            }

            const newDoctorId = data.doctorId;
            const newSlotId = data.slotId;
            const newServiceId = data.serviceId;

            const isNewDoctorAppointment =
                newDoctorId && newSlotId && !newServiceId;
            const isNewServiceAppointment =
                newServiceId && !newDoctorId && !newSlotId;
            const isNewServiceWithDoctorAppointment =
                newServiceId && newDoctorId && !newSlotId;

            if (
                (!isNewDoctorAppointment &&
                    !isNewServiceAppointment &&
                    !isNewServiceWithDoctorAppointment) ||
                (newDoctorId && newSlotId && newServiceId)
            ) {
                await trans.rollback();
                return resolve({
                    errCode: 5,
                    errMessage: 'Invalid appointment type'
                });
            }

            let newFinalPrice = 0;
            let newDeposit = 0;
            let newType = '';
            let target = '';

            let finalDoctorId = newDoctorId;
            let finalSlotId = newSlotId;
            let finalServiceId = newServiceId;

            if (oldAppointment.slotId) {
                const oldSlot = await db.Slot.findOne({
                    where: { id: oldAppointment.slotId },
                    lock: trans.LOCK.UPDATE,
                    transaction: trans
                });

                if (oldSlot) {
                    oldSlot.capacity += 1;
                    oldSlot.status =
                        oldSlot.capacity >= 3 ? 'available' : 'booked';
                    await oldSlot.save({ transaction: trans });
                }
            }

            if (isNewDoctorAppointment) {
                const doctorInfo = await db.Doctor.findOne({
                    where: { id: finalDoctorId },
                    include: [
                        { model: db.User, as: 'user', attributes: ['name'] }
                    ]
                });

                if (!doctorInfo) {
                    await trans.rollback();
                    return resolve({
                        errCode: 6,
                        errMessage: 'Doctor not found'
                    });
                }

                newFinalPrice = doctorInfo.price;

                const currentSlot = await db.Slot.findOne({
                    where: { id: finalSlotId, doctorId: finalDoctorId },
                    lock: trans.LOCK.UPDATE,
                    transaction: trans
                });

                if (!currentSlot || currentSlot.capacity <= 0) {
                    await trans.rollback();
                    return resolve({
                        errCode: 7,
                        errMessage: 'New Slot not found or slot full'
                    });
                }

                currentSlot.capacity -= 1;
                currentSlot.status =
                    currentSlot.capacity <= 0 ? 'full' : 'booked';
                await currentSlot.save({ transaction: trans });

                finalServiceId = null;
                newType = 'doctor';
                target = `Bác sĩ ` + doctorInfo.user.name;
            } else if (
                isNewServiceAppointment ||
                isNewServiceWithDoctorAppointment
            ) {
                const serviceInfo = await db.Service.findOne({
                    where: { id: finalServiceId }
                });

                if (!serviceInfo) {
                    await trans.rollback();
                    return resolve({
                        errCode: 8,
                        errMessage: 'Service not found'
                    });
                }

                if (isNewServiceWithDoctorAppointment) {
                    const doctorInfo = await db.Doctor.findOne({
                        where: { id: finalDoctorId },
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name']
                            }
                        ]
                    });

                    if (!doctorInfo) {
                        await trans.rollback();
                        return resolve({
                            errCode: 9,
                            errMessage: 'Doctor not found for service'
                        });
                    }

                    let doctorPrice = Number(doctorInfo.price / 2);
                    let servicePrice = Number(serviceInfo.price);

                    newFinalPrice = doctorPrice + servicePrice;
                    target = `Dịch vụ ${serviceInfo.name} (Bác sĩ: ${
                        doctorInfo.user.name || finalDoctorId
                    })`;

                    finalSlotId = null;
                } else {
                    newFinalPrice = serviceInfo.price;
                    target = `Dịch vụ ${serviceInfo.name}`;
                    finalDoctorId = null;
                    finalSlotId = null;
                }

                newType = 'service';
            }

            newDeposit = newFinalPrice * 0.2;

            await db.Appointment.update(
                {
                    doctorId: finalDoctorId,
                    slotId: finalSlotId,
                    serviceId: finalServiceId,
                    status: 'pending',
                    deposit: newDeposit,
                    deposited: oldAppointment.deposited || 0,
                    type: newType,
                    finalPrice: newFinalPrice
                },
                { where: { id: appointmentId }, transaction: trans }
            );

            const updatedAppointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone']
                            }
                        ]
                    }
                ],
                transaction: trans
            });

            if (
                !updatedAppointment ||
                !updatedAppointment.patient ||
                !updatedAppointment.patient.user
            ) {
                await trans.rollback();
                return resolve({
                    errCode: 10,
                    errMessage: 'Patient or user not found after update'
                });
            }

            await trans.commit();

            const appointmentCreatedTime = moment(updatedAppointment.updatedAt)
                .locale('vi')
                .format('llll');

            await sendUpdateAppointment(
                updatedAppointment.patient.user.email,
                updatedAppointment.id,
                updatedAppointment.patient.user.name,
                updatedAppointment.type,
                target,
                appointmentCreatedTime,
                updatedAppointment.finalPrice,
                updatedAppointment.deposit,
                updatedAppointment.status
            );

            return resolve({
                errCode: 0,
                message: 'Update appointment successful'
            });
        } catch (e) {
            if (!trans.finished) await trans.rollback();
            return reject(e);
        }
    });
};

const deleteAppointmentService = async (patientId, appointmentId) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                lock: trans.LOCK.UPDATE,
                transaction: trans
            });

            if (!appointment) {
                await trans.rollback();
                return resolve({
                    errCode: 1,
                    errMessage: 'Appointment not found'
                });
            }

            if (appointment.patientId !== patientId) {
                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'You are not the owner of this appointment'
                });
            }

            if (appointment.status !== 'pending') {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errMessage: 'Cannot cancel this appointment'
                });
            }

            if (appointment.slotId) {
                const oldSlot = await db.Slot.findOne({
                    where: { id: appointment.slotId },
                    lock: trans.LOCK.UPDATE,
                    transaction: trans
                });

                if (oldSlot) {
                    oldSlot.capacity += 1;
                    if (oldSlot.capacity >= 3) {
                        oldSlot.status = 'available';
                    } else {
                        oldSlot.status = 'booked';
                    }
                    await oldSlot.save({ transaction: trans });
                }
            }

            await db.Appointment.update(
                { status: 'cancelled' },
                { where: { id: appointmentId }, transaction: trans }
            );

            await trans.commit();

            const patientInfo = await db.Patient.findOne({
                where: { userId: patientId },
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

            return resolve({
                errCode: 0,
                message: 'Cancel appointment successful'
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
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
    deleteAppointmentService
};
