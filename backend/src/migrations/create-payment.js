'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            appointmentId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            recordId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            amount: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            method: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            txnRef: {
                type: Sequelize.STRING,
                allowNull: true
            },
            returnData: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable('Payments');
    }
};
