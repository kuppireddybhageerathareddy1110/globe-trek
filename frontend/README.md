# GlobeTrek Frontend

Next.js App Router frontend for GlobeTrek.

## Commands

```sh
npm install
npm run dev
npm run build
npm run start
```

## Environment

Optional local override:

```env
NEXT_PUBLIC_API_BASE=http://localhost:5000/api
```

Without the override, the app uses the deployed Render API.

## Key Files

- `app/layout.js`: metadata and document shell
- `app/page.js`: home route
- `app/globals.css`: dark/light/white tokens, glassmorphism, brutalism, animation, responsive CSS
- `components/GlobeTrekExperience.js`: main interactive UI, demo auth, assistant, planner, comparison tools
- `lib/api.js`: API URL and fallback destination data

## Demo Credentials

These work without the backend:

- Traveler: `demo@globetrek.test` / `demo123`
- Admin: `admin@globetrek.test` / `admin123`

## Frontend Features

- Dark, light, and true white themes
- Destination search and mood filters
- Saved-trip comparison board
- Packing checklist
- Route-readiness meter
- Floating rule-based travel assistant
- Auth panel with backend login and demo login
