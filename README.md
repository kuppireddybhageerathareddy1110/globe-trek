# GlobeTrek

GlobeTrek is a full-stack travel booking application with a Next.js frontend, an Express API, JWT authentication, booking management, and PostgreSQL persistence.

The frontend has been reorganized from Vite React into a Next.js App Router app with a more polished travel-booking experience: glassmorphism surfaces, brutalist CTA treatment, animated hero artwork, destination filtering, saved-trip state, a budget planner, auth flow, and dashboard summary cards.

## Live Services

- Frontend: https://globetrek-lac.vercel.app/
- Backend API: https://globe-trek.onrender.com/

## Highlights

- Next.js App Router frontend in `frontend/app`
- Express API in `backend/`
- PostgreSQL database access through `pg`
- JWT-protected booking endpoints
- Destination search with API fallback data for local demos
- Theme toggle with dark and light visual systems
- Interactive planner for travelers, dates, trip length, notes, and estimated cost
- Saved trips persisted in `localStorage`
- User auth panel wired to the existing `/api/auth/login` and `/api/auth/register` endpoints
- Dashboard snapshot for saved trips and authenticated bookings
- Responsive layout with reduced-motion support

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Authentication | JWT, bcryptjs |
| Deployment | Vercel frontend, Render backend |

## Repository Structure

```text
globe-trek/
├── backend/
│   ├── db.js
│   ├── server.js
│   └── routes/
│       ├── auth.js
│       ├── bookings.js
│       └── destinations.js
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   └── GlobeTrekExperience.js
│   ├── lib/
│   │   └── api.js
│   ├── next.config.mjs
│   └── package.json
├── ARCHITECTURE.md
├── package.json
└── README.md
```

## Environment Variables

### Backend

Create `backend/.env`:

```env
DB_URL=postgresql://user:password@host:5432/database
JWT_SECRET=replace_with_a_strong_secret
PORT=5000
```

### Frontend

Create `frontend/.env.local` only when overriding the deployed API:

```env
NEXT_PUBLIC_API_BASE=http://localhost:5000/api
```

If `NEXT_PUBLIC_API_BASE` is omitted, the frontend uses:

```text
https://globe-trek.onrender.com/api
```

## Run Locally

Install frontend dependencies:

```sh
cd frontend
npm install
```

Run the Next.js frontend:

```sh
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

Install backend dependencies:

```sh
cd ../backend
npm install
```

Run the Express API:

```sh
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

You can also run root convenience scripts:

```sh
npm run dev:frontend
npm run build:frontend
npm run dev:backend
```

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/destinations` | No | List all destinations |
| `GET` | `/api/destinations?q=term` | No | Search by name or location |
| `POST` | `/api/auth/register` | No | Register a user |
| `POST` | `/api/auth/login` | No | Login and receive a JWT |
| `POST` | `/api/bookings` | Yes | Create a booking |
| `GET` | `/api/bookings/my` | Yes | List the current user's bookings |
| `DELETE` | `/api/bookings/:id` | Yes | Cancel a booking owned by the current user |
| `GET` | `/api/bookings/all` | Admin | List all bookings |

## Frontend Features

### Destination Discovery

- Search calls the configured API.
- If the API is unavailable, local curated fallback destinations keep the UI usable.
- Mood filters support `Luxury`, `Adventure`, `Culture`, and `Wellness`.

### Planner

- Adjust traveler count and trip length.
- Calculate total and daily estimates instantly.
- Submit booking details to the protected booking endpoint.

### Auth and Dashboard

- Login and registration use the existing backend API.
- Auth state and JWT are stored in `localStorage`.
- Saved trips are persisted locally.
- Dashboard cards summarize saved trips and authenticated bookings.

### Visual System

- Glassmorphism panels use blur, translucent surfaces, and soft gradients.
- Brutalist actions use strong borders, hard shadows, and acid accent colors.
- Motion includes hero reveal, orbit animation, card entrance, hover scale, story cycling, and floating tickets.
- `prefers-reduced-motion` is respected.

## Build

```sh
cd frontend
npm run build
```

## Deployment Notes

- Deploy `frontend/` as a Next.js app on Vercel.
- Deploy `backend/` as a Node/Express service on Render.
- Configure `NEXT_PUBLIC_API_BASE` in Vercel if using a custom API URL.
- Configure `DB_URL` and `JWT_SECRET` in Render.
- `backend/server.js` allows `http://localhost:3000` for local Next.js development.

## Validation Checklist

- `npm install` in `frontend/`
- `npm run build` in `frontend/`
- `npm run dev` in `frontend/`
- Visit `http://localhost:3000`
- Test destination search and filters
- Test theme toggle
- Save a trip and confirm dashboard count updates
- Try booking while logged out and confirm the login-required notice
- Login against a running backend and confirm booking/dashboard calls work
