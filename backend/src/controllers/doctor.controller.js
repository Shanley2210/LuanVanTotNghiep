const doctorService = require('../services/doctor.service');

const getDoctorsController = async (req, res) => {
    try {
        const response = await doctorService.getDoctorsService();

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getDoctors:', e);
        return res
            .status(500)
            .json({ errCode: -1, errMessage: 'Error from server' });
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

module.exports = { getDoctorsController, getDoctorByIdController };
