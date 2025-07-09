<template>
  <div class="bg-white rounded-xl p-4 shadow-md flex justify-between items-center">
    <div class="text-3xl">{{ icon }}</div>
    <div class="text-right">
      <p class="text-sm text-gray-500 font-semibold">{{ title }}</p>
      <p class="text-2xl font-bold text-black">{{ value }}</p>
      <p
        :class="[
          'text-sm font-medium',
          color === 'green' ? 'text-green-600' :
          color === 'red' ? 'text-red-600' :
          'text-yellow-600'
        ]"
      >
        {{ change }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  icon: String,
  color: String
})
</script>
