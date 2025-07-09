<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen">
    <!-- Top Nav -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">Stock Monitoring Re-order</h1>
      <div class="flex items-center gap-4">
        <button class="text-gray-600 hover:text-[#D50036] text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <span class="font-medium text-sm">John Doe</span>
          <span class="text-gray-500">▼</span>
        </div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex flex-col lg:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 w-full lg:w-2/3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036] transition"
        />

        <select
          v-model="selectedFilter"
          class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D50036]"
        >
          <option value="">All Filters</option>

          <optgroup label="Category">
            <option
              v-for="category in uniqueCategories"
              :key="'category:' + category"
              :value="'category:' + category"
            >
              {{ category }}
            </option>
          </optgroup>

          <optgroup label="Location">
            <option
              v-for="location in uniqueLocations"
              :key="'location:' + location"
              :value="'location:' + location"
            >
              {{ location }}
            </option>
          </optgroup>

          <optgroup label="Vendor">
            <option
              v-for="vendor in uniqueVendors"
              :key="'vendor:' + vendor"
              :value="'vendor:' + vendor"
            >
              {{ vendor }}
            </option>
          </optgroup>
        </select>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="openConfirmationModal"
          :disabled="!selectedItems.length"
          class="bg-[#D50036] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
          Re-order
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3"><input type="checkbox" @change="toggleAll" :checked="allSelected" /></th>
            <th class="p-3">Item Name</th>
            <th class="p-3">Category</th>
            <th class="p-3">Stock Level</th>
            <th class="p-3">Min Threshold</th>
            <th class="p-3">Max Threshold</th>
            <th class="p-3">Status</th>
            <th class="p-3">Location</th>
            <th class="p-3">Vendor</th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" class="border-t hover:bg-gray-50">
            <td class="p-3">
              <input type="checkbox" :value="item.id" v-model="selectedItems" />
            </td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.category }}</td>
            <td class="p-3">{{ item.stock }}</td>
            <td class="p-3">{{ item.min }}</td>
            <td class="p-3">{{ item.max }}</td>
            <td class="p-3">
              <span
                :class="[ 'px-2 py-1 rounded-full border text-xs font-medium',
                  item.stock < item.min
                    ? 'text-red-600 border-red-600'
                    : item.stock <= item.min + 10
                    ? 'text-yellow-600 border-yellow-600'
                    : 'text-green-600 border-green-600'
                ]"
              >
                {{
                  item.stock < item.min
                    ? 'Out of stock'
                    : item.stock <= item.min + 10
                    ? 'Low in stock'
                    : 'Highly stocked'
                }}
              </span>
            </td>
            <td class="p-3">{{ item.location }}</td>
            <td class="p-3">{{ item.vendor }}</td>
            <td class="p-3">
              <button @click="viewItem(item)" class="text-gray-600 hover:text-[#D50036] text-lg">👁️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4 gap-2">
      <button class="px-3 py-1 border rounded" @click="prevPage" :disabled="page === 1">Prev</button>
      <span class="text-sm px-2">Page {{ page }}</span>
      <button class="px-3 py-1 border rounded" @click="nextPage" :disabled="endIndex >= filteredItems.length">Next</button>
    </div>

    <!-- Modals -->
    <ReorderFormModal
      v-if="showReorderForm"
      :items="selectedReorderItems"
      @close="showReorderForm = false"
      @submitted="handleReorderSubmit"
    />

    <ConfirmationModal
      v-if="showConfirmationModal"
      :itemCount="selectedItems.length"
      @cancel="showConfirmationModal = false"
      @confirm="confirmReorder"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ReorderFormModal from '@/components/ReorderFormModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

// Reactive states
const items = ref([
  { id: 1, name: 'Item 1 (Electronics)', category: 'Electronics', stock: 89, min: 17, max: 117, location: 'Ibadan hub', vendor: 'Swift Supplies' },
  { id: 2, name: 'Item 2 (Office Supplies)', category: 'Office Supplies', stock: 36, min: 13, max: 97, location: 'Enugu branch', vendor: 'AgroMart LTD' },
  { id: 3, name: 'Item 3 (Food supply)', category: 'Food supply', stock: 20, min: 12, max: 77, location: 'Ibadan hub', vendor: 'TechCity Nig' },
  { id: 4, name: 'Item 4 (Food supply)', category: 'Food supply', stock: 63, min: 29, max: 106, location: 'Ibadan hub', vendor: 'TechCity Nig' },
  { id: 5, name: 'Item 5 (Maintenance)', category: 'Maintenance', stock: 2, min: 34, max: 64, location: 'Kano store', vendor: 'OfficePro' },
  { id: 6, name: 'Item 6 (Office Supplies)', category: 'Office Supplies', stock: 48, min: 11, max: 59, location: 'Abuja Depot', vendor: 'CleanCo' },
  { id: 7, name: 'Item 7 (Electronics)', category: 'Electronics', stock: 13, min: 16, max: 100, location: 'Kano store', vendor: 'CleanCo' },
  { id: 8, name: 'Item 8 (Maintenance)', category: 'Maintenance', stock: 83, min: 31, max: 78, location: 'Abuja Depot', vendor: 'TechCity Nig' },
  { id: 9, name: 'Item 9 (Printers)', category: 'Printers', stock: 51, min: 20, max: 63, location: 'Abuja Depot', vendor: 'CleanCo' },
  { id: 10, name: 'Item 10 (Maintenance)', category: 'Maintenance', stock: 73, min: 38, max: 116, location: 'Kano store', vendor: 'CleanCo' },
  { id: 11, name: 'Item 11 (Electronics)', category: 'Electronics', stock: 99, min: 16, max: 84, location: 'Enugu branch', vendor: 'OfficePro' },
  { id: 12, name: 'Item 12 (Cleaning)', category: 'Cleaning', stock: 89, min: 28, max: 108, location: 'Enugu branch', vendor: 'Powercell GGL' },
  { id: 13, name: 'Item 13 (Food supply)', category: 'Food supply', stock: 41, min: 18, max: 76, location: 'Enugu branch', vendor: 'AgroMart LTD' },
  { id: 14, name: 'Item 14 (Printers)', category: 'Printers', stock: 91, min: 24, max: 57, location: 'Abuja Depot', vendor: 'AgroMart LTD' },
  { id: 15, name: 'Item 15 (Maintenance)', category: 'Maintenance', stock: 52, min: 21, max: 117, location: 'Ibadan hub', vendor: 'CleanCo' },
  { id: 16, name: 'Item 16 (Maintenance)', category: 'Maintenance', stock: 50, min: 35, max: 69, location: 'Lagos warehouse', vendor: 'AgroMart LTD' },
  { id: 17, name: 'Item 17 (Electronics)', category: 'Electronics', stock: 53, min: 22, max: 88, location: 'Abuja Depot', vendor: 'OfficePro' },
  { id: 18, name: 'Item 18 (Printers)', category: 'Printers', stock: 28, min: 11, max: 78, location: 'Enugu branch', vendor: 'OfficePro' },
  { id: 19, name: 'Item 19 (Food supply)', category: 'Food supply', stock: 67, min: 37, max: 110, location: 'Lagos warehouse', vendor: 'Swift Supplies' },
  { id: 20, name: 'Item 20 (Cleaning)', category: 'Cleaning', stock: 62, min: 23, max: 79, location: 'Lagos warehouse', vendor: 'CleanCo' },
])

const searchQuery = ref('')
const selectedFilter = ref('')
const selectedItems = ref([])
const selectedReorderItems = ref([])
const showReorderForm = ref(false)
const showConfirmationModal = ref(false)

const page = ref(1)
const perPage = 10
const startIndex = computed(() => (page.value - 1) * perPage)
const endIndex = computed(() => startIndex.value + perPage)

// Unique values
const uniqueCategories = computed(() => [...new Set(items.value.map(i => i.category))])
const uniqueLocations = computed(() => [...new Set(items.value.map(i => i.location))])
const uniqueVendors = computed(() => [...new Set(items.value.map(i => i.vendor))])

// Filtered items
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const [filterType, filterValue] = selectedFilter.value.split(':')

  return items.value.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.vendor.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)

    const matchesFilter =
      !filterType ||
      (filterType === 'category' && item.category === filterValue) ||
      (filterType === 'location' && item.location === filterValue) ||
      (filterType === 'vendor' && item.vendor === filterValue)

    return matchesSearch && matchesFilter
  })
})

const paginatedItems = computed(() =>
  filteredItems.value.slice(startIndex.value, endIndex.value)
)

const allSelected = computed(() =>
  paginatedItems.value.every(i => selectedItems.value.includes(i.id))
)

// Events
function toggleAll(e) {
  if (e.target.checked) {
    const ids = paginatedItems.value.map(i => i.id)
    selectedItems.value = [...new Set([...selectedItems.value, ...ids])]
  } else {
    selectedItems.value = selectedItems.value.filter(
      id => !paginatedItems.value.map(i => i.id).includes(id)
    )
  }
}

function openConfirmationModal() {
  showConfirmationModal.value = true
}

function confirmReorder() {
  selectedReorderItems.value = items.value.filter(item =>
    selectedItems.value.includes(item.id)
  )
  showConfirmationModal.value = false
  showReorderForm.value = true
}

function handleReorderSubmit(data) {
  console.log('✅ Reordered:', data)
  selectedItems.value = []
  showReorderForm.value = false
}

function viewItem(item) {
  alert(`👁️ Viewing: ${item.name}`)
}

function nextPage() {
  if (endIndex.value < filteredItems.value.length) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}
</script>
