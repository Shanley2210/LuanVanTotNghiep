const receptionistService = require('../services/receptionist.service');

const getNewAppointmentsController = async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        let status = req.query.status;
        let date = req.query.date;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const response = await receptionistService.getNewAppointmentsService(
            page,
            limit,
            status,
            date
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getNewAppointmentsController:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const confirmAppointmentController = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await receptionistService.confirmAppointmentService(
            appointmentId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in confirmAppointment:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const checkInController = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user.id;

        if (!userId || !appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await receptionistService.checkInService(
            appointmentId,
            userId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in checkIn:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    getNewAppointmentsController,
    confirmAppointmentController,
    checkInController
};
