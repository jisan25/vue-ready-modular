// lib/templates/add-modal.template.js
export default ({ name, Name }) => `
<template>
  <BaseModal
    :isVisible="store.isModal"
    :title="\`Add \${store.moduleName}\`"
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
import { ref } from 'vue'
import CommonForm from './CommonForm.vue'
import { use${Name}Mutations } from '@/modules/${name}/queries/use${Name}Mutations'
import app from '@/shared/config/appConfig'
import { use${Name}Store } from '@/modules/${name}/store/${name}Store'

const store = use${Name}Store()

// Default Form Data
const defaultFormData = {
  name: 'Test Name',
}

// Initialize formData
const formData = ref(
  app.moduleLocal
    ? { ...defaultFormData }
    : Object.fromEntries(
        Object.keys(defaultFormData).map((key) => [key, ''])
      )
)

const { submit } = use${Name}Mutations(store.moduleName, {
  onSuccess() {
    store.handleToggleModal()
    store.handleReset(formData.value)
  },
  onError(error) {
    console.log('Error:', error)
  },
})

// Submit handler
const handleSubmit = async () => {
  await submit.mutateAsync(formData.value)
}
</script>
`;
