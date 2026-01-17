const specialtyService = require('../services/specialty.service');

const getSpecialtyController = async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        let q = req.query.q || ''; // Lấy tham số tìm kiếm

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        // Truyền thêm q vào service
        const response = await specialtyService.getSpecialtyService(
            page,
            limit,
            q,
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getSpecialty:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = { getSpecialtyController };
