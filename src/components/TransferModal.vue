<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-lg font-semibold mb-4">Stock Transfer Request</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">From</label>
          <input v-model="form.from" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium">To</label>
          <input v-model="form.to" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Item</label>
          <input v-model="form.item" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Quantity</label>
          <input v-model.number="form.quantity" type="number" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" class="bg-[#D50036] text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  from: '',
  to: '',
  item: '',
  quantity: 1
})

const emit = defineEmits(['submit', 'close'])

function submitForm() {
  emit('submit', { ...form })
  emit('close')
}
</script>

