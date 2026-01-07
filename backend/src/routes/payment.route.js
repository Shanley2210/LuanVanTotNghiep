const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

router.post(
    '/vnpay/create-payment',
    paymentController.createVNPayPaymentController
);

router.get('/vnpay/return', paymentController.retrunVNPayController);

router.get('/vnpay/:txnRef', paymentController.getPaymentByTxnRefController);

module.exports = router;
