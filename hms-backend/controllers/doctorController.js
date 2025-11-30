
const User = require('../models/User');
const Patient = require('../models/Patient');

// ===============================================
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .populate('hospital', 'name');

    res.json(doctors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

// ===============================================

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id)
      .select('-password')
      .populate('hospital', 'name');

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching doctor details' });
  }
};

// =================================================

exports.getTodayPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const patients = await Patient.find({
      doctor: doctorId,
      registrationDate: { $gte: start, $lte: end }
    })
      .populate('hospital', 'name')
      .populate('doctor', 'name specialization');

    res.json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch today patients' });
  }
};

// ====================================================================
exports.updateDoctor = async (req, res) => {
  try {
    const { name, email, specialization, phone, hospital } = req.body;

    const doctor = await User.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.specialization = specialization || doctor.specialization;
    doctor.phone = phone || doctor.phone;
    doctor.hospital = hospital || doctor.hospital;

    await doctor.save();

    res.json({ message: 'Doctor updated', doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update doctor' });
  }
};

// ====================================================================

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    await doctor.deleteOne();

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete doctor' });
  }
};
