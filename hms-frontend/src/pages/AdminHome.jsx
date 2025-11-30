import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todaysPatients: 0,
    totalDoctors: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const allPatientsRes = await API.get("/patients");
    const allPatients = allPatientsRes.data;

    const today = new Date();
    const todays = allPatients.filter((p) => {
      const d = new Date(p.registrationDate);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });

    const doctorsRes = await API.get("/doctors");
    const doctors = doctorsRes.data.doctors || doctorsRes.data;

    setStats({
      totalPatients: allPatients.length,
      todaysPatients: todays.length,
      totalDoctors: doctors.length,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Total Patients</h2>
          <p className="text-3xl font-bold">{stats.totalPatients}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Today's OPD Patients</h2>
          <p className="text-3xl font-bold">{stats.todaysPatients}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Total Doctors</h2>
          <p className="text-3xl font-bold">{stats.totalDoctors}</p>
        </div>

      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Quick Access</h2>
        <div className="flex gap-4 mt-4">
          <a href="/admin/patients" className="px-6 py-3 bg-gray-800 text-white rounded-lg">View All Patients</a>
          <a href="/admin/add-doctor" className="px-6 py-3 bg-blue-700 text-white rounded-lg">Add Doctor</a>
          <a href="/register-patient" className="px-6 py-3 bg-green-700 text-white rounded-lg">Register Patient</a>
        </div>
      </div>
    </div>
  );
}
