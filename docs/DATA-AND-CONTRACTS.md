# Data and Contracts Consumed by React

The database remains on the NestJS API. The browser never receives PostgreSQL identifiers and never constructs SQL queries.

The API maintains the table and column dictionary in [DATA-DICTIONARY.md](../../../NestJs/platform-api/docs/DATA-DICTIONARY.md). All 117 tables in the physical schema, including infrastructure tables, have one reference document maintained by the API. Screens must consume only business resources authorized by the API.

## Contract rules

- A React form follows the fields and DTO constraints validated by NestJS. Frontend validation improves the user experience but does not replace server-side validation.
- Statuses and transitions received from the API determine which actions are available; the frontend does not decide on its own that an operation is authorized.
- Internal notes, sensitive data, technical identifiers, private media, and information belonging to another organization are not exposed through public DTOs.
- Tickets, service visits, quotes, invoices, and payments retain separate flows and states according to the DTOs and transitions published by the API.
- Amounts are transmitted using a decimal format defined by the API contract; the frontend does not perform implicit financial rounding.
- French table names remain an API implementation detail. They are not URL names or required form property names.

The physical schema remains the API's responsibility. Its state and PostgreSQL verification are tracked in [DATABASE.md](../../../NestJs/platform-api/docs/DATABASE.md).

## Business types stored with STI

The provided schema places the `Administrator`, `ReceptionAgent`, `Technician`, `StockClerk`, and `Apprentice` profiles in `personnels`; individuals and organizations in `clients`; and quotes and invoices in `documents_commerciaux`. The frontend follows the discriminator and DTOs returned by the API to select the appropriate form and actions.
