<template>
  <div class="w-full h-full flex flex-col justify-between">
    <h2 class="text-lg font-semibold mb-4">Stock Summary</h2>

    <!-- Summary Table -->
    <table class="w-full text-sm mb-4">
      <thead class="text-left border-b">
        <tr>
          <th class="py-1">Item</th>
          <th class="py-1">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in summaryData" :key="row.label" class="border-b">
          <td class="py-1 flex items-center gap-2">
            <span
              class="inline-block w-3 h-3 rounded-full"
              :style="{ backgroundColor: row.color }"
            ></span>
            {{ row.label }}
          </td>
          <td class="py-1">{{ row.value.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Donut Chart with Centered Text -->
    <div class="relative w-full h-[200px] flex justify-center items-center">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute text-center">
        <div class="text-xl font-bold">{{ total.toLocaleString() }}</div>
        <div class="text-xs text-gray-500">Total</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, ArcElement)

const summaryData = [
  { label: 'Total Stock', value: 2234, color: '#D50036' },        // red
  { label: 'Stock Level', value: 243, color: '#6B7280' },         // grey
  { label: 'Stock Trends', value: 641, color: '#00B454' },        // green
  { label: 'Recent Activities', value: 1554, color: '#F39D1C' }   // yellow
]

const total = summaryData.reduce((acc, item) => acc + item.value, 0)

const chartData = {
  labels: summaryData.map(item => item.label),
  datasets: [
    {
      data: summaryData.map(item => item.value),
      backgroundColor: summaryData.map(item => item.color),
      borderWidth: 1
    }
  ]
}

const chartOptions = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.raw.toLocaleString()}`
      }
    }
  }
}
</script>

<style scoped>
table {
  font-size: 0.875rem;
}
</style>
