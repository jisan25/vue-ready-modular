// lib/templates/common-form.template.js
export default ({ Name }) => `
<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- ${Name} Name -->
    <div class="space-y-2">
      <BaseLabel for="name">Name</BaseLabel>
      <BaseInput
        id="name"
        v-model="localForm.name"
        placeholder="Eg: ${Name} Name"
        :required="true"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 pt-4">
      <BaseButton
        class="bg-yellow-600 hover:bg-yellow-700"
        type="button"
        @click="onCancel"
      >
        Cancel
      </BaseButton>
      <BaseButton type="submit">Save</BaseButton>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  formData: { type: Object, required: true },
  onSubmit: { type: Function, required: true },
  onCancel: { type: Function, required: true },
})

// Emit event to sync formData
const emit = defineEmits(['update:formData'])

// Local reactive copy
const localForm = ref({ ...props.formData })

// Sync to parent when local changes
watch(
  localForm,
  (newVal) => {
    emit('update:formData', newVal)
  },
  { deep: true }
)
</script>
`;
