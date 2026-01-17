const { Op } = require('sequelize');
const db = require('../models');

const getSpecialtyService = (page, limit, q) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            // Xây dựng điều kiện tìm kiếm
            let options = {
                offset: offset,
                limit: limit,
                distinct: true,
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctors',
                        attributes: ['id'],
                    },
                ],
                order: [['updatedAt', 'DESC']],
                where: {}, // Mặc định là object rỗng
            };

            // Nếu có từ khóa tìm kiếm, thêm điều kiện WHERE LIKE name
            if (q) {
                options.where.name = {
                    [Op.like]: `%${q.trim()}%`,
                };
            }

            const { count, rows } = await db.Specialty.findAndCountAll(options);

            // Xử lý kết quả trả về (giống logic cũ)
            const totalPages = Math.ceil(count / limit);

            // Nếu không có dữ liệu nhưng vẫn trả về cấu trúc chuẩn để FE không bị lỗi
            const data = rows.map((item) => {
                const json = item.toJSON();
                json.doctorCount = json.doctors ? json.doctors.length : 0;
                delete json.doctors;
                return json;
            });

            return resolve({
                errCode: 0,
                message: 'Get specialty successful',
                data: data,
                meta: {
                    page: page,
                    limit: limit,
                    totalRows: count,
                    totalPages: totalPages,
                },
            });
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = { getSpecialtyService };
