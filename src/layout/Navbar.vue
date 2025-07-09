<template>
    <header class="z-10 bg-white shadow-sm">
      <div class="flex items-center justify-between px-6 py-3">
        <div class="flex items-center">
          <button @click="$emit('toggle-sidebar')" class="text-gray-500 focus:outline-none">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="ml-4 text-xl font-semibold">{{ pageTitle }}</h1>
        </div>
        
        <div class="flex items-center">
          <div class="relative mr-4">
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
              <span class="flex items-center justify-center h-5 w-5 rounded-full bg-[#D50036] text-white text-xs">
                2
              </span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          
          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center focus:outline-none">
              <img class="object-cover w-8 h-8 rounded-full" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t6jZYEpxv5tn7YPCWwLkaPbxvyHhP9.png" alt="User avatar" />
              <span class="ml-2">Victor Ade</span>
              <svg class="w-5 h-5 ml-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div v-if="dropdownOpen" class="absolute right-0 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const dropdownOpen = ref(false);
  
  const pageTitle = computed(() => {
    const path = route.path;
    if (path.includes('/brd-request')) {
      return 'My Workplace - Procurement';
    } else if (path.includes('/obligations/projects')) {
      return 'My Workplace - Obligations - Inventory';
    } else if (path.includes('/obligations/scoping')) {
      return 'My Workplace - Obligations - Scoping Document';
    } else if (path.includes('/obligations/gigs')) {
      return 'My Workplace - Obligations - Gigs';
    }
    return 'My Workplace';
  });
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  
  defineEmits(['toggle-sidebar']);
  </script>
  
  