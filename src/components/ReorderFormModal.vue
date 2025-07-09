<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl w-full max-w-lg">
      <h3 class="text-xl font-semibold mb-4">Reorder Form</h3>

      <form @submit.prevent="submitForm">
        <div
          v-for="item in items"
          :key="item.id"
          class="mb-4 border-b pb-4"
        >
          <p class="font-medium mb-2">{{ item.name }}</p>
          <div class="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              v-model.number="form[item.id].quantity"
              placeholder="Quantity"
              class="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              v-model="form[item.id].notes"
              placeholder="Notes (optional)"
              class="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            type="button"
            class="px-4 py-2 border rounded"
            @click="$emit('close')"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#D50036] text-white rounded flex items-center gap-2"
            :disabled="loading"
          >
            <span v-if="loading" class="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Submit Reorder
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({ items: Array })
const emit = defineEmits(['close', 'submitted'])

const form = reactive({})
const loading = ref(false)
const toast = useToast()

// Ensure form object is initialized
watch(
  () => props.items,
  (newItems) => {
    newItems.forEach(item => {
      if (!form[item.id]) {
        form[item.id] = { quantity: '', notes: '' }
      }
    })
  },
  { immediate: true }
)

async function submitForm() {
  loading.value = true
  const reorderData = props.items.map(item => ({
    ...item,
    quantity: form[item.id].quantity,
    notes: form[item.id].notes
  }))

  try {
    // Simulate API delay (mock)
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Reorder submitted successfully!')
    emit('submitted', reorderData)
    emit('close')
  } catch (error) {
    toast.error('Failed to submit reorder.')
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.loader {
  border-top-color: transparent;
}
</style>
