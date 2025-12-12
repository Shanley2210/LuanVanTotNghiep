const { where, Op } = require('sequelize');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');

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
                    [Op.between]: [startOfDay, endOfDay]
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
                                attributes: ['name', 'email', 'phone']
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
                        attributes: ['id', 'gender', 'dob', 'address'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name', 'email', 'phone']
                            }
                        ]
                    },
                    {
                        model: db.Service,
                        as: 'service',
                        attributes: ['name', 'price', 'durationMinutes']
                    },
                    {
                        model: db.Slot,
                        as: 'slot',
                        attributes: ['startTime', 'endTime', 'status'],
                        where: slotCondition,
                        required: !!date
                    },
                    {
                        model: db.Queue,
                        as: 'queue',
                        attributes: ['id', 'number', 'status']
                    }
                ],
                raw: false,
                nest: true
            });

            resolve({
                errCode: 0,
                message: 'Get new appointments successful',
                data: rows,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    limit: limit
                }
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
                                attributes: ['email', 'name']
                            }
                        ]
                    }
                ]
            });

            if (!appointment) {
                return resolve({
                    errCode: 1,
                    errEnMessage: 'Appointment not found',
                    errViMessage: 'Lịch hẹn không tồn tại'
                });
            }

            if (appointment.status !== 'deposited') {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Appointment status is not deposited',
                    errViMessage: 'Trạng thái lịch hẹn không hợp lệ'
                });
            }

            await appointment.update({ status: 'confirmed' });

            sendConfirmAppointment(
                appointment.patient.user.email,
                appointment.id,
                appointment.patient.user.name
            );

            return resolve({
                errCode: 0,
                enMessage: 'Confirm appointment successful',
                viMessage: 'Xác nhận lịch hẹn thành công'
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
                    attributes: ['id']
                }
            ],
            transaction: t
        });

        if (!user || !user.receptionist) {
            await t.rollback();
            return {
                errCode: 3,
                errEnMessage: 'Receptionist not found or invalid user',
                errViMessage: 'Người dùng không phải là lễ tân'
            };
        }

        const receptionistId = user.receptionist.id;

        const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            transaction: t
        });

        if (!appointment) {
            await t.rollback();
            return {
                errCode: 2,
                errEnMessage: 'Appointment not found',
                errViMessage: 'Lịch hẹn không tồn tại'
            };
        }

        if (appointment.status !== 'confirmed') {
            await t.rollback();
            return {
                errCode: 4,
                errEnMessage: 'Appointment status is not confirmed',
                errViMessage: 'Lịch hẹn chưa xác nhận hoặc đã check-in rồi'
            };
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const currentQueueCount = await db.Queue.count({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            transaction: t
        });

        const nextQueueNumber = currentQueueCount + 1;

        const newQueue = await db.Queue.create(
            {
                receptionistId: receptionistId,
                number: nextQueueNumber,
                status: 'waiting'
            },
            { transaction: t }
        );

        await appointment.update(
            {
                status: 'checked_in',
                queueId: newQueue.id
            },
            { transaction: t }
        );

        await t.commit();

        return {
            errCode: 0,
            enMessage: 'Check-in successful',
            viMessage: 'Check-in thành công'
        };
    } catch (e) {
        await t.rollback();
        throw e;
    }
};

module.exports = {
    getNewAppointmentsService,
    confirmAppointmentService,
    checkInService
};
