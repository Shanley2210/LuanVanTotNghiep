'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                name: 'Shanley',
                email: 'sysadmin@gmail.com',
                phone: '09876543210',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                role: 'admin',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Shanley',
                email: 'hopadmin@gmail.com',
                phone: '0987654321',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                role: 'admin',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BS1',
                email: 'BS1@dwakm.com',
                phone: '098999999',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                role: 'admin',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'LT1',
                email: 'LT1@dwakm.com',
                phone: '11111111111',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                role: 'receptionist',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BN1',
                email: 'BN1@dwakm.com',
                phone: '0111111111',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                role: 'admin',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
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
