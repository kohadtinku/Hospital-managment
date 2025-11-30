import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TodayPatients from './TodayPatients';
export default function DoctorDashboard(){
  return (
    <div className="p-6">
      <nav><Link to="">Today</Link></nav>
      <Routes>
        <Route index element={<TodayPatients/>} />
      </Routes>
    </div>
  );
}
