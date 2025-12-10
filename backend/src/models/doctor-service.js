'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorService extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DoctorService.belongsTo(models.Doctor, {
                foreignKey: 'doctorId',
                as: 'doctor'
            });

            DoctorService.belongsTo(models.Service, {
                foreignKey: 'serviceId',
                as: 'service'
            });
        }
    }
    DoctorService.init(
        {
            doctorId: DataTypes.INTEGER,
            serviceId: DataTypes.INTEGER,
            price: DataTypes.DECIMAL,
            status: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'DoctorService'
        }
    );
    return DoctorService;
};
