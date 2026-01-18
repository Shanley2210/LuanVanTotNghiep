const db = require('../models');
const { VNPay, ProductCode } = require('vnpay');
const moment = require('moment');

const vnpay = new VNPay({
    tmnCode: process.env.VNP_TMNCODE,
    secureSecret: process.env.VNP_HASHSECRET,
    vnpayHost: 'https://sandbox.vnpayment.vn',
});

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
}

const createVNPayPaymentService = ({
    appointmentId,
    recordId,
    amount,
    description,
    ipAddr,
    locale,
}) => {
    try {
        const timestamp = moment().format('YYMMDDHHmmss');
        const txnRef = appointmentId
            ? `APPT_${appointmentId}_${timestamp}`
            : `RECORD_${recordId}_${timestamp}`;
        const paymentType = appointmentId ? 'deposit' : 'final';

        // 1. Xử lý IP: Fallback về 127.0.0.1 nếu không lấy được
        const secureIp = ipAddr && ipAddr !== '::1' ? ipAddr : '127.0.0.1';

        // 2. Xử lý Description: Bỏ dấu tiếng Việt để tránh lỗi checksum
        const secureInfo = removeVietnameseTones(
            description || 'Thanh toan don hang',
        );

        // 3. Xử lý Amount:
        // - VNPay yêu cầu đơn vị là VNĐ * 100.
        // - Ví dụ: 10.000 VNĐ -> gửi 1000000
        // - Đảm bảo là số nguyên (Math.floor)
        let vnpAmount = amount;
        // Nếu client gửi lên < 100 triệu, giả định client gửi VNĐ thường -> nhân 100
        // Nếu client đã nhân 100 rồi thì giữ nguyên. (Đây là logic an toàn)
        // LƯU Ý: VNPay Sandbox tối thiểu khoảng 5000-10000 VND.
        if (vnpAmount < 10000000) {
            vnpAmount = vnpAmount * 100;
        }

        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_TxnRef: txnRef,
            vnp_Amount: Math.floor(vnpAmount), // Bắt buộc là số nguyên
            vnp_OrderInfo: secureInfo,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: process.env.VNP_RETURNURL,
            vnp_IpAddr: secureIp,
            vnp_Locale: locale || 'vn',
            vnp_BankCode: 'NCB', // Cứng mã Bank test
            vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        });

        console.log('--- VNPAY DEBUG ---');
        console.log('TmnCode:', process.env.VNP_TMNCODE);
        console.log('TxnRef:', txnRef);
        console.log('Amount Raw:', amount, '-> Sent:', Math.floor(vnpAmount));
        console.log('IpAddr:', secureIp);
        console.log('Generated URL:', paymentUrl);
        console.log('-------------------');

        return {
            errCode: 0,
            errEnMessage: 'Create payment success',
            errViMessage: 'Tạo liên kết thanh toán thành công',
            paymentType,
            paymentUrl,
        };
    } catch (e) {
        throw e;
    }
};

const returnVNPayService = async (query) => {
    const trans = await db.sequelize.transaction();

    try {
        // Kiểm tra checksum
        const isValid = vnpay.verifyReturnUrl(query);

        if (!isValid) {
            await trans.rollback();
            return {
                errCode: 1,
                errEnMessage: 'Invalid VNPay signature',
                errViMessage: 'Chữ ký VNPay không hợp lệ',
            };
        }

        // Kiểm tra mã lỗi từ VNPay
        if (query.vnp_ResponseCode !== '00') {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'VNPay payment failed',
                errViMessage: 'Thanh toán VNPay không thành công',
            };
        }

        const txnRef = query.vnp_TxnRef;
        // Vì lúc gửi đi amount có thể đã nhân 100, lúc nhận về chia 100 để lưu DB
        const amount = Number(query.vnp_Amount) / 100;

        if (txnRef.startsWith('APPT_')) {
            const appointmentId = Number(txnRef.split('_')[1]);

            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                transaction: trans,
                lock: trans.LOCK.UPDATE,
            });

            if (!appointment) {
                await trans.rollback();
                return {
                    errCode: 3,
                    errEnMessage: 'Appointment not found',
                    errViMessage: 'Lịch hẹn không tồn tại',
                };
            }

            const currentDeposited = Number(appointment.deposited) || 0;
            const newDepositedAmount = amount + currentDeposited;

            await appointment.update(
                {
                    status: 'deposited',
                    deposited: newDepositedAmount,
                },
                { transaction: trans },
            );

            await db.Payment.create(
                {
                    appointmentId,
                    recordId: null,
                    type: 'deposit',
                    amount,
                    method: 'vnpay',
                    status: 'success',
                    txnRef,
                    returnData: query,
                },
                { transaction: trans },
            );
        }

        if (txnRef.startsWith('RECORD_')) {
            const recordId = Number(txnRef.split('_')[1]);

            const record = await db.Record.findOne({
                where: { id: recordId },
                transaction: trans,
                lock: trans.LOCK.UPDATE,
            });

            if (!record) {
                await trans.rollback();
                return {
                    errCode: 4,
                    errEnMessage: 'Record not found',
                    errViMessage: 'Hồ sơ khám không tồn tại',
                };
            }

            await db.Payment.create(
                {
                    appointmentId: null,
                    recordId,
                    type: 'final',
                    amount,
                    method: 'vnpay',
                    status: 'success',
                    txnRef,
                    returnData: query,
                },
                { transaction: trans },
            );

            await db.Appointment.update(
                {
                    status: 'check_out',
                },
                { where: { id: record.appointmentId }, transaction: trans },
            );
        }

        await trans.commit();

        return {
            errCode: 0,
            enMessage: 'Payment success',
            viMessage: 'Thanh toán thành công',
        };
    } catch (e) {
        await trans.rollback();
        throw e;
    }
};

const getPaymentByTxnRefService = async (txnRef) => {
    try {
        const payment = await db.Payment.findOne({
            where: { txnRef },
            include: [
                {
                    model: db.Appointment,
                    as: 'appointment',
                },
                {
                    model: db.Record,
                    as: 'record',
                },
            ],
        });

        if (!payment) {
            return {
                errCode: 2,
                errEnMessage: 'Payment not found',
                errViMessage: 'Không tìm thấy giao dịch',
            };
        }

        return {
            errCode: 0,
            enMessage: 'Get payment successful',
            viMessage: 'Lấy giao dịch thành công',
            data: payment,
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createVNPayPaymentService,
    returnVNPayService,
    getPaymentByTxnRefService,
};
