<template>
  <div class="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-10">
    <h1 class="text-xl font-bold mb-6 flex items-center gap-2">
      ⚠️ Transfer Request
    </h1>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block font-medium mb-1">From</label>
        <input v-model="from" type="text" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">To</label>
        <input v-model="to" type="text" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">Priority / Notes</label>
        <textarea v-model="notes" class="w-full border p-2 rounded" rows="4" placeholder="Optional notes..."></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">Items to Transfer</label>
        <div v-for="(item, index) in items" :key="index" class="flex items-center gap-2 mb-2">
          <input
            v-model="item.name"
            type="text"
            class="flex-1 border p-2 rounded"
            placeholder="Item name"
            required
          />
          <input
            v-model="item.quantity"
            type="number"
            class="w-24 border p-2 rounded"
            placeholder="Qty"
            required
          />
          <button type="button" class="text-red-500" @click="removeItem(index)">✖</button>
        </div>
        <button type="button" class="text-sm text-blue-600" @click="addItem">+ Add Item</button>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <router-link to="/stock-monitor" class="px-4 py-2 bg-gray-300 rounded">Cancel</router-link>
        <button type="submit" class="px-4 py-2 bg-[#D50036] text-white rounded shadow">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const from = ref('')
const to = ref('')
const notes = ref('')
const items = ref([{ name: '', quantity: 1 }])

function addItem() {
  items.value.push({ name: '', quantity: 1 })
}
function removeItem(index) {
  items.value.splice(index, 1)
}
function submitForm() {
  const transferPayload = {
    from: from.value,
    to: to.value,
    notes: notes.value,
    items: items.value
  }
  console.log('Transfer Submitted:', transferPayload)

  // Simulate successful submission
  alert('Transfer submitted successfully!')
  router.push('/stock-monitor')
}
</script>
