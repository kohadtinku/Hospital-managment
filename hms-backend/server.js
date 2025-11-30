require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const medicineRoutes = require('./routes/medicines');
const patientRoutes = require('./routes/patients');
const hospitalRoutes = require("./routes/hospitalRoutes");

const app = express();
connectDB();

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));
app.use(express.json());


app.use("/api/hospitals", hospitalRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
