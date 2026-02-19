<script setup>
import NewsCard from './NewsCard.vue'

defineProps({
  articles: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['retry'])
</script>

<template>
  <!-- Live region so screen readers announce content changes -->
  <div aria-live="polite" aria-atomic="true">

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12" role="status">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" aria-hidden="true"></div>
      <span class="ml-3 text-gray-500">Loading news...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center" role="alert">
      <p class="text-red-600 text-sm mb-3">{{ error }}</p>
      <button
        @click="emit('retry')"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!articles.length" class="text-center py-12">
      <p class="text-gray-500">No articles found. Try adjusting your filters.</p>
    </div>

    <!-- Articles Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NewsCard
        v-for="article in articles"
        :key="article.article_id"
        :article="article"
      />
    </div>

  </div>
</template>
