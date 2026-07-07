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
- `app/globals.css`: design tokens, glassmorphism, brutalism, animation, responsive CSS
- `components/GlobeTrekExperience.js`: main interactive UI
- `lib/api.js`: API URL and fallback destination data
