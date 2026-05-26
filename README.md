# Habit Tracker

A premium-style React habit and prayer tracking dashboard with:

- Habit management
- Prayer tracking for the five daily prayers
- Extra prayer table entries
- Local browser persistence with `localStorage`
- Analytics charts with Recharts
- Dark/light mode
- Visual PDF report export

## Tech Stack

- React
- Vite
- Tailwind CSS
- Recharts
- `html2canvas`
- `jspdf`

## Important Note

This project currently runs as a frontend-first app.

- Habit data is stored in browser `localStorage`
- Prayer data is stored in browser `localStorage`
- The old Express/Mongo backend is still present in the repo, but the current UI no longer depends on it for normal use

That means if someone clones the project, they can run the frontend and use the app immediately without MongoDB.
