const { verify } = require('jsonwebtoken');
const db = require('../models');

const getProfileService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId, verify: true },
                attributes: {
                    exclude: [
                        'branchId',
                        'password',
                        'verify',
                        'otp',
                        'otpExpires',
                        'refreshToken',
                        'createdAt',
                        'updatedAt'
                    ]
                },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: {
                            exclude: [
                                'id',
                                'userId',
                                'createdAt',
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    }
                ]
            });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get profile successful',
                data: user
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const putProfileService = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const userData = {};
            if (data.name !== undefined) {
                userData.name = data.name;
            }
            if (data.phone !== undefined) {
                userData.phone = data.phone;
            }

            if (Object.keys(userData).length > 0) {
                await db.User.update(userData, {
                    where: { id: userId },
                    transaction: trans
                });
            }

            const patientData = {};
            if (data.dob !== undefined) {
                const dateObj = new Date(data.dob);
                if (!isNaN(dateObj.getTime())) {
                    patientData.dob = dateObj.toISOString().split('T')[0];
                } else {
                    patientData.dob = null;
                }
            }
            if (data.gender !== undefined) {
                patientData.gender = data.gender;
            }
            if (data.insurance !== undefined) {
                patientData.insurance = data.insurance;
            }
            if (data.allergies !== undefined) {
                patientData.allergies = data.allergies;
            }

            const patient = await db.Patient.findOne({
                where: { userId: userId },
                transaction: trans
            });

            if (!patient) {
                await db.Patient.create(
                    { userId: userId, ...patientData },
                    { transaction: trans }
                );
            } else {
                if (Object.keys(patientData).length > 0) {
                    await db.Patient.update(patientData, {
                        where: { userId: userId },
                        transaction: trans
                    });
                }
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                message: 'Update profile successful'
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

module.exports = {
    getProfileService,
    putProfileService
};
