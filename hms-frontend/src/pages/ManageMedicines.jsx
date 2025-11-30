import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function ManageMedicines() {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({
    name: '',
    genericName: '',
    strength: '',
    type: '',
    company: ''
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadMeds();
  }, []);

  const loadMeds = async () => {
    try {
      const { data } = await API.get('/medicines');
      setMeds(data);
    } catch (err) {
      console.log('Failed to load medicines', err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update medicine
        await API.put(`/medicines/${editId}`, form);
        setEditId(null);
      } else {
        // Create new medicine
        await API.post('/medicines', form);
      }
      setForm({ name: '', genericName: '', strength: '', type: '', company: '' });
      loadMeds();
    } catch (err) {
      console.log(err);
      alert('Failed to save medicine');
    }
  };

  const editMed = (med) => {
    setForm({
      name: med.name,
      genericName: med.genericName,
      strength: med.strength,
      type: med.type,
      company: med.company
    });
    setEditId(med._id);
  };

  const deleteMed = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await API.delete(`/medicines/${id}`);
      loadMeds();
    } catch (err) {
      console.log(err);
      alert('Failed to delete medicine');
    }
  };

  // Filtered list based on search
  const filteredMeds = meds.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase()) ||
      m.type.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Medicines</h2>

      {/* Add/Edit Form */}
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Generic"
          value={form.genericName}
          onChange={(e) => setForm({ ...form, genericName: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Strength"
          value={form.strength}
          onChange={(e) => setForm({ ...form, strength: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="md:col-span-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Medicines Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Generic</th>
            <th className="p-2 border">Strength</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMeds.map((m) => (
            <tr key={m._id} className="hover:bg-gray-50">
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.genericName}</td>
              <td className="p-2 border">{m.strength}</td>
              <td className="p-2 border">{m.type}</td>
              <td className="p-2 border">{m.company}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => editMed(m)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMed(m._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredMeds.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No medicines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
