<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen">
    <!-- Top Nav Bar -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">Dashboard</h1>

      <div class="flex items-center gap-4">
        <button class="text-gray-600 hover:text-[#D50036] text-xl">🔔</button>
        <div class="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="Profile"
            class="rounded-full w-10 h-10 border"
          />
          <span class="font-medium text-sm">John Doe</span>
          <span class="text-gray-500">▼</span>
        </div>
      </div>
    </div>

    <!-- Secondary Action Bar -->
    <div class="bg-white p-4 rounded-xl shadow mb-6 flex flex-col lg:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 w-full lg:w-1/2">
        <input
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036] transition"
        />
        <button class="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition">Filter</button>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="toggleModal"
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardCard title="Total Items" value="509,234" change="+11%" icon="📦" color="green" />
      <DashboardCard title="Critical Stock" value="102,012" change="-17%" icon="⚠️" color="red" />
      <DashboardCard title="Pending Orders" value="94.23" change="-2%" icon="📋" color="orange" />
      <DashboardCard title="Recent Activity" value="301,785" change="+77%" icon="🔄" color="green" />
    </div>

    <!-- Charts Section -->
    <DashboardCharts />

    <!-- Purchase Request Modal -->
    <PurchaseRequestModal
      :isOpen="showModal"
      :onClose="closeModal"
      @submitted="handleSubmit"
    />

    <!-- Transaction Logs Table (conditional) -->
    <TransactionLogs v-if="showTransactions" />

    <InventoryManagement />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import DashboardCharts from '@/components/DashboardCharts.vue'
import PurchaseRequestModal from '@/components/PurchaseRequestModal.vue'
import TransactionLogs from '@/views/TransactionLogs.vue'
import InventoryManagement from '@/views/InventoryManagement.vue'

const showModal = ref(false)
const showTransactions = ref(false)

const toggleModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSubmit = (data) => {
  console.log('Submitted form data:', data)
  closeModal()
}
</script>
