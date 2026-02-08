// lib/templates/edit-modal.template.js
export default ({ name, Name }) => `
<template>
  <BaseModal
    :isVisible="store.isEditModal"
    :title="\`Edit \${store.moduleName}\`"
    :maxWidth="\`\${store.modalWidth}\`"
    @close="store.handleToggleModal"
  >
    <CommonForm
      v-model:formData="formData"
      :onSubmit="handleSubmit"
      :onCancel="store.handleToggleModal"
    />
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import CommonForm from './CommonForm.vue'
import { use${Name}Mutations } from '@/modules/${name}/queries/use${Name}Mutations'
import { use${Name}Store } from '@/modules/${name}/store/${name}Store'

const store = use${Name}Store()

// Form state
const formData = ref({
  id: '',
  name: '',
})

// Populate form when store.item updates
watch(
  () => store.item,
  (item) => {
    if (item) {
      Object.assign(formData.value, item)
    }
  },
  { immediate: true }
)

// Mutation handler
const { update } = use${Name}Mutations(store.moduleName, {
  onSuccess() {
    store.handleToggleModal() // close modal
  },
  onError(error) {
    console.log('Custom error handling:', error)
  },
})

// Submit
const handleSubmit = async () => {
  await update.mutateAsync(formData.value)
}
</script>
`;
