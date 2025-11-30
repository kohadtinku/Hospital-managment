

const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
    dosage: String,
    duration: String,
    notes: String,
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    gender: String,
    phone: String,
    address: String,
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    complaint: String,
    registrationDate: { type: Date, default: Date.now },
    prescriptions: [prescriptionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
