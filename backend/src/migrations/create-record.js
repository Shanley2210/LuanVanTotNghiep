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
                allowNull: true
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            appointmentId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            symptoms: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            physicalExam: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            diagnosis: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            treatment: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            prescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            reExamDate: {
                type: Sequelize.DATEONLY,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Records');
    }
};
