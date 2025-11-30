import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorTodayPatients() {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchMedicines();
  }, []);

  // Fetch today's patients for doctor
  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/patients"); // fix here
      setPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    }
  };

  // Fetch pre-added medicines
  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines");
      setMedicines(data);
    } catch (err) {
      console.error("Failed to fetch medicines", err);
    }
  };

  // Add new prescription line
  const addPrescriptionLine = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: "", dosage: "", duration: "", notes: "" },
    ]);
  };

  // Handle prescription input change
  const handlePrescriptionChange = (index, key, value) => {
    const updated = [...prescriptions];
    updated[index][key] = value;
    setPrescriptions(updated);
  };

  // Submit prescription
  const submitPrescription = async () => {
  try {
    await API.post(`/patients/${selectedPatient._id}/prescriptions`, {
      prescriptions,
    });
    alert("Prescription saved successfully!");
    setSelectedPatient(null);
    setPrescriptions([]);
    fetchPatients();
  } catch (err) {
    console.error(err);
    alert("Failed to save prescription");
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Today's Patients</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Complaint</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p._id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedPatient(p)}
            >
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.age}</td>
              <td className="border p-2">{p.gender}</td>
              <td className="border p-2">{p.complaint}</td>
              <td className="border p-2">
                {new Date(p.registrationDate).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Prescription Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">
              Add Prescription for {selectedPatient.name}
            </h3>

            {prescriptions.map((p, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
              >
                <select
                  className="border p-2 rounded"
                  value={p.medicine}
                  onChange={(e) =>
                    handlePrescriptionChange(idx, "medicine", e.target.value)
                  }
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Dosage e.g., 1-0-1"
                  className="border p-2 rounded"
                  value={p.dosage}
                  onChange={(e) =>
                    handlePrescriptionChange(idx, "dosage", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Duration e.g., 5 days"
                  className="border p-2 rounded"
                  value={p.duration}
                  onChange={(e) =>
                    handlePrescriptionChange(idx, "duration", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Notes"
                  className="border p-2 rounded"
                  value={p.notes}
                  onChange={(e) =>
                    handlePrescriptionChange(idx, "notes", e.target.value)
                  }
                />
              </div>
            ))}

            <div className="flex gap-2 mb-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={addPrescriptionLine}
              >
                Add Medicine
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={submitPrescription}
              >
                Save Prescription
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => {
                  setSelectedPatient(null);
                  setPrescriptions([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
