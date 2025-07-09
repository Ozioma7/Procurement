<template>
  <aside :class="['bg-[#111827] text-white min-h-screen transition-all duration-300', collapsed ? 'w-20' : 'w-64']">
    <!-- Logo Section -->
    <div class="flex items-center gap-2 px-4 py-4">
      <img :src="logo" alt="Logo" class="w-10 h-10" />
      <div v-if="!collapsed" class="leading-tight">
        <h2 class="text-xl font-bold">Suburban</h2>
        <p class="text-xs text-gray-400">INVENTORY</p>
      </div>
    </div>

    <!-- Toggle Button -->
    <div class="flex justify-end px-2 pb-2">
      <button @click="collapsed = !collapsed" class="text-white">
        <span v-if="collapsed">➡️</span>
        <span v-else>⬅️</span>
      </button>
    </div>

    <!-- Navigation Groups -->
    <nav class="px-2 space-y-4">
      <!-- My Workplace -->
      <div>
        <div class="flex items-center justify-between px-2 text-gray-400 text-xs uppercase">
          <span class="flex items-center gap-2">
            📁
            <span v-if="!collapsed">My Workplace</span>
          </span>
          <span v-if="!collapsed">▼</span>
        </div>
        <div class="mt-2 space-y-1">
          <router-link
            to="/"
            class="block px-4 py-2 text-sm rounded hover:bg-[#1F2937] transition"
            :class="{ 'bg-[#1F2937]': route.path === '/' }"
          >Dashboard</router-link>
        </div>
      </div>

      <!-- Obligations -->
      <div>
        <div class="flex items-center justify-between px-2 text-gray-400 text-xs uppercase">
          <span class="flex items-center gap-2">
            📌
            <span v-if="!collapsed">Obligations</span>
          </span>
          <span v-if="!collapsed">▼</span>
        </div>
        <div class="mt-2 space-y-1">
          <router-link
            v-for="item in obligations"
            :key="item.name"
            :to="item.path"
            class="block px-4 py-2 text-sm rounded hover:bg-[#1F2937] transition"
            :class="{ 'bg-[#1F2937]': route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import logo from '../assets/images/logo suburban.png' // Make sure this path is correct

const collapsed = ref(false)
const route = useRoute()

const obligations = [
  { name: 'Stock Monitoring and Reorder', path: '/stock-monitor' },
  { name: 'Stock Availability and Matching', path: '/stock-availability' },
  { name: 'Transactions and Audit', path: '/transactions' },
  { name: 'Goods and Stock Transfer', path: '/transfer' }
]
</script>
