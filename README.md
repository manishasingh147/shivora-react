# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
## Shivora Healthcare

React frontend split into menu-level components with a small Express API for appointment requests.

## Run locally

1. Create the database with `server/schema.sql` (as a MariaDB user with DDL privileges).
2. Copy `.env.example` to `.env` and set the MariaDB credentials.
3. Run `npm run dev:full`.

The frontend runs at `http://localhost:5173` and the API at `http://localhost:4000` (`.env.development`, already committed, points the frontend at that API URL in dev).

The browser submits `POST /api/appointments`. MariaDB credentials are only read by the server and are never bundled into the React app.

## Deploy to production

The API (`server/server.js`) can optionally serve the built frontend itself, so the
whole app ships as a single Node process on one port:

1. `npm install`
2. `npm run build` — builds the React app into `dist/`.
3. Set environment variables (see `.env.example`) on the host: at minimum `NODE_ENV=production`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_SSL=true` if your database provider requires TLS. `CLIENT_ORIGIN` is only needed if the frontend is hosted on a different origin than the API.
4. `npm start`

The server detects `dist/index.html` at startup and serves it (with the SPA
fallback for client-side routes) alongside the `/api/*` routes. If you'd rather
host the frontend separately (a CDN/static host) and the API on its own service,
just don't ship `dist/` next to the API — it falls back to API-only automatically —
and set `VITE_API_URL` at build time to the API's public URL plus `CLIENT_ORIGIN`
on the API to the frontend's origin.

In production the server also: rejects startup if `DB_USER`/`DB_PASSWORD` are
missing, rate-limits `POST /api/appointments`, sets security headers (helmet),
gzips responses, logs requests, and shuts down gracefully on `SIGTERM`.
