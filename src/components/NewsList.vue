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
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    <span class="ml-3 text-gray-500">Loading news...</span>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
    <p class="text-red-600 text-sm">{{ error }}</p>
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
</template>
