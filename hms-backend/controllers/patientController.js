const Patient = require('../models/Patient');
const User = require('../models/User');

exports.registerPatient = async (req, res) => {
  const { name, age, gender, phone, address, hospital, doctor, complaint } = req.body;
  const regDate = new Date();
  const patient = await Patient.create({ name, age, gender, phone, address, hospital, doctor, complaint, registrationDate: regDate });
  res.json(patient);
}

exports.getTodaysPatientsForDoctor = async (req, res) => {
  const doctorId = req.user._id;
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setHours(23, 59, 59, 999);
  const patients = await Patient.find({ doctor: doctorId, registrationDate: { $gte: start, $lte: end } })
    .populate('doctor', 'name specialization')
    .populate('hospital', 'name');
  res.json(patients);
}

exports.getAllPatients = async (req, res) => {
  const patients = await Patient.find().populate('doctor', 'name').populate('hospital', 'name');
  res.json(patients);
}


// Add prescriptions
exports.addPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { prescriptions } = req.body; // array of { medicine, dosage, duration, notes }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" }); 

    // Add new prescriptions
    patient.prescriptions.push(...prescriptions);
    await patient.save();

    // Return updated patient
    const updatedPatient = await Patient.findById(patientId)
      .populate("doctor", "name")
      .populate("hospital", "name")
      .populate("prescriptions.medicine", "name");

    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};