const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/all', doctorController.getAllDoctorsController);

router.get('/detail/:id', doctorController.getDoctorByIdController);

router.get(
  '/schedules',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  authMiddleware.verifyPermission('view_doctor_schedule'),
  doctorController.getSchedulesController,
);

router.get('/slots/:id', doctorController.getSlotsController);

router.get('/specialty/:id', doctorController.getDoctorBySpecialtyController);

router.get(
  '/appointments',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  authMiddleware.verifyPermission('view_doctor_appointment'),
  doctorController.getAppointmentsController,
);

router.get(
  '/doctor-service/:id',
  doctorController.getDoctorByServiceController,
);

router.put(
  '/toggle-slot/:id',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  doctorController.toggleSlotController,
);

router.put(
  '/close-slots-date',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  doctorController.closeSlotsByDateController,
);

router.put(
  '/open-slots-date',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  doctorController.openSlotsByDateController,
);

router.get(
  '/appointment-detail/:id',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  doctorController.getAppointmentDetailController,
);

router.post(
  '/complete-exam',
  authMiddleware.verifyToken,
  authMiddleware.verifyRole('Doctor'),
  doctorController.completeExamController,
);

module.exports = router;
