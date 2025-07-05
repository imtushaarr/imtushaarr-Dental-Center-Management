# 🦷 Dental Center Management Dashboard

A **React-based frontend-only** dashboard to simulate dental center operations like managing patients, appointments, and personal dashboards — all stored in `localStorage`. Built using **TailwindCSS**, **React Router**, and **Context API** for smooth state and role management.

## 🔑 Live Demo
🌐 [https://imtushaarr-dental-center-management.vercel.app/login](https://imtushaarr-dental-center-management.vercel.app/login)

---

## ✨ Features

- 🔐 **Login & Role-based Access**
  - Doctor/Admin and Patient login with localStorage-based simulation
- 👨‍⚕️ **Patient Management**
  - Add, edit, delete, and search patients
  - Store details like name, DOB, contact info, medical history
- 📅 **Appointment Management**
  - Book, update, delete appointments
  - Upload reports or images via base64/URL
- 🗓️ **Calendar View**
  - Monthly/Weekly calendar for appointments
- 🙋‍♂️ **Patient Dashboard**
  - Patients can view personal info and appointment history
- 📱 **Responsive UI**
  - Clean and fully mobile-friendly design with TailwindCSS
- 💾 **Data Persistence**
  - All app data stored in `localStorage`
- ✅ **Form Validation**
  - Required fields, basic formatting checks
- ♻️ **Reusable Components**
  - Modular design system with clean separation

---

## 🧪 Tech Stack

| Tech         | Purpose                          |
|--------------|----------------------------------|
| React        | UI development with components   |
| React Router | Navigation and route guarding    |
| Context API  | Global state (auth, roles)       |
| TailwindCSS  | Fast, responsive styling         |
| localStorage | Simulated backend (persistence)  |
| Lucide Icons | Icon set for cleaner UI          |

---

## 🔐 Demo Login Credentials

### 👨‍⚕️ Doctor/Admin
- **Username**: `admin@entnt.in`
- **Password**: `admin123`

### 👨‍⚕️ Patient
- **Username**: `john@entnt.in`
- **Password**: `patient123`

These users are hardcoded/simulated in localStorage for demo purposes.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/imtushaarr/Dental-Center-Management.git
cd Dental-Center-Management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗃️ Folder Structure

```bash
src/
├── components/             # Core pages and UI components
│   ├── AdminDashboard.jsx
│   ├── PatientDashboard.jsx
│   ├── AppointmentManagement.jsx
│   ├── PatientManagement.jsx
│   ├── CalendarView.jsx
│   ├── LoginPage.jsx
│   ├── Layout.jsx
│   └── ui/                 # Reusable UI components (buttons, cards, forms, etc.)
├── context/
│   └── AuthContext.jsx     # Context API for user authentication
├── hooks/                  # Custom hooks
├── pages/                  # Page routing structure
├── services/               # localStorage services (patientService.js etc.)
├── lib/                    # Utility functions
├── App.js
├── index.js
└── tailwind.config.js
```

---

## 📄 License

This project is for educational/demo purposes. No backend is included.
