<script setup>
import fallbackImage from '../assets/logo_hw.png' 

defineProps({
  article: {
    type: Object,
    required: true
  }
})

/**
 * Format a UTC date string into a readable format
 */
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * On image load error, swap to the fallback image
 */
function onImageError(event) {
  event.target.src = fallbackImage
}
</script>

<template>
  <article class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    <img
      :src="article.image_url || fallbackImage"
      :alt="article.title"
      class="w-full h-48 object-cover"
      loading="lazy"
      @error="onImageError"
    />
    <div class="p-4">
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="cat in article.category"
          :key="cat"
          class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
        >
          {{ cat }}
        </span>
        <span
          v-if="article.language"
          class="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded"
        >
          {{ article.language }}
        </span>
      </div>

      <h2 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
        {{ article.title }}
      </h2>

      <p class="text-sm text-gray-600 mb-3 line-clamp-3">
        {{ article.description }}
      </p>

      <div class="flex items-center justify-between text-xs text-gray-500">
        <span v-if="article.source_name">{{ article.source_name }}</span>
        <span>{{ formatDate(article.pubDate) }}</span>
      </div>

      <div class="flex flex-wrap gap-1 mt-2" v-if="article.country && article.country.length">
        <span
          v-for="c in article.country"
          :key="c"
          class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
        >
          {{ c }}
        </span>
      </div>

      <a
        :href="article.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Read full article →
      </a>
    </div>
  </article>
</template>
