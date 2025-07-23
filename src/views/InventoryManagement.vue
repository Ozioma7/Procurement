<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold">Incoming goods and stock transfers</h1>
      <div class="flex items-center gap-4">
        <button class="text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <img src="../assets/images/profile.png" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
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
        :class="['pb-2 px-2 border-b-2 font-medium', activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-600']"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Filters and Actions -->
    <div class="w-full flex items-center justify-between mb-4 flex-wrap gap-2">
      <div class="flex-1"></div>
      <div class="flex items-center gap-2 flex-nowrap overflow-x-auto">
        <template v-if="activeTab === 'Incoming goods'">
          <input type="date" v-model="startDate" class="px-3 py-2 border rounded" />
          <span class="text-sm">to</span>
          <input type="date" v-model="endDate" class="px-3 py-2 border rounded" />
        </template>

        <select class="px-4 py-2 border rounded">
          <option disabled selected>Location</option>
          <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
        </select>

        <router-link
  v-if="activeTab === 'Stock transfers'"
  to="/transfer-request"
  class="bg-[#D50036] text-white px-4 py-2 rounded shadow whitespace-nowrap text-center"
>
  Transfer request
</router-link>

        <router-link
  v-if="activeTab === 'Report Damage'"
  to="/report-damage-item"
  class="bg-[#D50036] text-white px-4 py-2 rounded shadow whitespace-nowrap text-center"
>
  Report Damage
</router-link>
      </div>
    </div>

    <!-- Table Section -->
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
            <td class="p-3"><button @click="viewItem(item)" class="hover:text-blue-600">👁️ View</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-3 mt-4">
      <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded">‹</button>
      <span class="px-2 py-1 text-sm">Page {{ page }}</span>
      <button @click="nextPage" :disabled="!currentData || endIndex >= currentData.length" class="px-3 py-1 border rounded">›</button>
    </div>

   <!-- Detail Slide-over Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative">
    <!-- Top Bar -->
    <div class="flex justify-between items-center border-b pb-4">
      <h2 class="text-xl font-semibold">Item Details</h2>
      <button @click="showModal = false" class="text-gray-500 hover:text-black text-xl">✖</button>
    </div>

    <!-- Item Heading -->
    <p class="text-center text-sm text-gray-600 my-4">
      Details of <strong>{{ selectedItem.item || selectedItem.name || 'Selected Item' }}</strong>
    </p>

    <!-- Two-column Detail Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="key in currentKeys"
        :key="key"
        class="flex justify-between items-start gap-4 border rounded p-3"
      >
        <p class="text-xs font-semibold text-gray-500 w-1/2">{{ formatKey(key) }}</p>
        <p class="text-sm w-1/2">
          <span
            v-if="key === 'status'"
            :class="[
              'inline-block px-2 py-1 rounded-full text-xs font-medium',
              selectedItem[key]?.toLowerCase() === 'delivered'
                ? 'border border-green-500 text-green-700'
                : 'border border-red-500 text-red-700'
            ]"
          >
            {{ selectedItem[key] }}
          </span>
          <span v-else>{{ selectedItem[key] }}</span>
        </p>
      </div>
    </div>

           <!-- Bottom Close Button -->
    <div class="mt-6">
      <button class="w-full bg-[#D50036] text-white py-2 rounded shadow" @click="showModal = false">Close</button>
    </div>
  </div>
</div>


    <!-- Transfer Request Modal -->
    <div v-if="showTransferModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
        <h2 class="text-lg font-semibold mb-4">Create Transfer</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">From</label>
          <input type="text" v-model="transferFrom" class="w-full border p-2 rounded" placeholder="e.g. Warehouse A" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">To</label>
          <input type="text" v-model="transferTo" class="w-full border p-2 rounded" placeholder="e.g. Store B" />
        </div>

        <table class="w-full text-sm mb-4">
          <thead class="bg-gray-100">
            <tr>
              <th class="text-left p-2">Item</th>
              <th class="text-left p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in transferItems" :key="index">
              <td class="p-2">{{ item.name }}</td>
              <td class="p-2">{{ item.quantity }}</td>
            </tr>
          </tbody>
        </table>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Priority / Notes</label>
          <textarea v-model="priority" class="w-full border p-2 rounded min-h-[80px]" placeholder="Write notes here..."></textarea>
        </div>

        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 bg-gray-200 rounded" @click="showTransferModal = false">Cancel</button>
          <button class="px-4 py-2 bg-[#D50036] text-white rounded" @click="submitTransfer">Submit</button>
        </div>
      </div>
    </div>
  </div>

<ItemDetailModal
  v-if="showItemDetail"
  :item="selectedItem"
  @close="showItemDetail = false"
/>


</template>

<script setup>
import { ref, computed } from 'vue'
import ItemDetailModal from '@/components/ItemDetailModal.vue'
const showItemDetail = ref(false)

const viewItem = (item) => {
  selectedItem.value = item
  showItemDetail.value = true
}


const tabs = ['Incoming goods', 'Stock transfers', 'Damaged stock']
const activeTab = ref('Incoming goods')
const startDate = ref('')
const endDate = ref('')
const showModal = ref(false)
const showTransferModal = ref(false)
const selectedItem = ref({})
const transferFrom = ref('')
const transferTo = ref('')
const priority = ref('')

const locations = ['Lagos warehouse', 'Ibadan hub', 'Kano store', 'Enugu branch', 'Abuja Depot']
const transferItems = ref([
  { name: 'Rice (50kg)', quantity: 30 },
  { name: 'Mop heads', quantity: 15 },
  { name: 'Cleaning detergent', quantity: 10 }
])

function submitTransfer() {
  const payload = {
    from: transferFrom.value,
    to: transferTo.value,
    items: transferItems.value,
    priority: priority.value
  }
  console.log('Submitted Transfer:', payload)
  showTransferModal.value = false
}

const incomingData = [
  { id: 1, poNumber: '24355', supplier: 'Rice (50 kg)', expectedQty: 50, receivedQty: 50, status: 'Delivered' },
  { id: 2, poNumber: '38554', supplier: 'Mop heads', expectedQty: 15, receivedQty: 0, status: 'Undelivered' }
]
const stockData = [
  {
    id: 1,
    transferId: '#837290',
    item: 'Rice (50 kg)',
    category: 'Food',
    to: 'Ebuka & sons LTD',
    from: 'Amina store',
    quantity: 5,
    lastRestocked: '15/04/2024',
    location: 'Abuja warehouse',
    status: 'Pending'
  }
]
const damagedData = [
  { id: 1, reportId: '24355', category: 'Food supply', item: 'Rice (50 kg)', qty: 50, reason: 'Wet', date: '31/05/2025', status: 'Delivered' },
  { id: 2, reportId: '38554', category: 'Maintenance', item: 'Mop heads', qty: 15, reason: 'Broken', date: '28/05/2025', status: 'Resolved' }
]

const dataMap = {
  'Incoming goods': incomingData,
  'Stock transfers': stockData,
  'Damaged stock': damagedData
}
const columnMap = {
  'Incoming goods': ['P O NUMBER', 'SUPPLIER', 'EXPECTED QTY', 'RECEIVED QTY', 'STATUS'],
  'Stock transfers': ['TRANSFER ID', 'ITEM', 'CATEGORY', 'TRANSFERED TO', 'TRANSFERED FROM', 'QUANTITY', 'LAST RESTOCKED', 'LOCATION', 'STATUS'],
  'Damaged stock': ['REPORT ID', 'CATEGORY', 'ITEM', 'QTY DAMAGED', 'REASON', 'DATE', 'STATUS']
}
const keyMap = {
  'Incoming goods': ['poNumber', 'supplier', 'expectedQty', 'receivedQty', 'status'],
  'Stock transfers': ['transferId', 'item', 'category', 'to', 'from', 'quantity', 'lastRestocked', 'location', 'status'],
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
