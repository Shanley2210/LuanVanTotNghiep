const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 2525, // ĐỔI TỪ 587 SANG 2525
    secure: false, // Port 2525 vẫn dùng secure: false
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    // Thêm log để soi lỗi nếu vẫn bị treo
    logger: true,
    debug: true,
});

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Hệ thống Đặt lịch" <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html || text,
        };

        // Thêm timeout cứng ở mức code (10 giây) để không đợi mãi
        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) reject(err);
                else resolve(info);
            });
            // Hủy nếu quá 10s
            setTimeout(
                () => reject(new Error('Timeout: Email server không phản hồi')),
                100000,
            );
        });

        console.log(`Email sent via Brevo: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Brevo Send Error:`, error);
        throw error;
    }
};

module.exports = { sendMail };
