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
                name: 'Da liễu',
                description:
                    'Chẩn đoán và điều trị các bệnh lý về da, tóc và móng.',
                image: '/uploads/specialties/derma.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tai mũi họng',
                description: 'TMH.',
                image: '/uploads/specialties/ent.webp',
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
                name: 'Sản phụ khoa',
                description:
                    'Chăm sóc thai kỳ, sinh nở và các bệnh lý của hệ sinh sản nữ giới.',
                image: '/uploads/specialties/gyne.webp',
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
                name: 'Ung bướu',
                description: 'Chẩn đoán và điều trị các loại ung thư.',
                image: '/uploads/specialties/onco.webp',
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
                name: 'Thận tiết niệu',
                description:
                    'Thận học chuyên về bệnh lý thận, Tiết niệu chuyên về hệ thống tiết niệu nam và nữ, và hệ sinh sản nam.',
                image: '/uploads/specialties/nephro.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Huyết học',
                description:
                    'Chẩn đoán và điều trị các bệnh lý về máu và cơ quan tạo máu.',
                image: '/uploads/specialties/hema.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phục hồi',
                description:
                    'Giúp bệnh nhân phục hồi chức năng sau chấn thương hoặc bệnh lý.',
                image: '/uploads/specialties/rehab.webp',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phẫu thuật tạo hình',
                description:
                    'Phẫu thuật tái tạo hoặc chỉnh sửa hình dạng cơ thể và chức năng.',
                image: '/uploads/specialties/plastic.webp',
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
                name: 'Ngoại khoa',
                description: 'Điều trị bệnh lý bằng phương pháp phẫu thuật.',
                image: '/uploads/specialties/surg.webp',
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
            },
            {
                name: 'Gây mê hồi sức',
                description:
                    'Quản lý đau, gây mê/tỉnh trong phẫu thuật và chăm sóc bệnh nhân trong tình trạng nguy kịch (Hồi sức tích cực)..',
                image: '/uploads/specialties/anes.webp',
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
