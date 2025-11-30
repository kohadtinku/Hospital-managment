
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      setDoctors(data);
    } catch (err) {
      console.log("Failed to load doctors", err);
    }
  };

  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await API.delete(`/doctors/${id}`);
      alert("Doctor Deleted Successfully");
      loadDoctors();
    } catch (err) {
      console.log(err);
      alert("Failed to delete doctor");
    }
  };

  return (
    <div className="p-5">
      {/* ========================== */}
      {/* ADD DOCTOR BUTTON */}
      {/* ========================== */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Manage Doctors</h3>
        <Link to="/admin/add-doctor">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Doctor
          </button>
        </Link>
      </div>

      <table className="w-full border shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Specialization</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Hospital</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d._id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.email}</td>
              <td className="p-2 border">{d.specialization}</td>
              <td className="p-2 border">{d.phone}</td>
              <td className="p-2 border">{d?.hospital?.name || "N/A"}</td>

              <td className="p-2 border flex justify-center gap-2">
                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    (window.location.href = `/admin/edit-doctor/${d._id}`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteDoctor(d._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
