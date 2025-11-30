
import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [uniqueHospitals, setUniqueHospitals] = useState([]);
  const [uniqueDoctors, setUniqueDoctors] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchMedicines();
  }, []);

  const fetchPatients = async () => {
    const res = await API.get("/patients");
    const data = res.data;

    setPatients(data);
    setFiltered(data);

    setUniqueHospitals([...new Map(data.map((p) => [p?.hospital?._id, p.hospital])).values()]);
    setUniqueDoctors([...new Map(data.map((p) => [p?.doctor?._id, p.doctor])).values()]);
  };

  const fetchMedicines = async () => {
    const res = await API.get("/medicines");
    setMedicines(res.data);
  };

  const handlePrescriptionChange = (index, key, value) => {
    const updated = [...prescriptions];
    updated[index][key] = value;
    setPrescriptions(updated);
  };

  const addPrescriptionLine = () => {
    setPrescriptions([...prescriptions, { medicine: "", dosage: "", duration: "", notes: "" }]);
  };

  const submitPrescription = async () => {
    try {
      await API.post(`/patients/${selectedPatient._id}/prescriptions`, { prescriptions });
      alert("Prescription saved!");
      setSelectedPatient(null);
      setPrescriptions([]);
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert("Failed to save prescription");
    }
  };

  // Filters
  useEffect(() => {
    let list = [...patients];
    if (search.trim() !== "") {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.phone.includes(search) ||
          p.complaint?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (hospitalFilter) list = list.filter((p) => p?.hospital?._id === hospitalFilter);
    if (doctorFilter) list = list.filter((p) => p?.doctor?._id === doctorFilter);
    if (genderFilter) list = list.filter((p) => p.gender === genderFilter);
    setFiltered(list);
  }, [search, hospitalFilter, doctorFilter, genderFilter, patients]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-3 rounded" />
        <select value={hospitalFilter} onChange={(e) => setHospitalFilter(e.target.value)} className="border p-3 rounded">
          <option value="">All Hospitals</option>
          {uniqueHospitals.map((h) => <option key={h?._id} value={h?._id}>{h?.name}</option>)}
        </select>
        <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className="border p-3 rounded">
          <option value="">All Doctors</option>
          {uniqueDoctors.map((d) => <option key={d?._id} value={d?._id}>{d?.name}</option>)}
        </select>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border p-3 rounded">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Hospital</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Complaint</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.gender}</td>
              <td className="p-2">{p.phone}</td>
              <td className="p-2">{p?.hospital?.name}</td>
              <td className="p-2">{p?.doctor?.name}</td>
              <td className="p-2">{p.complaint}</td>
              <td className="p-2">{new Date(p.registrationDate).toLocaleDateString()}</td>
              <td className="p-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => {
                    setSelectedPatient(p);
                    setPrescriptions(p.prescriptions?.map((pr) => ({
                      medicine: pr.medicine?._id || pr.medicine,
                      dosage: pr.dosage,
                      duration: pr.duration,
                      notes: pr.notes,
                    })) || []);
                  }}
                >
                  View / Add Prescription
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Prescription Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Prescription for {selectedPatient.name}</h3>

            {prescriptions.map((p, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <select
                  className="border p-2 rounded"
                  value={p.medicine}
                  onChange={(e) => handlePrescriptionChange(idx, "medicine", e.target.value)}
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((m) => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Dosage"
                  className="border p-2 rounded"
                  value={p.dosage}
                  onChange={(e) => handlePrescriptionChange(idx, "dosage", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="border p-2 rounded"
                  value={p.duration}
                  onChange={(e) => handlePrescriptionChange(idx, "duration", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Notes"
                  className="border p-2 rounded"
                  value={p.notes}
                  onChange={(e) => handlePrescriptionChange(idx, "notes", e.target.value)}
                />
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={addPrescriptionLine}>
                Add Medicine
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={submitPrescription}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => { setSelectedPatient(null); setPrescriptions([]); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
