'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Patient.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });

            Patient.hasMany(models.Record, {
                foreignKey: 'patientId',
                as: 'records'
            });

            Patient.hasMany(models.Appointment, {
                foreignKey: 'patientId',
                as: 'appointments'
            });
        }
    }
    Patient.init(
        {
            userId: DataTypes.INTEGER,
            dob: DataTypes.DATE,
            gender: DataTypes.STRING,
            insurance: DataTypes.STRING,
            allergies: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Patient'
        }
    );
    return Patient;
};
