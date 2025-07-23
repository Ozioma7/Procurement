<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen overflow-x-hidden">
    <!-- Top Nav Bar -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center w-full">
      <h1 class="text-xl font-semibold text-gray-800">Dashboard</h1>

      <div class="flex items-center gap-4 flex-shrink-0">
        <button class="text-gray-600 hover:text-[#D50036] text-xl" title="Notifications">🔔</button>
        <div class="flex items-center gap-2">
          <img
            src="../assets/images/profile.png"
            alt="Profile"
            class="rounded-full w-10 h-10 border"
          />
          <span class="font-medium text-sm">John Doe</span>
          <span class="text-gray-500">▼</span>
        </div>
      </div>
    </div>

    <!-- Secondary Action Bar -->
    <div
      class="bg-white p-4 rounded-xl shadow mb-6 flex flex-col lg:flex-row justify-between items-center gap-4 w-full overflow-x-auto"
    >
      <div class="flex items-center gap-2 w-full lg:w-2/3 min-w-[300px]">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036] transition"
        />

        <!-- Filter Dropdown -->
        <div class="relative">
          <button
            @click="toggleFilter"
            class="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
          >
            Filter ▼
          </button>
          <div
            v-if="showFilter"
            class="absolute z-10 mt-2 bg-white shadow rounded p-4 space-y-2 w-52"
          >
            <select v-model="filters.location" class="w-full border rounded p-1">
              <option value="">All Locations</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
            </select>
            <select v-model="filters.category" class="w-full border rounded p-1">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Stationery">Stationery</option>
            </select>
            <select v-model="filters.vendor" class="w-full border rounded p-1">
              <option value="">All Vendors</option>
              <option value="Vendor A">Vendor A</option>
              <option value="Vendor B">Vendor B</option>
              <option value="Vendor C">Vendor C</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-wrap justify-end">
        <button
          @click="showModal = true"
          class="bg-[#D50036] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
          Purchase request
        </button>
        <button
          @click="showTransactions = !showTransactions"
          class="bg-white border text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
        >
          Transactions
        </button>
      </div>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full">
      <DashboardCard title="Total Items" value="509,234" change="+11%" icon="📦" color="green" />
      <DashboardCard title="Critical Stock" value="102,012" change="-17%" icon="⚠️" color="red" />
      <DashboardCard title="Pending Orders" value="94.23" change="-2%" icon="📋" color="orange" />
      <DashboardCard title="Recent Activity" value="301,785" change="+77%" icon="🔄" color="green" />
    </div>

    <!-- Charts Section -->
    <DashboardCharts />

    <!-- Purchase Request Modal -->
    <PurchaseRequestModal
      v-if="showModal"
      @close="showModal = false"
      @submitted="handleSubmit"
    />

    <!-- Transaction Logs Table (conditionally shown) -->
    <TransactionLogs v-if="showTransactions" :search="search" :filters="filters" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import DashboardCharts from '@/components/DashboardCharts.vue'
import PurchaseRequestModal from '@/components/PurchaseRequestModal.vue'
import TransactionLogs from '@/views/TransactionLogs.vue'

const showModal = ref(false)
const showTransactions = ref(false)
const showFilter = ref(false)
const search = ref('')

const filters = ref({
  location: '',
  category: '',
  vendor: ''
})

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

function handleSubmit(data) {
  console.log('Submitted purchase request data:', data)
  showModal.value = false
}
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
