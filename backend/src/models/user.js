'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Branch, {
                foreignKey: 'branchId',
                as: 'branch'
            });

            User.hasOne(models.Admin, {
                foreignKey: 'userId',
                as: 'admin'
            });

            User.hasOne(models.Doctor, {
                foreignKey: 'userId',
                as: 'doctor'
            });

            User.hasOne(models.Patient, {
                foreignKey: 'userId',
                as: 'patient'
            });

            User.hasOne(models.Receptionist, {
                foreignKey: 'userId',
                as: 'receptionist'
            });
        }
    }
    User.init(
        {
            branchId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            verify: DataTypes.BOOLEAN,
            otp: DataTypes.STRING,
            otpExpires: DataTypes.DATE,
            refreshToken: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'User'
        }
    );
    return User;
};
