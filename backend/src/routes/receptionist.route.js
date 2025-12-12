const express = require('express');
const router = express.Router();

const receptionistController = require('../controllers/receptionist.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/appointments',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Receptionist'),
    receptionistController.getNewAppointmentsController
);

router.put(
    '/appointments/confirm/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Receptionist'),
    authMiddleware.verifyPermission('comfirm_appointment'),
    receptionistController.confirmAppointmentController
);

router.post(
    '/appointments/checkin/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole('Receptionist'),
    authMiddleware.verifyPermission('comfirm_appointment'),
    receptionistController.checkInController
);

module.exports = router;
