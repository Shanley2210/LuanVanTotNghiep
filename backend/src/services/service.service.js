const { Op } = require('sequelize');
const db = require('../models');

const getServiceService = (page, limit, q) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            // Cấu hình query mặc định
            let options = {
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']],
                where: {} // Điều kiện lọc
            };

            // Nếu có từ khóa tìm kiếm -> Thêm điều kiện LIKE theo tên dịch vụ
            if (q) {
                options.where.name = {
                    [Op.like]: `%${q.trim()}%`
                };
            }

            const { count, rows } = await db.Service.findAndCountAll(options);

            // Xử lý khi không có dữ liệu (trả về mảng rỗng chuẩn format)
            if (!rows) {
                return resolve({
                    errCode: 0,
                    message: 'No services found',
                    data: [],
                    meta: {
                        page: page,
                        limit: limit,
                        totalRows: 0,
                        totalPages: 0
                    }
                });
            }

            const totalPages = Math.ceil(count / limit);

            return resolve({
                errCode: 0,
                message: 'Get service successful',
                data: rows,
                meta: {
                    page: page,
                    limit: limit,
                    totalRows: count,
                    totalPages: totalPages
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getServiceByIdService = (serviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = await db.Service.findOne({
                where: { id: serviceId }
            });

            if (!service) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Service not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get service successful',
                data: service
            });
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = { getServiceService, getServiceByIdService };
