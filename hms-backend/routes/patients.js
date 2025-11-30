// routes/patients.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');
const { registerPatient, getTodaysPatientsForDoctor, getAllPatients, addPrescription } = require('../controllers/patientController');

router.post('/', protect, allowRoles('admin'), registerPatient);
router.get('/today/doctor', protect, allowRoles('doctor'), getTodaysPatientsForDoctor);
router.get('/', protect, allowRoles('admin'), getAllPatients);
router.post('/:patientId/prescriptions', protect, addPrescription);

module.exports = router;
