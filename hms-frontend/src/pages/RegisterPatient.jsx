

import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function RegisterPatient() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    hospital: "",
    doctor: "",
    complaint: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // GET DOCTORS
      const res = await API.get("/doctors");

      const docs = res.data.doctors || res.data || []; // SUPPORT BOTH TYPES
      setDoctors(docs);

      // Extract unique hospitals from doctors list
      const uniqueHospitals = [
        ...new Map(
          docs
            .map((d) => [d?.hospital?._id, d.hospital])
            .filter(([id, h]) => id && h)
        ).values(),
      ];

      setHospitals(uniqueHospitals);
    } catch (error) {
      console.log("Failed to load doctors/hospitals", error);
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/patients", { ...form });

      alert("Patient registered successfully!");

      setForm({
        name: "",
        age: "",
        gender: "Male",
        phone: "",
        address: "",
        hospital: "",
        doctor: "",
        complaint: "",
      });
    } catch (err) {
      alert("Failed to register patient");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Register Patient (Today)
      </h2>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Patient Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter patient name"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            placeholder="Age"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone number"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Complete address"
            required
          />
        </div>

        {/* Hospital */}
        <div>
          <label className="block mb-1 font-medium">Hospital</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.hospital}
            onChange={(e) => handleChange("hospital", e.target.value)}
            required
          >
            <option value="">Select Hospital</option>

            {hospitals.length > 0 &&
              hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label className="block mb-1 font-medium">Assign Doctor</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
            value={form.doctor}
            onChange={(e) => handleChange("doctor", e.target.value)}
            required
          >
            <option value="">Select Doctor</option>

            {doctors
              .filter((d) =>
                form.hospital ? d?.hospital?._id === form.hospital : true
              )
              .map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} — {d.specialization}
                </option>
              ))}
          </select>
        </div>

        {/* Complaint */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Patient Complaint</label>
          <textarea
            className="w-full p-3 border rounded-lg h-24 focus:ring focus:ring-blue-200"
            value={form.complaint}
            onChange={(e) => handleChange("complaint", e.target.value)}
            placeholder="Describe the patient's problem"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}
