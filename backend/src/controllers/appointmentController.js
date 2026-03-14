import mongoose from 'mongoose';
import { Appointment } from '../models/Appointment.js';

const memoryAppointments = [];

export async function createAppointment(req, res) {
  const { patientName, age, symptoms, doctorId, date, time } = req.body;

  if (!patientName || !age || !symptoms || !doctorId || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const payload = {
    patientName,
    age: Number(age),
    symptoms,
    doctorId,
    date,
    time,
    createdAt: new Date().toISOString()
  };

  if (mongoose.connection.readyState === 1) {
    const created = await Appointment.create(payload);
    return res.status(201).json(created);
  }

  const localRecord = { id: `mem-${Date.now()}`, ...payload };
  memoryAppointments.push(localRecord);
  return res.status(201).json(localRecord);
}

export async function listAppointments(_req, res) {
  if (mongoose.connection.readyState === 1) {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    return res.json(appointments);
  }

  return res.json([...memoryAppointments].reverse());
}
