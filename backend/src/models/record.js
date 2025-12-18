'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Record extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Record.belongsTo(models.Doctor, {
                foreignKey: 'doctorId',
                as: 'doctor'
            });

            Record.belongsTo(models.Patient, {
                foreignKey: 'patientId',
                as: 'patient'
            });

            Record.belongsTo(models.Appointment, {
                foreignKey: 'appointmentId',
                as: 'appointment'
            });

            Record.hasOne(models.Payment, {
                foreignKey: 'recordId',
                as: 'payment'
            });
        }
    }
    Record.init(
        {
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            appointmentId: DataTypes.INTEGER,
            symptoms: DataTypes.TEXT, // S Triệu chứng
            physicalExam: DataTypes.TEXT, // O Khám thực thể
            diagnosis: DataTypes.TEXT, // A Chuẩn đoán
            treatment: DataTypes.TEXT, // P Điều trị
            prescription: DataTypes.TEXT,
            reExamDate: DataTypes.DATEONLY
        },
        {
            sequelize,
            modelName: 'Record'
        }
    );
    return Record;
};
