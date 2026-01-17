'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('DoctorServices', [
            // --- NHÓM 1: Tim mạch (Chỉ định: Nội tổng quát) ---
            // Doc 1, Doc 27 (Đã xóa Doc 51)
            {
                doctorId: 1,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 27,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 2: Nhi khoa (Chỉ định: Khám Nhi + Tiêm chủng) ---
            // Doc 2, Doc 30
            {
                doctorId: 2,
                serviceId: 4,
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 2,
                serviceId: 13,
                price: 670000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 30,
                serviceId: 4,
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 30,
                serviceId: 13,
                price: 670000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 3: Tai Mũi Họng (Chỉ định: Khám TMH) ---
            // Doc 4, Doc 28
            {
                doctorId: 4,
                serviceId: 6,
                price: 380000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 28,
                serviceId: 6,
                price: 380000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 4: Mắt (Chỉ định: Khám Mắt) ---
            // Doc 5, Doc 33
            {
                doctorId: 5,
                serviceId: 5,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 33,
                serviceId: 5,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 5: Răng Hàm Mặt (Chỉ định: Khám Răng + Lấy cao răng) ---
            // Doc 6, Doc 34
            {
                doctorId: 6,
                serviceId: 10,
                price: 340000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 6,
                serviceId: 11,
                price: 470000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 34,
                serviceId: 10,
                price: 340000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 34,
                serviceId: 11,
                price: 470000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 6: Sản Phụ khoa (Chỉ định: Khám Phụ khoa + Siêu âm bụng) ---
            // Doc 7, Doc 16, Doc 31, Doc 42
            {
                doctorId: 7,
                serviceId: 3,
                price: 280000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 7,
                serviceId: 8,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 16,
                serviceId: 3,
                price: 280000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 31,
                serviceId: 3,
                price: 280000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 42,
                serviceId: 3,
                price: 280000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 42,
                serviceId: 8,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 7: Tiêu hóa & Gan mật (Chỉ định: Nội soi + Siêu âm bụng) ---
            // Doc 21, Doc 26, Doc 45, Doc 50
            {
                doctorId: 21,
                serviceId: 8,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, // Gan mật
            {
                doctorId: 26,
                serviceId: 7,
                price: 420000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, // Tiêu hóa
            {
                doctorId: 26,
                serviceId: 8,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 45,
                serviceId: 8,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, // Gan mật
            {
                doctorId: 50,
                serviceId: 7,
                price: 420000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, // Tiêu hóa

            // --- NHÓM 8: Thần kinh (Chỉ định: Khám Thần kinh) ---
            // Doc 25, Doc 49
            {
                doctorId: 25,
                serviceId: 12,
                price: 430000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 49,
                serviceId: 12,
                price: 430000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 9: Lão khoa (Chỉ định: Khám Lão khoa) ---
            // Doc 17, Doc 41
            {
                doctorId: 17,
                serviceId: 9,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 41,
                serviceId: 9,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 10: Ngoại khoa / Nam học / Cơ Xương Khớp (Chỉ định: Ngoại tổng quát) ---
            // Doc 8, Doc 22, Doc 32, Doc 24(Khớp), Doc 44(Niệu), Doc 48(Khớp)
            {
                doctorId: 8,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 32,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 22,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 24,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 48,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // --- NHÓM 11: Các chuyên khoa Nội khác (Hô hấp, Nội tiết, Dị ứng, Da liễu, Ung bướu...) ---
            // (Đã xóa Doc 52)
            {
                doctorId: 3,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 9,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 10,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 11,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 12,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 13,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 14,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 18,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 20,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 23,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 29,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 35,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 36,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 37,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 38,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 39,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 40,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 43,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 44,
                serviceId: 2,
                price: 350000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 46,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                doctorId: 47,
                serviceId: 1,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('DoctorServices', null, {});
    },
};
