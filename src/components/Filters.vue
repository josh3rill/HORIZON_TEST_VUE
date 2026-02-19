<script setup>
const props = defineProps({
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
  }
})

const emit = defineEmits(['change'])

/**
 * Emit a change event with the updated field and value
 */
function updateFilter(field, value) {
  emit('change', field, value)
}

const countries = [
  { label: 'All Countries', value: '' },
  { label: 'Australia', value: 'au' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Canada', value: 'ca' },
  { label: 'India', value: 'in' },
  { label: 'Pakistan', value: 'pk' },
  { label: 'Nigeria', value: 'ng' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Malta', value: 'mt' }
]

const languages = [
  { label: 'All Languages', value: '' },
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Romanian', value: 'ro' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Maltese', value: 'mt' }
]

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Top', value: 'top' },
  { label: 'Business', value: 'business' },
  { label: 'Crime', value: 'crime' },
  { label: 'Education', value: 'education' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Environment', value: 'environment' },
  { label: 'Health', value: 'health' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Politics', value: 'politics' },
  { label: 'Science', value: 'science' },
  { label: 'Sports', value: 'sports' },
  { label: 'Technology', value: 'technology' },
  { label: 'Tourism', value: 'tourism' },
  { label: 'World', value: 'world' }
]
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <h2 class="text-sm font-semibold text-gray-700 mb-3">Filter News</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label for="country" class="block text-xs font-medium text-gray-500 mb-1">Country</label>
        <select
          id="country"
          :value="country"
          @change="updateFilter('country', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="opt in countries" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div>
        <label for="language" class="block text-xs font-medium text-gray-500 mb-1">Language</label>
        <select
          id="language"
          :value="language"
          @change="updateFilter('language', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="opt in languages" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div>
        <label for="category" class="block text-xs font-medium text-gray-500 mb-1">Category</label>
        <select
          id="category"
          :value="category"
          @change="updateFilter('category', $event.target.value)"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="opt in categories" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
