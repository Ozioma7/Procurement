<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-lg w-full max-w-xl p-6"
      :style="{ maxHeight: '90vh', overflowY: 'auto' }"
    >
      <PurchaseForm @submit="handleSubmit" @close="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
import PurchaseForm from '@/views/PurchaseForm.vue'

const emit = defineEmits(['close', 'submitted'])

function handleSubmit(data) {
  emit('submitted', data)
  emit('close')
}
</script>
