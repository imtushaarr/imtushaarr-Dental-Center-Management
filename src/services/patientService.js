// src/services/patientService.js
export const getAllPatients = async () => {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  return patients;
};

export const addPatient = async (patientData) => {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const newPatient = { id: `p${Date.now()}`, ...patientData };
  const updatedPatients = [...patients, newPatient];
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
  return newPatient;
};

export const updatePatient = async (id, updatedData) => {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const updatedPatients = patients.map(patient =>
    patient.id === id ? { ...patient, ...updatedData } : patient
  );
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
  return updatedData;
};

export const deletePatient = async (id) => {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const updatedPatients = patients.filter(patient => patient.id !== id);
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
  return id;
};