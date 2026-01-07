const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const { sendMail } = require('../utils/sendMail');
const { generateOTP } = require('../utils/generateOTP');
const { where, Op } = require('sequelize');
require('dotenv').config();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

const sendOtpEmail = async (email, otp) => {
    const subject = 'Mã OTP xác thực ';
    const text = `Mã OTP của bạn là: ${otp}. Mã này sẽ hết hạn sau 3 phút.`; //
    const html = `
        <div style="font-family: Helvetica, Arial, sans-serif; background-color: #eef1f5; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #dcdcdc;">
                <tr>
                    <td style="padding: 30px 40px; border-bottom: 4px solid #0056b3;">
                        <h2 style="margin: 0; color: #0056b3; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">Mã Xác Thực</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px;">
                        <p style="margin-top: 0; font-size: 16px; color: #333333;">Xin chào,</p>
                        <p style="font-size: 16px; color: #333333; line-height: 1.5;">Đây là mã xác thực OTP dùng một lần của bạn:</p>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                            <tr>
                                <td align="center">
                                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #333333; border: 2px solid #e0e0e0; padding: 12px 48px; display: inline-block; letter-spacing: 5px;">${otp}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <p style="font-size: 14px; color: #666666;">Vui lòng không chia sẻ mã này. Mã sẽ hết hạn sau <strong>03 phút</strong>.</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #f4f4f4; padding: 20px 40px; text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #999999; font-style: italic;">Được gửi tự động từ Hệ thống Đặt lịch</p>
                    </td>
                </tr>
            </table>
        </div>
    `;

    await sendMail(email, subject, text, html);
};

const registerService = (name, email, phone, password, confirmPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (password !== confirmPassword) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Password and confirm password do not match',
                    errViMessage: 'Mật khẩu và xác nhận mật khẩu không khớp'
                });
            }

            const existingVerifiedUser = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { phone: phone }],
                    verify: true
                }
            });

            if (existingVerifiedUser) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Email or phone number already in use',
                    errViMessage: 'Email hoặc số điện thoại đã được sử dụng'
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 3 * 60 * 1000);

            const user = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { phone: phone }],
                    verify: false
                }
            });

            if (user) {
                user.name = name;
                user.email = email;
                user.phone = phone;
                user.password = hashPassword;
                user.otp = otp;
                user.otpExpires = otpExpiry;
                await user.save();
            } else {
                const newUser = await db.User.create({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                    otp: otp,
                    otpExpires: otpExpiry,
                    verify: false
                });

                const defauRole = await db.Role.findOne({
                    where: { name: 'Patient' }
                });

                if (defauRole) {
                    await db.UserRole.create({
                        userId: newUser.id,
                        roleId: defauRole.id
                    });
                }
            }

            await sendOtpEmail(email, otp);

            return resolve({
                errCode: 0,
                enMessage:
                    'Registration successful. Please check your email for OTP.',
                viMessage:
                    'Đăng ký thành công. Vui lòng kiểm tra email của bạn để nhận OTP.'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const verifyEmailService = (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email: email } });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'User not found',
                    errViMessage: 'Người dùng không tồn tại'
                });
            }

            if (user.verify) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Email is already verified',
                    errViMessage: 'Email đã được xác thực'
                });
            }

            if (user.otp !== otp || user.otpExpires < new Date()) {
                return resolve({
                    errCode: 4,
                    errEnMessage: 'OTP is invalid or has expired.',
                    errViMessage: 'Mã OTP không hợp lệ hoặc đã hết hạn.'
                });
            }

            user.verify = true;
            user.otp = null;
            user.otpExpires = null;

            const tokens = generateTokens(user);
            user.refreshToken = tokens.refreshToken;

            await user.save();
            return resolve({
                errCode: 0,
                enMessage: 'Email verified successfully',
                viMessage: 'Email đã được xác thực thành công',
                tokens: tokens
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const resendOtpService = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email: email } });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'User not found',
                    errViMessage: 'Người dùng không tồn tại'
                });
            }

            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 3 * 60 * 1000);

            user.otp = otp;
            user.otpExpires = otpExpiry;
            await user.save();

            await sendOtpEmail(email, otp);

            return resolve({
                errCode: 0,
                enMessage: 'OTP resent successfully. Please check your email.',
                viMessage:
                    'Mã OTP đã được gửi lại thành công. Vui lòng kiểm tra email của bạn.'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const loginService = (emailOrPhone, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
                    verify: true
                },
                include: [
                    {
                        model: db.Role,
                        as: 'roles',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Incorrect email/phone or password'
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Incorrect email/phone or password'
                });
            }

            const userData = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.roles[0]?.id
            };

            const tokens = generateTokens(user);
            user.refreshToken = tokens.refreshToken;
            await user.save();

            return resolve({
                errCode: 0,
                message: 'Login successful',
                tokens: tokens,
                user: userData
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const logoutService = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { refreshToken: refreshToken }
            });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            user.refreshToken = null;
            await user.save();

            return resolve({
                errCode: 0,
                message: 'Logout successful'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const changePasswordService = async (
    userId,
    currentPassword,
    newPassword,
    confirmNewPassword
) => {
    try {
        if (!newPassword || newPassword.length < 6) {
            return {
                errCode: 2,
                errEnMessage: 'Password must be at least 6 characters',
                errViMessage: 'Mật khẩu phải có ít nhất 6 ký tự'
            };
        }

        if (newPassword !== confirmNewPassword) {
            return {
                errCode: 3,
                errEnMessage: 'New password and confirm password do not match',
                errViMessage: 'Mật khẩu mới và xác nhận mật khẩu không khớp'
            };
        }

        const user = await db.User.findOne({ where: { id: userId } });

        if (!user) {
            return {
                errCode: 4,
                errEnMessage: 'User not found',
                errViMessage: 'Người dùng không tồn tại'
            };
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            return {
                errCode: 5,
                errEnMessage: 'Current password is incorrect',
                errViMessage: 'Mật khẩu hiện tại không đúng'
            };
        }

        const isSameAsCurrent = await bcrypt.compare(
            newPassword,
            user.password
        );
        if (isSameAsCurrent) {
            return {
                errCode: 6,
                errEnMessage:
                    'New password cannot be the same as the current password',
                errViMessage:
                    'Mật khẩu mới không được trùng với mật khẩu hiện tại'
            };
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        return {
            errCode: 0,
            enMessage: 'Password changed successfully',
            viMessage: 'Đổi mật khẩu thành công'
        };
    } catch (e) {
        throw e;
    }
};

const forgotPasswordService = (emailOrPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
                    verify: true
                }
            });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'User not found or not verified',
                    errViMessage:
                        'Người dùng không tồn tại hoặc chưa được xác thực'
                });
            }

            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 3 * 60 * 1000);
            user.otp = otp;
            user.otpExpires = otpExpiry;
            await user.save();

            await sendOtpEmail(user.email, otp);

            return resolve({
                errCode: 0,
                enMessage:
                    'OTP for password reset sent successfully. Please check your email.',
                viMessage:
                    'Mã OTP đã được gửi thành công. Vui lòng kiểm tra email của bạn.'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const resetPasswordService = (
    emailOrPhone,
    otp,
    newPassword,
    confirmNewPassword
) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (newPassword !== confirmNewPassword) {
                return resolve({
                    errCode: 2,
                    errEnMessage:
                        'New password and confirm password do not match',
                    errViMessage: 'Mật khẩu mới và xác nhận mật khẩu không khớp'
                });
            }

            const user = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
                    verify: true
                }
            });

            if (!user) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'User not found',
                    errViMessage: 'Người dùng không tồn tại'
                });
            }

            if (user.otp !== otp || user.otpExpires < new Date()) {
                return resolve({
                    errCode: 4,
                    errEnMessage: 'OTP is invalid or has expired.',
                    errViMessage: 'Mã OTP không hợp lệ hoặc đã hết hạn.'
                });
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashPassword;
            user.otp = null;
            user.otpExpires = null;
            await user.save();

            return resolve({
                errCode: 0,
                enMessage: 'Password reset successful',
                viMessage: 'Đặt lại mật khẩu thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const refreshTokenService = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const refreshTokenFromDb = await db.User.findOne({
                where: { refreshToken: refreshToken }
            });

            if (!refreshTokenFromDb) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Invalid refresh token.'
                });
            }

            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
                async (err, decoded) => {
                    if (err) {
                        return resolve({
                            errCode: 3,
                            errMessage: 'Invalid or expired refresh token.'
                        });
                    }

                    const userId = decoded.id;
                    const user = await db.User.findOne({
                        where: { id: userId, verify: true },
                        include: [
                            {
                                model: db.Role,
                                as: 'roles',
                                attributes: ['id', 'name'],
                                through: { attributes: [] }
                            }
                        ]
                    });

                    const newTokens = jwt.sign(
                        {
                            id: user.id,
                            role: user.role
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    const userData = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.roles[0]?.id
                    };

                    return resolve({
                        errCode: 0,
                        message: 'Token refreshed successfully.',
                        accessToken: newTokens,
                        user: userData
                    });
                }
            );
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = {
    registerService,
    verifyEmailService,
    resendOtpService,
    loginService,
    logoutService,
    changePasswordService,
    forgotPasswordService,
    resetPasswordService,
    refreshTokenService
};
