<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold">Incoming goods and stock transfers</h1>
      <div class="flex items-center gap-4">
        <button class="text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <span class="font-medium">Victor Ade</span>
          <span>▼</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-6 border-b mb-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="['pb-2 px-2 border-b-2', activeTab === tab ? 'border-[#D50036] text-[#D50036]' : 'border-transparent text-gray-600']"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Filters and Actions -->
    <div class="flex justify-between items-center mb-4">
      <button class="px-4 py-2 border rounded">Location</button>
      <button
        v-if="activeTab === 'Stock transfers'"
        class="bg-[#D50036] text-white px-4 py-2 rounded"
        @click="openTransferForm"
      >
        Transfer request
      </button>
      <button
        v-if="activeTab === 'Damaged stock'"
        class="bg-[#D50036] text-white px-4 py-2 rounded"
      >
        Report damaged
      </button>
    </div>

    <!-- Tables -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3"><input type="checkbox" /></th>
            <th v-for="col in currentColumns" :key="col" class="p-3">{{ col }}</th>
            <th class="p-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedItems"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3"><input type="checkbox" /></td>
            <td v-for="col in currentKeys" :key="col" class="p-3">{{ item[col] }}</td>
            <td class="p-3">
              <button @click="viewItem(item)">👁️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4 gap-2">
      <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded">‹</button>
      <span class="px-2 py-1 text-sm">Page {{ page }}</span>
      <button @click="nextPage" :disabled="endIndex >= currentData.length" class="px-3 py-1 border rounded">›</button>
    </div>

    <!-- Side Modal -->
    <div
      v-if="showModal"
      class="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl overflow-auto z-50 p-6"
    >
      <h2 class="text-lg font-semibold mb-4">Item details</h2>
      <div class="space-y-3 text-sm">
        <div v-for="(value, key) in selectedItem" :key="key">
          <strong>{{ formatKey(key) }}:</strong> {{ value }}
        </div>
      </div>
      <button class="mt-6 w-full bg-[#D50036] text-white py-2 rounded" @click="showModal = false">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = ['Incoming goods', 'Stock transfers', 'Damaged stock']
const activeTab = ref('Incoming goods')

const incomingData = [
  { id: 1, poNumber: '24355', supplier: 'Rice (50 kg)', expectedQty: 50, receivedQty: 50, status: 'Delivered' },
  { id: 2, poNumber: '38554', supplier: 'Mop heads', expectedQty: 15, receivedQty: 0, status: 'Undelivered' }
]
const stockData = [
  { id: 1, transferId: '24355', from: 'Rice (50 kg)', to: 'Food supply', items: 50, quantity: 20, status: 'Pending' },
  { id: 2, transferId: '38554', from: 'Mop heads', to: 'Maintenance', items: 15, quantity: 10, status: 'Delivered' }
]
const damagedData = [
  { id: 1, reportId: '24355', category: 'Food supply', item: 'Rice (50 kg)', qty: 50, reason: 'Wet', date: '31/05/2025', status: 'In review' },
  { id: 2, reportId: '38554', category: 'Maintenance', item: 'Mop heads', qty: 15, reason: 'Broken', date: '28/05/2025', status: 'Resolved' }
]

const dataMap = {
  'Incoming goods': incomingData,
  'Stock transfers': stockData,
  'Damaged stock': damagedData
}

const columnMap = {
  'Incoming goods': ['P O NUMBER', 'SUPPLIER', 'EXPECTED QTY', 'RECEIVED QTY', 'STATUS'],
  'Stock transfers': ['TRANSFER ID', 'FROM', 'TO', 'ITEMS', 'QUANTITY', 'STATUS'],
  'Damaged stock': ['REPORT ID', 'CATEGORY', 'ITEM', 'QTY DAMAGED', 'REASON', 'DATE', 'STATUS']
}

const keyMap = {
  'Incoming goods': ['poNumber', 'supplier', 'expectedQty', 'receivedQty', 'status'],
  'Stock transfers': ['transferId', 'from', 'to', 'items', 'quantity', 'status'],
  'Damaged stock': ['reportId', 'category', 'item', 'qty', 'reason', 'date', 'status']
}

const currentData = computed(() => dataMap[activeTab.value])
const currentColumns = computed(() => columnMap[activeTab.value])
const currentKeys = computed(() => keyMap[activeTab.value])

const page = ref(1)
const perPage = 5
const startIndex = computed(() => (page.value - 1) * perPage)
const endIndex = computed(() => startIndex.value + perPage)

const paginatedItems = computed(() => currentData.value.slice(startIndex.value, endIndex.value))

function nextPage() {
  if (endIndex.value < currentData.value.length) page.value++
}
function prevPage() {
  if (page.value > 1) page.value--
}

const showModal = ref(false)
const selectedItem = ref({})

function viewItem(item) {
  selectedItem.value = item
  showModal.value = true
}

function openTransferForm() {
  alert('Open transfer form modal (not implemented here)')
}

function formatKey(key) {
  return key.replace(/([A-Z])/g, ' $1').toUpperCase()
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}
</style>
