import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    hospital: "",
  });

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
  try {
    const { data } = await API.get("/hospitals/all");
    setHospitals(data.hospitals);  // ✔ FIX
  } catch (err) {
    console.log("Failed to load hospitals", err);
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register-doctor", form);
      alert("Doctor Added Successfully");
      window.location.href = "/admin/doctors";
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add doctor");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>

        {/* SPECIALIZATION */}
        <div>
          <label className="font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            required
            value={form.specialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>

        {/* HOSPITAL DROPDOWN */}
        <div>
          <label className="font-medium">Hospital</label>
          <select
            name="hospital"
            required
            value={form.hospital}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}
