const cron = require('node-cron');
const moment = require('moment');
require('moment-timezone');
const { Op } = require('sequelize');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');

const runReminderJob = () => {
    cron.schedule('*/10 * * * *', async () => {
        try {
            const now = moment().tz('Asia/Ho_Chi_Minh');
            console.log(
                `[CronJob Reminder] Quét lúc: ${now.format('HH:mm:ss DD/MM/YYYY')}`,
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
                            startTime: { [Op.gt]: now.toDate() },
                        },
                    },
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        include: [
                            {
                                model: db.User,
                                as: 'user',
                                attributes: ['name'],
                            },
                        ],
                    },
                    {
                        model: db.User,
                        as: 'patient',
                        attributes: ['name', 'email'],
                    },
                ],
            });

            if (appointments.length === 0) return;

            for (const appt of appointments) {
                const patientEmail = appt.patient?.email;
                const patientName = appt.patientName;

                if (!patientEmail) {
                    console.log(
                        `Bỏ qua Appt ID ${appt.id}: Không tìm thấy email bệnh nhân.`,
                    );
                    continue;
                }

                const startTime = moment(appt.slot.startTime).tz(
                    'Asia/Ho_Chi_Minh',
                );
                const diffHours = startTime.diff(now, 'hours', true);

                console.log(
                    `Appt ${appt.id} - Time: ${startTime.format('HH:mm')} - Còn: ${diffHours.toFixed(2)}h`,
                );

                const timeString = startTime.format('HH:mm');
                const dateString = startTime.format('DD/MM/YYYY');
                const doctorName = appt.doctor?.user?.name || 'Bác sĩ';

                if (!appt.isRemind24h && diffHours >= 23 && diffHours <= 25) {
                    await sendMail(
                        patientEmail,
                        `[Nhắc hẹn] Lịch khám ngày mai lúc ${timeString}`,
                        `Bạn có lịch khám vào ngày mai lúc ${timeString}`,
                        `<div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
                            <h3 style="color:#0078d7;margin-bottom:15px;">
                                Kính gửi ${patientName},
                            </h3>

                            <p style="margin-bottom:10px;">
                                Hệ thống xin nhắc bạn có lịch khám sắp tới với các thông tin sau:
                            </p>

                            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                                <li style="margin-bottom:8px;">
                                    <strong>Thời gian:</strong>
                                    <span style="color:#0078d7;font-weight:bold;">
                                        ${timeString} ngày ${dateString}
                                    </span>
                                </li>
                                <li style="margin-bottom:8px;">
                                    <strong>Bác sĩ:</strong> ${doctorName}
                                </li>
                            </ul>

                            <p style="margin-bottom:10px;">
                                Vui lòng đến đúng giờ để đảm bảo quá trình khám diễn ra thuận lợi.
                            </p>

                            <p style="margin-bottom:5px;">Trân trọng,</p>
                            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
                        </div>`,
                    );
                    appt.isRemind24h = true;
                    await appt.save();
                    console.log(`-> Sent 24h reminder for Appt ${appt.id}`);
                }

                if (!appt.isRemind2h && diffHours >= 1.5 && diffHours <= 2.5) {
                    await sendMail(
                        patientEmail,
                        `[Gấp] Lịch khám sắp diễn ra lúc ${timeString}`,
                        `Lịch khám của bạn sắp diễn ra trong 2 giờ nữa`,
                        `<div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
                            <h3 style="color:#0078d7;margin-bottom:15px;">
                                Kính gửi ${patientName},
                            </h3>

                            <p style="margin-bottom:10px;">
                                Chỉ còn khoảng <strong>2 giờ</strong> nữa là đến lịch khám của bạn với thông tin sau:
                            </p>

                            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                                <li style="margin-bottom:8px;">
                                    <strong>Thời gian:</strong>
                                    <span style="color:#0078d7;font-weight:bold;">
                                        ${timeString} hôm nay
                                    </span>
                                </li>
                                <li style="margin-bottom:8px;">
                                    <strong>Bác sĩ:</strong> ${doctorName}
                                </li>
                            </ul>

                            <p style="margin-bottom:10px;">
                                Vui lòng chuẩn bị di chuyển để đến đúng giờ.
                            </p>

                            <p style="margin-bottom:5px;">Trân trọng,</p>
                            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
                        </div>`,
                    );
                    appt.isRemind2h = true;
                    await appt.save();
                    console.log(`-> Sent 2h reminder for Appt ${appt.id}`);
                }
            }
        } catch (error) {
            console.error('[CronJob Reminder Error]:', error);
        }
    });
};

const runAutoCancelJob = () => {
    cron.schedule('*/10 * * * *', async () => {
        try {
            const now = moment().tz('Asia/Ho_Chi_Minh');

            const twoHoursAgo = now.clone().subtract(2, 'hours').toDate();

            console.log(
                `[CronJob AutoCancel] Quét lúc ${now.format('HH:mm:ss')} - Hủy đơn cũ hơn: ${moment(twoHoursAgo).format('HH:mm:ss')}`,
            );

            const appointments = await db.Appointment.findAll({
                where: {
                    status: 'pending',
                    updatedAt: { [Op.lte]: twoHoursAgo },
                },
                include: [
                    {
                        model: db.User,
                        as: 'patient',
                        attributes: ['name', 'email'],
                    },
                    {
                        model: db.Slot,
                        as: 'slot',
                    },
                ],
            });

            if (appointments.length === 0) return;

            for (const appt of appointments) {
                appt.status = 'cancelled';
                await appt.save();

                const patientEmail = appt.patient?.email;
                const patientName = appt.patient?.name || 'Khách hàng';

                const dateBooked = appt.slot?.startTime
                    ? moment(appt.slot.startTime)
                          .tz('Asia/Ho_Chi_Minh')
                          .format('HH:mm DD/MM/YYYY')
                    : 'Không rõ';

                if (patientEmail) {
                    await sendMail(
                        patientEmail,
                        `[Thông báo hủy] Lịch khám của bạn đã bị hủy tự động`,
                        `Lịch khám ${dateBooked} đã bị hủy do quá hạn xác nhận.`,
                        `<div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #d0d0d0;padding:25px 30px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;line-height:1.6;">
                            <h3 style="color:#0078d7;margin-bottom:15px;">
                                Kính gửi ${patientName},
                            </h3>

                            <p style="margin-bottom:10px;">
                                Hệ thống đã <strong>tự động hủy lịch khám</strong> của bạn do quá thời gian chờ cho phép (2 tiếng).
                            </p>

                            <ul style="background:#f5f5f5;padding:15px 20px;list-style-type:none;border:1px solid #ccc;margin:15px 0;">
                                <li style="margin-bottom:8px;">
                                    <strong>Mã lịch hẹn:</strong>
                                    <span style="color:#0078d7;font-weight:bold;">#${appt.id}</span>
                                </li>
                                <li style="margin-bottom:8px;">
                                    <strong>Thời gian dự kiến:</strong> ${dateBooked}
                                </li>
                            </ul>

                            <p style="margin-bottom:10px;">
                                Vui lòng thực hiện đặt lịch lại nếu vẫn có nhu cầu khám.
                            </p>

                            <p style="margin-bottom:5px;">Trân trọng,</p>
                            <p style="font-style:italic;margin:0;">Hệ thống Đặt lịch</p>
                        </div>
                        `,
                    );
                }
                console.log(`-> Auto Cancelled Appt ID: ${appt.id}`);
            }
        } catch (error) {
            console.error('[CronJob AutoCancel Error]:', error);
        }
    });
};

module.exports = { runReminderJob, runAutoCancelJob };
