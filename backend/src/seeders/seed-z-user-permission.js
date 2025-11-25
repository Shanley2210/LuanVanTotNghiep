'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const UserPermissions = [
            // System Admin (userId: 1): system_management, user_manage_all, user_view_all, view_user_detail
            { userId: 1, permissionId: 1 },
            { userId: 1, permissionId: 2 },
            { userId: 1, permissionId: 3 },
            { userId: 1, permissionId: 11 },

            // Hospital Admin (userId: 2): user_manage_all, user_view_all, doctor_manage, service_manage, doctor_schedule_manage, view_user_detail
            { userId: 2, permissionId: 2 },
            { userId: 2, permissionId: 3 },
            { userId: 2, permissionId: 4 },
            { userId: 2, permissionId: 7 },
            { userId: 2, permissionId: 10 },
            { userId: 2, permissionId: 11 },

            // Doctors (userId: 3 to 52): patient_view_medical_history, view_user_detail, view_doctor_schedule, view_doctor_appointment
            ...Array.from({ length: 50 }, (_, i) => i + 3).flatMap((userId) => [
                { userId, permissionId: 5 },
                { userId, permissionId: 11 },
                { userId, permissionId: 12 },
                { userId, permissionId: 13 }
            ]),

            // Receptionists (userId: 53 to 57): queue_manage, comfirm_appointment
            ...Array.from({ length: 5 }, (_, i) => i + 53).flatMap((userId) => [
                { userId, permissionId: 14 },
                { userId, permissionId: 15 }
            ]),

            // Patients (userId: 58 to 107): patient_book_appointment, profile_manage
            ...Array.from({ length: 50 }, (_, i) => i + 58).flatMap(
                (userId) => [
                    { userId, permissionId: 8 },
                    { userId, permissionId: 9 }
                ]
            )
        ];
        // Thêm trường thời gian
        const finalUserPermissions = UserPermissions.map((item) => ({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        return queryInterface.bulkInsert(
            'UserPermissions',
            finalUserPermissions
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('UserPermissions', null, {});
    }
};
