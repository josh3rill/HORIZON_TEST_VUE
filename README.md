# HorizonNews

A Vue 3 news reader application that fetches and displays the latest news from [Newsdata.io](https://newsdata.io/). Built as a component-based SPA with reactive filtering and pagination.

## Tech Stack

- **Vue 3** — Composition API with `<script setup>`
- **Vite** — Fast build tooling
- **Tailwind CSS** — Utility-first styling
- **JavaScript** (no TypeScript)

## Project Structure

```
src/
├── api/
│   └── newsService.js      # API service layer (native fetch)
├── components/
│   ├── Filters.vue          # Country, language, category dropdowns
│   ├── NewsCard.vue         # Individual article card
│   ├── NewsList.vue         # Article grid with loading/error states
│   └── Pagination.vue       # Prev/Next page navigation
├── pages/
│   └── Home.vue             # Main page — orchestrates state & API calls
├── App.vue                  # Root component with header
├── main.js                  # App entry point
└── style.css                # Tailwind CSS import
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/josh3rill/HORIZON_TEST_VUE.git
cd HORIZON_TEST_VUE
npm install
```

### API Key

The app uses a Newsdata.io API key. To use your own key, update the `API_KEY` constant in:

```
src/api/newsService.js
```

You can register for a free key at [newsdata.io](https://newsdata.io/).

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Features

- **Latest News Feed** — Fetches real-time news from the Newsdata.io API
- **Reactive Filters** — Filter by country, language, and category. Filters trigger a fresh API call automatically
- **Pagination** — Cursor-based pagination using the API's `nextPage` token with Prev/Next navigation
- **Responsive Layout** — 1-column on mobile, 2 on tablet, 3 on desktop
- **Error & Loading States** — Graceful handling of API failures and loading indicators

## Design Decisions

- **Native `fetch`** over Axios — fewer dependencies, shows confidence with the platform
- **No state management library** — reactive refs in a single page component are sufficient for this scope
- **Unidirectional data flow** — Filters emit upward, parent controls state
- **Cursor-based pagination** — follows the API's native pagination model via `nextPage` tokens

## Known Limitations

- The free API plan limits the number of requests and does not return full article content
- Filter options are a curated subset of what the API supports — extendable by adding more options to `Filters.vue`
- Tests omitted for brevity, but service logic and filter behavior would be tested in a production project
