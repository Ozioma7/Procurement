<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen">
    <!-- Top Bar -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 w-full md:w-1/2">
        <input
          v-model="search"
          type="text"
          placeholder="Search item..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
        />
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <button class="bg-[#D50036] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
        Update Items
      </button>
    </div>

    <!-- Items Table -->
    <div class="bg-white shadow rounded-xl overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Item Name</th>
            <th class="p-3">Threshold</th>
            <th class="p-3">Category</th>
            <th class="p-3">User</th>
            <th class="p-3">Status</th>
            <th class="p-3">Last Stocked Time</th>
            <th class="p-3">View</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3">{{ item.id }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.threshold }}</td>
            <td class="p-3">{{ item.category }}</td>
            <td class="p-3">{{ item.user }}</td>
            <td class="p-3">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  item.threshold >= 50
                    ? 'text-green-600 border-green-600'
                    : 'text-red-600 border-red-600'
                ]"
              >
                {{ item.threshold >= 50 ? 'Sufficient' : 'Low' }}
              </span>
            </td>
            <td class="p-3">{{ item.time }}</td>
            <td class="p-3 cursor-pointer" @click="openModal(item)">👁️</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div class="bg-white w-full max-w-md p-6 overflow-y-auto h-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Item details</h2>
          <button @click="closeModal" class="text-xl">✖</button>
        </div>
        <p class="text-sm text-gray-600 mb-4">
          Details for <strong>{{ selectedItem?.name }}</strong>
        </p>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between border-b py-1" v-for="(val, key) in selectedItem" :key="key">
            <span class="font-medium uppercase">{{ key }}</span>
            <span>{{ val }}</span>
          </div>
        </div>
        <button class="w-full mt-6 bg-[#D50036] text-white py-2 rounded-lg hover:opacity-90" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedCategory = ref('')
const showModal = ref(false)
const selectedItem = ref(null)

const items = ref([
  {
    id: '#001',
    name: 'A4 Paper',
    threshold: 100,
    category: 'Stationery',
    user: 'Admin',
    time: '2025-07-01 10:00 AM'
  },
  {
    id: '#002',
    name: 'Printer Toner',
    threshold: 20,
    category: 'Electronics',
    user: 'Admin',
    time: '2025-07-02 09:45 AM'
  },
  {
    id: '#003',
    name: 'Office Desk',
    threshold: 8,
    category: 'Furniture',
    user: 'John',
    time: '2025-07-03 01:15 PM'
  },
  {
    id: '#004',
    name: 'Ceiling Fan',
    threshold: 60,
    category: 'Electronics',
    user: 'Mary',
    time: '2025-07-04 11:30 AM'
  }
])

const categories = computed(() => {
  return [...new Set(items.value.map(i => i.category))]
})

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchCategory = selectedCategory.value === '' || item.category === selectedCategory.value
    const matchSearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

function openModal(item) {
  selectedItem.value = item
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedItem.value = null
}
</script>
