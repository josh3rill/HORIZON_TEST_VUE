const BASE_URL = 'https://newsdata.io/api/1/latest'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

/**
 * Predefined country options.
 * The API expects ISO 3166-1 alpha-2 codes (e.g. "au") but returns
 * full names (e.g. "australia") in the response — so we use a static
 * list with { label, code } pairs to avoid any mismatch.
 */
export const COUNTRY_OPTIONS = [
  { label: 'Argentina', code: 'ar' },
  { label: 'Australia', code: 'au' },
  { label: 'Austria', code: 'at' },
  { label: 'Belgium', code: 'be' },
  { label: 'Brazil', code: 'br' },
  { label: 'Canada', code: 'ca' },
  { label: 'China', code: 'cn' },
  { label: 'France', code: 'fr' },
  { label: 'Germany', code: 'de' },
  { label: 'India', code: 'in' },
  { label: 'Indonesia', code: 'id' },
  { label: 'Ireland', code: 'ie' },
  { label: 'Italy', code: 'it' },
  { label: 'Japan', code: 'jp' },
  { label: 'Malta', code: 'mt' },
  { label: 'Mexico', code: 'mx' },
  { label: 'Netherlands', code: 'nl' },
  { label: 'New Zealand', code: 'nz' },
  { label: 'Nigeria', code: 'ng' },
  { label: 'Pakistan', code: 'pk' },
  { label: 'Philippines', code: 'ph' },
  { label: 'Poland', code: 'pl' },
  { label: 'Russia', code: 'ru' },
  { label: 'Saudi Arabia', code: 'sa' },
  { label: 'Singapore', code: 'sg' },
  { label: 'South Africa', code: 'za' },
  { label: 'South Korea', code: 'kr' },
  { label: 'Spain', code: 'es' },
  { label: 'Sweden', code: 'se' },
  { label: 'Switzerland', code: 'ch' },
  { label: 'United Arab Emirates', code: 'ae' },
  { label: 'United Kingdom', code: 'gb' },
  { label: 'United States', code: 'us' }
]

/**
 * Predefined language options.
 * Same reasoning — API expects ISO 639-1 codes but returns full names.
 */
export const LANGUAGE_OPTIONS = [
  { label: 'Arabic', code: 'ar' },
  { label: 'Chinese', code: 'zh' },
  { label: 'Dutch', code: 'nl' },
  { label: 'English', code: 'en' },
  { label: 'French', code: 'fr' },
  { label: 'German', code: 'de' },
  { label: 'Hindi', code: 'hi' },
  { label: 'Indonesian', code: 'id' },
  { label: 'Italian', code: 'it' },
  { label: 'Japanese', code: 'ja' },
  { label: 'Korean', code: 'ko' },
  { label: 'Maltese', code: 'mt' },
  { label: 'Polish', code: 'pl' },
  { label: 'Portuguese', code: 'pt' },
  { label: 'Romanian', code: 'ro' },
  { label: 'Russian', code: 'ru' },
  { label: 'Spanish', code: 'es' },
  { label: 'Swedish', code: 'sv' }
]

/**
 * Predefined category options.
 * Categories are the same in both request params and response data,
 * so plain strings work fine here.
 */
export const CATEGORY_OPTIONS = [
  'business',
  'crime',
  'domestic',
  'education',
  'entertainment',
  'environment',
  'food',
  'health',
  'lifestyle',
  'other',
  'politics',
  'science',
  'sports',
  'technology',
  'top',
  'tourism',
  'world'
]

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
