// // routes/doctors.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const protect = require('../middleware/auth');
// const allowRoles = require('../middleware/role');

// router.get('/', protect, allowRoles('admin'), async (req,res) => {
//   const docs = await User.find({ role: 'doctor' }).populate('hospital','name');
//   res.json(docs);
// });

// module.exports = router;

// routes/doctors.js

const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');

const {
  getAllDoctors,
  getDoctorById,
  getTodayPatients,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

// Admin: get all doctors
router.get('/', protect, allowRoles('admin'), getAllDoctors);

// Admin or doctor: get specific doctor
router.get('/:id', protect, getDoctorById);

// Doctor: today's patients
router.get('/today/patients/list', protect, allowRoles('doctor'), getTodayPatients);

// Admin: update doctor
router.put('/:id', protect, allowRoles('admin'), updateDoctor);

// Admin: delete doctor
router.delete('/:id', protect, allowRoles('admin'), deleteDoctor);

module.exports = router;
