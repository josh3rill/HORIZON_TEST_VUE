const BASE_URL = 'https://newsdata.io/api/1/latest'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

/**
 * Maps full country names (as returned by the API) to ISO codes (as required by the API params).
 * Add more as needed — these cover the most common results.
 */
export const COUNTRY_CODES = {
  'australia': 'au',
  'united states of america': 'us',
  'united kingdom': 'gb',
  'canada': 'ca',
  'india': 'in',
  'pakistan': 'pk',
  'nigeria': 'ng',
  'germany': 'de',
  'france': 'fr',
  'japan': 'jp',
  'malta': 'mt',
  'new zealand': 'nz',
  'south africa': 'za',
  'ireland': 'ie',
  'singapore': 'sg',
  'china': 'cn',
  'brazil': 'br',
  'italy': 'it',
  'spain': 'es',
  'philippines': 'ph',
  'indonesia': 'id',
  'romania': 'ro',
  'netherlands': 'nl',
  'russia': 'ru',
  'saudi arabia': 'sa'
}

/**
 * Maps full language names (as returned by the API) to ISO codes (as required by the API params).
 */
export const LANGUAGE_CODES = {
  'english': 'en',
  'french': 'fr',
  'german': 'de',
  'spanish': 'es',
  'portuguese': 'pt',
  'romanian': 'ro',
  'japanese': 'ja',
  'arabic': 'ar',
  'hindi': 'hi',
  'maltese': 'mt',
  'chinese': 'zh',
  'italian': 'it',
  'dutch': 'nl',
  'russian': 'ru',
  'korean': 'ko',
  'indonesian': 'id'
}

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
