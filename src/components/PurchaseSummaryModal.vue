<!-- PurchaseSummaryModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
      <h3 class="text-lg font-semibold mb-4">Order summary</h3>
      <div class="text-sm text-gray-600 mb-4">
        <div class="flex justify-between mb-1">
          <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Shipping</span><span>$5.00</span>
        </div>
        <div class="flex justify-between mb-4">
          <span>Tax</span><span>$8.62</span>
        </div>
      </div>

      <div class="bg-gray-100 p-4 rounded mb-4">
        <h4 class="font-medium mb-2">Item details</h4>
        <ul class="space-y-2 text-sm">
          <li v-for="item in items" :key="item.id" class="flex justify-between">
            <span>{{ item.name }}</span>
            <span>Qty: {{ item.quantity }}</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-between font-semibold text-lg mb-4">
        <span>Total</span><span>${{ total.toFixed(2) }}</span>
      </div>

      <button
        class="w-full bg-[#D50036] text-white py-2 rounded hover:opacity-90"
        @click="$emit('place-order')"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: Array })
const subtotal = computed(() =>
  props.items.reduce((acc, item) => acc + (item.quantity * 10), 0) // Mock price = $10
)
const total = computed(() => subtotal.value + 5 + 8.62) // Shipping + Tax
</script>
