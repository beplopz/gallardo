import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    symptoms: { type: String, required: true, trim: true },
    doctorId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
