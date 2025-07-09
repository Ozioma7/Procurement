<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-[#D50036]">ProcureEase</h1>
    <div class="flex gap-4 text-sm font-medium">
      <RouterLink to="/" class="hover:text-[#D50036]" :class="{ 'text-[#D50036]': $route.path === '/' }">
        Dashboard
      </RouterLink>
      <RouterLink to="/stock-monitor" class="hover:text-[#D50036]" :class="{ 'text-[#D50036]': $route.path === '/stock-monitor' }">
        Stock Monitor
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
</script>
