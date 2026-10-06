# David Ayman Mahrous

Personal portfolio with a private admin dashboard. The public site reads from PostgreSQL. Edit content at `/admin` after signing in.

## Setup

1. Create a PostgreSQL database named `david_portfolio`.
2. Copy `.env.example` to `.env` and set:

   - `DATABASE_URL`
   - `AUTH_SECRET` (at least 32 characters)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (at least 12 characters)

3. Install, migrate, and seed:

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open the site at [http://localhost:3000](http://localhost:3000) and the admin at [http://localhost:3000/admin](http://localhost:3000/admin).

Re-running the seed updates the admin password from `ADMIN_PASSWORD` and leaves existing portfolio content in place.

## Production

Set the same four environment variables on the host, then run:

```bash
npx prisma migrate deploy
npm run db:seed
```

Uploads are stored in the database, so no separate file bucket is required. Do not commit `.env`.
