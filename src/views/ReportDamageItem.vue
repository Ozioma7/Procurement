<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Report Damaged Item</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Item Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Item</label>
        <input v-model="form.item" type="text" placeholder="Name" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
      </div>

      <!-- Quantity and Reason -->
      <div class="flex gap-4">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Quantity Damaged</label>
          <input v-model="form.quantity" type="number" placeholder="Type here" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <input v-model="form.reason" type="text" placeholder="Type here" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
        </div>
      </div>

      <!-- Upload Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
        <div class="flex items-center gap-3">
          <span class="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0l-1.586-1.586a4 4 0 010-5.656l1.414-1.414a4 4 0 015.656 0l1.586 1.586a2 2 0 000 2.828z" />
            </svg>
          </span>
          <input @change="handleFileUpload" type="file" class="border border-gray-300 rounded-md" />
        </div>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        item: '',
        quantity: '',
        reason: '',
        image: null
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.form.image = event.target.files[0]
    },
    submitForm() {
      if (!this.form.item || !this.form.quantity || !this.form.reason || !this.form.image) {
        alert('Please fill all fields and upload an image.')
        return
      }

      // Simulate sending form data (replace with actual backend integration)
      const formData = new FormData()
      formData.append('item', this.form.item)
      formData.append('quantity', this.form.quantity)
      formData.append('reason', this.form.reason)
      formData.append('image', this.form.image)

      console.log('Form submitted:', Object.fromEntries(formData))
      alert('Damage report submitted successfully.')

      // Reset form
      this.form = {
        item: '',
        quantity: '',
        reason: '',
        image: null
      }
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  padding: 4px;
}
</style>
