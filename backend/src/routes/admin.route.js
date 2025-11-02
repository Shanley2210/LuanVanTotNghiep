const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/users',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.getUsersController
);

router.get(
    '/users/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.getUserByIdController
);

router.post(
    '/hopistal-admin',
    authMiddleware.verifyToken,
    authMiddleware.verifySystemAdmin,
    adminController.createHopistalAdminController
);

router.post(
    '/users',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.createUserController
);

router.put(
    '/users/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.updateUserController
);

router.delete(
    '/users/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.deleteUserController
);

router.get(
    '/patients',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    adminController.getPatientsController
);

module.exports = router;
