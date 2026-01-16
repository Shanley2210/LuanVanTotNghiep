const cron = require('node-cron');
const moment = require('moment');
const { Op } = require('sequelize');
const db = require('../models');

const runReminderJob = () => {
    cron.schedule('*/10 * * * *', async () => {
        try {
            const now = moment();
            console.log(
                `[CronJob] Bắt đầu quét nhắc hẹn lúc: ${now.format(
                    'YYYY-MM-DD HH:mm:ss',
                )}`,
            );

            const appointments = await db.Appointment.findAll({
                where: {
                    status: 'confirmed',
                    [Op.or]: [{ isRemind24h: false }, { isRemind2h: false }],
                },
                include: [
                    {
                        model: db.Slot,
                        as: 'slot',
                        required: true,
                        where: {
                            startTime: {
                                [Op.gt]: now.toDate(),
                            },
                        },
                    },
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        attributes: ['id', 'image', 'price'],
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['id', 'name', 'email', 'phone'],
                            },
                        ],
                    },
                ],
            });

            if (appointments.length === 0) {
                return;
            }

            for (const appt of appointments) {
                const startTime = moment(appt.slot.startTime);

                const diffHours = startTime.diff(now, 'hours', true);

                const timeString = startTime.format('HH:mm');
                const dateString = startTime.format('DD/MM/YYYY');
                const doctorName = appt.doctor
                    ? `${appt.doctor.lastName} ${appt.doctor.firstName}`.trim()
                    : 'Bác sĩ';

                if (!appt.isRemind24h && diffHours >= 23 && diffHours <= 25) {
                    const subject = `[Nhắc hẹn] Lịch khám ngày mai lúc ${timeString}`;
                    const htmlContent = `
                        <div>
                            <h3>Xin chào ${appt.patientName},</h3>
                            <p>Hệ thống xin nhắc bạn có lịch khám bệnh vào ngày mai.</p>
                            <ul>
                                <li><strong>Thời gian:</strong> ${timeString} ngày ${dateString}</li>
                                <li><strong>Bác sĩ:</strong> ${doctorName}</li>
                                <li><strong>Địa điểm:</strong> Phòng khám của chúng tôi</li>
                            </ul>
                            <p>Vui lòng đến đúng giờ để được phục vụ tốt nhất.</p>
                            <p>Trân trọng.</p>
                        </div>
                    `;

                    await sendMail(
                        appt.patientEmail,
                        subject,
                        'Bạn có lịch khám vào ngày mai',
                        htmlContent,
                    );

                    appt.isRemind24h = true;
                    await appt.save();
                    console.log(
                        `-> Đã gửi reminder 24h cho Appointment ID: ${appt.id}`,
                    );
                }

                if (!appt.isRemind2h && diffHours >= 1.5 && diffHours <= 2.5) {
                    const subject = `[Gấp] Lịch khám của bạn sắp diễn ra lúc ${timeString}`;
                    const htmlContent = `
                        <h3>Xin chào ${appt.patientName},</h3>
                        <p>Chỉ còn khoảng 2 giờ nữa là đến lịch khám của bạn.</p>
                        <ul>
                            <li><strong>Thời gian:</strong> ${timeString} hôm nay (${dateString})</li>
                            <li><strong>Bác sĩ:</strong> ${doctorName}</li>
                        </ul>
                        <p>Vui lòng sắp xếp thời gian di chuyển.</p>
                        <p>Trân trọng.</p>
                    `;

                    await sendMail(
                        appt.patientEmail,
                        subject,
                        'Lịch khám của bạn sắp diễn ra',
                        htmlContent,
                    );

                    appt.isRemind2h = true;
                    await appt.save();
                    console.log(
                        `-> Đã gửi reminder 2h cho Appointment ID: ${appt.id}`,
                    );
                }
            }
        } catch (error) {
            console.error('[CronJob Error] Lỗi khi chạy job nhắc hẹn:', error);
        }
    });
};

const runAutoCancelJob = () => {
    cron.schedule('*/10 * * * *', async () => {
        try {
            const now = moment();
            const twoHoursAgo = moment().subtract(2, 'hours').toDate();

            console.log(
                `[CronJob] Quét lịch Pending quá hạn (UpdatedAt <= ${moment(
                    twoHoursAgo,
                ).format('HH:mm:ss')})`,
            );

            const appointments = await db.Appointment.findAll({
                where: {
                    status: 'pending',
                    updatedAt: {
                        [Op.lte]: twoHoursAgo,
                    },
                },
            });

            if (appointments.length === 0) {
                return;
            }

            for (const appt of appointments) {
                appt.status = 'cancelled';
                await appt.save();

                console.log(
                    `-> Đã tự động hủy Appointment ID: ${appt.id} (Pending quá 2h)`,
                );
            }
        } catch (error) {
            console.error('[CronJob Error] Lỗi khi hủy lịch pending:', error);
        }
    });
};

module.exports = { runReminderJob, runAutoCancelJob };
