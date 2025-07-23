<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white w-full max-w-md rounded-xl p-6 relative">
      <h2 class="text-lg font-semibold mb-4">Create purchase request</h2>
      <p class="text-sm text-gray-600 mb-4">Fill the form to complete your purchase request</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Item</label>
          <input v-model="form.item" type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div>
          <label class="block text-sm mb-1">Supplier</label>
          <input v-model="form.supplier" type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div>
          <label class="block text-sm mb-1">Delivery Location</label>
          <input v-model="form.deliveryLocation" type="text" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-sm mb-1">Expected Delivery Day</label>
            <input v-model="form.deliveryDay" type="date" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D50036]" />
          </div>
          <div>
            <label class="block text-sm mb-1 text-white">.</label>
            <button type="button" class="bg-[#D50036] text-white px-4 py-2 rounded-md text-sm">+ Add Item</button>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-1">Note</label>
          <textarea v-model="form.note" class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D50036]" rows="3"></textarea>
        </div>

        <button :disabled="loading" type="submit" class="w-full bg-[#D50036] text-white py-2 rounded-md hover:opacity-90 transition">
          <span v-if="!loading">Submit</span>
          <span v-else>Submitting...</span>
        </button>
      </form>

      <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['submitted', 'close'])

const form = ref({
  item: '',
  supplier: '',
  deliveryLocation: '',
  deliveryDay: '',
  note: ''
})

const loading = ref(false)

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    emit('submitted', form.value)
    emit('close')
    loading.value = false
  }, 1500)
}
</script>
