'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Danh sách các User và RoleId tương ứng
        const userRoles = [
            { userId: 1, roleId: 1 }, // System_Admin
            { userId: 2, roleId: 2 }, // Hospital_Admin
            // Doctors: userId 3-52, roleId 4 (Doctor)
            ...Array.from({ length: 50 }, (_, i) => ({
                userId: i + 3,
                roleId: 4
            })),
            // Receptionists: userId 53-57, roleId 5 (Receptionist)
            ...Array.from({ length: 5 }, (_, i) => ({
                userId: i + 53,
                roleId: 5
            })),
            // Patients: userId 58-107, roleId 3 (Patient)
            ...Array.from({ length: 50 }, (_, i) => ({
                userId: i + 58,
                roleId: 3
            }))
        ];

        const finalUserRoles = userRoles.map((item) => ({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        return queryInterface.bulkInsert('UserRoles', finalUserRoles);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('UserRoles', null, {});
    }
};
