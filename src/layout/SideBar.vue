<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-[#0F151F] text-white transition-all duration-300 ease-in-out border-r border-gray-800 h-screen fixed left-0 z-30',
        isOpen ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Logo Section -->
      <div class="p-6 flex items-center justify-center border-b border-gray-800">
        <img 
          src="@/assets/logo.svg" 
          alt="Suburban Logo" 
          class="h-8"
        />
      </div>
      
      <!-- Navigation Menu -->
      <div class="h-[calc(100%-4rem)] overflow-y-auto">
        <!-- My Workplace Section -->
        <div class="px-4 py-6">
          <button 
            @click="toggleWorkplace" 
            class="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            :class="{ 'justify-center': !isOpen }"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span v-if="isOpen" class="ml-3 font-medium">My Workplace</span>
            </div>
            <svg 
              v-if="isOpen" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 text-gray-400 transition-transform duration-200"
              :class="{ 'transform rotate-180': workplaceOpen }"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- My Workplace Dropdown -->
          <div v-show="workplaceOpen || !isOpen" class="mt-3 space-y-2 pl-4">
            <router-link 
              to="/brd-request" 
              class="block px-4 py-3 rounded-lg transition-colors text-sm"
              :class="[
                $route.path.includes('/brd-request') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                !isOpen ? 'text-center' : ''
              ]"
            >
              <div class="flex items-center" :class="{ 'justify-center': !isOpen }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
                <span v-if="isOpen" class="ml-3">BRD Request</span>
                <span v-else class="sr-only">BRD Request</span>
              </div>
            </router-link>
          </div>
        </div>
        
        <!-- Obligations Section -->
        <div class="px-4 mb-2 mt-4">
          <button 
            @click="toggleObligations" 
            class="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            :class="{ 'justify-center': !isOpen }"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
              <span v-if="isOpen" class="ml-3 font-medium">Obligations</span>
            </div>
            <svg 
              v-if="isOpen" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 text-gray-400 transition-transform duration-200"
              :class="{ 'transform rotate-180': obligationsOpen }"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Obligations Submenu - Only Gig Pipeline -->
          <div 
            v-show="obligationsOpen || !isOpen" 
            class="mt-3 space-y-2 pl-4"
          >
            <router-link 
              to="/obligations/projects" 
              class="block px-4 py-3 rounded-lg transition-colors text-sm"
              :class="[
                $route.path.includes('/obligations/projects') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                !isOpen ? 'text-center' : ''
              ]"
            >
              <div class="flex items-center" :class="{ 'justify-center': !isOpen }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
                <span v-if="isOpen" class="ml-3">Gig Pipeline</span>
                <span v-else class="sr-only">Gig Pipeline</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div :class="['flex-1 flex flex-col h-screen overflow-auto', isOpen ? 'ml-64' : 'ml-20']">
      <!-- Top Navigation Bar - Fixed to top -->
      <div class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 shadow-sm sticky top-0 z-20">
        <div class="flex items-center">
          <button 
            @click="$emit('toggle')" 
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-gray-800 ml-4">Dashboard</h1>
        </div>
        
        <div class="flex items-center">
          <div class="relative" ref="profileDropdown">
            <button 
              @click="profileOpen = !profileOpen" 
              class="flex items-center space-x-3 focus:outline-none"
            >
              <span class="text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
              <img 
                src="" 
                alt="Profile" 
                class="h-10 w-10 rounded-full border-2 border-gray-200"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Profile Dropdown -->
            <div 
              v-show="profileOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Page Content -->
      <div class="flex-1 p-6 overflow-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
});

defineEmits(['toggle']);

const workplaceOpen = ref(true);
const obligationsOpen = ref(true);
const profileOpen = ref(false);
const profileDropdown = ref(null);

const toggleWorkplace = () => {
  workplaceOpen.value = !workplaceOpen.value;
};

const toggleObligations = () => {
  obligationsOpen.value = !obligationsOpen.value;
};

// Close profile dropdown when clicking outside
const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    profileOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for the sidebar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1a2433;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #2d3748;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #4a5568;
}
</style>

