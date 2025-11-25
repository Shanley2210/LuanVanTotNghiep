'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Receptionists', [
            {
                userId: 53,
                image: '/uploads/users/recep1.webp',
                dob: '1990-01-10',
                gender: '1',
                ethnicity: 'Kinh',
                address: '123 Trần Phú, Hà Nội',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 54,
                image: '/uploads/users/recep2.webp',
                dob: '1992-03-15',
                gender: '1',
                ethnicity: 'Kinh',
                address: '456 Lê Lợi, TP. Hồ Chí Minh',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 55,
                image: '/uploads/users/recep3.webp',
                dob: '1988-05-20',
                gender: '1',
                ethnicity: 'Kinh',
                address: '789 Nguyễn Huệ, Đà Nẵng',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 56,
                image: '/uploads/users/recep4.webp',
                dob: '1991-07-25',
                gender: '1',
                ethnicity: 'Kinh',
                address: '101 Phan Chu Trinh, Cần Thơ',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 57,
                image: '/uploads/users/recep5.webp',
                dob: '1989-09-30',
                gender: '1',
                ethnicity: 'Kinh',
                address: '112 Trần Hưng Đạo, Hải Phòng',
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
