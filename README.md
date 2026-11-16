# Gedeon Technology Services Website

Responsive, bilingual corporate website and service catalogue built with React, TypeScript, Vite, React Router, Tailwind CSS and Lucide icons. French is the default language; English is available from the language selector.

## Run locally

```powershell
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The Vite development server runs at `http://localhost:5173`.

## Available pages

- Home, company overview, services directory and six dedicated service pages.
- Product category catalogue with search and category filters.
- Contact and quotation forms, FAQ, privacy policy, terms and a custom not-found page.

## Configuration

Edit `src/config/company.ts` to add the confirmed telephone number, WhatsApp number, email, address, business hours and social links. Product entries and service relationships live in `src/data/catalog.ts`; translations live in `src/locales`.

The lead forms do not report successful delivery unless the API confirms it. Set `VITE_LEADS_API_URL` in `.env` to the backend endpoint that accepts lead submissions. Until configured, the interface explains that delivery is unavailable and provides the company contact options.

The product catalogue is illustrative. Confirm product models, prices and availability before presenting them as current inventory. Legal pages are draft structures and need the company’s verified legal details before publication.

## Quality checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test:run
npm.cmd run build
```

## Deploy to Vercel

This repository is configured as a Vite single-page application. Import the repository into Vercel with the project root set to this directory. The included `vercel.json` configures `npm ci`, the production build, the `dist` output directory, SPA route fallback, security headers, and long-lived caching for hashed assets.

Before deploying, add the production environment variables in **Vercel → Project Settings → Environment Variables** and apply them to Production and Preview as needed:

| Variable | Value |
| --- | --- |
| `VITE_API_BASE_URL` | The deployed API base URL, including its version prefix (for example, `https://api.your-domain.example/api/v1`). |
| `VITE_LEADS_API_URL` | The deployed API endpoint that accepts lead submissions. Leave unset until that endpoint is deployed and verified. |

These values are embedded into the frontend at build time. Redeploy after changing them. The Vite development proxy at `/api` only works locally; Vercel does not run the NestJS API from this frontend project. Configure the API’s allowed CORS origins to include the deployed production and preview frontend domains before connecting forms or API calls.

The site can be deployed before the API is available, but lead forms will show their existing unavailable state and will not claim that a request was sent. Verify the production domain, service and product routes, deep-link refreshes, contact links, and form behavior after the first deployment.

## Project references

- [Frontend documentation](docs/README.md)
- [Data and API contracts](docs/DATA-AND-CONTRACTS.md)
- [Platform roadmap](../../platform-roadmap/README.md)
- [NestJS API](../../NestJs/platform-api/README.md)
