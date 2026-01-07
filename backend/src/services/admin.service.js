const { Op, fn, col } = require('sequelize');
const db = require('../models');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { lock } = require('../routes/admin.route');
const { group } = require('console');

const getShiftTime = (shift) => {
    switch (shift) {
        case 'C1':
            return { startHour: 8, endHour: 12 };
        case 'C2':
            return { startHour: 13, endHour: 17 };
        case 'C3':
            return { startHour: 18, endHour: 22 };
        default:
            return null;
    }
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
                    userId: newUser.id
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

const getRolesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Role.findAll();

            if (!roles) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Roles not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get roles successful',
                data: roles
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const createRoleService = (name, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingRole = await db.Role.findOne({
                where: { name: name }
            });

            if (existingRole) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Role already exists'
                });
            }

            await db.Role.create({
                name: name,
                description: description
            });

            return resolve({
                errCode: 0,
                message: 'Create role successful'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const deleteRoleService = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await db.Role.findOne({
                where: { id: roleId }
            });

            if (!role) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Role not found'
                });
            }

            await db.Role.destroy({
                where: { id: roleId }
            });

            return resolve({
                errCode: 0,
                message: 'Delete role successful'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getPermissionsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const permissions = await db.Permission.findAll();

            if (!permissions) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Permissions not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get permissions successful',
                data: permissions
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const createPermissionService = (name, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingPermission = await db.Permission.findOne({
                where: { name: name }
            });

            if (existingPermission) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Permission already exists'
                });
            }

            await db.Permission.create({
                name: name,
                description: description
            });

            return resolve({
                errCode: 0,
                message: 'Create permission successful'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const deletePermissionService = (permissionId) => {
    return new Promise(async (resolve, reject) => {
        const permission = await db.Permission.findOne({
            where: { id: permissionId }
        });

        if (!permission) {
            return resolve({
                errCode: 2,
                errMessage: 'Permission not found'
            });
        }

        await db.Permission.destroy({
            where: { id: permissionId }
        });

        return resolve({
            errCode: 0,
            message: 'Delete permission successful'
        });
    });
};

const getUserPermissionService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: {
                    exclude: ['password', 'otp', 'otpExpires', 'refreshToken']
                },
                include: [
                    {
                        model: db.Permission,
                        as: 'permissions',
                        through: { attributes: [] }
                    }
                ]
            });

            if (!users) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Users not found'
                });
            }

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

const createUserPermissionService = (userId, permissionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existing = await db.UserPermission.findOne({
                where: { userId: userId, permissionId: permissionId }
            });

            if (existing) {
                return resolve({
                    errCode: 2,
                    errMessage:
                        'The user has already been granted this permission.'
                });
            }

            await db.UserPermission.create({
                userId: userId,
                permissionId: permissionId
            });

            return resolve({
                errCode: 0,
                message: 'Permission granted successfully.'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const deleteUserPermissionService = (userId, permissionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userpermission = await db.UserPermission.findOne({
                where: { userId: userId, permissionId: permissionId }
            });

            if (!userpermission) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User permission not found'
                });
            }

            await db.UserPermission.destroy({
                where: { userId: userId, permissionId: permissionId }
            });

            return resolve({
                errCode: 0,
                message: 'Delete user permission successful'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

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
                        model: db.Receptionist,
                        as: 'receptionist',
                        attributes: {
                            exclude: ['id', 'userId']
                        }
                    },
                    {
                        model: db.Role,
                        as: 'roles',
                        through: { attributes: [] },
                        include: [
                            {
                                model: db.Permission,
                                as: 'permissions',
                                through: { attributes: [] }
                            }
                        ]
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

const deleteUserService = (delId) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const userDel = await db.User.findOne({
                where: { id: delId },
                include: [
                    {
                        model: db.Role,
                        as: 'roles',
                        through: { attributes: [] }
                    }
                ],
                transaction: trans
            });

            if (!userDel) {
                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            const roleDelete = userDel.roles;
            const RoleDel = roleDelete[0].id;

            if (RoleDel === 4) {
                const doctor = await db.Doctor.findOne({
                    where: { userId: delId },
                    transaction: trans
                });

                const oldImagePath = doctor.image;

                await db.Doctor.destroy({
                    where: { userId: delId },
                    transaction: trans
                });

                const fullOldImagePath = path.join(
                    __dirname,
                    '..',
                    oldImagePath
                );
                if (fs.existsSync(fullOldImagePath)) {
                    fs.unlinkSync(fullOldImagePath);
                }
            } else if (RoleDel === 5) {
                const receptionist = await db.Receptionist.findOne({
                    where: { userId: delId },
                    transaction: trans
                });

                const oldImagePath = receptionist.image;

                await db.Receptionist.destroy({
                    where: { userId: delId },
                    transaction: trans
                });

                const fullOldImagePath = path.join(
                    __dirname,
                    '..',
                    oldImagePath
                );
                if (fs.existsSync(fullOldImagePath)) {
                    fs.unlinkSync(fullOldImagePath);
                }
            } else if (RoleDel === 3) {
                await db.Patient.destroy({
                    where: { userId: delId },
                    transaction: trans
                });
            } else if (RoleDel === 2) {
                await db.Admin.destroy({
                    where: { userId: delId },
                    transaction: trans
                });
            }

            await db.UserRole.destroy({
                where: { userId: delId, roleId: RoleDel },
                transaction: trans
            });

            await db.User.destroy({
                where: { id: delId },
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

const createDoctorService = (data, imageFilename) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();
        const { name, email, phone, password, confirmPassword } = data;

        try {
            if (password !== confirmPassword) {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Password and confirm password do not match',
                    errViMessage: 'Mật khẩu và xác nhận mật khẩu không khớp'
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
                    errCode: 4,
                    errEnMessage: 'Email or phone number already in use',
                    errViMessage: 'Email hoặc số điện thoại đã được sử dụng'
                });
            }

            const imagePath = `/uploads/doctors/${imageFilename}`;

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await db.User.create(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                    verify: true,
                    otp: null,
                    otpExpires: null,
                    refreshToken: null
                },
                { transaction: trans }
            );

            const defauRole = await db.Role.findOne({
                where: { name: 'Doctor' },
                transaction: trans
            });

            if (!defauRole) {
                await trans.rollback();
                return resolve({
                    errCode: 5,
                    errEnMessage: 'Doctor role not found',
                    errViMessage: 'Chuyên khoa không tồn tại'
                });
            }

            await db.UserRole.create(
                {
                    userId: newUser.id,
                    roleId: defauRole.id
                },
                { transaction: trans }
            );

            const {
                specialtyId,
                dob,
                gender,
                ethnicity,
                address,
                degree,
                room,
                introduce,
                workExperience
            } = data;

            if (
                !specialtyId ||
                !room ||
                !dob ||
                !ethnicity ||
                !gender ||
                !address ||
                !degree
            ) {
                await trans.rollback();
                return resolve({
                    errCode: 1,
                    errEnMessage: 'Missing required parameters',
                    errViMessage: 'Thiếu các tham số bắt buộc'
                });
            }

            await db.Doctor.create(
                {
                    userId: newUser.id,
                    specialtyId: specialtyId,
                    dob: dob,
                    ethnicity: ethnicity,
                    gender: gender,
                    address: address,
                    degree: degree,
                    room: room,
                    introduce: introduce,
                    workExperience: workExperience,
                    image: imagePath,
                    status: 'active'
                },
                { transaction: trans }
            );

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: `Create doctor successful`,
                viMessage: `Tạo bác sĩ thành công`
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

const updateDoctorService = (userId, data, imageFile) => {
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
                    errEnMessage: 'User not found',
                    errViMessage: 'Người dùng không tồn tại'
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
                        errEnMessage: 'Email already in use',
                        errViMessage: 'Email đã được sử dụng'
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
                        errEnMessage: 'Phone number already in use',
                        errViMessage: 'Số điện thoại đã được sử dụng'
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

            const doctor = await db.Doctor.findOne({
                where: { userId: userId },
                transaction: trans
            });

            const oldImagePath = doctor.image;

            const doctorData = {};
            if (data.specialtyId !== undefined)
                doctorData.specialtyId = data.specialtyId;
            if (data.dob !== undefined) doctorData.dob = data.dob;
            if (data.gender !== undefined) doctorData.gender = data.gender;
            if (data.ethnicity !== undefined)
                doctorData.ethnicity = data.ethnicity;
            if (data.address !== undefined) doctorData.address = data.address;
            if (data.degree !== undefined) doctorData.degree = data.degree;
            if (data.room !== undefined) doctorData.room = data.room;
            if (data.introduce !== undefined)
                doctorData.introduce = data.introduce;
            if (data.workExperience !== undefined)
                doctorData.workExperience = data.workExperience;
            if (data.status !== undefined) doctorData.status = data.status;
            if (imageFile !== undefined)
                doctorData.image = `/uploads/doctors/${imageFile.filename}`;

            if (Object.keys(doctorData).length > 0) {
                await db.Doctor.update(doctorData, {
                    where: { userId: userId },
                    transaction: trans
                });
            }

            if (imageFile && oldImagePath) {
                const fullOldImagePath = path.join(
                    __dirname,
                    '..',
                    oldImagePath
                );
                if (fs.existsSync(fullOldImagePath)) {
                    fs.unlinkSync(fullOldImagePath);
                }
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: 'Update user successful',
                viMessage: 'Cập nhật người dùng thành công'
            });
        } catch (e) {
            trans.rollback();
            return reject(e);
        }
    });
};

const createReceptionistService = (data, imageFilename) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();
        const { name, email, phone, password, confirmPassword } = data;

        try {
            if (password !== confirmPassword) {
                await trans.rollback();
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Password and confirm password do not match',
                    errViMessage: 'Mật khẩu và xác nhận mật khẩu không khớp'
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
                    errCode: 4,
                    errEnMessage: 'Email or phone number already in use',
                    errViMessage: 'Email hoặc số điện thoại đã được sử dụng'
                });
            }

            const imagePath = `/uploads/receptionists/${imageFilename}`;

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await db.User.create(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                    verify: true,
                    otp: null,
                    otpExpires: null,
                    refreshToken: null
                },
                { transaction: trans }
            );

            const defauRole = await db.Role.findOne({
                where: { name: 'Receptionist' },
                transaction: trans
            });

            if (!defauRole) {
                await trans.rollback();
                return resolve({
                    errCode: 5,
                    errEnMessage: 'Receptionist role not found',
                    errViMessage: 'Role lễ tân không tồn tại'
                });
            }

            await db.UserRole.create(
                {
                    userId: newUser.id,
                    roleId: defauRole.id
                },
                { transaction: trans }
            );

            const { dob, gender, ethnicity, address } = data;

            if (!dob || !ethnicity || !gender || !address) {
                await trans.rollback();
                return resolve({
                    errCode: 1,
                    errEnMessage: 'Missing required parameters',
                    errViMessage: 'Thiếu các tham số bắt buộc'
                });
            }

            await db.Receptionist.create(
                {
                    userId: newUser.id,
                    dob: dob,
                    ethnicity: ethnicity,
                    gender: gender,
                    address: address,
                    image: imagePath,
                    status: 'active'
                },
                { transaction: trans }
            );

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: `Create receptionist successful`,
                viMessage: `Tạo lễ tân thành công`
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

const updatereceptionistService = (userId, data, imageFile) => {
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
                    errEnMessage: 'User not found',
                    errViMessage: 'Người dùng không tồn tại'
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
                        errEnMessage: 'Email already in use',
                        errViMessage: 'Email đã được sử dụng'
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
                        errEnMessage: 'Phone number already in use',
                        errViMessage: 'Số điện thoại đã được sử dụng'
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

            const receptionist = await db.Receptionist.findOne({
                where: { userId: userId },
                transaction: trans
            });

            const oldImagePath = receptionist.image;

            const receptionistData = {};
            if (data.dob !== undefined) receptionistData.dob = data.dob;
            if (data.gender !== undefined)
                receptionistData.gender = data.gender;
            if (data.ethnicity !== undefined)
                receptionistData.ethnicity = data.ethnicity;
            if (data.address !== undefined)
                receptionistData.address = data.address;
            if (data.status !== undefined)
                receptionistData.status = data.status;
            if (imageFile !== undefined)
                receptionistData.image = `/uploads/receptionists/${imageFile.filename}`;

            if (Object.keys(receptionistData).length > 0) {
                await db.Receptionist.update(receptionistData, {
                    where: { userId: userId },
                    transaction: trans
                });
            }

            if (imageFile && oldImagePath) {
                const fullOldImagePath = path.join(
                    __dirname,
                    '..',
                    oldImagePath
                );
                if (fs.existsSync(fullOldImagePath)) {
                    fs.unlinkSync(fullOldImagePath);
                }
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: 'Update user successful',
                viMessage: 'Cập nhật người dùng thành công'
            });
        } catch (e) {
            trans.rollback();
            return reject(e);
        }
    });
};

const createSpecialtyService = (name, description, imageFilename, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingSpecialty = await db.Specialty.findOne({
                where: { name: name }
            });

            if (existingSpecialty) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Specialty already exists',
                    errViMessage: 'Chuyên khoa đã tồn tại'
                });
            }

            const imagePath = `/uploads/specialties/${imageFilename}`;

            await db.Specialty.create({
                name: name,
                description: description,
                image: imagePath,
                status: status
            });

            return resolve({
                errCode: 0,
                enMessage: 'Create specialty successful',
                viMessage: 'Tạo chuyên khoa thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const updateSpecialtyService = (specialtyId, data, imageFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const specialty = await db.Specialty.findOne({
                where: { id: specialtyId }
            });

            if (!specialty) {
                if (imageFile) {
                    fs.unlinkSync(imageFile.path);
                }
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Specialty not found',
                    errViMessage: 'Chuyên khoa không tồn tại'
                });
            }

            const oldImagePath = specialty.image;

            const specialtyData = {};
            if (data.name !== undefined) specialtyData.name = data.name;
            if (data.description !== undefined)
                specialtyData.description = data.description;
            if (data.status !== undefined) specialtyData.status = data.status;

            if (imageFile)
                specialtyData.image = path
                    .join('/uploads', 'specialties', imageFile.filename)
                    .replace(/\\/g, '/');

            await db.Specialty.update(specialtyData, {
                where: { id: specialtyId }
            });

            console.log('image path: ', oldImagePath);

            if (imageFile && oldImagePath) {
                const fullOldImagePath = path.join(
                    __dirname,
                    '..',
                    oldImagePath
                );
                if (fs.existsSync(fullOldImagePath)) {
                    fs.unlinkSync(fullOldImagePath);
                }
            }

            return resolve({
                errCode: 0,
                enMessage: 'Update specialty successful',
                viMessage: 'Cập nhật chuyên khoa thành công'
            });
        } catch (e) {
            if (imageFile) {
                fs.unlink(imageFile.path, (err) => {
                    if (err)
                        console.error(
                            'Failed to cleanup uploaded file on error:',
                            err
                        );
                });
            }
            return reject(e);
        }
    });
};

const deleteSpecialtyService = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        const specialty = await db.Specialty.findOne({
            where: { id: specialtyId }
        });

        if (!specialty) {
            return resolve({
                errCode: 2,
                errEnMessage: 'Specialty not found',
                errViMessage: 'Chuyên khoa không tồn tại'
            });
        }

        const oldImagePath = specialty.image;

        await db.Specialty.destroy({
            where: { id: specialtyId }
        });

        const fullOldImagePath = path.join(__dirname, '..', oldImagePath);
        if (fs.existsSync(fullOldImagePath)) {
            fs.unlinkSync(fullOldImagePath);
        }

        return resolve({
            errCode: 0,
            enMessage: 'Delete specialty successful',
            viMessage: 'Xóa chuyên khoa thành công'
        });
    });
};

const createServiceService = (
    name,
    description,
    durationMinutes,
    price,
    status
) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (durationMinutes <= 0) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Duration must be greater than 0',
                    errViMessage: 'Thời lượng phải lớn hơn 0'
                });
                s;
            }

            if (price <= 0) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Price must be greater than 0',
                    errViMessage: 'Giá phải lớn hơn 0'
                });
            }

            await db.Service.create({
                name: name,
                description: description,
                durationMinutes: durationMinutes,
                price: price,
                status: status
            });

            return resolve({
                errCode: 0,
                enMessage: 'Create service successful',
                viMessage: 'Tạo dịch vụ thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const updateServiceService = (serviceId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = await db.Service.findOne({
                where: { id: serviceId }
            });

            if (!service) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Service not found',
                    errViMessage: 'Dịch vụ không tồn tại'
                });
            }

            if (data.durationMinutes && data.durationMinutes <= 0) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Duration must be greater than 0',
                    errViMessage: 'Thời lượng phải lớn hơn 0'
                });
            }

            if (data.price && data.price <= 0) {
                return resolve({
                    errCode: 4,
                    errEnMessage: 'Price must be greater than 0',
                    errViMessage: 'Giá phải lớn hơn 0'
                });
            }

            const serviceData = {};
            if (data.name !== undefined) serviceData.name = data.name;
            if (data.description !== undefined)
                serviceData.description = data.description;
            if (data.durationMinutes !== undefined)
                serviceData.durationMinutes = data.durationMinutes;
            if (data.price !== undefined) serviceData.price = data.price;
            if (data.status !== undefined) serviceData.status = data.status;

            await db.Service.update(serviceData, {
                where: { id: serviceId }
            });

            return resolve({
                errCode: 0,
                enMessage: 'Update service successful',
                viMessage: 'Cập nhật dịch vụ thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const deleteServiceService = (serviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = await db.Service.findOne({
                where: { id: serviceId }
            });

            if (!service) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Service not found',
                    errViMessage: 'Dịch vụ không tồn tại'
                });
            }

            await db.Service.destroy({
                where: { id: serviceId }
            });

            return resolve({
                errCode: 0,
                enMessage: 'Delete service successful',
                viMessage: 'Xóa dịch vụ thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getSchedulesService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const schedules = await db.Schedule.findAll({
                where: { doctorId: doctorId },
                include: [
                    {
                        model: db.Slot,
                        as: 'slots'
                    }
                ]
            });

            if (!schedules) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Schedule not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get schedules successful',
                data: schedules
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const createScheduleAndSlotService = (doctorId, data) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();
        const SLOT_DURATION_MINUTES = 30;
        const results = [];

        try {
            for (const schedule of data) {
                const { name, workDate, shift, status } = schedule;

                if (!name || !workDate || !shift || !status) {
                    await trans.rollback();
                    return resolve({
                        errCode: 1,
                        errEnMessage: `Missing required parameters in one of the schedule objects. workDate: ${workDate}`,
                        errViMessage: `Thiếu các tham số bắt buộc trong một trong các đối tượng lịch. workDate: ${workDate}`
                    });
                }

                const shiftList = Array.isArray(shift) ? shift : [shift];

                for (const currentShift of shiftList) {
                    const dateObj = new Date(workDate);
                    dateObj.setHours(0, 0, 0, 0);
                    const normalizedWorkDate = dateObj;

                    const shiftTime = getShiftTime(currentShift);

                    if (!shiftTime) {
                        await trans.rollback();
                        return resolve({
                            errCode: 2,
                            errEnMessage: `Invalid shift ${currentShift}`,
                            errViMessage: `Ca không hợp lệ ${currentShift}`
                        });
                    }

                    const existingSchedule = await db.Schedule.findOne({
                        where: {
                            doctorId: doctorId,
                            workDate: normalizedWorkDate,
                            shift: currentShift
                        },
                        transaction: trans
                    });

                    if (existingSchedule) {
                        await trans.rollback();
                        return resolve({
                            errCode: 3,
                            errEnMessage: `Schedule for shift ${currentShift} on ${
                                normalizedWorkDate.toISOString().split('T')[0]
                            } already exists`,
                            errViMessage: `Lịch đã tồn tại cho ca ${currentShift} ngày ${
                                normalizedWorkDate.toISOString().split('T')[0]
                            }`
                        });
                    }

                    const newSchedule = await db.Schedule.create(
                        {
                            doctorId: doctorId,
                            name: name,
                            workDate: normalizedWorkDate,
                            shift: currentShift,
                            status: status
                        },
                        { transaction: trans }
                    );

                    const slots = [];

                    const startTime = new Date(normalizedWorkDate);
                    startTime.setHours(shiftTime.startHour, 0, 0, 0);

                    const endTime = new Date(normalizedWorkDate);
                    endTime.setHours(shiftTime.endHour, 0, 0, 0);

                    let currentTime = new Date(startTime);

                    while (currentTime < endTime) {
                        const nextTime = new Date(
                            currentTime.getTime() +
                                SLOT_DURATION_MINUTES * 60000
                        );

                        slots.push({
                            doctorId: doctorId,
                            scheduleId: newSchedule.id,
                            startTime: currentTime,
                            endTime: nextTime,
                            capacity: 1,
                            status: 'available'
                        });

                        currentTime = nextTime;
                    }

                    await db.Slot.bulkCreate(slots, { transaction: trans });

                    results.push({
                        scheduleId: newSchedule.id,
                        workDate: normalizedWorkDate
                            .toISOString()
                            .split('T')[0],
                        shift: currentShift,
                        status: 'success'
                    });
                }
            }

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: 'Create data and slots successful',
                viMessage: 'Tạo dữ liệu và ca thành công',
                data: results
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

const deleteScheduleService = (scheduleIds) => {
    return new Promise(async (resolve, reject) => {
        const trans = await db.sequelize.transaction();

        try {
            const existingSchedules = await db.Schedule.findAll({
                where: { id: { [Op.in]: scheduleIds } },
                attributes: ['id'],
                transaction: trans
            });

            if (existingSchedules.length !== scheduleIds.length) {
                const existingIds = existingSchedules.map((s) =>
                    s.id.toString()
                );
                const notFoundIds = scheduleIds.filter(
                    (id) => !existingIds.includes(id.toString())
                );

                await trans.rollback();
                return resolve({
                    errCode: 2,
                    errEnMessage: `One or more schedules not found. Missing IDs: ${notFoundIds.join(
                        ', '
                    )}`,
                    errViMessage: `Một hoặc nhiều lịch không tồn tại. ID thiếu: ${notFoundIds.join(
                        ', '
                    )}`
                });
            }

            const delSlots = await db.Slot.destroy({
                where: { scheduleId: { [Op.in]: scheduleIds } },
                transaction: trans
            });

            const delSchedules = await db.Schedule.destroy({
                where: { id: { [Op.in]: scheduleIds } },
                transaction: trans
            });

            await trans.commit();

            return resolve({
                errCode: 0,
                enMessage: `Delete successful. Deleted ${delSchedules} schedules and ${delSlots} slots.`,
                viMessage: `Xóa thành công. Xóa ${delSchedules} lịch và ${delSlots} ca.`
            });
        } catch (e) {
            await trans.rollback();
            return reject(e);
        }
    });
};

const setPriceDoctorService = (doctorId, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctor = await db.Doctor.findOne({
                where: { id: doctorId }
            });

            if (!doctor) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Doctor not found',
                    errViMessage: 'Bác sĩ không tồn tại'
                });
            }

            if (price <= 0) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Price must be greater than 0',
                    errViMessage: 'Giá phải lớn hơn 0'
                });
            }

            await db.Doctor.update(
                { price: price },
                { where: { id: doctorId } }
            );

            return resolve({
                errCode: 0,
                enMessage: 'Set price successful',
                viMessage: 'Cập nhật giá thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const setPriceServiceService = (serviceId, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = await db.Service.findOne({
                where: { id: serviceId }
            });

            if (!service) {
                return resolve({
                    errCode: 2,
                    errEnMessage: 'Service not found',
                    errViMessage: 'Dịch vụ không tồn tại'
                });
            }

            if (price <= 0) {
                return resolve({
                    errCode: 3,
                    errEnMessage: 'Price must be greater than 0',
                    errViMessage: 'Giá phải lớn hơn 0'
                });
            }

            await db.Service.update(
                { price: price },
                { where: { id: serviceId } }
            );

            return resolve({
                errCode: 0,
                enMessage: 'Set price successful',
                viMessage: 'Cập nhật giá thành công'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getPatientsService = () => {
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

const getReceptionistsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const receptionists = await db.Receptionist.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            return resolve({
                errCode: 0,
                message: 'Get receptionists successful',
                data: receptionists
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getDoctorServicesService = async (doctorId, page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await db.DoctorService.findAndCountAll({
            where: { doctorId },
            limit,
            offset,
            include: [
                {
                    model: db.Service,
                    as: 'service',
                    attributes: ['name']
                }
            ]
        });

        if (rows.length === 0) {
            return {
                errCode: 2,
                message: 'Doctor services not found'
            };
        }

        return {
            errCode: 0,
            message: 'Get doctor services successful',
            data: rows,
            pagination: {
                page,
                limit,
                totalItems: count,
                totalPages: Math.ceil(count / limit)
            }
        };
    } catch (e) {
        throw e;
    }
};

const createDoctorServicesService = async (data) => {
    try {
        const existing = await db.DoctorService.findOne({
            where: {
                doctorId: data.doctorId,
                serviceId: data.serviceId
            }
        });

        if (existing) {
            return {
                errCode: 2,
                errEnMessage: 'Doctor service already exists',
                errViMessage: 'Dịch vụ của bác sĩ đã tồn tại'
            };
        }

        await db.DoctorService.create({
            doctorId: data.doctorId,
            serviceId: data.serviceId,
            price: data.price,
            status: data.status
        });

        return {
            errCode: 0,
            enMessage: 'Create doctor service successful',
            viMessage: 'Tạo dịch vụ của bác sĩ thành công'
        };
    } catch (e) {
        throw e;
    }
};

const updateDoctorServicesService = async (doctorId, serviceId, data) => {
    try {
        const doctorService = await db.DoctorService.findOne({
            where: {
                doctorId: doctorId,
                serviceId: serviceId
            }
        });

        if (!doctorService) {
            return {
                errCode: 2,
                errEnMessage: 'Doctor service not found',
                errViMessage: 'Dịch vụ của bác sĩ không tồn tại'
            };
        }

        if (data.price !== undefined) {
            doctorService.price = data.price;
        }

        if (data.status !== undefined) {
            doctorService.status = data.status;
        }

        await doctorService.save();

        return {
            errCode: 0,
            enMessage: 'Update doctor service successful',
            viMessage: 'Cập nhật dịch vụ của bác sĩ thành công'
        };
    } catch (e) {
        throw e;
    }
};

const getAppointmentsService = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await db.Appointment.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Doctor,
                    as: 'doctor',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Service,
                    as: 'service',
                    attributes: ['name']
                },
                {
                    model: db.Slot,
                    as: 'slot',
                    attributes: ['startTime', 'endTime']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (rows.length === 0) {
            return {
                errCode: 2,
                message: 'Appointments not found'
            };
        }

        return {
            errCode: 0,
            message: 'Get appointments successful',
            data: rows,
            pagination: {
                page,
                limit,
                totalRows: count,
                totalPages: Math.ceil(count / limit)
            }
        };
    } catch (e) {
        throw e;
    }
};

const getDashboardStatsService = async ({ period, doctorId, serviceId }) => {
    try {
        const now = new Date();
        let startDate;
        let endDate = new Date();

        if (period === 'day') {
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
        } else if (period === 'week') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - startDate.getDay());
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
        } else if (period === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
        } else {
            return {
                errCode: 2,
                errEnMessage: 'Invalid period',
                errViMessage: 'Thời gian không hợp lệ'
            };
        }

        const where = {
            createdAt: { [Op.between]: [startDate, endDate] }
        };
        if (doctorId) {
            where.doctorId = doctorId;
        }
        if (serviceId) {
            where.serviceId = serviceId;
        }

        const stats = await db.Appointment.findAll({
            where,
            attributes: [
                'status',
                [fn('COUNT', col('Appointment.id')), 'count'],
                [fn('SUM', col('finalPrice')), 'revenue']
            ],
            group: ['status']
        });

        let totalAppointments = 0;
        let totalRevenue = 0;
        let cancelled = 0;
        let noshow = 0;
        const statusDistribution = {};

        stats.forEach((stat) => {
            const status = stat.getDataValue('status');
            const count = parseInt(stat.getDataValue('count'), 10);
            const revenue = parseFloat(stat.getDataValue('revenue')) || 0;
            totalAppointments += count;
            totalRevenue += revenue;
            statusDistribution[status] = count;
            if (status === 'cancelled') {
                cancelled += count;
            } else if (status === 'no_show') {
                noshow += count;
            }
        });

        const trend = await db.Appointment.findAll({
            where,
            attributes: [
                [fn('DATE', col('createdAt')), 'date'],
                [fn('COUNT', col('id')), 'appointments'],
                [fn('SUM', col('finalPrice')), 'revenue']
            ],
            group: [fn('DATE', col('createdAt'))],
            order: [[fn('DATE', col('createdAt')), 'ASC']]
        });

        return {
            errCode: 0,
            message: 'Get dashboard stats successful',
            data: {
                period,
                totalAppointments,
                totalRevenue,
                cancelRate: totalAppointments
                    ? ((cancelled / totalAppointments) * 100).toFixed(2)
                    : '0.00',
                noshowRate: totalAppointments
                    ? ((noshow / totalAppointments) * 100).toFixed(2)
                    : '0.00',
                statusDistribution,
                bookingTrend: trend
            }
        };
    } catch (e) {
        throw e;
    }
};

const exportStatsService = async ({ period, doctorId, serviceId }) => {
    try {
        const whereClause = {};
        if (period) {
            const now = new Date();
            let startDate;
            let endDate = new Date();
            if (period === 'day') {
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
            } else if (period === 'week') {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - startDate.getDay());
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
            } else if (period === 'month') {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999
                );
            } else {
                return {
                    errCode: 2,
                    errEnMessage: 'Invalid period',
                    errViMessage: 'Thời gian không hợp lệ'
                };
            }
            whereClause.createdAt = { [Op.between]: [startDate, endDate] };
        }

        if (doctorId) {
            whereClause.doctorId = doctorId;
        }
        if (serviceId) {
            whereClause.serviceId = serviceId;
        }
        const appointments = await db.Appointment.findAll({
            where: whereClause,
            include: [
                {
                    model: db.Patient,
                    as: 'patient',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Doctor,
                    as: 'doctor',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email', 'phone']
                        }
                    ]
                },
                {
                    model: db.Service,
                    as: 'service',
                    attributes: ['name']
                }
            ]
        });

        return {
            errCode: 0,
            message: 'Export stats successful',
            data: appointments
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createHopistalAdminService,
    getRolesService,
    createRoleService,
    deleteRoleService,
    getPermissionsService,
    createPermissionService,
    deletePermissionService,
    getUserPermissionService,
    createUserPermissionService,
    deleteUserPermissionService,
    getUsersService,
    getUserByIdService,
    deleteUserService,
    createDoctorService,
    updateDoctorService,
    createReceptionistService,
    updatereceptionistService,
    createSpecialtyService,
    updateSpecialtyService,
    deleteSpecialtyService,
    createServiceService,
    updateServiceService,
    deleteServiceService,
    createScheduleAndSlotService,
    deleteScheduleService,
    getSchedulesService,
    setPriceDoctorService,
    setPriceServiceService,
    getPatientsService,
    getReceptionistsService,
    getDoctorServicesService,
    createDoctorServicesService,
    updateDoctorServicesService,
    getAppointmentsService,
    getDashboardStatsService,
    exportStatsService
};
