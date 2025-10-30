'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            adminId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            reportType: {
                type: Sequelize.STRING,
                allowNull: false
            },
            fromDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            toDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createBy: {
                type: Sequelize.STRING,
                allowNull: false
            },
            generatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            dataJson: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable('Reports');
    }
};
