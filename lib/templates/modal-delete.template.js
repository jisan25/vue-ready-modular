// lib/templates/delete-modal.template.js
export default ({ name, Name }) => `
<template>
  <BaseModal
    :isVisible="store.isDeleteModal"
    :title="\`Are you sure you want to delete this \${store.moduleName}?\`"
    :maxWidth="\`\${store.modalWidth}\`"
    @close="store.handleToggleModal"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <p class="text-lg">
          <strong>ID:</strong>
          {{ store.item.id }}
        </p>
        <p class="text-lg">
          <strong>Name:</strong>
          {{ store.item.name }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 pt-4">
        <BaseButton
          class="bg-yellow-600 hover:bg-yellow-700"
          type="button"
          @click="store.handleToggleModal"
        >
          Cancel
        </BaseButton>

        <BaseButton
          type="submit"
          class="bg-red-600 hover:bg-red-700"
        >
          Delete
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { use${Name}Mutations } from '@/modules/${name}/queries/use${Name}Mutations'
import { use${Name}Store } from '@/modules/${name}/store/${name}Store'

const store = use${Name}Store()

const { remove } = use${Name}Mutations(store.moduleName, {
  onSuccess() {
    store.handleToggleModal() // close modal
  },
  onError(error) {
    console.log('Custom error handling', error)
  },
})

const handleSubmit = async () => {
  await remove.mutateAsync(store.item.id)
}
</script>
`;
