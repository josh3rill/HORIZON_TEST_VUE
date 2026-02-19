<script setup>
import Home from './pages/Home.vue'
import logo from './assets/logo_hw.png'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Skip to main content link for keyboard/screen-reader users -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-md focus:text-blue-700 focus:font-medium"
    >
      Skip to main content
    </a>

    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <img :src="logo" alt="HorizonNews logo" class="h-10 w-10 rounded" />
        <div>
          <h1 class="text-2xl font-bold text-gray-900">HorizonNews</h1>
          <p class="text-sm text-gray-500">Latest news from around the world</p>
        </div>
      </div>
    </header>
    <main id="main-content" class="max-w-6xl mx-auto px-4 py-6">
      <Home />
    </main>
    <footer class="bg-white border-t border-gray-200 mt-8">
      <div class="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        © 2026 Horizon News. All rights reserved.
      </div>
    </footer>
  </div>
</template>
