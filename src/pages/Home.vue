<script setup>
import { ref, reactive, watch } from 'vue'
import { fetchNews, COUNTRY_OPTIONS, LANGUAGE_OPTIONS, CATEGORY_OPTIONS } from '../api/newsService.js'
import Filters from '../components/Filters.vue'
import NewsList from '../components/NewsList.vue'
import Pagination from '../components/Pagination.vue'

const articles = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const hasNextPage = ref(false)

// Stores the nextPage token from the API for cursor-based pagination
const nextPageToken = ref(null)
// History of page tokens so we can go back
const pageTokens = ref([null])

const filters = reactive({
  country: '',
  language: '',
  category: ''
})

let debounceTimer = null

/**
 * Load news from the API with current filters and page token.
 * Filter values are already ISO codes / API-ready strings, so we
 * pass them straight through — no translation needed.
 */
async function loadNews() {
  loading.value = true
  error.value = ''

  try {
    const params = {}

    if (filters.country) params.country = filters.country
    if (filters.language) params.language = filters.language
    if (filters.category) params.category = filters.category

    // Use the page token for the current page (cursor-based pagination)
    const token = pageTokens.value[page.value - 1]
    if (token) params.page = token

    const data = await fetchNews(params)

    articles.value = data.results || []
    nextPageToken.value = data.nextPage || null
    hasNextPage.value = !!data.nextPage
  } catch (err) {
    error.value = err.message || 'Something went wrong fetching news.'
    articles.value = []
  } finally {
    loading.value = false
  }
}

/**
 * When filters change, debounce then reset to page 1 and reload.
 * Debounce prevents rapid API calls when switching filters quickly.
 */
watch(filters, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    page.value = 1
    pageTokens.value = [null]
    nextPageToken.value = null
    loadNews()
  }, 300)
}, { deep: true })

/**
 * Handle filter change from Filters component — directly mutate reactive object
 */
function onFilterChange(field, value) {
  filters[field] = value
}

/**
 * Navigate to the next page
 */
function goNext() {
  if (!hasNextPage.value) return

  // Store the next page token so we can revisit this page
  if (pageTokens.value.length <= page.value) {
    pageTokens.value.push(nextPageToken.value)
  }

  page.value++
  loadNews()
}

/**
 * Navigate to the previous page
 */
function goPrev() {
  if (page.value <= 1) return
  page.value--
  loadNews()
}

// Initial load
loadNews()
</script>

<template>
  <div>
    <Filters
      :country="filters.country"
      :language="filters.language"
      :category="filters.category"
      :countries="COUNTRY_OPTIONS"
      :languages="LANGUAGE_OPTIONS"
      :categories="CATEGORY_OPTIONS"
      @change="onFilterChange"
    />
    <NewsList :articles="articles" :loading="loading" :error="error" @retry="loadNews" />
    <Pagination
      :page="page"
      :has-next="hasNextPage"
      @next="goNext"
      @prev="goPrev"
    />
  </div>
</template>
