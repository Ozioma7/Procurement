<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Top Nav Bar -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Stock Availability</h1>
      <div class="flex items-center gap-4">
        <button class="text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <img src="../assets/images/profile.png" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
          <span class="font-medium">Victor Ade</span>
          <span>▼</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="p-4 bg-white rounded-xl shadow mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
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

    <!-- Table -->
    <div class="bg-white shadow rounded-xl overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Item Name</th>
            <th class="p-3">Quantity</th>
            <th class="p-3">Threshold</th>
            <th class="p-3">Category</th>
            <th class="p-3">User</th>
            <th class="p-3">Status</th>
            <th class="p-3">Last Stocked</th>
            <th class="p-3">Time</th>
            <th class="p-3">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" class="border-t hover:bg-gray-50">
            <td class="p-3">{{ item.id }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.quantity }}</td>
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
            <td class="p-3">{{ item.lastStocked }}</td>
            <td class="p-3">{{ item.time }}</td>
            <td class="p-3">
              <button @click="viewItem(item)" class="hover:text-blue-600">👁️ View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-end items-center gap-2 text-sm">
      <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30">
        ◀
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        @click="goToPage(p)"
        :class="[
          'px-3 py-1 border rounded',
          page === p ? 'bg-[#D50036] text-white' : 'hover:bg-gray-100'
        ]"
      >
        {{ p }}
      </button>
      <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30">
        ▶
      </button>
    </div>

    <!-- Item Detail Modal -->
    <ItemDetailModal
      v-if="showItemDetail"
      :item="selectedItem"
      context="availability"
      @close="showItemDetail = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ItemDetailModal from '@/components/ItemDetailModal.vue'

const search = ref('')
const selectedCategory = ref('')
const page = ref(1)
const perPage = 5

const showItemDetail = ref(false)
const selectedItem = ref(null)

const viewItem = (item) => {
  selectedItem.value = item
  showItemDetail.value = true
}

const items = ref([
  { id: '#001', name: 'A4 Paper', quantity: 250, threshold: 100, category: 'Stationery', user: 'Admin', lastStocked: '2025-07-01', time: '10:00 AM' },
  { id: '#002', name: 'Printer Toner', quantity: 15, threshold: 20, category: 'Electronics', user: 'Admin', lastStocked: '2025-07-02', time: '09:45 AM' },
  { id: '#003', name: 'Office Desk', quantity: 5, threshold: 8, category: 'Furniture', user: 'John', lastStocked: '2025-07-03', time: '01:15 PM' },
  { id: '#004', name: 'Ceiling Fan', quantity: 80, threshold: 60, category: 'Electronics', user: 'Mary', lastStocked: '2025-07-04', time: '11:30 AM' },
  { id: '#005', name: 'Stapler', quantity: 100, threshold: 30, category: 'Stationery', user: 'Admin', lastStocked: '2025-07-05', time: '08:00 AM' },
  { id: '#006', name: 'Air Conditioner', quantity: 20, threshold: 15, category: 'Electronics', user: 'Mike', lastStocked: '2025-07-06', time: '02:00 PM' },
  { id: '#007', name: 'Whiteboard Marker', quantity: 300, threshold: 150, category: 'Stationery', user: 'Mary', lastStocked: '2025-07-07', time: '09:30 AM' },
  { id: '#008', name: 'Chair', quantity: 10, threshold: 5, category: 'Furniture', user: 'Sarah', lastStocked: '2025-07-08', time: '12:45 PM' },
  { id: '#009', name: 'Monitor', quantity: 25, threshold: 20, category: 'Electronics', user: 'John', lastStocked: '2025-07-09', time: '04:15 PM' },
  { id: '#010', name: 'Pen', quantity: 500, threshold: 200, category: 'Stationery', user: 'Admin', lastStocked: '2025-07-10', time: '11:00 AM' },
])

const categories = computed(() => [...new Set(items.value.map(i => i.category))])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchCategory = !selectedCategory.value || item.category === selectedCategory.value
    const matchSearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / perPage))
const paginatedItems = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredItems.value.slice(start, start + perPage)
})

const nextPage = () => {
  if (page.value < totalPages.value) page.value++
}
const prevPage = () => {
  if (page.value > 1) page.value--
}
const goToPage = (p) => {
  page.value = p
}
</script>
