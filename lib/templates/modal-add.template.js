// lib/templates/add-modal.template.js
export default ({ name, Name, subName=null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isModal"
    :title="\`Add \${store.moduleName}\`"
    @close="store.handleToggleModal"
    :className="'w-full xl:max-w-[50vw]'"
  >
    <CommonForm
      v-model:formData="formData"
      :onSubmit="handleSubmit"
      :onCancel="store.handleToggleModal"
      :loading="submitLoading"
    />
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import CommonForm from './CommonForm.vue'
import { use${subName || Name}Mutations } from '@/modules/${parent || name}/queries/use${subName || Name}Mutations'
import app from '@/shared/config/appConfig'
import { use${subName || Name}Store } from '@/modules/${parent || name}/stores/${subName || Name}Store'

const store = use${subName || Name}Store()

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

const { submit, submitLoading } = use${subName || Name}Mutations(store.moduleName, {
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
