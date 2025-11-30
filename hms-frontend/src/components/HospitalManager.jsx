import React, { useState, useEffect } from "react";
import API from "../api/axios";

const HospitalManager = () => {
  const [name, setName] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    const res = await API.get("/hospitals/all");
    setHospitals(res.data.hospitals);
  };

  const addHospital = async (e) => {
    e.preventDefault();
    if (!name) return alert("Hospital name required");

    await API.post("/hospitals/add", { name });
    setName("");
    fetchHospitals();
  };

  const deleteHospital = async (id) => {
    await API.delete(`/hospitals/${id}`);
    fetchHospitals();
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-3">Hospital Management</h1>

      {/* Add Hospital Form */}
      <form onSubmit={addHospital} className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Enter hospital name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>

      {/* Hospital List */}
      <ul className="space-y-2">
        {hospitals.map((h) => (
          <li
            key={h._id}
            className="flex justify-between bg-gray-100 p-2 rounded"
          >
            <span>{h.name}</span>
            <button
              onClick={() => deleteHospital(h._id)}
              className="bg-red-600 text-white px-3 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalManager;
