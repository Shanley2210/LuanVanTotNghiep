const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/profile',
    authMiddleware.verifyToken,
    patientController.getDetailPatientController
);

router.post(
    '/profile',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.createProfilePatientController
);

router.put(
    '/profile',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.updateProfilePatientController
);

router.get(
    '/appointments',
    authMiddleware.verifyToken,
    patientController.getAppointmentsController
);

router.post(
    '/appointments',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.createAppointmentController
);

router.put(
    '/appointments/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.updateAppointmentController
);

router.delete(
    '/appointments/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.deleteAppointmentController
);

router.get('/search-public', patientController.searchPublicController);

router.post('/fake-payment/:id', patientController.fakePaymentController);

router.get(
    '/record/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.getRecordController
);

router.get(
    '/record/:id/download',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Patient'),
    patientController.downloadRecordController
);

module.exports = router;
