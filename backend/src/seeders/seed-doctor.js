'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Doctors', [
            {
                userId: '13',
                specialtyId: '1',
                room: '101',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '14',
                specialtyId: '2',
                room: '102',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '15',
                specialtyId: '3',
                room: '103',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '16',
                specialtyId: '4',
                room: '104',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: '17',
                specialtyId: '5',
                room: '105',
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
