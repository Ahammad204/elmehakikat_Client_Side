# Elme Hakikat Client

Live demo: https://elmehakikats.netlify.app/

## Project Overview

Elme Hakikat is a React + Vite front-end application for a knowledge platform that combines blogs, books, and songs with authenticated access and an admin dashboard.

The app includes:
- Public brand homepage and knowledge feed
- Search and category filtering for blogs
- Books and music browsing
- Authenticated dashboard access
- Admin-only management for books, music, blogs, categories, and users

## Key Features

- React 19 with Vite-powered fast development
- Protected routes via `PrivateRoute` and admin-only access with `AdminRouter`
- JWT-based authentication and token persistence
- Responsive Tailwind CSS + DaisyUI design
- Search, filtering, and dynamic content cards
- Dashboard for adding, updating, and managing content

## Main Pages and Routes

Public pages:
- `/` — Home and blog listing
- `/books` — Books browsing page
- `/songs` — Music browsing page
- `/music/:id` — Music details page
- `/blog/:id` — Blog details page
- `/login` — Login form
- `/register` — Registration form

Protected dashboard pages (requires login):
- `/dashboard` — User profile
- `/dashboard/music-library` — Add music (admin)
- `/dashboard/all-music` — View all music (admin)
- `/dashboard/all-book` — View all books (admin)
- `/dashboard/add-book` — Add a new book (admin)
- `/dashboard/add-blog` — Add a new blog (admin)
- `/dashboard/category-manage` — Manage categories (admin)
- `/dashboard/all-user` — View all users (admin)
- `/dashboard/update-music/:id` — Update music entry (admin)
- `/dashboard/update-book/:id` — Update book entry (admin)
- `/dashboard/update-blog/:id` — Update blog entry (admin)

## Tech Stack

- React 19
- Vite
- React Router DOM v7
- Tailwind CSS v4
- DaisyUI
- React Query
- Axios
- Formik + Yup
- React Hot Toast
- JWT decode
- Lucide React icons
- SweetAlert2

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-repo/elmehakikat_Client_Side.git
cd elmehakikat_Client_Side
```

2. Install dependencies

```bash
npm install
```

3. Create an environment file

Create a `.env` file in the project root with:

```env
VITE_API_URL=http://localhost:5000
```

Adjust the API URL to your backend endpoint.

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

6. Preview the production build

```bash
npm run preview
```

## Backend API

The front-end expects a backend API at `VITE_API_URL` with endpoints such as:
- `POST /api/register`
- `POST /api/login`
- `GET /api/user`
- `GET /all-blogs`
- `GET /categories/blog`

Update `.env` to point to the proper backend before running the app in a live environment.

## Authentication

Authentication is handled in `src/Provider/AuthProvider.jsx`.
- Stores JWT in `localStorage`
- Decodes token with `jwt-decode`
- Protects routes using `PrivateRoute` and `AdminRouter`

## Folder Structure

- `src/main.jsx` — App entry point
- `src/Routers/Routes.jsx` — Route definitions
- `src/Provider/AuthProvider.jsx` — Auth context and provider
- `src/Layouts/Main.jsx` — Layout with shared navigation
- `src/Pages/Home` — Home and blog listing pages
- `src/Pages/Books` — Books pages
- `src/Pages/Songs` — Music pages
- `src/Pages/Admin` — Admin content management pages
- `src/Pages/Dashboard` — Dashboard and profile pages
- `src/components` — Shared UI components

## Notes

- This repository is the client-side application only.
- Make sure the backend API is available and configured with the correct `VITE_API_URL`.
- The project is deployed live at the URL above.

## License

This project is provided as-is. Update the license section to match your preferred terms.
