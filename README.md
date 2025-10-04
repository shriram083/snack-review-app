# Next.js Snack Review App v2.0

This is a v2.0 scaffold for the Snack Review assignment. It includes:
- Login with session (HttpOnly JWT cookie)
- Dashboard with stats
- Sidebar and Navbar (with profile dropdown & logout)
- Create & View customer reviews stored in MongoDB
- Seed script creates admin + dummy user
- Tailwind for styling

Run locally:
1. Copy `.env.example` -> `.env.local` and set `MONGODB_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run seed`
4. `npm run dev`

Seeded users:
- admin@example.com / Admin123!
- user@example.com / User123!

Notes:
- This project uses `.js` files (both `.js` and `.jsx` are fine in Next.js).
