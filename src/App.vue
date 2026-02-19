<script setup>
import Home from './pages/Home.vue'
import logo from './assets/logo_hw.png'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <img :src="logo" alt="HorizonNews logo" class="h-10 w-10 rounded" />
        <div>
          <h1 class="text-2xl font-bold text-gray-900">HorizonNews</h1>
          <p class="text-sm text-gray-500">Latest news from around the world</p>
        </div>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-6">
      <Home />
    </main>
  </div>
</template>
