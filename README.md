🏥 Hospital Management System – MERN Stack

A complete hospital OPD management system built using MongoDB, Express, React, Node.js with role-based access for Admin and Doctors.

This system allows admins to manage hospitals, doctors, medicines, patients, and track daily OPD. Doctors can see today’s patients and create prescriptions.

⭐ Features
👨‍⚕️ Admin Features

Admin Login / Authentication (JWT)

Add / Manage Hospitals

Add / Manage Doctors

Add / Manage Medicines

Register New OPD Patient

View All Patients

Search & Filter Patients (name, phone, hospital, doctor, date)

Role based access control

Secure API routes

🩺 Doctor Features

Doctor Login

View Today’s Patients Only

Search & Filter Today’s Patients

View full patient details

Add Prescription:

Select medicine from dropdown

Dosage input (1-0-1 format)

Duration (e.g., 5 days)

Notes

Add multiple medicines

Save prescription to patient record

🧾 Patient Data Includes

Name

Age

Gender

Phone

Address

Hospital

Doctor

Complaint

Registration Date

Prescription History

🏗️ Tech Stack
Frontend

React.js

React Router

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Bcrypt Password Hashing

📁 Folder Structure
hospital-management/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Hospital.js
│   │   ├── Patient.js
│   │   └── Medicine.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/auth.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/axios.js
    │   ├── App.js
    │   └── main.jsx

🔧 Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/hospital-management.git
cd hospital-management

⚙️ Backend Setup
Install dependencies:
cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

Start backend:
npm start

💻 Frontend Setup
Install dependencies:
cd frontend
npm install

Start frontend:
npm run dev

🔐 User Roles
Admin

Can add hospitals

Can add doctors

Can add medicines

Can register patients

Can view all patients

Full control

Doctor

Can view only today’s patients

Can create prescription

Cannot access admin pages

🧪 API Endpoints
Auth
POST /auth/login

Hospitals
POST /hospitals
GET  /hospitals

Doctors
POST /doctors
GET  /doctors

Medicines
POST /medicines
GET  /medicines

Patients
POST /patients/register
GET  /patients
GET  /patients/today
POST /patients/:id/prescription
