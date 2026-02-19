# HorizonNews

A simple Vue 3 news app that pulls latest articles from the [Newsdata.io](https://newsdata.io/) API. You can filter by country, language, and category the list updates reactively and is paginated using the API's cursor tokens.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Tailwind CSS
- JavaScript
- Vitest for tests

## Project Structure

```
src/
├── api/
│   └── newsService.js       # Fetch wrapper for the newsdata.io API
├── components/
│   ├── Filters.vue           # Filter dropdowns (country, language, category)
│   ├── NewsCard.vue          # Single article card
│   ├── NewsList.vue          # Article grid + loading/error/empty states
│   └── Pagination.vue        # Prev/Next navigation
├── pages/
│   └── Home.vue              # Main page — wires everything together
├── App.vue                   # Shell with header and footer
├── main.js                   # Entry point
└── style.css                 # Tailwind import
```

## Setup

You'll need Node 18+ and npm 9+.

```bash
git clone https://github.com/josh3rill/HORIZON_TEST_VUE.git
cd HORIZON_TEST_VUE
npm install
```

Then set up your API key:

```bash
cp .env.example .env
```

Open `.env` and paste your key from [newsdata.io](https://newsdata.io/):

```
VITE_NEWS_API_KEY=your_key_here
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`.

To build for production:

```bash
npm run build
```

To run tests:

```bash
npm run test
```

## How It Works

- The app fetches news on load and whenever a filter changes (with a 300ms debounce to avoid spamming the API)
- Country and language filters use predefined lists with proper ISO codes — the API expects two-letter codes (`au`, `en`) but returns full names (`australia`, `english`), so static `{ label, code }` pairs avoid any mismatch
- Category filter options are also predefined they match the API's accepted values directly
- Pagination uses the `nextPage` cursor token from the API. I store a history of tokens so you can navigate back
- If an article has no image, a fallback logo is shown. If the image URL is broken, it swaps to the fallback on error
- I used native `fetch` instead of Axios to keep dependencies minimal
- No Pinia/Vuex — `ref()` and `reactive()` in the parent component handle all the state needed here

## Known Limitations

- The free newsdata.io plan has rate limits (200 credits/day) and doesn't return full article content
- Tests cover the service layer only. In a real project I'd also test filter behavior and component rendering
