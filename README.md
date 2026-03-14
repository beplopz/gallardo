# TeleMedicine MERN Full-Stack Starter

You asked for **MERN full stack**, so this project is now split into:
- `frontend/` → React (Vite)
- `backend/` → Node.js + Express API
- MongoDB via Mongoose (with in-memory fallback if DB is unavailable)

## 1) What applications to use
- **VS Code** (code editor)
- **Node.js 18+** (runtime)
- **MongoDB Community Server** (database)
- **Browser** (Chrome/Edge/Firefox)

## 2) Project structure

- `backend/src/server.js` → Express app entry
- `backend/src/routes/*` → API routes
- `backend/src/models/Appointment.js` → Mongo model
- `frontend/src/App.jsx` → Main React UI
- `frontend/src/api/client.js` → Axios API client

## 3) Setup backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

## 4) Setup frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## 5) API endpoints

- `GET /api/health`
- `GET /api/doctors`
- `GET /api/appointments`
- `POST /api/appointments`

### Example payload for booking

```json
{
  "patientName": "Ana Lopez",
  "age": 22,
  "symptoms": "Sore throat",
  "doctorId": "d1",
  "date": "2026-03-20",
  "time": "09:45"
}
```

## 6) Next features to make it production-grade
- JWT authentication (patient/doctor/admin)
- Doctor schedule management
- Real-time chat (Socket.IO)
- Video consultation (WebRTC)
- File uploads for prescriptions/lab results
- Role-based authorization and audit logs
