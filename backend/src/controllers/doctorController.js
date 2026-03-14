const doctors = [
  { id: 'd1', name: 'Dr. Andrea Reyes', specialty: 'General Medicine' },
  { id: 'd2', name: 'Dr. Paolo Cruz', specialty: 'Cardiology' },
  { id: 'd3', name: 'Dr. Nina Ramirez', specialty: 'Dermatology' }
];

export function listDoctors(_req, res) {
  res.json(doctors);
}

export function getDoctorsSeed() {
  return doctors;
}
