// src/components/PatientDashboard.jsx
import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AuthContext } from '../context/AuthContext';
import { File, Download } from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const appointments = JSON.parse(localStorage.getItem('incidents')) || [];
  const patient = patients.find(p => p.id === user?.patientId);
  const patientAppointments = appointments.filter(a => a.patientId === user?.patientId);

  if (!patient) {
    return <div className="p-6">Patient not found.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {patientAppointments.length > 0 ? (
            patientAppointments.map(appointment => (
              <div key={appointment.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{appointment.title}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(appointment.appointmentDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Description: {appointment.description}</p>
                    {appointment.treatment && <p className="text-sm text-gray-600">Treatment: {appointment.treatment}</p>}
                    {appointment.cost && <p className="text-sm text-gray-600">Cost: ${appointment.cost}</p>}
                    <Badge>{appointment.status}</Badge>
                    {appointment.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600"><strong>Files:</strong></p>
                        {appointment.files.map(file => (
                          <a key={file.name} href={file.url} download className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                            <Download className="w-4 h-4" />
                            {file.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No appointments scheduled.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;