<!-- components/ItemDetailModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3 mb-4">
        <h2 class="text-base font-semibold text-gray-800">Item details</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">✕</button>
      </div>

      <!-- Dynamic Subtitle -->
      <p class="text-sm text-center text-gray-600 mb-4">
        {{ subtitleText }}
      </p>

      <!-- Dynamic Fields -->
      <div class="grid grid-cols-2 gap-y-3 text-sm bg-gray-50 p-4 rounded-lg text-gray-700">
        <template v-for="(value, label) in mappedFields" :key="label">
          <div class="font-semibold">{{ label }}</div>
          <div v-if="label === 'STATUS'">
            <span class="px-2 py-0.5 text-xs border border-green-500 text-green-600 rounded-full">
              {{ value || '---' }}
            </span>
          </div>
          <div v-else>{{ value || '---' }}</div>
        </template>
      </div>

      <!-- Close button -->
      <div class="mt-6 text-center">
        <button @click="$emit('close')" class="bg-[#D50036] text-white px-6 py-2 rounded-full hover:opacity-90">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object,
  context: String // e.g., "transfers", "incoming", etc.
})

const subtitleText = computed(() => {
  switch (props.context) {
    case 'reorder':
      return `This is a detail of ${props.item?.item || props.item?.name || 'the reorder item'}`;
    case 'transfers':
      return `This is a detail of ${props.item?.item || props.item?.name || 'the transfer item'}`;
      case 'availability':
      return `This is a detail of ${props.item?.item || props.item?.name || 'the availability item'}`;
      case 'Inventory':
      return `This is a detail of ${props.item?.item || props.item?.name || 'the Inventory item'}`;
    case 'incoming':
      return `Incoming details for ${props.item?.item || props.item?.name || 'this item'}`;
    case 'damaged':
      return `Damage record of ${props.item?.item || props.item?.name || 'this item'}`;
    case 'stock':
      return `Stock info: ${props.item?.item || props.item?.name || 'Unnamed item'}`;
    default:
      return `This is a detail of ${props.item?.item || props.item?.name || 'the item'}`;
  }
});

const mappedFields = computed(() => {
  const item = props.item || {};
  switch (props.context) {
    case 'transfers':
      return {
        'TRANSFER ID': item.transferId || item.id,
        'ITEM': item.item || item.itemName || item.name,
        'CATEGORY': item.category,
        'ADDITIONS': item.vendor || item.additions,
        'ADJUSTMENT': item.adjustment,
        'CONSUMPTION': item.consumption,
        'USER': item.user || item.modifiedBy,
        'STATUS': item.status,
        'DATE': item.date,
        'TIME': item.time
      };
      case 'reorder':
      return {
        'ITEM': item.itemName || item.name,
        'CATEGORY': item.category,
        'VENDOR': item.vendor,
        'MIN THRESHOLD': item.minThreshold,
        'MAX THRESHOLD': item.maxThreshold,
        'LAST RESTOCKED': item.lastRestocked,
        'LOCATION': item.location,
        'STATUS': item.status,
        'UNIT PRICE': item.unitPrice
      };
      case 'Inventory':
      return {
        'INVOICE NO': item.invoiceNo,
        'ITEM': item.itemName || item.name,
        'VENDOR': item.vendor,
        'CATEGORY': item.category,
        'QUANTITY': item.quantity,
        'UNIT PRICE': item.unitPrice,
        'TOTAL AMOUNT': item.totalAmount,
        'RECEIVED BY': item.receivedBy,
        'DATE': item.date,
        'TIME': item.time
      };
      case 'availability':
      return {
        'PRODUCT ID': item.availabilityId || item.id,
        'ITEM': item.itemName || item.name,
        'CATEGORY': item.category,
        'QUANTITY': item.quantity,
        'THRESHOLD': item.threshold,
        'CONSUMPTION': item.consumption,
        'USER': item.user || item.modifiedBy,
        'STATUS': item.status,
        'LAST STOCKED': item.lastStocked,
        'TIME': item.time
      };
    case 'incoming':
      return {
        'INVOICE NO': item.invoiceNo,
        'ITEM': item.itemName || item.name,
        'VENDOR': item.vendor,
        'CATEGORY': item.category,
        'QUANTITY': item.quantity,
        'UNIT PRICE': item.unitPrice,
        'TOTAL AMOUNT': item.totalAmount,
        'RECEIVED BY': item.receivedBy,
        'DATE': item.date,
        'TIME': item.time
      };
    case 'damaged':
      return {
        'REPORT ID': item.reportId,
        'ITEM': item.itemName || item.name,
        'CATEGORY': item.category,
        'QUANTITY': item.quantity,
        'REPORTED BY': item.reportedBy,
        'REASON': item.reason,
        'STATUS': item.status,
        'DATE': item.date,
        'TIME': item.time
      };
    default:
      return {
        'ITEM': item.name,
        'CATEGORY': item.category,
        'STOCK': item.stock,
        'MIN THRESHOLD': item.min,
        'MAX THRESHOLD': item.max,
        'LOCATION': item.location,
        'VENDOR': item.vendor,
        'STATUS': item.status
      };
  }
});
</script>
