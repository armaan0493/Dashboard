# Auth Dashboard App

Full‑stack authentication dashboard built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **NextAuth.js**, and the **MongoDB native driver** (no Mongoose).

Users can sign up, log in, view a protected dashboard, and manage their profile (name, profile image URL, and password).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **NextAuth.js** (Credentials + optional Google OAuth)
- **MongoDB** native driver (`mongodb` package)
- **bcryptjs** for password hashing

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

In the project root (`auth-dashboard-app`), create a file named `.env.local`:

```bash
touch .env.local
```

Add the following variables (adjust values as needed):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/auth_app?retryWrites=true&w=majority

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-strong-random-secret

# Optional: Google OAuth (remove if not used)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Notes:

- The app uses the **`auth_app`** database and the **`users`** collection automatically.
- `NEXTAUTH_SECRET` should be a long random string. In dev you can generate one with e.g. `openssl rand -hex 32`.

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Core Features

- **Email + password signup** (`/signup`, `POST /api/auth/signup`)
- **Email + password login** with NextAuth Credentials (`/login`)
- Optional **Google OAuth** login
- **Password hashing** via `bcryptjs`
- **JWT-based sessions** with NextAuth
- **Protected routes** via `middleware.ts`:
  - `/dashboard` – requires authentication
  - `/profile` – requires authentication
- **Dashboard** showing:
  - Name
  - Email
  - Account creation date
- **Profile management** (`/profile`):
  - Update name
  - Update profile image URL
  - Change password (requires current password)
- **Responsive UI** with Tailwind CSS and a dark/light **theme toggle** using `next-themes`.

## API Routes

- `GET /api/auth/[...nextauth]`
  - NextAuth handler (Credentials + optional Google)

- `POST /api/auth/signup`
  - Create a new user.
  - Validates uniqueness of email and password length.
  - Stores `name`, `email`, `passwordHash`, `image`, and `createdAt`.

- `GET /api/user/me`
  - Returns the currently logged‑in user (id, name, email, image, createdAt).

- `POST /api/user/update`
  - Update `name` and/or `image`.
  - Optionally change password (requires `currentPassword` + `newPassword`).

## Auth & Database

- **NextAuth Credentials Provider** uses MongoDB to validate email/password.
- Sessions use **JWT** strategy.
- Users are stored with the MongoDB **native driver** (no Mongoose):

```ts
interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  image?: string | null;
  createdAt: Date;
}
```

Connection helper (`src/lib/mongodb.ts`) exposes:

- `getClient()` – shared `MongoClient`
- `getDb()` – returns the `auth_app` database
- `getUsersCollection()` – typed `users` collection

## Main Pages

- `/` – Landing page with CTA buttons for login/sign‑up
- `/login` – Login form (credentials + optional Google)
- `/signup` – Sign‑up form that also logs the user in on success
- `/dashboard` – Protected dashboard with user info
- `/profile` – Protected profile update page

## Folder Structure (high level)

```text
src/
  app/
    api/
      auth/
        [...nextauth]/route.ts     # NextAuth handler
        signup/route.ts            # Signup endpoint
      user/
        me/route.ts                # Get current user
        update/route.ts            # Update profile
    dashboard/page.ts              # Protected dashboard
    login/page.ts                  # Login page
    profile/page.ts                # Profile update page
    signup/page.ts                 # Signup page
    layout.tsx                     # Root layout + Providers + Navbar
    page.tsx                       # Landing page
    globals.css                    # Global styles + Tailwind
  components/
    navbar.tsx                     # Top navigation bar
    providers.tsx                  # NextAuth + theme providers
    theme-toggle.tsx               # Dark/light toggle button
  lib/
    auth.ts                        # NextAuth options (used by API & middleware)
    mongodb.ts                     # MongoDB connection + helpers
  types/
    next-auth.d.ts                 # NextAuth session/JWT typings

middleware.ts                      # Protect /dashboard and /profile
```

## Production Notes

- For production, set `NEXTAUTH_URL` to your deployed URL.
- Ensure your MongoDB user has access to the `auth_app` database.
- Configure OAuth redirect URIs (e.g. Google) to point to `NEXTAUTH_URL`.

## License

This project is provided as a reference implementation for a modern Next.js auth dashboard.
