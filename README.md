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

## Deployment

### Vercel Deployment (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Select the `client` folder as root directory

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Update API Base URL:**
   Before deploying, update `services/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```
   
   Then add environment variable in Vercel:
   - `VITE_API_URL` = `https://your-backend-url.com/api`

5. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Netlify Deployment

1. **Push your code to GitHub**

2. **Import to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Set base directory to `client`

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

5. **Deploy:**
   - Click "Deploy site"

### Environment Variables for Production

Create a `.env.production` file (optional) or set in your hosting platform:
```
VITE_API_URL=https://your-backend-url.com/api
```

### Pre-Deployment Checklist

- [ ] Update API base URL in `services/api.js` to use environment variable
- [ ] Test production build locally: `npm run build && npm run preview`
- [ ] Ensure backend is deployed and accessible
- [ ] Update `CLIENT_URL` in backend environment variables to match your frontend URL
- [ ] Test CORS settings with production URLs
