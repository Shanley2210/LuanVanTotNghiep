require('dotenv').config();

// Hàm gửi mail dùng Brevo API (HTTP) thay vì SMTP
const sendMail = async (to, subject, text, html) => {
    try {
        const url = 'https://api.brevo.com/v3/smtp/email';

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'api-key': process.env.MAIL_PASS, // Dùng API Key (xkeysib-...)
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: 'Hệ thống Đặt lịch',
                    email: process.env.MAIL_USER, // Email đã verify trong Brevo
                },
                to: [
                    {
                        email: to,
                    },
                ],
                subject: subject,
                htmlContent: html || text,
                textContent: text,
            }),
        };

        const response = await fetch(url, options);

        // Kiểm tra nếu API trả về lỗi
        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                'Brevo API Error Details:',
                JSON.stringify(errorData),
            );
            throw new Error(
                `Lỗi API Brevo: ${response.status} - ${errorData.message}`,
            );
        }

        const data = await response.json();
        console.log(
            `Email đã gửi thành công qua API. MessageId: ${data.messageId}`,
        );
        return data;
    } catch (error) {
        console.error('Lỗi gửi email:', error.message);
        throw error; // Ném lỗi để controller xử lý tiếp
    }
};

module.exports = { sendMail };
