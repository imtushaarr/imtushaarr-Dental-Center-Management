// src/components/PatientManagement.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, Search, Phone, Mail, Calendar } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { getAllPatients, addPatient, updatePatient, deletePatient } from '../services/patientService';

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    healthInfo: '',
    emergencyContact: '',
    insuranceInfo: '',
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getAllPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  const resetForm = () => {
    setFormData({
      name: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
      healthInfo: '',
      emergencyContact: '',
      insuranceInfo: '',
    });
  };

  const handleAddPatient = async () => {
    const newPatient = {
      ...formData,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    const addedPatient = await addPatient(newPatient);
    setPatients([...patients, addedPatient]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: 'Patient Added',
      description: `${formData.name} has been added successfully.`,
    });
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      dob: patient.dob,
      contact: patient.contact,
      email: patient.email,
      address: patient.address,
      healthInfo: patient.healthInfo,
      emergencyContact: patient.emergencyContact,
      insuranceInfo: patient.insuranceInfo,
    });
  };

  const handleUpdatePatient = async () => {
    if (!editingPatient) return;
    await updatePatient(editingPatient.id, formData);
    setPatients(patients.map(patient =>
      patient.id === editingPatient.id ? { ...patient, ...formData } : patient
    ));
    setEditingPatient(null);
    resetForm();
    toast({
      title: 'Patient Updated',
      description: `${formData.name}'s information has been updated.`,
    });
  };

  const handleDeletePatient = async (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    await deletePatient(patientId);
    setPatients(patients.filter(p => p.id !== patientId));
    toast({
      title: 'Patient Deleted',
      description: `${patient?.name} has been removed from the system.`,
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">Manage patient records and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
              <DialogDescription>
                {editingPatient ? `Update ${editingPatient.name}'s information.` : 'Enter the patient’s information below.'}
              </DialogDescription>
            </DialogHeader>
            <PatientForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
              onCancel={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
              isEditing={!!editingPatient}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search patients by name, email, or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {filteredPatients.map(patient => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <Badge className={patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      DOB: {new Date(patient.dob).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {patient.contact}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {patient.email}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Health Info:</strong> {patient.healthInfo}</p>
                    <p><strong>Last Visit:</strong> {new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={editingPatient?.id === patient.id} onOpenChange={(open) => {
                    if (!open) {
                      setEditingPatient(null);
                      resetForm();
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Patient</DialogTitle>
                        <DialogDescription>
                          Update {patient.name}'s information.
                        </DialogDescription>
                      </DialogHeader>
                      <PatientForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleUpdatePatient}
                        onCancel={() => {
                          setEditingPatient(null);
                          resetForm();
                        }}
                        isEditing={true}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
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
      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No patients found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const PatientForm = ({ formData, setFormData, onSubmit, onCancel, isEditing }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact">Phone Number *</Label>
          <Input
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="(555) 123-4567"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="patient@email.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 Main St, City, State, ZIP"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="healthInfo">Health Information</Label>
        <Textarea
          id="healthInfo"
          value={formData.healthInfo}
          onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
          placeholder="Allergies, medical conditions, medications, etc."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyContact">Emergency Contact</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          placeholder="Name - Phone number"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="insuranceInfo">Insurance Information</Label>
        <Input
          id="insuranceInfo"
          value={formData.insuranceInfo}
          onChange={(e) => setFormData({ ...formData, insuranceInfo: e.target.value })}
          placeholder="Insurance provider and policy number"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
          {isEditing ? 'Update' : 'Add'} Patient
        </Button>
      </div>
    </div>
  );
};

export default PatientManagement;