const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.registerController);
router.post('/verify-email', authController.verifyEmailController);
router.post('/resend-otp', authController.resendOtpController);

router.post('/login', authController.loginController);
router.post('/logout', authController.logoutController);

router.post(
    '/change-password',
    authMiddleware.verifyToken,
    authController.changePasswordController
);
router.post('/forgot-password', authController.forgotPasswordController);
router.post('/reset-password', authController.resetPasswordController);

router.post('/refresh-token', authController.refreshTokenController);

module.exports = router;
