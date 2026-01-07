const db = require('../models');
const { VNPay, ProductCode } = require('vnpay');
const moment = require('moment');

const vnpay = new VNPay({
    tmnCode: process.env.VNP_TMNCODE,
    secureSecret: process.env.VNP_HASHSECRET,
    vnpayHost: 'https://sandbox.vnpayment.vn'
});

const createVNPayPaymentService = ({
    appointmentId,
    recordId,
    amount,
    description,
    ipAddr,
    locale
}) => {
    try {
        if (
            !process.env.VNP_TMNCODE ||
            !process.env.VNP_HASHSECRET ||
            !process.env.VNP_RETURNURL
        ) {
            return {
                errCode: 3,
                errEnMessage: 'VNPay configuration invalid',
                errViMessage: 'Cấu hình VNPay không hợp lệ'
            };
        }

        const txnRef = appointmentId
            ? `APPT_${appointmentId}`
            : `RECORD_${recordId}`;

        const paymentType = appointmentId ? 'deposit' : 'final';

        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_TxnRef: txnRef,
            vnp_Amount: amount,
            vnp_OrderInfo: description,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: process.env.VNP_RETURNURL,
            vnp_IpAddr: ipAddr,
            vnp_Locale: locale,
            vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
            vnp_ExpireDate: moment().add(1, 'hour').format('YYYYMMDDHHmmss')
        });

        return {
            errCode: 0,
            errEnMessage: 'Create payment success',
            errViMessage: 'Tạo liên kết thanh toán thành công',
            paymentType,
            paymentUrl
        };
    } catch (e) {
        throw e;
    }
};

const returnVNPayService = async (query) => {
    const trans = await db.sequelize.transaction();

    try {
        const isValid = vnpay.verifyReturnUrl(query);

        if (!isValid) {
            await trans.rollback();
            return {
                errCode: 1,
                errEnMessage: 'Invalid VNPay signature',
                errViMessage: 'Chữ ký VNPay không hợp lệ'
            };
        }

        if (query.vnp_ResponseCode !== '00') {
            await trans.rollback();
            return {
                errCode: 2,
                errEnMessage: 'VNPay payment failed',
                errViMessage: 'Thanh toán VNPay không thành công'
            };
        }

        const txnRef = query.vnp_TxnRef;
        const amount = Number(query.vnp_Amount) / 100;

        if (txnRef.startsWith('APPT_')) {
            const appointmentId = Number(txnRef.split('_')[1]);

            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId },
                transaction: trans,
                lock: trans.LOCK.UPDATE
            });

            if (!appointment) {
                await trans.rollback();
                return {
                    errCode: 3,
                    errEnMessage: 'Appointment not found',
                    errViMessage: 'Lịch hẹn không tồn tại'
                };
            }

            await appointment.update(
                {
                    status: 'deposited',
                    deposited: amount
                },
                { transaction: trans }
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
                    returnData: query
                },
                { transaction: trans }
            );
        }

        if (txnRef.startsWith('RECORD_')) {
            const recordId = Number(txnRef.split('_')[1]);

            const record = await db.Record.findOne({
                where: { id: recordId },
                transaction: trans,
                lock: trans.LOCK.UPDATE
            });

            if (!record) {
                await trans.rollback();
                return {
                    errCode: 4,
                    errEnMessage: 'Record not found',
                    errViMessage: 'Hồ sơ khám không tồn tại'
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
                    returnData: query
                },
                { transaction: trans }
            );

            await db.Appointment.update(
                {
                    status: 'check_out'
                },
                { where: { id: record.appointmentId }, transaction: trans }
            );
        }

        await trans.commit();

        return {
            errCode: 0,
            enMessage: 'Payment success',
            viMessage: 'Thanh toán thành công'
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
                    as: 'appointment'
                },
                {
                    model: db.Record,
                    as: 'record'
                }
            ]
        });

        if (!payment) {
            return {
                errCode: 2,
                errEnMessage: 'Payment not found',
                errViMessage: 'Không tìm thấy giao dịch'
            };
        }

        return {
            errCode: 0,
            enMessage: 'Get payment successful',
            viMessage: 'Lấy giao dịch thành công',
            data: payment
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createVNPayPaymentService,
    returnVNPayService,
    getPaymentByTxnRefService
};
