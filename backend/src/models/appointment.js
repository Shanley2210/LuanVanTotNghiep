'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Appointment.belongsTo(models.Doctor, {
                foreignKey: 'doctorId',
                as: 'doctor'
            });

            Appointment.belongsTo(models.Patient, {
                foreignKey: 'patientId',
                as: 'patient'
            });

            Appointment.belongsTo(models.Slot, {
                foreignKey: 'slotId',
                as: 'slot'
            });

            Appointment.hasOne(models.Record, {
                foreignKey: 'appointmentId',
                as: 'record'
            });

            Appointment.belongsTo(models.Queue, {
                foreignKey: 'queueId',
                as: 'queue'
            });

            Appointment.belongsTo(models.Service, {
                foreignKey: 'serviceId',
                as: 'service'
            });

            Appointment.hasOne(models.Payment, {
                foreignKey: 'appointmentId',
                as: 'payment'
            });
        }
    }
    Appointment.init(
        {
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            slotId: DataTypes.INTEGER,
            queueId: DataTypes.INTEGER,
            serviceId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            deposit: DataTypes.DECIMAL,
            deposited: DataTypes.DECIMAL,
            type: DataTypes.STRING,
            finalPrice: DataTypes.DECIMAL,
            bookingFor: DataTypes.STRING,
            patientName: DataTypes.STRING,
            patientGender: DataTypes.STRING,
            patientPhone: DataTypes.STRING,
            patientEmail: DataTypes.STRING,
            patientDob: DataTypes.STRING,
            patientEthnicity: DataTypes.STRING,
            patientAddress: DataTypes.STRING,
            reason: DataTypes.TEXT,
            // isRemind24h: DataTypes.BOOLEAN,
            // isRemind2h: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'Appointment'
        }
    );
    return Appointment;
};
