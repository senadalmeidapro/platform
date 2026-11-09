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

## Project references

- [Frontend documentation](docs/README.md)
- [Data and API contracts](docs/DATA-AND-CONTRACTS.md)
- [Platform roadmap](../../platform-roadmap/README.md)
- [NestJS API](../../NestJs/platform-api/README.md)
