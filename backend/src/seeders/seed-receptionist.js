'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Receptionists', [
            {
                userId: '18',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '19',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '20',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
