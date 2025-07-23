<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Top Nav Bar -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Inventory transactions and Audit logs</h1>
      <div class="flex items-center gap-4">
        <button class="text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <img src="../assets/images/profile.png" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
          <span class="font-medium">Victor Ade</span>
          <span>▼</span>
        </div>
      </div>
    </div>

    <!-- Second Nav Bar -->
    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
      <!-- Left: Filters -->
      <div class="flex items-center gap-4">
        <!-- Month Dropdown -->
        <div class="relative">
          <select v-model="selectedMonth" class="appearance-none px-3 py-2 border rounded w-40 text-gray-700">
            <option disabled value="">Select Month</option>
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Download Report Dropdown -->
        <div class="relative">
          <select v-model="selectedFormat" @change="downloadReport" class="appearance-none px-3 py-2 border rounded w-44 text-gray-700">
            <option disabled value="">Download Report</option>
            <option value="pdf">Download PDF</option>
            <option value="csv">Download CSV</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Right: Tabs -->
      <div class="flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab; currentPage = 1"
          :class="[
            'px-4 py-2 rounded',
            activeTab === tab ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="col in currentColumns" :key="col" class="p-3 font-semibold whitespace-nowrap">
              {{ col }}
            </th>
            <th class="p-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" class="border-t hover:bg-gray-50">
            <td v-for="key in currentKeys" :key="key" class="p-3">{{ item[key] }}</td>
            <td class="p-3">
              <button @click="viewItem(item, 'transfers')" class="hover:text-blue-600">👁️ View</button>
            </td>
          </tr>
          <tr v-if="paginatedItems.length === 0">
            <td :colspan="currentColumns.length + 1" class="p-3 text-center text-gray-500">No data found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end items-center mt-4 space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded disabled:opacity-50">
        &lt;
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-3 py-1 border rounded',
          currentPage === page ? 'bg-red-600 text-white' : ''
        ]"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded disabled:opacity-50">
        &gt;
      </button>
    </div>

    <!-- Item Detail Modal -->
    <ItemDetailModal
      v-if="showItemDetail"
      :item="selectedItem"
      :context="modalContext"
      @close="showItemDetail = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ItemDetailModal from '@/components/ItemDetailModal.vue'

const tabs = ['Transactions', 'Audit Log']
const activeTab = ref('Transactions')

const selectedMonth = ref('')
const selectedFormat = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const showItemDetail = ref(false)
const selectedItem = ref(null)
const modalContext = ref('')

function viewItem(item, context) {
  selectedItem.value = item
  modalContext.value = context
  showItemDetail.value = true
}

const months = [
  { name: 'January', value: '01' },
  { name: 'February', value: '02' },
  { name: 'March', value: '03' },
  { name: 'April', value: '04' },
  { name: 'May', value: '05' },
  { name: 'June', value: '06' },
  { name: 'July', value: '07' },
  { name: 'August', value: '08' },
  { name: 'September', value: '09' },
  { name: 'October', value: '10' },
  { name: 'November', value: '11' },
  { name: 'December', value: '12' }
]

const transactions = [
  { id: 'T001', item: 'Printer', category: 'Electronics', additions: 'Vendor A', adjustment: 2, consumption: 0, user: 'Victor', status: 'Transferred', date: '2025-07-01', time: '09:30 AM' },
  { id: 'T002', item: 'Scanner', category: 'Electronics', additions: 'Vendor B', adjustment: -1, consumption: 1, user: 'Michael', status: 'Received', date: '2025-07-02', time: '11:15 AM' },
  { id: 'T003', item: 'Laptop', category: 'Computers', additions: 'Vendor C', adjustment: 0, consumption: 3, user: 'James', status: 'Pending', date: '2025-07-03', time: '02:45 PM' },
  { id: 'T004', item: 'Mouse', category: 'Accessories', additions: 'Vendor D', adjustment: 5, consumption: 2, user: 'Henry', status: 'Transferred', date: '2025-07-04', time: '10:00 AM' },
  { id: 'T005', item: 'Keyboard', category: 'Accessories', additions: 'Vendor E', adjustment: 0, consumption: 7, user: 'Laura', status: 'Received', date: '2025-07-05', time: '01:20 PM' },
  { id: 'T006', item: 'HDMI Cable', category: 'Cables', additions: 'Vendor F', adjustment: 10, consumption: 5, user: 'Victor', status: 'Pending', date: '2025-07-06', time: '03:10 PM' },
  { id: 'T007', item: 'Projector', category: 'Electronics', additions: 'Vendor G', adjustment: 0, consumption: 1, user: 'Paul', status: 'Transferred', date: '2025-07-07', time: '08:50 AM' },
  { id: 'T008', item: 'Speakers', category: 'Audio', additions: 'Vendor H', adjustment: -2, consumption: 4, user: 'Mary', status: 'Received', date: '2025-07-08', time: '12:00 PM' },
  { id: 'T009', item: 'Tablet', category: 'Computers', additions: 'Vendor I', adjustment: 0, consumption: 5, user: 'Dan', status: 'Pending', date: '2025-07-09', time: '04:30 PM' },
  { id: 'T010', item: 'Camera', category: 'Media', additions: 'Vendor J', adjustment: 1, consumption: 2, user: 'Femi', status: 'Transferred', date: '2025-07-10', time: '11:00 AM' },
  { id: 'T011', item: 'Monitor', category: 'Display', additions: 'Vendor K', adjustment: 0, consumption: 3, user: 'Ada', status: 'Received', date: '2025-07-11', time: '09:40 AM' },
  { id: 'T012', item: 'UPS', category: 'Power', additions: 'Vendor L', adjustment: 3, consumption: 1, user: 'John', status: 'Pending', date: '2025-07-12', time: '10:15 AM' },
  { id: 'T013', item: 'Extension Cord', category: 'Cables', additions: 'Vendor M', adjustment: 0, consumption: 20, user: 'Victor', status: 'Transferred', date: '2025-07-13', time: '02:00 PM' },
  { id: 'T014', item: 'Network Switch', category: 'Networking', additions: 'Vendor N', adjustment: -1, consumption: 2, user: 'Michael', status: 'Received', date: '2025-07-14', time: '03:30 PM' },
  { id: 'T015', item: 'Microphone', category: 'Audio', additions: 'Vendor O', adjustment: 0, consumption: 8, user: 'Laura', status: 'Transferred', date: '2025-07-15', time: '01:00 PM' }
]

const auditLogs = [
  {
    id: 'D001',
    item: 'Printer',
    oldValue: '2 units',
    newValue: '3 units',
    action: 'Added',
    user: 'Victor',
    date: '2025-07-01',
    time: '09:30 AM',
  },
  {
    id: 'D002',
    item: 'Scanner',
    oldValue: '5 units',
    newValue: '4 units',
    action: 'Removed',
    user: 'Michael',
    date: '2025-07-02',
    time: '11:15 AM',
  },
  {
    id: 'D003',
    item: 'Laptop',
    oldValue: '1 unit',
    newValue: '1 unit',
    action: 'Transferred',
    user: 'James',
    date: '2025-07-03',
    time: '02:45 PM',
  },
  {
    id: 'D004',
    item: 'Mouse',
    oldValue: '10 units',
    newValue: '15 units',
    action: 'Added',
    user: 'Henry',
    date: '2025-07-04',
    time: '10:00 AM',
  },
  {
    id: 'D005',
    item: 'Keyboard',
    oldValue: '8 units',
    newValue: '7 units',
    action: 'Removed',
    user: 'Laura',
    date: '2025-07-05',
    time: '01:20 PM',
  },
  {
    id: 'D006',
    item: 'HDMI Cable',
    oldValue: '12 units',
    newValue: '12 units',
    action: 'Transferred',
    user: 'Victor',
    date: '2025-07-06',
    time: '03:10 PM',
  },
  {
    id: 'D007',
    item: 'Projector',
    oldValue: '0 units',
    newValue: '1 unit',
    action: 'Added',
    user: 'Paul',
    date: '2025-07-07',
    time: '08:50 AM',
  },
  {
    id: 'D008',
    item: 'Speakers',
    oldValue: '4 units',
    newValue: '2 units',
    action: 'Removed',
    user: 'Mary',
    date: '2025-07-08',
    time: '12:00 PM',
  },
  {
    id: 'D009',
    item: 'Tablet',
    oldValue: '3 units',
    newValue: '3 units',
    action: 'Transferred',
    user: 'Dan',
    date: '2025-07-09',
    time: '04:30 PM',
  },
  {
    id: 'D010',
    item: 'Camera',
    oldValue: '1 unit',
    newValue: '2 units',
    action: 'Added',
    user: 'Femi',
    date: '2025-07-10',
    time: '11:00 AM',
  },
  {
    id: 'D011',
    item: 'Monitor',
    oldValue: '5 units',
    newValue: '5 units',
    action: 'Transferred',
    user: 'Ada',
    date: '2025-07-11',
    time: '09:40 AM',
  },
  {
    id: 'D012',
    item: 'UPS',
    oldValue: '2 units',
    newValue: '5 units',
    action: 'Added',
    user: 'John',
    date: '2025-07-12',
    time: '10:15 AM',
  },
  {
    id: 'D013',
    item: 'Extension Cord',
    oldValue: '20 units',
    newValue: '18 units',
    action: 'Removed',
    user: 'Victor',
    date: '2025-07-13',
    time: '02:00 PM',
  },
  {
    id: 'D014',
    item: 'Network Switch',
    oldValue: '3 units',
    newValue: '3 units',
    action: 'Transferred',
    user: 'Michael',
    date: '2025-07-14',
    time: '03:30 PM',
  },
  {
    id: 'D015',
    item: 'Microphone',
    oldValue: '6 units',
    newValue: '8 units',
    action: 'Added',
    user: 'Laura',
    date: '2025-07-15',
    time: '01:00 PM',
  },
];

// Filter data by activeTab and selectedMonth
const filteredData = computed(() => {
  if (activeTab.value === 'Transactions') {
    if (selectedMonth.value) {
      return transactions.filter(t => t.date.split('-')[1] === selectedMonth.value)
    }
    return transactions
  } else {
    if (selectedMonth.value) {
      return auditLogs.filter(log => log.date.split('-')[1] === selectedMonth.value)
    }
    return auditLogs
  }
})

// Calculate total pages for pagination
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / itemsPerPage))
})

// Paginate the filtered data
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredData.value.slice(start, start + itemsPerPage)
})

// Pagination controls
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Columns and keys for rendering the table, matching your data
const currentColumns = computed(() => {
  return activeTab.value === 'Transactions'
    ? ['ID', 'Item', 'Category', 'Additions', 'Adjustment', 'Consumption', 'User', 'Status', 'Date', 'Time']
    : ['ID', 'Item Name', 'Old Value', 'New Value', 'Action', 'User', 'Date', 'Time']
})

const currentKeys = computed(() => {
  return activeTab.value === 'Transactions'
    ? ['id', 'item', 'category', 'additions', 'adjustment', 'consumption', 'user', 'status', 'date', 'time']
    : ['id', 'item', 'oldValue', 'newValue', 'action', 'user', 'date', 'time']
})


// Download report handler
function downloadReport() {
  if (!selectedFormat.value) return
  alert(`Downloading ${activeTab.value} as ${selectedFormat.value.toUpperCase()}`)
  selectedFormat.value = ''
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
