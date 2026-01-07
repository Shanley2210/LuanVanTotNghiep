const patientService = require('../services/patient.service');

const getDetailPatientController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.getDetailPatientService(userId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getDetailPatient:', e);
        return res
            .status(500)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const createProfilePatientController = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        if (!data || !userId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await patientService.createProfilePatientService(
            userId,
            data
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in createPatient:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const updateProfilePatientController = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        if (!data) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await patientService.updateProfilePatientService(
            userId,
            data
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in updatePatient:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getAppointmentsController = async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const userId = req.user.id;

        const response = await patientService.getAppointmentsService(
            userId,
            page,
            limit
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

const createAppointmentController = async (req, res) => {
    const userId = req.user.id;

    const {
        doctorId,
        slotId,
        serviceId,
        bookingFor,
        patientName,
        patientGender,
        patientPhone,
        patientEmail,
        patientDob,
        patientEthnicity,
        patientAddress,
        reason
    } = req.body;

    const response = await patientService.createAppointmentService({
        userId: userId,
        doctorId: doctorId,
        slotId: slotId,
        serviceId: serviceId,
        bookingInfo: {
            bookingFor,
            patientName,
            patientGender,
            patientPhone,
            patientEmail,
            patientDob,
            patientEthnicity,
            patientAddress,
            reason
        }
    });

    return res.status(200).json(response);
};

const updateAppointmentController = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointmentId = req.params.id;
        const data = req.body;

        if (!data || !appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.updateAppointmentService(
            userId,
            appointmentId,
            data
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in updateAppointment:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const deleteAppointmentController = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.deleteAppointmentService(
            userId,
            appointmentId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in deleteAppointment:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const searchPublicController = async (req, res) => {
    try {
        const { q } = req.query;

        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        if (!q) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await patientService.searchPublicService(
            q,
            page,
            limit
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in searchPublic:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const fakePaymentController = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.fakePaymentService(appointmentId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in fakePayment:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getRecordController = async (req, res) => {
    try {
        const userId = req.user.id;
        const recordId = req.params.id;

        if (!recordId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await patientService.getRecordService(
            userId,
            recordId
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getRecord:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const downloadRecordController = async (req, res) => {
    try {
        const userId = req.user.id;
        const recordId = req.params.id;

        if (!recordId) {
            return res.status(200).json({
                errCode: 1,
                errEnMessage: 'Missing required parameters',
                errViMessage: 'Thiếu tham số bắt buộc'
            });
        }

        const response = await patientService.downloadRecordService(
            userId,
            recordId
        );

        if (response.errCode !== 0) {
            return res.status(200).json(response);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=record-${recordId}.pdf`
        );

        response.doc.pipe(res);
        response.doc.end();
    } catch (e) {
        console.log('Error in downloadRecord:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    getDetailPatientController,
    createProfilePatientController,
    updateProfilePatientController,
    createAppointmentController,
    getAppointmentsController,
    updateAppointmentController,
    deleteAppointmentController,
    searchPublicController,
    fakePaymentController,
    getRecordController,
    downloadRecordController
};
