'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('DoctorServices', [
            // Bác sĩ Tim mạch 1 (doctorId: 1)
            {
                doctorId: 1,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám tổng quát
            {
                doctorId: 1,
                serviceId: 2,
                price: 450000,
                status: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Nội tổng quát
            {
                doctorId: 1,
                serviceId: 12,
                price: 460000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Siêu âm Doppler tim
            {
                doctorId: 1,
                serviceId: 13,
                price: 480000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Điện tâm đồ

            // Bác sĩ Nhi khoa (doctorId: 2)
            {
                doctorId: 2,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 2,
                serviceId: 6,
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám Nhi định kỳ
            {
                doctorId: 2,
                serviceId: 26,
                price: 670000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Tiêm chủng

            // Bác sĩ Da liễu (doctorId: 3)
            {
                doctorId: 3,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 3,
                serviceId: 20,
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám Da liễu

            // Bác sĩ Tai Mũi Họng (doctorId: 4)
            {
                doctorId: 4,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 4,
                serviceId: 9,
                price: 380000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám TMH

            // Bác sĩ Mắt (doctorId: 5)
            {
                doctorId: 5,
                serviceId: 7,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám mắt cơ bản
            {
                doctorId: 5,
                serviceId: 8,
                price: 380000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Soi đáy mắt

            // Bác sĩ Cơ Xương Khớp (doctorId: 7)
            {
                doctorId: 7,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 7,
                serviceId: 2,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 7,
                serviceId: 14,
                price: 410000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Chụp X-quang
            {
                doctorId: 7,
                serviceId: 16,
                price: 300000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Chụp MRI

            // Bác sĩ Thần kinh (doctorId: 8)
            {
                doctorId: 8,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 8,
                serviceId: 23,
                price: 430000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Khám Thần kinh

            // Bác sĩ Tiêu hóa (doctorId: 9)
            {
                doctorId: 9,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 9,
                serviceId: 10,
                price: 420000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Nội soi tiêu hóa
            {
                doctorId: 9,
                serviceId: 11,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Siêu âm bụng

            // Bác sĩ Tim mạch 2 (doctorId: 10)
            {
                doctorId: 10,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 10,
                serviceId: 12,
                price: 460000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 10,
                serviceId: 13,
                price: 480000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },

            // Bác sĩ Nội tổng quát cao cấp (doctorId: 11)
            {
                doctorId: 11,
                serviceId: 11,
                serviceId: 1,
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 11,
                serviceId: 2,
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                doctorId: 11,
                serviceId: 11,
                price: 330000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Siêu âm bụng
            {
                doctorId: 11,
                serviceId: 13,
                price: 480000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Điện tâm đồ
            {
                doctorId: 11,
                serviceId: 17,
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }, // Xét nghiệm máu tổng quát
            {
                doctorId: 11,
                serviceId: 18,
                price: 360000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            } // Sinh hóa máu
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('DoctorServices', null, {});
    }
};
