<template>
  <div>
    <!-- Title Block with close button -->
    <div class="border-b border-gray-300 pb-4 mb-6 flex justify-between items-center">
      <div class="text-center flex-1">
        <h2 class="text-xl font-semibold">Create Purchase Request</h2>
        <p class="text-gray-600 mt-1">Fill the form to complete your purchase request</p>
      </div>
      <button
        @click="$emit('close')"
        aria-label="Close form"
        class="text-gray-400 hover:text-gray-700 text-2xl font-bold ml-4"
        type="button"
      >
        &times;
      </button>
    </div>

    <!-- Form Fields -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Item</label>
      <input
        v-model="form.item"
        type="text"
        placeholder="Type here"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Supplier</label>
      <input
        v-model="form.supplier"
        type="text"
        placeholder="Type here"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Delivery Location</label>
      <input
        v-model="form.location"
        type="text"
        placeholder="Type here"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-1">Expected Delivery Day</label>
        <input
          v-model="form.deliveryDay"
          type="date"
          class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Quantity</label>
        <div class="flex items-center gap-2">
          <button
            @click="decreaseQty"
            class="w-8 h-8 rounded-full bg-gray-200 text-lg flex items-center justify-center"
            title="Decrease"
            type="button"
          >−</button>
          <span class="w-8 text-center">{{ form.quantity }}</span>
          <button
            @click="increaseQty"
            class="w-8 h-8 rounded-full bg-gray-200 text-lg flex items-center justify-center"
            title="Increase"
            type="button"
          >+</button>
          <button
            @click="clearItem"
            class="text-red-500 text-xl ml-2"
            title="Clear Item"
            type="button"
          >🗑</button>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">
        Note <span class="text-gray-400">(Optional)</span>
      </label>
      <textarea
        v-model="form.note"
        rows="3"
        placeholder="Type here"
        class="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D50036]"
      ></textarea>
    </div>

    <button
      type="button"
      @click="submitForm"
      class="w-full bg-[#D50036] text-white py-2 rounded-lg hover:opacity-90 transition"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['submit', 'close'])

const form = ref({
  item: '',
  supplier: '',
  location: '',
  deliveryDay: '',
  quantity: 1,
  note: ''
})

function increaseQty() {
  form.value.quantity++
}

function decreaseQty() {
  if (form.value.quantity > 1) {
    form.value.quantity--
  }
}

function clearItem() {
  form.value.item = ''
  form.value.quantity = 1
}

function submitForm() {
  if (!form.value.item.trim()) {
    alert('Please enter an item.')
    return
  }

  emit('submit', { ...form.value })

  // Reset form fields
  form.value = {
    item: '',
    supplier: '',
    location: '',
    deliveryDay: '',
    quantity: 1,
    note: ''
  }
}
</script>
