# GlobeTrek Architecture

## Overview

GlobeTrek is organized as a two-application repository:

- `frontend/`: Next.js App Router application responsible for the user experience.
- `backend/`: Express API responsible for destinations, authentication, and bookings.

The frontend talks to the backend over HTTP using a configurable API base URL. PostgreSQL remains isolated behind the Express API.

```mermaid
flowchart LR
  User["Browser user"] --> Next["Next.js frontend"]
  Next --> API["Express API"]
  API --> Auth["JWT auth middleware"]
  API --> DB["PostgreSQL database"]
  Next --> Storage["localStorage: user, token, saved trips"]
  Next --> Assistant["Local travel assistant"]
```

## Frontend Architecture

### App Router

The frontend uses the Next.js App Router:

- `frontend/app/layout.js`: global document shell and metadata
- `frontend/app/page.js`: home route composition
- `frontend/app/globals.css`: visual system, responsive rules, animations
- `frontend/components/GlobeTrekExperience.js`: interactive client experience
- `frontend/lib/api.js`: API base URL, fallback data, destination fetch helper

`GlobeTrekExperience.js` is intentionally a client component because it owns browser-only state:

- theme selection
- destination search
- filters
- selected destination preview
- planner inputs
- auth token persistence
- saved trip persistence
- dashboard data fetches
- demo credential login
- assistant message state
- packing checklist state
- trip comparison state

## Backend Architecture

### Express Server

`backend/server.js` configures:

- CORS
- JSON request parsing
- health response at `/`
- route mounting under `/api`

Routes:

- `backend/routes/destinations.js`
- `backend/routes/auth.js`
- `backend/routes/bookings.js`

### Database

`backend/db.js` creates a PostgreSQL pool using:

```env
DB_URL=postgresql://user:password@host:5432/database
```

The API expects tables for users, destinations, and bookings. The route queries imply these fields:

```text
users:
  id, name, email, password, role

destinations:
  id, name, location, description, price, rating, days, nights, image

bookings:
  id, user_id, destination_id, start_date, travelers, special_requests
```

## Data Flow

### Destination Search

```mermaid
sequenceDiagram
  participant U as User
  participant F as Next.js UI
  participant A as Express API
  participant D as PostgreSQL

  U->>F: Submit search query
  F->>A: GET /api/destinations?q=query
  A->>D: ILIKE name/location query
  D-->>A: Destination rows
  A-->>F: JSON destinations
  F-->>U: Render filtered cards
```

If the API is unavailable, `frontend/lib/api.js` returns fallback destinations so local UI work is not blocked by database access.

### Authentication

```mermaid
sequenceDiagram
  participant U as User
  participant F as Next.js UI
  participant A as Express API
  participant D as PostgreSQL

  U->>F: Submit credentials
  F->>A: POST /api/auth/login
  A->>D: Find user by email
  A->>A: bcrypt compare + JWT sign
  A-->>F: user + token
  F->>F: Store user/token in localStorage
```

Demo credentials bypass the network and create local demo sessions:

| Role | Email | Password | Token |
| --- | --- | --- | --- |
| Traveler | `demo@globetrek.test` | `demo123` | `demo-token-user` |
| Admin | `admin@globetrek.test` | `admin123` | `demo-token-admin` |

The demo path is intentionally frontend-only. Real production authentication still goes through `/api/auth/login`.

### Booking

```mermaid
sequenceDiagram
  participant U as User
  participant F as Next.js UI
  participant A as Express API
  participant D as PostgreSQL

  U->>F: Confirm booking
  F->>A: POST /api/bookings with Bearer token
  A->>A: Verify JWT
  A->>D: Insert booking
  D-->>A: Insert result
  A-->>F: Booking response
  F-->>U: Toast notice
```

## State Boundaries

| State | Owner | Persistence |
| --- | --- | --- |
| Destination list | Frontend | In-memory, API-backed |
| Selected destination | Frontend | In-memory |
| Planner controls | Frontend | In-memory |
| Theme | Frontend | DOM dataset: `dark`, `light`, `white` |
| Saved trips | Frontend | `localStorage` |
| Auth token | Frontend | `localStorage` |
| Assistant messages | Frontend | In-memory |
| Packing checklist | Frontend | In-memory |
| Users/bookings | Backend | PostgreSQL |

## Styling System

The UI uses a small CSS-token system in `frontend/app/globals.css`:

- dark/light/white theme variables
- glass surfaces through translucent backgrounds and `backdrop-filter`
- brutalist CTA/card primitives through borders and hard shadows
- responsive grid rules
- reduced-motion safety

Animations are CSS-based and do not require extra runtime packages.

## Assistant Architecture

The travel assistant is a local, deterministic UI feature. It does not call a model provider. Prompt handling lives in `getAssistantReply()` inside `frontend/components/GlobeTrekExperience.js`.

Supported response categories:

- packing advice
- saved-trip comparison
- relaxing/wellness route suggestions
- compact culture itinerary suggestions
- fallback recommendation for the currently selected destination

This keeps the feature safe for local demos and avoids shipping API keys to the browser. If a real AI assistant is added later, it should be implemented through a backend route or server action with server-held credentials.

## Deployment Architecture

```mermaid
flowchart TB
  Vercel["Vercel: Next.js frontend"] --> Render["Render: Express backend"]
  Render --> Neon["PostgreSQL provider"]
  Vercel --> EnvF["NEXT_PUBLIC_API_BASE"]
  Render --> EnvB["DB_URL, JWT_SECRET"]
```

## Operational Notes

- Keep `JWT_SECRET` private and strong in production.
- Do not expose `DB_URL` to the frontend.
- Add every production frontend domain to the backend CORS allowlist.
- The frontend can deploy independently from the backend as long as API contracts remain stable.
- For authenticated server-rendered pages in the future, move token handling away from `localStorage` toward secure HTTP-only cookies.
