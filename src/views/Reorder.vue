<!-- src/views/ReorderPage.vue -->
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Reorder Page</h1>
    <div v-if="items.length">
      <div v-for="item in items" :key="item.id" class="mb-2 p-4 border rounded">
        <p class="font-semibold">{{ item.name }}</p>
        <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500">
      No items selected for reorder.
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const items = ref([])

onMounted(() => {
  const itemIds = route.query.itemIds?.split(',').map(Number) || []

  // 🔧 Simulate fetching the full item details (replace with actual fetch if needed)
  const allItems = [
    { id: 1, name: 'Item A', quantity: 2 },
    { id: 2, name: 'Item B', quantity: 5 },
    { id: 3, name: 'Item C', quantity: 1 },
    { id: 4, name: 'Item D', quantity: 3 }
  ]

  items.value = allItems.filter(i => itemIds.includes(i.id))
})
</script>
