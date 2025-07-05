// src/components/AdminDashboard.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Calendar, FileText, DollarSign, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const appointments = JSON.parse(localStorage.getItem('incidents')) || [];

  const kpis = [
    {
      title: 'Total Patients',
      value: patients.length.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Appointments',
      value: appointments.length.toString(),
      change: '+8%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Completed Treatments',
      value: appointments.filter(a => a.status === 'Completed').length.toString(),
      change: '+15%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      title: 'Monthly Revenue',
      value: `$${appointments.reduce((sum, a) => sum + (a.cost || 0), 0).toFixed(2)}`,
      change: '+23%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-emerald-500',
    },
  ];

  const upcomingAppointments = appointments
    .filter(a => new Date(a.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Dr. Smith. Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {kpi.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${kpi.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Next 10 Appointments
          </CardTitle>
          <CardDescription>Manage your upcoming patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {patients.find(p => p.id === appointment.patientId)?.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {patients.find(p => p.id === appointment.patientId)?.name}
                    </p>
                    <p className="text-sm text-gray-600">{appointment.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.appointmentDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;