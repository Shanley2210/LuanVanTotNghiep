'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Services', [
            {
                name: 'Khám tổng quát',
                description:
                    'Đánh giá toàn diện tình trạng sức khỏe, bao gồm tiền sử bệnh, khám lâm sàng và các xét nghiệm cơ bản.',
                durationMinutes: 30,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
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
                name: 'Khám Sản',
                description:
                    'Chăm sóc và theo dõi sức khỏe mẹ và thai nhi trong suốt thai kỳ.',
                durationMinutes: 30,
                price: 320000,
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
                name: 'Soi đáy mắt',
                description:
                    'Khám võng mạc, đĩa thị và mạch máu ở đáy mắt để phát hiện bệnh lý.',
                durationMinutes: 35,
                price: 380000,
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
                name: 'Siêu âm Doppler tim',
                description:
                    'Đánh giá cấu trúc, chức năng và dòng máu chảy qua tim.',
                durationMinutes: 45,
                price: 460000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Điện tâm đồ',
                description:
                    'Ghi lại hoạt động điện của tim để phát hiện các rối loạn nhịp hoặc thiếu máu cơ tim.',
                durationMinutes: 50,
                price: 480000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chụp X-quang',
                description:
                    'Sử dụng tia X để tạo hình ảnh xương và một số mô mềm (thường là phổi).',
                durationMinutes: 40,
                price: 410000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chụp cắt lớp vi tính',
                description:
                    'Sử dụng tia X và máy tính để tạo ra các hình ảnh cắt ngang chi tiết của cơ thể.',
                durationMinutes: 60,
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chụp cộng hưởng từ',
                description:
                    'Sử dụng từ trường mạnh và sóng vô tuyến để tạo ra hình ảnh chi tiết của các mô mềm.',
                durationMinutes: 30,
                price: 300000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Xét nghiệm máu tổng quát',
                description:
                    'Phân tích các thành phần của máu (hồng cầu, bạch cầu, tiểu cầu) để chẩn đoán thiếu máu, nhiễm trùng.',
                durationMinutes: 50,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Xét nghiệm sinh hóa máu',
                description:
                    'Đo lường các chất hóa học trong máu (đường, mỡ, men gan, chức năng thận) để đánh giá chức năng các cơ quan.',
                durationMinutes: 35,
                price: 360000,
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
                name: 'Khám Da liễu',
                description:
                    'Đánh giá các tổn thương trên da, tóc, móng và đưa ra chẩn đoán, kế hoạch điều trị.',
                durationMinutes: 40,
                price: 400000,
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
                name: 'Khám Tâm lý/Tâm thần',
                description:
                    'Đánh giá trạng thái tinh thần, cảm xúc, hành vi và nhận thức để chẩn đoán rối loạn tâm thần.',
                durationMinutes: 35,
                price: 370000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khám Phục hồi chức năng',
                description:
                    'Đánh giá mức độ tổn thương và khả năng vận động, lập kế hoạch vật lý trị liệu.',
                durationMinutes: 60,
                price: 550000,
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
