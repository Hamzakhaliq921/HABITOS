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

## Project Structure

```text
Habit Tracker/
├─ client/          Frontend app
├─ src/             Legacy backend source
├─ server.js        Legacy backend entry
└─ README.md
```

## How To Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Habit Tracker"
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Open the app

Visit:

```text
http://localhost:3000
```

## Build For Production

From the `client` folder:

```bash
npm run build
```

## Features

### Dashboard

- Habit cards
- Streak summaries
- Weekly progress chart
- Monthly consistency chart
- Productivity analytics
- Habit completion rate
- Heatmap-style consistency view
- Achievement badges

### Prayer Tracker

- Built-in five daily prayers:
  - Fajr
  - Dhuhr
  - Asr
  - Maghrib
  - Isha
- Add extra prayers like:
  - Witr
  - Tahajjud
  - Duha
  - Ishraq
- Add prayer notes
- Mark prayers complete/pending

### Export

- Export a visual PDF report
- Includes colorful summary sections
- Includes habit analytics
- Includes prayer report pages

## Data Storage

The app uses browser `localStorage`.

Keys used:

- `habit-tracker-habits`
- `habit-tracker-prayers`
- `habit-tracker-theme`

If you clear browser storage, your local app data will be removed.

## Legacy Backend

There is still a backend in this repository, but it expects MongoDB.

If you want to use it later:

```bash
npm install
npm run dev
```

You would also need a running MongoDB instance and a valid `.env`.

## Recommended Next Improvements

- Add date-wise prayer history
- Add prayer analytics charts
- Add authentication
- Add cloud sync or database persistence
- Split the PDF export into reusable report modules
