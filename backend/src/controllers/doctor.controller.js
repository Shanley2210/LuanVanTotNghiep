const doctorService = require('../services/doctor.service');

const getAllDoctorsController = async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        let status = req.query.status;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const response = await doctorService.getAllDoctorsService(
            page,
            limit,
            status
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getAllDoctors:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getDoctorByIdController = async (req, res) => {
    try {
        const doctorId = req.params.id;

        if (!doctorId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await doctorService.getDoctorByIdService(doctorId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getDoctorById:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getSchedulesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date, start, end } = req.query;

        const response = await doctorService.getSchedulesService(
            userId,
            date,
            start,
            end
        );
        return res.status(200).json(response);
    } catch (e) {
        return res
            .status(500)
            .json({ errCode: -1, message: 'Error from server' });
    }
};

const getSlotsController = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const date = req.query.date;

        if (!date || !doctorId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await doctorService.getSlotsService(doctorId, date);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getSlots:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getDoctorBySpecialtyController = async (req, res) => {
    try {
        const specialtyId = req.params.id;

        if (!specialtyId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await doctorService.getDoctorBySpecialtyService(
            specialtyId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getDoctorBySpecialty:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getAppointmentsController = async (req, res) => {
    try {
        const userId = req.user.id;

        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        let status = req.query.status;
        let date = req.query.date;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const response = await doctorService.getAppointmentsService(
            userId,
            page,
            limit,
            status,
            date
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getAppointments:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getDoctorByServiceController = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const status = req.query.status;

        if (!serviceId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await doctorService.getDoctorByServiceService(
            serviceId,
            page,
            limit,
            status
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getDoctorByService:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const toggleSlotController = async (req, res) => {
    try {
        const userId = req.user.id;
        const slotId = req.params.id;

        if (!slotId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await doctorService.toggleSlotService(userId, slotId);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const closeSlotsByDateController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date } = req.body;

        if (!date) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters (date)',
                errViMessage: 'Thiếu tham số bắt buộc (ngày)'
            });
        }

        const response = await doctorService.closeSlotsByDateService(
            userId,
            date
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in closeSlotsByDateController:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server',
            details: e.message
        });
    }
};

const openSlotsByDateController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date } = req.body;

        if (!date) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters (date)',
                errViMessage: 'Thiếu tham số bắt buộc (ngày)'
            });
        }

        const response = await doctorService.openSlotsByDateService(
            userId,
            date
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in openSlotsByDateController:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server',
            details: e.message
        });
    }
};

const getAppointmentDetailController = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await doctorService.getAppointmentDetailService(
            appointmentId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getAppointmentDetailController:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const completeExamController = async (req, res) => {
    try {
        const data = req.body;

        if (!data.appointmentId || !data.a || !data.p) {
            return resolve({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await doctorService.completeExamService(data);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error completeExam:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    getAllDoctorsController,
    getDoctorByIdController,
    getSchedulesController,
    getSlotsController,
    getDoctorBySpecialtyController,
    getAppointmentsController,
    getDoctorByServiceController,
    toggleSlotController,
    closeSlotsByDateController,
    openSlotsByDateController,
    getAppointmentDetailController,
    completeExamController
};
