// lib/templates/edit-modal.template.js
export default ({ name, Name, subName=null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isEditModal"
    :title="\`Edit \${store.moduleName}\`"
    @close="store.handleToggleModal"
    :className="'w-full xl:max-w-[50vw]'"
  >
    <CommonForm
      v-model:formData="formData"
      :onSubmit="handleSubmit"
      :onCancel="store.handleToggleModal"
      :loading="updateLoading"
    />
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import CommonForm from './CommonForm.vue'
import { use${subName || Name}Mutations } from '@/modules/${parent || name}/queries/use${subName || Name}Mutations'
import { use${subName || Name}Store } from '@/modules/${parent || name}/stores/${subName || Name}Store'

const store = use${subName || Name}Store()

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
const { update, updateLoading } = use${subName || Name}Mutations(store.moduleName, {
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
