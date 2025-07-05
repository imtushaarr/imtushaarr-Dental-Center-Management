# Dental Center Management Dashboard

A frontend-only React application for managing dental center operations, including patient records, appointments, and file uploads, with all data stored in localStorage. Built with TailwindCSS, React Router, and Context API for state management.

## Features
- **User Authentication**: Simulated login with role-based access (Admin and Patient) using localStorage.
- **Patient Management**: Admin can add, edit, delete, and search patients with details like name, DOB, contact, and health info.
- **Appointment Management**: Create, update, delete, and view appointments with file upload support (base64/URL storage).
- **Calendar View**: Monthly and weekly views of appointments with clickable days for details.
- **Patient Dashboard**: Patients can view their own data and appointment history.
- **Responsive Design**: Fully responsive UI using TailwindCSS.
- **Data Persistence**: All data stored in localStorage (users, patients, incidents).
- **Form Validation**: Input validation for required fields.
- **Reusable Components**: Modular UI components for consistent design.

## Tech Stack
- **React**: Frontend framework with functional components.
- **React Router**: For navigation and protected routes.
- **Context API**: For global state management (authentication).
- **TailwindCSS**: For styling and responsive design.
- **localStorage**: For data persistence.
- **Lucide Icons**: For UI icons.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
   ```bash
   cd dental-center-management

3. Start the development server:
   ```bash
   npm start

5. Open http://localhost:3000 in your browser.

