import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchNews } from '../src/api/newsService.js'

// Mock import.meta.env
vi.stubEnv('VITE_NEWS_API_KEY', 'test_api_key_123')

describe('newsService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should call the correct API URL with apikey param', async () => {
    const mockResponse = {
      status: 'success',
      results: [{ article_id: '1', title: 'Test Article' }],
      nextPage: 'abc123'
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const data = await fetchNews()

    expect(fetch).toHaveBeenCalledOnce()

    const calledUrl = fetch.mock.calls[0][0]
    expect(calledUrl).toContain('https://newsdata.io/api/1/latest')
    expect(calledUrl).toContain('apikey=')
  })

  it('should pass filter params to the API', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], nextPage: null })
    })

    await fetchNews({ country: 'au', language: 'en', category: 'top' })

    const calledUrl = fetch.mock.calls[0][0]
    expect(calledUrl).toContain('country=au')
    expect(calledUrl).toContain('language=en')
    expect(calledUrl).toContain('category=top')
  })

  it('should strip empty params from the query string', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], nextPage: null })
    })

    await fetchNews({ country: '', language: 'en' })

    const calledUrl = fetch.mock.calls[0][0]
    expect(calledUrl).not.toContain('country=')
    expect(calledUrl).toContain('language=en')
  })

  it('should return parsed JSON on success', async () => {
    const mockData = {
      results: [{ article_id: '1', title: 'Hello World' }],
      nextPage: 'page2token'
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    })

    const result = await fetchNews()

    expect(result.results).toHaveLength(1)
    expect(result.results[0].title).toBe('Hello World')
    expect(result.nextPage).toBe('page2token')
  })

  it('should throw an error when API returns non-ok status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429
    })

    await expect(fetchNews()).rejects.toThrow('API request failed: 429')
  })
})
