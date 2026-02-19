<script setup>
defineProps({
  country: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  countries: {
    type: Array,
    default: () => []
  },
  languages: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change'])

/**
 * Emit a change event with the updated field and value
 */
function updateFilter(field, value) {
  emit('change', field, value)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <h2 class="text-sm font-semibold text-gray-700 mb-3">Filter News</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Country: { label, code } objects -->
      <div>
        <label for="country" class="block text-xs font-medium text-gray-500 mb-1">Country</label>
        <select
          id="country"
          :value="country"
          @change="updateFilter('country', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Countries</option>
          <option v-for="opt in countries" :key="opt.code" :value="opt.code">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Language: { label, code } objects -->
      <div>
        <label for="language" class="block text-xs font-medium text-gray-500 mb-1">Language</label>
        <select
          id="language"
          :value="language"
          @change="updateFilter('language', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Languages</option>
          <option v-for="opt in languages" :key="opt.code" :value="opt.code">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Category: plain strings -->
      <div>
        <label for="category" class="block text-xs font-medium text-gray-500 mb-1">Category</label>
        <select
          id="category"
          :value="category"
          @change="updateFilter('category', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option v-for="opt in categories" :key="opt" :value="opt">
            {{ opt.charAt(0).toUpperCase() + opt.slice(1) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
