const paymentService = require('../services/payment.service');

const createVNPayPaymentController = async (req, res) => {
    try {
        const {
            appointmentId,
            recordId,
            amount,
            description,
            locale = 'vn'
        } = req.body;

        if ((!appointmentId && !recordId) || (appointmentId && recordId)) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Invalid payment target',
                errViMessage: 'Phải chọn hoặc lịch hẹn hoặc hồ sơ khám'
            });
        }

        if (!amount || !description) {
            return res.status(200).json({
                errCode: 2,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await paymentService.createVNPayPaymentService({
            appointmentId,
            recordId,
            amount,
            description,
            ipAddr: req.ip,
            locale
        });

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errEnMessage: 'Server error',
            errViMessage: 'Lỗi hệ thống'
        });
    }
};

const retrunVNPayController = async (req, res) => {
    try {
        const response = await paymentService.returnVNPayService(req.query);

        if (response.errCode === 0) {
            return res.redirect(
                process.env.FRONT_URL +
                    `/payment-return?status=success&txnRef=${req.query.vnp_TxnRef}`
            );
        }

        return res.redirect(
            process.env.FRONT_URL + `/payment-return?status=failed`
        );
    } catch (e) {
        return res.redirect(
            process.env.FRONT_URL + `/payment-return?status=error`
        );
    }
};

const getPaymentByTxnRefController = async (req, res) => {
    try {
        const txnRef = req.params.txnRef;

        if (!txnRef) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await paymentService.getPaymentByTxnRefService(txnRef);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getPaymentByTxnRefController:', e);
        return res.status(500).json({
            errCode: -1,
            errEnMessage: 'Server error',
            errViMessage: 'Lỗi hệ thống'
        });
    }
};

module.exports = {
    createVNPayPaymentController,
    retrunVNPayController,
    getPaymentByTxnRefController
};
