'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DoctorServices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Doctors',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            serviceId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Services',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addConstraint('DoctorServices', {
            fields: ['doctorId', 'serviceId'],
            type: 'unique',
            name: 'unique_doctor_service_constraint'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('DoctorServices');
    }
};
