const specialtyService = require('../services/specialty.service');

const getSpecialtyController = async (req, res) => {
    try {
        // Lấy tham số page và limit, đặt giá trị mặc định nếu không có
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        // Đảm bảo page và limit là số dương
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const response = await specialtyService.getSpecialtyService(page, limit);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getSpecialty:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};



module.exports = { getSpecialtyController };
