import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, Search, File, Download } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const AppointmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Pending',
    nextDate: '',
    files: [],
  });

  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem('incidents');
    return stored ? JSON.parse(stored) : [
      {
        id: 'i1',
        patientId: 'p1',
        title: 'Toothache',
        description: 'Upper molar pain',
        comments: 'Sensitive to cold',
        appointmentDate: '2025-07-01T10:00:00',
        cost: 80,
        treatment: 'Filling',
        status: 'Completed',
        nextDate: '2025-08-01T10:00:00',
        files: [],
      },
    ];
  });

  const patients = JSON.parse(localStorage.getItem('patients')) || [
    {
      id: 'p1',
      name: 'John Doe',
      dob: '1990-05-10',
      contact: '1234567890',
      healthInfo: 'No allergies',
    },
  ];

  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(appointments));
  }, [appointments]);

  const filteredAppointments = appointments.filter(appointment =>
    patients.find(p => p.id === appointment.patientId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: 'Pending',
      nextDate: '',
      files: [],
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            url: reader.result, // Base64 string
          });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(filePromises).then(fileData => {
      setFormData({ ...formData, files: fileData });
    });
  };

  const handleAddAppointment = () => {
    if (!formData.patientId || !formData.title || !formData.description || !formData.appointmentDate) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }
    const newAppointment = {
      id: `i${Date.now()}`,
      ...formData,
    };
    setAppointments([...appointments, newAppointment]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: 'Appointment Added',
      description: `${formData.title} has been scheduled.`,
    });
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      title: appointment.title,
      description: appointment.description,
      comments: appointment.comments,
      appointmentDate: appointment.appointmentDate.slice(0, 16),
      cost: appointment.cost || '',
      treatment: appointment.treatment || '',
      status: appointment.status,
      nextDate: appointment.nextDate || '',
      files: appointment.files,
    });
  };

  const handleUpdateAppointment = () => {
    if (!formData.patientId || !formData.title || !formData.description || !formData.appointmentDate) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }
    if (!editingAppointment) return;
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === editingAppointment.id ? { ...appointment, ...formData } : appointment
    );
    setAppointments(updatedAppointments);
    setEditingAppointment(null);
    resetForm();
    toast({
      title: 'Appointment Updated',
      description: `${formData.title} has been updated.`,
    });
  };

  const handleDeleteAppointment = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    setAppointments(appointments.filter(a => a.id !== appointmentId));
    toast({
      title: 'Appointment Deleted',
      description: `${appointment.title} has been removed.`,
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-1">Manage patient appointments and incidents</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
              <DialogDescription>
                {editingAppointment ? 'Update appointment details.' : 'Enter appointment details below.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient *</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData({ ...formData, patientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Toothache"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Appointment Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="datetime-local"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Additional notes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="Enter cost"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment</Label>
                <Input
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  placeholder="e.g., Filling"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextDate">Next Appointment Date</Label>
                <Input
                  id="nextDate"
                  type="datetime-local"
                  value={formData.nextDate}
                  onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="files">Upload Files</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                {formData.files.length > 0 && (
                  <div className="mt-2">
                    {formData.files.map(file => (
                      <div key={file.name} className="flex items-center gap-2">
                        <File className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button onClick={editingAppointment ? handleUpdateAppointment : handleAddAppointment}>
                  {editingAppointment ? 'Update' : 'Add'} Appointment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search appointments by patient or title..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {filteredAppointments.map(appointment => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                    <Badge>{appointment.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Patient:</strong> {patients.find(p => p.id === appointment.patientId)?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong> {appointment.description}
                  </p>
                  {appointment.treatment && (
                    <p className="text-sm text-gray-600">
                      <strong>Treatment:</strong> {appointment.treatment}
                    </p>
                  )}
                  {appointment.cost && (
                    <p className="text-sm text-gray-600">
                      <strong>Cost:</strong> ${appointment.cost}
                    </p>
                  )}
                  {appointment.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600"><strong>Files:</strong></p>
                      {appointment.files.map(file => (
                        <a
                          key={file.name}
                          href={file.url}
                          download
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          <Download className="w-4 h-4" />
                          {file.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appointment)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentManagement;