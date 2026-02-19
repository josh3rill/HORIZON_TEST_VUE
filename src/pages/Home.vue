<script setup>
import { ref, reactive, watch } from 'vue'
import { fetchNews } from '../api/newsService.js'
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

// Dynamic filter options — populated from API responses
const availableCountries = ref([])
const availableLanguages = ref([])
const availableCategories = ref([])

const filters = reactive({
  country: '',
  language: '',
  category: ''
})

let debounceTimer = null

/**
 * Extract unique filter options from articles and merge with existing ones
 */
function updateFilterOptions(results) {
  if (!results || !results.length) return

  const countries = new Set(availableCountries.value)
  const languages = new Set(availableLanguages.value)
  const categories = new Set(availableCategories.value)

  results.forEach((article) => {
    if (article.country) {
      article.country.forEach((c) => countries.add(c))
    }
    if (article.language) {
      languages.add(article.language)
    }
    if (article.category) {
      article.category.forEach((c) => categories.add(c))
    }
  })

  availableCountries.value = [...countries].sort()
  availableLanguages.value = [...languages].sort()
  availableCategories.value = [...categories].sort()
}

/**
 * Load news from the API with current filters and page token
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

    // Build filter options dynamically from API data
    updateFilterOptions(data.results)
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
      :countries="availableCountries"
      :languages="availableLanguages"
      :categories="availableCategories"
      @change="onFilterChange"
    />
    <NewsList :articles="articles" :loading="loading" :error="error" />
    <Pagination
      :page="page"
      :has-next="hasNextPage"
      @next="goNext"
      @prev="goPrev"
    />
  </div>
</template>
