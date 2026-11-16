# Gedeon Platform Web

The public-facing website for Gedeon Technology Services. It presents the company's IT services, provides an illustrative equipment catalogue, and gives individuals and organizations ways to request information or a quotation.

The interface is currently French-only. Website copy is centralized so that additional languages can be added later. Project code and documentation are maintained in English.

## Features

- Responsive company website with service and product information.
- Click-operated Services and Products mega menus with category previews, keyboard support, and a mobile accordion menu.
- Six dedicated service pages covering computer maintenance, equipment installation, networking, video surveillance, IT support, and equipment sales.
- Product catalogue with category filters and search. Product entries are demonstration content, not confirmed inventory.
- Contact and quotation forms with client-side validation and explicit API submission states.
- FAQ, privacy policy, terms, page metadata, breadcrumbs, and a custom not-found page.

## Technology

- React 19 and TypeScript
- Vite 8
- React Router 8
- Tailwind CSS 4 and project CSS styles
- React Hook Form and Zod
- Vitest and Testing Library
- Lucide React and Framer Motion

## Requirements

- Node.js compatible with Vite 8 (use a current Node.js LTS release).
- npm, using the committed `package-lock.json`.

## Run locally

From the project root:

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Vite serves the site at `http://localhost:5173` by default. The development server proxies `/api` requests to `http://127.0.0.1:3000`; run the API locally if you need to use API-backed features.

## Routes

| Route                              | Page                                                       |
| ---------------------------------- | ---------------------------------------------------------- |
| `/`                                | Home                                                       |
| `/about`                           | About the company                                          |
| `/services`                        | Service directory                                          |
| `/services/computer-maintenance`   | Computer maintenance and repair                            |
| `/services/equipment-installation` | IT equipment installation and configuration                |
| `/services/network-installation`   | Network installation and configuration                     |
| `/services/video-surveillance`     | Video surveillance and CCTV                                |
| `/services/it-support`             | IT infrastructure and technical support                    |
| `/services/it-equipment-sales`     | IT and office equipment sales                              |
| `/products`                        | Product catalogue; supports the `category` query parameter |
| `/contact`                         | Contact information and contact form                       |
| `/request-quote`                   | Quotation request form                                     |
| `/faq`                             | Frequently asked questions                                 |
| `/privacy-policy`                  | Privacy policy draft                                       |
| `/terms`                           | Terms and conditions draft                                 |
| `*`                                | Not-found page                                             |

## Environment configuration

Copy `.env.example` to `.env` for local development:

| Variable             | Purpose                                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`  | API base URL used by the shared HTTP client. Defaults to `/api/v1`; the local Vite proxy forwards `/api` to the development API. Use the deployed API's absolute URL in production.                |
| `VITE_LEADS_API_URL` | Full endpoint that accepts contact and quotation submissions. It is blank by default. Until configured, the forms explain that submission is unavailable and do not claim a request was delivered. |

Vite embeds `VITE_*` variables in the browser bundle at build time. Do not put secrets or private credentials in these variables. After changing deployment values, trigger a new build. For a separately hosted API, allow the production and preview website origins in the API's CORS configuration.

Company contact details are centralized in `src/config/company.ts`. Confirm and replace the empty phone, WhatsApp, email, address, business-hours, and social-link values before launch. Product data and service details are maintained in `src/data/catalog.ts`; French website copy is in `src/content/fr.ts`.

## Development commands

| Command                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Start the Vite development server.                      |
| `npm run typecheck`     | Run the TypeScript project check.                       |
| `npm run lint`          | Run ESLint.                                             |
| `npm run test:run`      | Run the Vitest suite once.                              |
| `npm run test:watch`    | Run Vitest in watch mode.                               |
| `npm run test:coverage` | Run Vitest with coverage reporting.                     |
| `npm run build`         | Type-check and create the production bundle in `dist/`. |
| `npm run preview`       | Serve the production bundle locally.                    |
| `npm run format:check`  | Check formatting with Prettier.                         |

## Project structure

```text
src/
|-- App.tsx                  # Lazy-loaded application routes
|-- components/              # Layout, navigation, forms, and shared UI
|-- config/company.ts        # Central company contact and social details
|-- content/                 # French copy and translation helper
|-- data/catalog.ts          # Service, product, FAQ, and page data
|-- pages/                   # Route-level pages
|-- services/                # Lead submission adapter
|-- shared/api/              # Shared API HTTP client
`-- styles/                  # Global design system and page styles

docs/
|-- README.md                # Frontend documentation index
`-- DATA-AND-CONTRACTS.md    # Frontend/API contract notes
```

Routes are declared in `src/App.tsx`. The site header, mega menus, footer, and floating contact action are in `src/components/SiteChrome.tsx`.

## Deploy to Vercel

The root `vercel.json` configures the project as a Vite SPA:

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite so direct visits and refreshes work on nested React routes
- Security response headers and long-lived caching for hashed `/assets/` files

Import this repository into Vercel and set the project Root Directory to this repository. Add `VITE_API_BASE_URL` and `VITE_LEADS_API_URL` in **Project Settings > Environment Variables** when the API endpoints are available. A frontend deployment does not deploy the NestJS API. The website can be published before the API, but lead form delivery remains unavailable until `VITE_LEADS_API_URL` is configured.

Before launch, verify contact details, legal copy, product availability, the production API URLs, and the API's CORS allowlist. These values are currently placeholders or demonstration content where company data has not been supplied.

## Documentation

- [Frontend documentation index](docs/README.md)
- [Data and API contracts](docs/DATA-AND-CONTRACTS.md)
