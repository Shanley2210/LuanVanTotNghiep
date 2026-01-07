'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            slotId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            queueId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            serviceId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            deposit: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            deposited: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            finalPrice: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            bookingFor: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientName: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientGender: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientPhone: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientEmail: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientDob: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientEthnicity: {
                type: Sequelize.STRING,
                allowNull: true
            },
            patientAddress: {
                type: Sequelize.STRING,
                allowNull: true
            },
            reason: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            isRemind24h: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            isRemind2h: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Appointments');
    }
};
