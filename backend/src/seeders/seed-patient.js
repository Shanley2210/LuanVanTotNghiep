'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Patients', [
            {
                userId: '5',
                dob: '2001-10-10',
                gender: '1',
                insurance: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                allergies: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
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
