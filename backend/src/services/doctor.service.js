const db = require('../models');

const getDoctorsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.Doctor.findAll({});

            if (!doctors) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Doctor not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get doctors successful',
                data: doctors
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctor = await db.Doctor.findOne({
                where: { id: doctorId },
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'email', 'phone']
                    },
                    {
                        model: db.Specialty,
                        as: 'specialty',
                        attributes: ['name']
                    }
                ]
            });

            if (!doctor) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Doctor not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'Get doctor successful',
                data: doctor
            });
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = {
    getDoctorsService,
    getDoctorByIdService
};
