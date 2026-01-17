const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/connectdb');
const initWebRoutes = require('./routes/web');
const path = require('path');
const cors = require('cors');
const { runAutoCancelJob, runReminderJob } = require('./jobs/reminderJob');

dotenv.config();

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

initWebRoutes(app);
runAutoCancelJob();
runReminderJob();

const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 3001;

        app.listen(port, () => {
            console.log(`Backend Node.js is running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
