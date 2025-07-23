<template>
  <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-center">Reorder Request Form</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Full Name</label>
          <input
            v-model="form.fullName"
            type="text"
            required
            class="w-full mt-1 p-2 border rounded-md focus:ring focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Reason for Reorder</label>
          <textarea
            v-model="form.reason"
            required
            rows="3"
            class="w-full mt-1 p-2 border rounded-md focus:ring focus:outline-none"
          ></textarea>
        </div>

        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 border rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#D50036] text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  fullName: '',
  reason: ''
})

function handleSubmit() {
  emit('submit', form)
}
</script>
