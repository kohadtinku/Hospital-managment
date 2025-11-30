import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import AdminHome from "./pages/AdminHome";
import ManageDoctors from "./pages/ManageDoctors";
import ManageMedicines from "./pages/ManageMedicines";
import RegisterPatient from "./pages/RegisterPatient";
import AddDoctor from "./pages/AddDoctor";
import HospitalManager from "./components/HospitalManager";
import AdminPatients from "./pages/AdminPatients";
import DoctorTodayPatients from "./pages/DoctorTodayPatients";

function App() {
  return (
    <>
      {/* ---------- PUBLIC NAVBAR ---------- */}
      <nav className="mb-4 p-4 bg-gray-200 flex gap-4">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/login" className="mr-4">
          Login
        </Link>
        <Link to="/register-patient" className="mr-4">
          Register Patient
        </Link>
        <Link to="/todaypatients" className="mr-4">
          Today's Patients
        </Link>
        <Link to="/admin/hospitals" className="mr-4">
          Add Hospital
        </Link>
        <Link to="/admin/medicines" className="mr-4">
          Add Medicine
        </Link>
      </nav>

      {/* ---------- ROUTES ---------- */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-patient" element={<RegisterPatient />} />

        {/* DOCTOR – PRIVATE ROUTE */}
        <Route
          path="/todaypatients"
          element={
            <PrivateRoute allowedRoles={["doctor", "admin"]}>
              <DoctorTodayPatients />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ManageDoctors />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/add-doctor"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddDoctor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/hospitals"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <HospitalManager />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/medicines"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ManageMedicines />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <PrivateRoute allowedRoles={["admin", "doctor"]}>
              <AdminPatients />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
