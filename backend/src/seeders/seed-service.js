'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Services', [
            {
                name: 'Nội tổng quát',
                description:
                    'Khám bệnh lý nội khoa không chuyên sâu, đánh giá các triệu chứng liên quan đến tim, phổi, tiêu hóa, thận.',
                durationMinutes: 45,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngoại tổng quát',
                description:
                    'Khám bệnh lý cần can thiệp phẫu thuật, đánh giá các khối u, chấn thương hoặc dị tật cần mổ.',
                durationMinutes: 35,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Phụ khoa',
                description:
                    'Khám và tầm soát các bệnh lý của cơ quan sinh dục nữ (tử cung, buồng trứng, âm đạo).',
                durationMinutes: 25,
                price: 280000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Nhi định kỳ',
                description:
                    'Đánh giá sự phát triển thể chất, tinh thần của trẻ và tiêm chủng.',
                durationMinutes: 40,
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám mắt cơ bản',
                description:
                    'Kiểm tra thị lực, đo khúc xạ và khám các cấu trúc ngoài của mắt.',
                durationMinutes: 50,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Tai Mũi Họng',
                description:
                    'Nội soi hoặc khám lâm sàng để đánh giá tình trạng tai, mũi, họng, thanh quản.',
                durationMinutes: 35,
                price: 380000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nội soi tiêu hóa',
                description:
                    'Dùng ống mềm có gắn camera để quan sát bên trong thực quản, dạ dày, tá tràng hoặc đại tràng.',
                durationMinutes: 40,
                price: 420000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Siêu âm bụng tổng quát',
                description:
                    'Sử dụng sóng siêu âm để tạo hình ảnh các cơ quan nội tạng trong ổ bụng (gan, thận, tụy, mật, lách).',
                durationMinutes: 30,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám lão khoa',
                description: 'Khám người cao tuổi.',
                durationMinutes: 45,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Răng tổng quát',
                description:
                    'Kiểm tra sức khỏe răng miệng, nướu và hàm, phát hiện sâu răng, viêm nướu.',
                durationMinutes: 30,
                price: 340000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lấy cao răng',
                description:
                    'Loại bỏ mảng bám và cao răng trên bề mặt răng và dưới đường viền nướu.',
                durationMinutes: 45,
                price: 470000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Thần kinh',
                description:
                    'Đánh giá phản xạ, cảm giác, sức mạnh cơ bắp, thăng bằng và chức năng nhận thức.',
                durationMinutes: 40,
                price: 430000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },      
            {
                name: 'Tiêm chủng',
                description:
                    'Cung cấp vắc-xin để tạo miễn dịch chủ động phòng ngừa các bệnh truyền nhiễm.',
                durationMinutes: 60,
                price: 670000,
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
