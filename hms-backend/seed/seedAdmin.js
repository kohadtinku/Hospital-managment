
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

const seed = async () => {
  await connectDB();

  let hospital = await Hospital.findOne({ name: "General Hospital" });
  if (!hospital)
    hospital = await Hospital.create({ name: "General Hospital" });

  console.log("Hospital Ready:", hospital.name);

  const adminEmail = "admin@hospital.com";
  const adminExists = await User.findOne({ email: adminEmail });

  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin",
    });
    console.log("Admin created:", adminEmail);
  } else {
    console.log("Admin already exists.");
  }

  // ------------------------ DOCTORS SEED -------------------------
  const doctorList = [
    { name: "Dr. Rohan Sharma", email: "rohan@hospital.com", specialization: "Cardiologist" },
    { name: "Dr. Priya Verma", email: "priya@hospital.com", specialization: "Dermatologist" },
    { name: "Dr. Ankit Gupta", email: "ankit@hospital.com", specialization: "Orthopedic" },
    { name: "Dr. Sneha Patil", email: "sneha@hospital.com", specialization: "Pediatrician" },
    { name: "Dr. Manish Yadav", email: "manish@hospital.com", specialization: "General Surgeon" },
  ];

  for (let doc of doctorList) {
    const exists = await User.findOne({ email: doc.email });
    if (!exists) {
      await User.create({
        name: doc.name,
        email: doc.email,
        password: "doctor123",
        role: "doctor",
        specialization: doc.specialization,
        hospital: hospital._id,
      });
      console.log("Doctor added:", doc.email);
    } else {
      console.log("Doctor already exists:", doc.email);
    }
  }

  // ------------------------ NORMAL USERS SEED -------------------------
  const userList = [
    { name: "User One", email: "user1@test.com" },
    { name: "User Two", email: "user2@test.com" },
    { name: "User Three", email: "user3@test.com" },
    { name: "User Four", email: "user4@test.com" },
    { name: "User Five", email: "user5@test.com" },
  ];

  for (let u of userList) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      await User.create({
        name: u.name,
        email: u.email,
        password: "user123",
        role: "user", // normal user
      });
      console.log("User added:", u.email);
    } else {
      console.log("User already exists:", u.email);
    }
  }

  console.log("Seeding Completed!");
  process.exit(0);
};

seed();
