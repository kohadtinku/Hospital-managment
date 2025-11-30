// import React from "react";
// import { Routes, Route, Navigate, Link } from "react-router-dom";

// import Login from "./pages/Login";
// import PrivateRoute from "./components/PrivateRoute";

// import AdminDashboard from "./pages/AdminDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";

// import AdminHome from "./pages/AdminHome";
// import ManageDoctors from "./pages/ManageDoctors";
// import ManageMedicines from "./pages/ManageMedicines";
// import RegisterPatient from "./pages/RegisterPatient";
// import AddDoctor from "./pages/AddDoctor";
// import HospitalManager from "./components/HospitalManager";
// import AdminPatients from "./pages/AdminPatients";
// import DoctorTodayPatients from "./pages/DoctorTodayPatients";

// function App() {
//   return (
//     <>
//       {/* ---------- NAVBAR (Public) ---------- */}
//       <nav className="mb-4 p-4 bg-gray-200 flex gap-4">
//         <Link to="/" className="mr-4">
//           Home
//         </Link>
//         <Link to="/doctors" className="mr-4">
//           Doctors
//         </Link>
//         <Link to="/addhospital" className="mr-4">
//           Hospitals
//         </Link>
//         <Link to="/medicines" className="mr-4">
//           Medicines
//         </Link>
//         <Link to="/register-patient" className="mr-4">
//           Register Patient
//         </Link>
//         <Link to="/login" className="mr-4">
//           Login
//         </Link>
//         <Link to="/todaypatients" className="mr-4">
//           Today's Patients
//         </Link>
//       </nav>

//       {/* ---------- ROUTES ---------- */}
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Default route */}
//         <Route path="/" element={<AdminHome />} />
//         <Route path="/doctors" element={<ManageDoctors />} />
//         <Route path="/addhospital" element={<HospitalManager />} />
//         <Route path="/medicines" element={<ManageMedicines />} />
//         <Route path="/register-patient" element={<RegisterPatient />} />
//         <Route path="/admin/patients" element={<AdminPatients />} />

//         <Route
//           path="/todaypatients"
//           element={
//             <PrivateRoute role="doctor">
//               <DoctorTodayPatients />
//             </PrivateRoute>
//           }
//         />

//         {/* ADMIN PRIVATE ROUTE */}
//         <Route
//           path="/admin/*"
//           element={
//             <PrivateRoute role="admin">
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/admin/add-doctor/*"
//           element={
//             <PrivateRoute role="admin">
//               <AddDoctor />
//             </PrivateRoute>
//           }
//         />

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

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
            <PrivateRoute role="doctor">
              <DoctorTodayPatients />
            </PrivateRoute>
          }
        />

        {/* -----------------------------------
            ADMIN PRIVATE ROUTES
        ----------------------------------- */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ADMIN SUB ROUTES */}
        <Route
          path="/admin/doctors"
          element={
            <PrivateRoute role="admin">
              <ManageDoctors />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/add-doctor"
          element={
            <PrivateRoute role="admin">
              <AddDoctor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/hospitals"
          element={
            <PrivateRoute role="admin">
              <HospitalManager />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/medicines"
          element={
            <PrivateRoute role="admin">
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

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
