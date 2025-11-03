const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', doctorController.getDoctorsController);
router.get('/:id', doctorController.getDoctorByIdController);

module.exports = router;
