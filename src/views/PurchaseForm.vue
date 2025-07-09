<template>
  <div class="p-6 bg-[#F5F5F5] min-h-screen flex justify-center items-start">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
      <h2 class="text-xl font-semibold mb-4">Create Purchase Request</h2>

      <!-- Dropdown to select item -->
      <div class="flex gap-2 items-center mb-4">
        <select v-model="selectedItemId" class="border px-4 py-2 rounded-lg w-full">
          <option disabled value="">-- Select Item --</option>
          <option v-for="item in availableItems" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <button
          @click="addItem"
          :disabled="!selectedItemId"
          class="bg-[#D50036] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Add
        </button>
      </div>

      <!-- Selected Items List -->
      <div v-if="form.items.length" class="space-y-4 mb-6">
        <div
          v-for="(entry, index) in form.items"
          :key="entry.id"
          class="flex items-center justify-between border p-3 rounded-lg"
        >
          <span class="font-medium">
            {{ getItemName(entry.id) }}
          </span>
          <div class="flex items-center gap-2">
            <button @click="decreaseQty(index)" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span class="w-6 text-center">{{ entry.quantity }}</span>
            <button @click="increaseQty(index)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button @click="removeItem(index)" class="text-red-500 text-xl">🗑</button>
          </div>
        </div>
      </div>

      <!-- Other Form Fields -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Supplier</label>
          <input v-model="form.supplier" type="text" placeholder="Supplier"
            class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Delivery Location</label>
          <input v-model="form.location" type="text" placeholder="Location"
            class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Expected Delivery Day</label>
          <input v-model="form.deliveryDay" type="date"
            class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Note (Optional)</label>
          <textarea v-model="form.note" rows="3" placeholder="Type note here"
            class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"></textarea>
        </div>

        <button type="submit"
          class="w-full bg-[#D50036] text-white py-2 rounded-lg hover:opacity-90 transition">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Sample list of items (each with id and name)
const availableItems = [
  { id: 1, name: 'Printer Paper' },
  { id: 2, name: 'Monitor' },
  { id: 3, name: 'Ink Cartridge' },
  { id: 4, name: 'Stapler' },
  { id: 5, name: 'Desk Chair' }
]

// Track selected item by id
const selectedItemId = ref('')

// Form state
const form = ref({
  items: [],
  supplier: '',
  location: '',
  deliveryDay: '',
  note: ''
})

// Add selected item to form list
function addItem() {
  const itemId = Number(selectedItemId.value)
  const existing = form.value.items.find(i => i.id === itemId)

  if (existing) {
    existing.quantity++
  } else {
    form.value.items.push({ id: itemId, quantity: 1 })
  }

  selectedItemId.value = ''
}

// Get item name from id
function getItemName(id) {
  const item = availableItems.find(i => i.id === id)
  return item ? item.name : 'Unknown Item'
}

// Quantity controls
function increaseQty(index) {
  form.value.items[index].quantity++
}

function decreaseQty(index) {
  if (form.value.items[index].quantity > 1) {
    form.value.items[index].quantity--
  }
}

function removeItem(index) {
  form.value.items.splice(index, 1)
}

// Submit the form
function submitForm() {
  if (!form.value.items.length) {
    alert('Please add at least one item.')
    return
  }

  console.log('✅ Submitted:', form.value)
  alert('Purchase request submitted!')

  // Reset form
  form.value = {
    items: [],
    supplier: '',
    location: '',
    deliveryDay: '',
    note: ''
  }
}
</script>
