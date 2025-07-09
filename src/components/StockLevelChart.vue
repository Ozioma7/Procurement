<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Stock Levels</h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'In Stock',
      data: [120, 150, 170, 140, 180, 200, 160],
      borderColor: '#00B454',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Low Stock',
      data: [30, 25, 20, 15, 18, 22, 17],
      borderColor: '#F39D1C',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Out of Stock',
      data: [10, 5, 8, 4, 6, 2, 5],
      borderColor: '#D50036',
      tension: 0.4,
      fill: false
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<style scoped>
div {
  height: 300px;
}
</style>
