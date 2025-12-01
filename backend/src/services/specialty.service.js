const db = require('../models');

const getSpecialtyService = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            const { count, rows } = await db.Specialty.findAndCountAll({
                offset: offset,
                limit: limit,
                distinct: true,
                include: [
                    {
                        model: db.Doctor,
                        as: 'doctors',
                        attributes: ['id']
                    }
                ],
                order: [['updatedAt', 'DESC']]
            });

            if (!rows || rows.length === 0) {
                return resolve({
                    errCode: 0,
                    message: 'No specialties found',
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
                    totalPages: totalPages
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = { getSpecialtyService };
