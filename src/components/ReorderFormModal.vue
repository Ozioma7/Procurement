<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Reorder Stock</h2>

      <form @submit.prevent="submitForm">
        <div
          v-for="(item, index) in localItems"
          :key="item.id"
          class="item-row"
        >
          <span>{{ item.name }}</span>
          <input
            type="number"
            v-model.number="localItems[index].quantity"
            min="0"
            class="quantity-input"
          />
        </div>

        <div class="buttons">
          <button type="submit">Confirm</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  items: Array,
})

const emit = defineEmits(['close', 'submitted'])

const localItems = ref([])

// Clone the incoming props so we don't modify the original directly
watch(
  () => props.items,
  (newItems) => {
    localItems.value = newItems.map(item => ({
      ...item,
      quantity: item.quantity ?? 0
    }))
  },
  { immediate: true }
)

function submitForm() {
  emit('submitted', localItems.value)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.quantity-input {
  width: 80px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
