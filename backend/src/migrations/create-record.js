'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Records', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            serviceId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            appointmentId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            examDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            diagnosis: {
                type: Sequelize.STRING,
                allowNull: false
            },
            symptoms: {
                type: Sequelize.STRING,
                allowNull: false
            },
            soapNotes: {
                type: Sequelize.STRING,
                allowNull: false
            },
            prescription: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reExamDate: {
                type: Sequelize.DATE,
                allowNull: false
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
        await queryInterface.dropTable('Records');
    }
};
