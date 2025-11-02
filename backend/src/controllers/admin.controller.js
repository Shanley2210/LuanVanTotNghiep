const adminService = require('../services/admin.service');

const getUsersController = async (req, res) => {
    try {
        const response = await adminService.getUsersService();

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getUsers:', e);
        return res
            .status(500)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const getUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await adminService.getUserByIdService(userId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getUserById:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const createHopistalAdminController = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;

        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await adminService.createHopistalAdminService(
            name,
            email,
            phone,
            password,
            confirmPassword
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in createHopistalAdmin:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const createUserController = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword, role } =
            req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword ||
            !role
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await adminService.createUserService(req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in createUser:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await adminService.updateUserService(userId, data);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in createUser:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const IdDel = req.params.id;

        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await adminService.deleteUserService(userId, IdDel);

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in deleteUser:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

const getPatientsController = async (req, res) => {
    try {
        const response = await adminService.getPatientsService();

        return res.status(200).json(response);
    } catch (e) {
        console.log('Error in getPatients:', e);
        return res
            .status(500)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

module.exports = {
    getUsersController,
    getUserByIdController,
    createHopistalAdminController,
    createUserController,
    updateUserController,
    deleteUserController,
    getPatientsController
};
