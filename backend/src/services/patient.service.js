const { verify } = require('jsonwebtoken');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const moment = require('moment');
const { where } = require('sequelize');
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
                    errMessage: 'Patient already exists'
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
                message: 'Create profile patient successful',
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
                    errMessage: 'User not found'
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
                message: 'Update patient successful'
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

const createAppointmentService = async (
    userId,
    doctorId,
    slotId,
    serviceId
) => {
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

        const patientId = findPatient.patient.id;

        const isDoctorAppointment = doctorId && slotId;
        const isServiceAppointment = serviceId && !isDoctorAppointment;

        if (
            (!isDoctorAppointment && !isServiceAppointment) ||
            (doctorId && slotId && serviceId)
        ) {
            await trans.rollback();
            return { errCode: 1, errMessage: 'Invalid appointment type' };
        }

        let finalPrice = 0;
        let deposit = 0;
        let type = '';
        let target = '';
        let currentSlot = null;

        if (isDoctorAppointment) {
            const doctorInfo = await db.Doctor.findOne({
                where: { id: doctorId },
                include: [{ model: db.User, as: 'user', attributes: ['name'] }]
            });

            if (!doctorInfo) {
                await trans.rollback();
                return { errCode: 2, errMessage: 'Doctor not found' };
            }

            finalPrice = doctorInfo.price;

            currentSlot = await db.Slot.findOne({
                where: { id: slotId, doctorId: doctorId },
                lock: trans.LOCK.UPDATE,
                transaction: trans
            });

            if (!currentSlot || currentSlot.capacity <= 0) {
                await trans.rollback();
                return {
                    errCode: 3,
                    errMessage: 'Slot not found or slot full'
                };
            }

            currentSlot.capacity -= 1;
            if (currentSlot.capacity <= 0) {
                currentSlot.status = 'full';
            } else {
                currentSlot.status = 'booked';
            }
            await currentSlot.save({ transaction: trans });

            serviceId = null;
            type = 'doctor';
            target = `Bác sĩ ` + doctorInfo.user.name;
        } else if (isServiceAppointment) {
            const serviceInfo = await db.Service.findOne({
                where: { id: serviceId }
            });

            if (!serviceInfo) {
                await trans.rollback();
                return { errCode: 4, errMessage: 'Service not found' };
            }

            finalPrice = serviceInfo.price;
            doctorId = null;
            slotId = null;
            type = 'service';
            target = `Dịch vụ ` + serviceInfo.name;
        }

        deposit = finalPrice * 0.2;

        const patientInfo = await db.Patient.findOne({
            where: { id: patientId },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'email', 'phone']
                }
            ]
        });

        if (!patientInfo) {
            await trans.rollback();
            return {
                errCode: 5,
                errMessage: 'Patient not found or profile not created.'
            };
        }

        const appointment = await db.Appointment.create(
            {
                doctorId: doctorId,
                patientId: patientId,
                slotId: slotId,
                serviceId: serviceId,
                status: 'pending',
                deposit: deposit,
                deposited: 0,
                type: type,
                finalPrice: finalPrice
            },
            { transaction: trans }
        );

        await trans.commit();

        const appointmentCreatedTime = moment(appointment.createdAt)
            .locale('vi')
            .format('llll');
        await sendAppontment(
            patientInfo.user.email,
            appointment.id,
            patientInfo.user.name,
            type,
            target,
            appointmentCreatedTime,
            finalPrice,
            deposit,
            'pending'
        );

        return {
            errCode: 0,
            message: 'Create appointment successful'
        };
    } catch (e) {
        if (trans) await trans.rollback();
        console.error('Error in createAppointmentService:', e);
        return reject(e);
    }
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

            if (oldAppointment.status !== 'pending') {
                await trans.rollback();
                return resolve({
                    errCode: 4,
                    errMessage: 'You can not update this appointment'
                });
            }

            const isNewDoctorAppointment = data.doctorId && data.slotId;
            const isNewServiceAppointment =
                data.serviceId && !isNewDoctorAppointment;

            if (
                (!isNewDoctorAppointment && !isNewServiceAppointment) ||
                (data.doctorId && data.slotId && data.serviceId)
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

            if (isNewDoctorAppointment) {
                const doctorInfo = await db.Doctor.findOne({
                    where: { id: data.doctorId },
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
                target = 'Bác sĩ ' + doctorInfo.user.name;

                const isSlotChanged = oldAppointment.slotId !== data.slotId;

                if (oldAppointment.slotId && isSlotChanged) {
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

                if (isSlotChanged) {
                    const slotCheck = await db.Slot.findOne({
                        where: { id: data.slotId },
                        lock: trans.LOCK.UPDATE,
                        transaction: trans
                    });

                    if (!slotCheck || slotCheck.capacity <= 0) {
                        await trans.rollback();
                        return resolve({
                            errCode: 7,
                            errMessage: 'Slot not found or slot full'
                        });
                    }

                    slotCheck.capacity -= 1;
                    slotCheck.status =
                        slotCheck.capacity <= 0 ? 'full' : 'booked';
                    await slotCheck.save({ transaction: trans });
                }

                newType = 'doctor';
                data.serviceId = null;
            } else if (isNewServiceAppointment) {
                const serviceInfo = await db.Service.findOne({
                    where: { id: data.serviceId }
                });

                if (!serviceInfo) {
                    await trans.rollback();
                    return resolve({
                        errCode: 8,
                        errMessage: 'Service not found'
                    });
                }

                newFinalPrice = serviceInfo.price;
                target = 'Dịch vụ ' + serviceInfo.name;

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

                data.doctorId = null;
                data.slotId = null;
                newType = 'service';
            }

            newDeposit = newFinalPrice * 0.2;

            await db.Appointment.update(
                {
                    doctorId: data.doctorId,
                    slotId: data.slotId,
                    serviceId: data.serviceId,
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
                    errCode: 9,
                    errMessage: 'Patient or user not found'
                });
            }

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

            await trans.commit();

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
