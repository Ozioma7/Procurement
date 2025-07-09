<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl w-full max-w-md text-center">
      <div class="text-[#D50036] text-5xl mb-4">✅</div>
      <h3 class="text-xl font-semibold mb-2">Request Re-order</h3>
      <p class="text-sm text-gray-600 mb-6">
        Are you sure you want to request reorder for {{ itemCount }} items selected?
      </p>
      <div class="flex justify-center gap-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-[#D50036] text-white rounded"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemCount: Number
})
defineEmits(['confirm', 'cancel'])
</script>
