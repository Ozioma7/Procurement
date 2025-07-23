<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <div class="bg-white shadow-xl rounded-lg p-6 max-w-md text-center">
      <div class="flex justify-center mb-4">
        <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-red-700 mb-2">Are you sure you want to delete this item?</h2>
      <p class="mb-6 text-sm text-gray-600">This action cannot be undone.</p>
      <div class="flex justify-center gap-4">
        <button @click="cancel"
                class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm">
          Cancel
        </button>
        <button @click="confirmDelete"
                class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const cancel = () => {
  router.push('/') // Or wherever you want to redirect
}

const confirmDelete = () => {
  const itemId = route.params.id
  // Call your delete API or store logic here
  console.log('Deleting item with ID:', itemId)

  // After delete, redirect
  router.push('/')
}
</script>
