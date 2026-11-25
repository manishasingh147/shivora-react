# Shivora Healthcare

Static client-side website built with React, TypeScript, and Vite. It has no API,
server process, or database. Appointment requests open the visitor's email app;
the visitor must send the email, and Shivora must confirm the requested time.

## Local development

1. Install dependencies with `npm install`.
2. Start the Vite development server with `npm run dev`.

## Static deployment

Run `npm run build` and publish the generated `dist/` directory to any static
web host or CDN. No environment variables or server runtime are required.

### Page routes

The site uses client-side routes (`/`, `/services`, `/doctors`, `/women-child`,
`/about`). The host must serve `index.html` for any path it doesn't have a file
for, otherwise opening or refreshing e.g. `/doctors` returns 404.
`public/_redirects` handles this on Netlify and Cloudflare Pages; on other hosts
configure an equivalent SPA fallback (e.g. a Vercel rewrite, or nginx
`try_files $uri /index.html`).
