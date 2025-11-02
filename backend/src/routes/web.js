const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const patientRoute = require('./patient.route');
const adminRoute = require('./admin.route');

const initWebRoutes = (app) => {
    //test
    router.get('/', (req, res) => {
        return res.send('Hello world');
    });

    router.use('/api/auth', authRoute);
    router.use('/api/admin', adminRoute);
    router.use('/api/patient', patientRoute);

    return app.use('/', router);
};

module.exports = initWebRoutes;
