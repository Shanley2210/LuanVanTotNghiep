'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Specialties', [
            {
                name: 'Nội khoa',
                description:
                    'Chẩn đoán và điều trị bệnh lý của các cơ quan nội tạng không cần phẫu thuật (như tim, phổi, thận, tiêu hóa, nội tiết).',
                image: '/uploads/specialties/general.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tim mạch',
                description:
                    'Chẩn đoán và điều trị các bệnh lý về tim và mạch máu.',
                image: '/uploads/specialties/cardio.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nhi khoa',
                description:
                    'Chăm sóc sức khỏe và điều trị bệnh lý cho trẻ sơ sinh, trẻ em và trẻ vị thành niên.',
                image: '/uploads/specialties/pediatric.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mắt',
                description:
                    'Chẩn đoán và điều trị các bệnh lý về mắt và thị lực.',
                image: '/uploads/specialties/eye.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nha khoa',
                description: 'Chăm sóc và điều trị các bệnh lý của răng',
                image: '/uploads/specialties/dental.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hô hấp',
                description:
                    'Chẩn đoán và điều trị các bệnh lý về phổi và đường hô hấp.',
                image: '/uploads/specialties/respi.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nội tiết',
                description:
                    'Chẩn đoán và điều trị các rối loạn nội tiết và chuyển hóa (như tiểu đường, tuyến giáp).',
                image: '/uploads/specialties/endo.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Dị ứng',
                description:
                    'Chẩn đoán và điều trị các bệnh lý liên quan đến hệ miễn dịch và dị ứng.',
                image: '/uploads/specialties/allergy.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lão khoa',
                description:
                    'Chăm sóc sức khỏe toàn diện và điều trị bệnh lý ở người cao tuổi.',
                image: '/uploads/specialties/geria.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Truyền nhiễm',
                description:
                    'Chẩn đoán và điều trị các bệnh lý do vi khuẩn, virus, nấm, ký sinh trùng.',
                image: '/uploads/specialties/infect.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Thần kinh',
                description:
                    'Chẩn đoán và điều trị các bệnh lý của hệ thần kinh (não, tủy sống, dây thần kinh).',
                image: '/uploads/specialties/neuro.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tiêu hóa',
                description:
                    'Chẩn đoán và điều trị các bệnh lý của hệ tiêu hóa (thực quản, dạ dày, ruột, gan, tụy).',
                image: '/uploads/specialties/gastro.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chấn thương chỉnh hình',
                description:
                    'Điều trị bệnh lý và chấn thương của hệ cơ xương khớp (xương, khớp, dây chằng, gân).',
                image: '/uploads/specialties/muscu.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Y học cổ truyền',
                description:
                    'Ứng dụng các phương pháp truyền thống (như châm cứu, thuốc nam) trong điều trị.',
                image: '/uploads/specialties/tradi.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tâm thần',
                description:
                    'Chẩn đoán và điều trị các rối loạn sức khỏe tâm thần.',
                image: '/uploads/specialties/mental.webp',
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
