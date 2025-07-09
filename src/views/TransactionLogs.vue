<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen">
    <!-- Top Section -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <!-- Month Dropdown -->
        <select v-model="selectedMonth" class="border rounded px-4 py-2">
          <option disabled value="">Select Month</option>
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>

        <!-- Download Dropdown -->
        <div class="relative" @mouseleave="showDownloadOptions = false">
          <button
            @click="showDownloadOptions = !showDownloadOptions"
            class="border rounded px-4 py-2"
          >
            Download Report
          </button>
          <div
            v-if="showDownloadOptions"
            class="absolute mt-2 bg-white border rounded shadow-lg z-10 w-40"
          >
            <button
              @click="downloadReport('pdf')"
              class="block px-4 py-2 w-full hover:bg-gray-100 text-left"
            >
              Download as PDF
            </button>
            <button
              @click="downloadReport('csv')"
              class="block px-4 py-2 w-full hover:bg-gray-100 text-left"
            >
              Download as CSV
            </button>
          </div>
        </div>
      </div>

      <!-- Toggle View -->
      <div class="flex gap-4">
        <button class="px-6 py-2 border rounded-full text-sm font-medium">Transactions</button>
        <button class="px-6 py-2 bg-[#D50036] text-white rounded-full text-sm font-medium">Audit Logs</button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-xl overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Item Name</th>
            <th class="p-3 text-left">Additions</th>
            <th class="p-3 text-left">Adjustment</th>
            <th class="p-3 text-left">Consumption</th>
            <th class="p-3 text-left">User</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredTransactions"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3">{{ item.id }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">{{ item.additions }}</td>
            <td class="p-3">{{ item.adjustment }}</td>
            <td class="p-3">{{ item.consumption }}</td>
            <td class="p-3">{{ item.user }}</td>
            <td class="p-3">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  item.status === 'Success'
                    ? 'text-green-600 border-green-600'
                    : item.status === 'Pending'
                    ? 'text-yellow-600 border-yellow-600'
                    : 'text-red-600 border-red-600'
                ]"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="p-3">{{ item.date }}</td>
            <td class="p-3">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'

// Dropdown state
const selectedMonth = ref('')
const showDownloadOptions = ref(false)

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Transaction data
const transactions = ref([
  {
    id: '#8373',
    name: 'HP LaserJet pro M704 printer',
    additions: 50,
    adjustment: 'Added',
    consumption: 'Admin',
    user: 'Admin',
    status: 'Success',
    date: '29/04/2025',
    time: '11:23 AM'
  },
  {
    id: '#1722',
    name: 'Office desk (adjustable height)',
    additions: 15,
    adjustment: 'Removed',
    consumption: 'Admin',
    user: 'Admin',
    status: 'Pending',
    date: '01/05/2025',
    time: '01:34 PM'
  },
  {
    id: '#2890',
    name: 'Stapler',
    additions: 120,
    adjustment: 'Added',
    consumption: 'Admin',
    user: 'Admin',
    status: 'Success',
    date: '13/07/2025',
    time: '09:30 AM'
  }
])

// Convert month name to number for comparison
function getMonthName(dateString) {
  const date = new Date(dateString.split('/').reverse().join('/'))
  return months[date.getMonth()]
}

// Filtered transactions based on month
const filteredTransactions = computed(() => {
  if (!selectedMonth.value) return transactions.value
  return transactions.value.filter(item => getMonthName(item.date) === selectedMonth.value)
})

// Download function
function downloadReport(type) {
  showDownloadOptions.value = false
  const data = filteredTransactions.value

  if (!data.length) {
    alert('No data for selected month!')
    return
  }

  if (type === 'pdf') {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Transaction Report - ${selectedMonth.value}`, 14, 20)
    let y = 30
    data.forEach((item, idx) => {
      doc.setFontSize(10)
      doc.text(`${idx + 1}. ${item.id} - ${item.name} - ${item.date}`, 14, y)
      y += 8
    })
    doc.save(`transactions-${selectedMonth.value}.pdf`)
  }

  if (type === 'csv') {
    const csvHeader = ['ID', 'Item Name', 'Additions', 'Adjustment', 'Consumption', 'User', 'Status', 'Date', 'Time']
    const csvRows = data.map(item => [
      item.id, item.name, item.additions, item.adjustment, item.consumption,
      item.user, item.status, item.date, item.time
    ])
    const csvContent = [csvHeader, ...csvRows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `transactions-${selectedMonth.value}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>
