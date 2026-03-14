import { useEffect, useState } from 'react';
import { api } from './api/client';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientName: '',
    age: '',
    symptoms: '',
    doctorId: '',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

  async function loadDoctors() {
    const { data } = await api.get('/doctors');
    setDoctors(data);
    if (data.length) {
      setForm((prev) => ({ ...prev, doctorId: prev.doctorId || data[0].id }));
    }
  }

  async function loadAppointments() {
    const { data } = await api.get('/appointments');
    setAppointments(data);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post('/appointments', form);
      setStatus('Appointment booked successfully.');
      setForm((prev) => ({ ...prev, patientName: '', age: '', symptoms: '', date: '', time: '' }));
      await loadAppointments();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to book appointment.');
    }
  }

  const doctorMap = Object.fromEntries(doctors.map((doc) => [doc.id, doc]));

  return (
    <div className="container">
      <header>
        <h1>TeleMedicine (MERN)</h1>
        <p>React frontend + Express/Mongo backend starter.</p>
      </header>

      <section className="card">
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Patient name" required />
          <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} placeholder="Age" required />
          <textarea name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="Symptoms" rows="3" required />
          <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialty}
              </option>
            ))}
          </select>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
          <input name="time" type="time" value={form.time} onChange={handleChange} required />
          <button type="submit">Book</button>
        </form>
        <p className="status">{status}</p>
      </section>

      <section className="card">
        <h2>Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul>
            {appointments.map((appt) => (
              <li key={appt._id || appt.id}>
                {appt.patientName} booked {appt.date} {appt.time} with {doctorMap[appt.doctorId]?.name || appt.doctorId}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
