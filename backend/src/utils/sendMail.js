const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            // QUAN TRỌNG: Email 'from' PHẢI LÀ email bạn dùng đăng nhập Brevo
            // Hoặc email đã được Verify trong mục Senders của Brevo
            from: `"Hệ thống Đặt lịch khám bệnh" <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent via Brevo: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Brevo Send Error:`, error);
        throw error;
    }
};

module.exports = { sendMail };
