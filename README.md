

---

## 🌍 **GlobeTrek** — Smart Travel Booking Web App ✈️

Transforming the way people explore the world 🚀

🔹 **Live Frontend** → [https://globetrek-lac.vercel.app/](https://globetrek-lac.vercel.app/)
🔹 **Live Backend (API)** → [https://globe-trek.onrender.com/](https://globe-trek.onrender.com/)

---

### 🌟 **Badges**

![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square)
![Express](https://img.shields.io/badge/API-Express-lightgrey?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed%20On-Vercel-black?style=flat-square)
![Render](https://img.shields.io/badge/Backend%20Hosting-Render-purple?style=flat-square)

---

### 📌 **Project Overview**

GlobeTrek is a cloud-hosted travel booking platform built with a modern full-stack architecture.
Users can browse curated travel destinations and securely book their next adventure.

---

### 🚀 **Features**

| Category            | Capabilities                                   |
| ------------------- | ---------------------------------------------- |
| 🔐 Authentication   | Register, Login, JWT-based sessions            |
| 👤 User Dashboard   | View & cancel bookings                         |
| 🧑‍💼 Admin Access  | Manage all bookings                            |
| ✨ UI/UX             | Dark/light mode, responsive, modern animations |
| 🔎 Dynamic Search   | Search destinations by name or location        |
| 🗄️ Persistent Data | Hosted PostgreSQL DB                           |

---

### ⚙️ **Tech Stack**

| Layer      | Tech                           |
| ---------- | ------------------------------ |
| Frontend   | React + Vite + CSS + Bootstrap |
| Backend    | Node.js + Express.js           |
| Database   | PostgreSQL (NeonDB)            |
| Auth       | JWT + bcryptjs                 |
| Deployment | Vercel (Web), Render (API)     |

---

### 🔗 API Endpoints

#### 🧑‍🎓 Public

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/destinations`    | Get all destinations |
| GET    | `/api/destinations?q=` | Search by query      |

#### 👤 Auth Required

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| POST   | `/api/bookings`     | Create booking |
| GET    | `/api/bookings/my`  | User bookings  |
| DELETE | `/api/bookings/:id` | Cancel booking |

#### 🧑‍💼 Admin

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/bookings/all` | View all bookings |

---

### 🏗️ **Folder Structure**

```
project/
 ├── backend/
 │   ├── routes/
 │   ├── db.js
 │   ├── server.js
 ├── frontend/
 │   ├── src/
 │   ├── App.jsx
 │   ├── index.html
 ├── package.json
 ├── README.md
```

---

### 🔐 Environment Variables

📍 Backend `.env`

```
DB_HOST=your_neon_host
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_pass
DB_PORT=5432
JWT_SECRET=your_secret
```

📍 Frontend `.env`

```
VITE_API_BASE=https://globe-trek.onrender.com/api
```

---

### 🖥️ **Run Locally**

```sh
# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run dev
```

---

### 🧑‍💻 Author

**Kuppireddy Bhageeratha Reddy**
📌 GitHub: [https://github.com/kuppireddybhageerathareddy1110](https://github.com/kuppireddybhageerathareddy1110)


---

### 📌 Future Enhancements

✔ Online payment integration
✔ Real-time seat availability
✔ User reviews & ratings
✔ Admin panel UI improvements

---

### ⭐ Support

If you like this project, please ⭐ this repo — it really helps!

---


Would you like a **logo + favicon** designed for GlobeTrek? ✨
