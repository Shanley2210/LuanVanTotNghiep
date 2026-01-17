const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    // --- THÊM PHẦN NÀY ---
    family: 4, // Ép buộc dùng IPv4
    logger: true, // Bật log để xem chi tiết lỗi trên Railway logs
    debug: true, // Bật chế độ debug
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
});

/**
 * Gửi email sử dụng transporter đã cấu hình
 * @param {string} to - Email người nhận
 * @param {string} subject - Chủ đề email
 * @param {string} text - Nội dung (dạng text)
 * @param {string} [html] - Nội dung (dạng HTML, tùy chọn)
 */

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Đặt lịch khám bệnh" <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(
            `Email đã gửi thành công đến: ${to}. Message ID: ${info.messageId}`,
        );
        return info;
    } catch (error) {
        console.error(`Lỗi khi gửi email đến ${to}:`, error);
        throw error;
    }
};

module.exports = { sendMail };
