const { Op } = require('sequelize');
const db = require('../models');
const bcrypt = require('bcryptjs');

const getUsersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                oder: [
                    ['role', 'ASC'],
                    ['name', 'ASC']
                ],
                attributes: {
                    exclude: ['password', 'otp', 'otpExpires', 'refreshToken']
                }
            });

            return resolve({
                errCode: 0,
                message: 'Get users successful',
                data: users
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getUserByIdService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password', 'otp', 'otpExpires', 'refreshToken']
                },
                include: [
                    {
                        model: db.Patient,
                        as: 'patient',
                        attributes: {
                            exclude: ['id', 'userId']
                        }
                    },
                    {
                        model: db.Doctor,
                        as: 'doctor',
                        attributes: {
                            exclude: ['id', 'userId']
                        }
                    },
                    {
                        model: db.Admin,
                        as: 'admin',
                        attributes: {
                            exclude: ['id', 'userId']
                        }
                    },
                    {
                        model: db.Receptionist,
                        as: 'receptionist',
                        attributes: {
                            exclude: ['id', 'userId']
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
                message: 'Get user successful',
                data: user
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const createHopistalAdminService = (
    name,
    email,
    phone,
    password,
    confirmPassword
) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            if (password !== confirmPassword) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Password and confirm password do not match'
                });
            }

            const existingVerifiedUser = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { phone: phone }]
                }
            });

            if (existingVerifiedUser) {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errMessage: 'Email or phone number already in use'
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await db.User.create(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                    verify: true,
                    role: 'admin',
                    otp: null,
                    otpExpires: null,
                    refreshToken: null
                },
                { transaction: trans }
            );
            await db.Admin.create(
                {
                    userId: newUser.id,
                    roleType: 'hopistal'
                },
                { transaction: trans }
            );

            await trans.commit();

            return resolve({
                errCode: 0,
                message: 'Create hopistal admin successful'
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

const createUserService = async (data) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();
        const { name, email, phone, password, confirmPassword, role } = data;

        try {
            if (password !== confirmPassword) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Password and confirm password do not match'
                });
            }

            const existingVerifiedUser = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { phone: phone }]
                }
            });

            if (existingVerifiedUser) {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errMessage: 'Email or phone number already in use'
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await db.User.create(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                    verify: true,
                    role: role,
                    otp: null,
                    otpExpires: null,
                    refreshToken: null
                },
                { transaction: trans }
            );

            if (role === 'doctor') {
                const { specialtyId, room } = data;

                if (!specialtyId || !room) {
                    await trans.rollback();
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters'
                    });
                }

                await db.Doctor.create(
                    {
                        userId: newUser.id,
                        specialtyId: specialtyId,
                        room: room,
                        status: 'active'
                    },
                    { transaction: trans }
                );
            } else if (role === 'receptionist') {
                const { status } = data;

                if (!status) {
                    await trans.rollback();
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters'
                    });
                }

                await db.Receptionist.create(
                    {
                        userId: newUser.id,
                        status: status
                    },
                    { transaction: trans }
                );
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                message: `Create ${role} successful`
            });
        } catch (e) {
            trans.rollback();
            return reject(e);
        }
    });
};

const updateUserService = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const user = await db.User.findOne({
                where: { id: userId },
                transaction: trans
            });

            if (!user) {
                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            if (data.email && data.email !== user.email) {
                const existingUser = await db.User.findOne({
                    where: { email: data.email, id: { [Op.ne]: userId } },
                    transaction: trans
                });
                if (existingUser) {
                    await trans.rollback();
                    return resolve({
                        errCode: 3,
                        errMessage: 'Email already in use'
                    });
                }
            }
            if (data.phone && data.phone !== user.phone) {
                const existingUser = await db.User.findOne({
                    where: { phone: data.phone, id: { [Op.ne]: userId } },
                    transaction: trans
                });
                if (existingUser) {
                    await trans.rollback();
                    return resolve({
                        errCode: 4,
                        errMessage: 'Phone number already in use'
                    });
                }
            }

            const userData = {};
            if (data.name !== undefined) {
                userData.name = data.name;
            }
            if (data.email !== undefined) {
                userData.email = data.email;
            }
            if (data.phone !== undefined) {
                userData.phone = data.phone;
            }

            await db.User.update(userData, {
                where: { id: userId },
                transaction: trans
            });

            if (user.role === 'doctor') {
                const doctorData = {};
                if (data.specialtyId !== undefined)
                    doctorData.specialtyId = data.specialtyId;
                if (data.room !== undefined) doctorData.room = data.room;
                if (data.status !== undefined) doctorData.status = data.status;

                if (Object.keys(doctorData).length > 0) {
                    await db.Doctor.update(doctorData, {
                        where: { userId: userId },
                        transaction: trans
                    });
                }
            } else if (user.role === 'receptionist') {
                const receptionistData = {};
                if (data.status !== undefined)
                    receptionistData.status = data.status;

                if (Object.keys(receptionistData).length > 0) {
                    await db.Receptionist.update(receptionistData, {
                        where: { userId: userId },
                        transaction: trans
                    });
                }
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                message: 'Update user successful'
            });
        } catch (e) {
            trans.rollback();
            return reject(e);
        }
    });
};

const deleteUserService = async (userId, IdDel) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const userDel = await db.User.findOne({
                where: { id: IdDel },
                transaction: trans
            });

            if (!userDel) {
                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            const RoleDel = userDel.role;

            if (RoleDel === 'admin') {
                const sysAdmin = await db.Admin.findOne({
                    where: { userId: userId },
                    transaction: trans
                });

                if (!sysAdmin || sysAdmin.roleType !== 'system') {
                    await trans.rollback();
                    return resolve({
                        errCode: 3,
                        errMessage: "You don't have permission to delete this"
                    });
                }
            }

            if (RoleDel === 'doctor') {
                await db.Doctor.destroy({
                    where: { userId: IdDel },
                    transaction: trans
                });
            } else if (RoleDel === 'receptionist') {
                await db.Receptionist.destroy({
                    where: { userId: IdDel },
                    transaction: trans
                });
            } else if (RoleDel === 'patient') {
                await db.Patient.destroy({
                    where: { userId: IdDel },
                    transaction: trans
                });
            } else if (RoleDel === 'admin') {
                await db.Admin.destroy({
                    where: { userId: IdDel },
                    transaction: trans
                });
            }

            await db.User.destroy({
                where: { id: IdDel },
                transaction: trans
            });

            await trans.commit();

            return resolve({
                errCode: 0,
                message: 'Delete user successful'
            });
        } catch (e) {
            trans.rollback();
            return reject(e);
        }
    });
};

const getPatientsService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const patients = await db.Patient.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    }
                ]
            });

            return resolve({
                errCode: 0,
                message: 'Get patients successful',
                data: patients
            });
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = {
    getUsersService,
    getUserByIdService,
    createHopistalAdminService,
    createUserService,
    updateUserService,
    deleteUserService,
    getPatientsService
};
