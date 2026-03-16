// lib/templates/delete-modal.template.js
export default ({ name, Name, subName = null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isDeleteModal"
    :title="\`Are you sure you want to delete this \${store.moduleName}?\`"
    @close="store.handleToggleModal"
    :className="'w-full xl:max-w-[50vw]'"
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
          :disabled="removeLoading"
        >
          <span v-if="removeLoading">Deleting...</span>
          <span v-else>Delete</span>
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { use${subName || Name}Mutations } from '@/modules/${parent || name}/queries/use${subName || Name}Mutations'
import { use${subName || Name}Store } from '@/modules/${parent || name}/stores/${subName || Name}Store'

const store = use${subName || Name}Store()

const { remove, removeLoading } = use${subName || Name}Mutations(store.moduleName, {
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
