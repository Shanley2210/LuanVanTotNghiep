const db = require('../models');

const getServiceService = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            const { count, rows } = await db.Service.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']]
            });

            if (!rows || rows.length === 0) {
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
