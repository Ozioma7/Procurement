<template>
  <div class="grid gap-6 mt-8">
    <!-- Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Line Chart - 2/3 -->
      <div class="lg:col-span-2 bg-white rounded-xl p-4 shadow h-[400px]">
        <h3 class="font-semibold text-lg mb-2">Stock Level</h3>
        <Chart :type="'line'" :data="lineData" :options="lineOptions" />
      </div>

      <!-- Summary Donut - 1/3 -->
      <div class="lg:col-span-1 bg-white rounded-xl p-4 shadow h-[400px] overflow-auto">
        <SummaryDonut />
      </div>
    </div>

    <!-- Row 2 -->
    <div class="grid grid-cols-10 gap-6">
      <!-- Bar Chart - 4/10 -->
      <div class="col-span-10 lg:col-span-4 bg-white rounded-xl p-4 shadow h-[400px]">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-semibold text-lg">Stock Trends</h3>
          <div class="flex flex-col text-sm gap-1">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full inline-block" style="background-color: #00B454"></span>
              <span>Consumption Rate</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full inline-block" style="background-color: #D50036"></span>
              <span>Incoming Stock</span>
            </div>
          </div>
        </div>
        <div class="h-[320px]">
          <Chart :type="'bar'" :data="barData" :options="barOptions" />
        </div>
      </div>

      <!-- Recent Activities - 6/10 -->
      <div class="col-span-10 lg:col-span-6 bg-white rounded-xl p-4 shadow h-[400px] overflow-y-auto">
        <h3 class="font-semibold text-lg mb-4">Recent Activities</h3>
        <table class="w-full text-sm">
          <thead class="text-left border-b">
            <tr>
              <th class="py-2">Profile</th>
              <th class="py-2">Name</th>
              <th class="py-2">Products</th>
              <th class="py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="George" class="w-8 h-8 rounded-full" />
              </td>
              <td class="py-2">George</td>
              <td class="py-2">12</td>
              <td class="py-2 text-green-600">9 mins ago</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Paula" class="w-8 h-8 rounded-full" />
              </td>
              <td class="py-2">Paula</td>
              <td class="py-2">5</td>
              <td class="py-2 text-green-600">22 mins ago</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">
                <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Marcus" class="w-8 h-8 rounded-full" />
              </td>
              <td class="py-2">Marcus</td>
              <td class="py-2">8</td>
              <td class="py-2 text-green-600">1 hour ago</td>
            </tr>
            <tr>
              <td class="py-2">
                <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="Aisha" class="w-8 h-8 rounded-full" />
              </td>
              <td class="py-2">Aisha</td>
              <td class="py-2">10</td>
              <td class="py-2 text-green-600">2 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'
import { Chart } from 'vue-chartjs'
import SummaryDonut from '@/components/SummaryDonut.vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)

// Line Chart Data
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'In Stock',
      data: [100000, 98000, 94000, 91000, 88000, 85000, 82000, 80000, 78000, 76000, 74000, 72000],
      borderColor: '#00B454',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Low in Stock',
      data: [10000, 12000, 15000, 17000, 18000, 20000, 19000, 18000, 17000, 16000, 15000, 14000],
      borderColor: '#6B7280',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Out of Stock',
      data: [3000, 3500, 4000, 3800, 3900, 4200, 4100, 4300, 4400, 4600, 4700, 4800],
      borderColor: '#D50036',
      tension: 0.4,
      fill: false
    }
  ]
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 110000,
      ticks: {
        stepSize: 10000,
        callback: value => `${value / 1000}k`
      },
      title: { display: true, text: 'Stock Quantity' }
    },
    x: {
      title: { display: true, text: 'Months' }
    }
  },
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: context => `${context.dataset.label}: ${context.raw.toLocaleString()}`
      }
    }
  }
}

// Bar Chart Data
const barData = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Consumption Rate',
      data: [70, 65, 60, 58, 50, 45, 40],
      backgroundColor: '#00B454'
    },
    {
      label: 'Incoming Stock',
      data: [60, 62, 63, 64, 66, 68, 70],
      backgroundColor: '#D50036'
    }
  ]
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 10,
        callback: value => `${value}k`
      },
      title: { display: true, text: 'Quantity Used' }
    },
    x: {
      title: { display: true, text: 'Days of Week' }
    }
  },
  plugins: {
    legend: { display: false }
  }
}
</script>
