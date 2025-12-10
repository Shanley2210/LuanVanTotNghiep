const serviceService = require('../services/service.service');

const getServiceController = async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const response = await serviceService.getServiceService(page, limit);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getService:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getServiceByIdController = async (req, res) => {
    try {
        const serviceId = req.params.id;

        if (!serviceId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await serviceService.getServiceByIdService(serviceId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getServiceById:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = { getServiceController, getServiceByIdController };
