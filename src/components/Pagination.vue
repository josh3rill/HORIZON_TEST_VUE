<script setup>
defineProps({
  page: {
    type: Number,
    required: true
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="flex justify-center items-center gap-4 mt-6">
    <button
      @click="emit('prev')"
      :disabled="page <= 1"
      class="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
      :class="page <= 1
        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer'"
    >
      ← Previous
    </button>

    <span class="text-sm text-gray-600 font-medium">
      Page {{ page }}
    </span>

    <button
      @click="emit('next')"
      :disabled="!hasNext"
      class="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
      :class="!hasNext
        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer'"
    >
      Next →
    </button>
  </div>
</template>
