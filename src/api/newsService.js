const BASE_URL = 'https://newsdata.io/api/1/latest'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

/**
 * Fetch latest news from Newsdata.io API
 * @param {Object} params - Query parameters (country, language, category, page)
 * @returns {Promise<Object>} - API response with results and nextPage token
 */
export async function fetchNews(params = {}) {
  const query = new URLSearchParams({
    apikey: API_KEY,
    ...params
  })

  // Remove empty params
  for (const [key, value] of [...query.entries()]) {
    if (!value) query.delete(key)
  }

  const res = await fetch(`${BASE_URL}?${query.toString()}`)

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`)
  }

  return res.json()
}
