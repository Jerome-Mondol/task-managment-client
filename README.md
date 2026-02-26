# Task Manager Client

## Overview
React + Vite frontend for the Task Manager app. It provides a landing page, authentication screens, and a protected dashboard to manage tasks.

## Features
- Public landing page with marketing sections
- Auth pages for sign in and sign up
- Protected dashboard with task CRUD
- Task filtering, search, and pagination
- Cookie-based auth handling via `/auth/me`

## Tech Stack
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion

## Requirements
- Node.js (LTS recommended)
- Backend running on `http://localhost:5000`

## Setup
```bash
npm install
```

## Run in Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## API Base URL
The client uses a fixed API base URL in `services/api.js`:
```
http://localhost:5000/api
```
If your backend runs elsewhere, update this value.

## Project Structure
```
client/
	components/        Reusable UI and layout components
	context/           Auth context and session checks
	pages/             Route-level pages
	services/          API client and task service
	src/               App entry and routing
```

## Routes
- `/` Landing page
- `/signin` Sign in
- `/signup` Sign up
- `/dashboard` Protected dashboard

## Notes
- Authentication is handled with HTTP-only cookies set by the backend.
- The app checks session status via `GET /auth/me` on load.
