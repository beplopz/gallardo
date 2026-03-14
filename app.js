const doctors = [
  { id: 'd1', name: 'Dr. Andrea Reyes', specialty: 'General Medicine' },
  { id: 'd2', name: 'Dr. Paolo Cruz', specialty: 'Cardiology' },
  { id: 'd3', name: 'Dr. Nina Ramirez', specialty: 'Dermatology' }
];

const els = {
  patientForm: document.getElementById('patient-form'),
  patientStatus: document.getElementById('patient-status'),
  doctorList: document.getElementById('doctor-list'),
  doctorSelect: document.getElementById('doctor-select'),
  appointmentForm: document.getElementById('appointment-form'),
  appointmentStatus: document.getElementById('appointment-status'),
  appointmentList: document.getElementById('appointment-list'),
  chatLog: document.getElementById('chat-log'),
  chatForm: document.getElementById('chat-form'),
  chatInput: document.getElementById('chat-input'),
  guideList: document.getElementById('guide-list'),
  guideStatus: document.getElementById('guide-status')
};

const state = {
  patient: JSON.parse(localStorage.getItem('tm_patient') || 'null'),
  appointments: JSON.parse(localStorage.getItem('tm_appointments') || '[]'),
  hasChatted: false
};

function setGuideStatus(text) {
  els.guideStatus.textContent = text;
}

function markStepDone(step) {
  const item = els.guideList.querySelector(`[data-step="${step}"]`);
  if (item) item.classList.add('done');
}

function updateGuideProgress() {
  if (state.patient) {
    markStepDone('profile');
    markStepDone('doctor');
  }

  if (state.appointments.length > 0) {
    markStepDone('appointment');
  }

  if (state.hasChatted) {
    markStepDone('chat');
    setGuideStatus('Great job! You completed the full TeleMedicine demo flow.');
    return;
  }

  if (!state.patient) {
    setGuideStatus('Step 1: Save your patient profile.');
  } else if (!state.appointments.length) {
    setGuideStatus('Step 2 & 3: Choose a doctor and book an appointment.');
  } else {
    setGuideStatus('Step 4: Send your first consultation chat message.');
  }
}

function renderDoctors() {
  els.doctorList.innerHTML = doctors
    .map(
      (doc) => `<article class="doctor">
      <h3>${doc.name}</h3>
      <p>Specialty: ${doc.specialty}</p>
    </article>`
    )
    .join('');

  els.doctorSelect.innerHTML = doctors
    .map((doc) => `<option value="${doc.id}">${doc.name} — ${doc.specialty}</option>`)
    .join('');
}

function renderAppointments() {
  if (!state.appointments.length) {
    els.appointmentList.innerHTML = '<li>No appointments booked yet.</li>';
    return;
  }

  els.appointmentList.innerHTML = state.appointments
    .map((appt) => {
      const doctor = doctors.find((doc) => doc.id === appt.doctorId);
      return `<li>${appt.date} ${appt.time} with ${doctor?.name || 'Unknown Doctor'}</li>`;
    })
    .join('');
}

function appendMessage(role, text) {
  const p = document.createElement('p');
  p.className = `msg ${role}`;
  p.textContent = text;
  els.chatLog.appendChild(p);
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function savePatient(formData) {
  state.patient = {
    name: formData.get('name').trim(),
    age: Number(formData.get('age')),
    symptoms: formData.get('symptoms').trim()
  };
  localStorage.setItem('tm_patient', JSON.stringify(state.patient));
  els.patientStatus.textContent = `Saved profile for ${state.patient.name}.`;
}

function saveAppointment(formData) {
  const appointment = {
    doctorId: formData.get('doctorId'),
    date: formData.get('date'),
    time: formData.get('time')
  };

  state.appointments.push(appointment);
  localStorage.setItem('tm_appointments', JSON.stringify(state.appointments));

  const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
  els.appointmentStatus.textContent = `Appointment booked with ${doctor?.name ?? 'doctor'}.`;
  renderAppointments();
}

els.patientForm.addEventListener('submit', (event) => {
  event.preventDefault();
  savePatient(new FormData(els.patientForm));
  els.patientForm.reset();
  updateGuideProgress();
});

els.appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!state.patient) {
    els.appointmentStatus.textContent = 'Please save your patient profile first.';
    updateGuideProgress();
    return;
  }

  saveAppointment(new FormData(els.appointmentForm));
  els.appointmentForm.reset();
  updateGuideProgress();
});

els.chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = els.chatInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  els.chatInput.value = '';
  state.hasChatted = true;

  setTimeout(() => {
    appendMessage('doctor', 'Thank you for your message. A doctor will review your concern shortly.');
  }, 450);

  updateGuideProgress();
});

renderDoctors();
renderAppointments();
appendMessage('doctor', 'Hello, welcome to TeleMedicine! Follow the guide above to get started.');
updateGuideProgress();
