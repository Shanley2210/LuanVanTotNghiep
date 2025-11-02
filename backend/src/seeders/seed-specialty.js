'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Specialties', [
            {
                name: 'Nội tổng quát',
                description:
                    'Chẩn đoán và điều trị các bệnh lý nội khoa thông thường như cảm cúm, viêm phổi, tăng huyết áp, tiểu đường...',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngoại tổng quát',
                description:
                    'Khám và điều trị các bệnh cần can thiệp phẫu thuật như viêm ruột thừa, thoát vị, chấn thương phần mềm...',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nhi khoa',
                description:
                    'Chuyên khám và điều trị cho trẻ sơ sinh, trẻ nhỏ và thanh thiếu niên về các bệnh lý thông thường và đặc thù.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sản phụ khoa',
                description:
                    'Chăm sóc sức khỏe sinh sản, khám thai, tư vấn kế hoạch hóa gia đình và điều trị bệnh lý phụ khoa.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tai - Mũi - Họng',
                description:
                    'Khám và điều trị các bệnh về tai, mũi, họng như viêm xoang, viêm amidan, ù tai, giảm thính lực...',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mắt',
                description:
                    'Chuyên khám, điều trị các bệnh về mắt như cận thị, loạn thị, viêm kết mạc, đục thủy tinh thể...',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Răng - Hàm - Mặt',
                description:
                    'Khám và điều trị các vấn đề răng miệng, chỉnh nha, nhổ răng, phục hình răng và phẫu thuật thẩm mỹ hàm mặt.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Da liễu',
                description:
                    'Điều trị các bệnh về da như mụn, viêm da, dị ứng, nấm da và tư vấn chăm sóc da liễu.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tim mạch',
                description:
                    'Khám, tư vấn và điều trị các bệnh liên quan đến tim mạch như tăng huyết áp, đau thắt ngực, rối loạn nhịp tim.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Thần kinh',
                description:
                    'Chẩn đoán và điều trị các bệnh lý thần kinh như đau đầu, mất ngủ, rối loạn tiền đình, tai biến mạch máu não...',
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
