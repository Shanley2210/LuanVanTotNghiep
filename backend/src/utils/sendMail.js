const nodemailer = require('nodemailer');
require('dotenv').config();

// CẤU HÌNH OUTLOOK (Dùng phương thức ciphers SSLv3 để tương thích tốt nhất)
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // Outlook yêu cầu false cho port 587
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false, // Bỏ qua lỗi xác thực chứng chỉ nếu IP bị blacklist nhẹ
    },
});

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Hệ thống Đặt lịch khám bệnh" <${process.env.MAIL_USER}>`, // Bắt buộc trùng với user auth
            to: to,
            subject: subject,
            text: text,
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Send Error:`, error);
        throw error;
    }
};

module.exports = { sendMail };
