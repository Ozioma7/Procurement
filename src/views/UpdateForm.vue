<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Back + Submit -->
    <div class="flex justify-between items-center mb-6">
      <button @click="$router.back()" class="text-sm text-gray-600 hover:underline">
        ← Back
      </button>
      <button @click="submitForm" class="bg-[#D50036] text-white px-4 py-2 rounded">
        Submit Product
      </button>
    </div>

    <!-- Form Card -->
    <div class="bg-white p-6 rounded shadow max-w-5xl mx-auto">
      <h2 class="text-xl font-semibold mb-6">Request</h2>

      <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="submitForm">
        <!-- Date -->
        <div>
          <label class="block text-sm font-medium mb-1">Date Requested</label>
          <input v-model="form.date" type="date" class="w-full border px-3 py-2 rounded" />
        </div>

        <!-- Select Month -->
        <div>
          <label class="block text-sm font-medium mb-1">Select Month</label>
          <select v-model="form.month" class="w-full border px-3 py-2 rounded">
            <option v-for="m in months" :key="m">{{ m }}</option>
          </select>
        </div>

        <!-- Request For -->
        <div>
          <label class="block text-sm font-medium mb-1">Request For</label>
          <select v-model="form.requestFor" class="w-full border px-3 py-2 rounded">
            <option>Transportation</option>
            <option>Fuel</option>
            <option>Service</option>
          </select>
        </div>

        <!-- Metric -->
        <div>
          <label class="block text-sm font-medium mb-1">Metric</label>
          <select v-model="form.metric" class="w-full border px-3 py-2 rounded">
            <option>Kilometer</option>
            <option>Liters</option>
            <option>Hours</option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium mb-1">Amount</label>
          <input v-model="form.amount" type="number" class="w-full border px-3 py-2 rounded" />
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium mb-1">Quantity</label>
          <input v-model="form.quantity" type="number" class="w-full border px-3 py-2 rounded" />
        </div>

        <!-- Subscription Checkbox -->
        <div class="col-span-1 md:col-span-3">
          <label class="inline-flex items-center">
            <input v-model="form.subscription" type="checkbox" class="mr-2" />
            Subscription <span class="text-red-500 text-sm ml-1">(if it is a subscription)</span>
          </label>
        </div>

        <!-- Duration -->
        <div>
          <label class="block text-sm font-medium mb-1">Duration (In Months)</label>
          <select v-model="form.duration" class="w-full border px-3 py-2 rounded">
            <option v-for="n in 12" :key="n">{{ n }}</option>
          </select>
        </div>

        <!-- Description -->
        <div class="col-span-1 md:col-span-3">
          <label class="block text-sm font-medium mb-1">Description:</label>
          <textarea v-model="form.description" rows="4" class="w-full border px-3 py-2 rounded resize-none"></textarea>
        </div>

        <!-- Buttons -->
        <div class="col-span-1 md:col-span-3 flex justify-end gap-4 mt-4">
          <button type="button" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add
          </button>
          <button type="button" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  date: '2023-01-21',
  month: 'January',
  requestFor: 'Transportation',
  metric: 'Kilometer',
  amount: 10000,
  quantity: 12,
  subscription: false,
  duration: 1,
  description: '',
})

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const submitForm = () => {
  alert('Form submitted:\n' + JSON.stringify(form.value, null, 2))
}
</script>
