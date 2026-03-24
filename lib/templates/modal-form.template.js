// lib/templates/add-modal.template.js
export default ({ name, Name, subName = null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isModal || store.isEditModal"
    :title="store.title"
    @close="store.handleToggleModal"
    :className="'w-full xl:max-w-[50vw]'"
  >
    <ScrollableLayout height="680px">

     <form @submit.prevent="handleSubmit" class="space-y-4">

        <div class="space-y-2">
          <BaseLabel for="name">Name</BaseLabel>
          <BaseInput
            id="name"
            v-model="formData.name"
            :placeholder="'Enter ${subName} name'"
            :required="true"
          />
        </div>



        <!-- Actions -->
        <div class="flex justify-end gap-2 py-5">
          <BaseButton
            class="bg-yellow-600 hover:bg-yellow-700"
            type="button"
            @click="store.handleToggleModal"
          >Cancel</BaseButton>
          <BaseButton type="submit" :disabled="submitLoading || updateLoading">
            <span v-if="submitLoading || updateLoading">{{ submitSavingText }}</span>
            <span v-else>{{ submitText }}</span>
          </BaseButton>
        </div>
      </form>
    </ScrollableLayout>

  </BaseModal>
</template>

<script setup>

import { useCrudForm } from '@/shared/composables/useCrudForm'
import { useCrudSubmit } from '@/shared/composables/useCrudSubmit'
import { useCrudMutations } from '@/shared/composables/useCrudMutations'

const props = defineProps({
  extraData: {
    type: Object,
    default: () => ({}),
  },
  store: {
    type: Object,
    required: true,
  },
})


const defaultFormData = {
  name: 'Test Name',
}

// API
const api = useCrudMutations(props.store.moduleName, {
  onSuccess() {
    props.store.handleToggleModal()
    resetForm()
  },
})


const { formData, resetForm } = useCrudForm(props.store, defaultFormData)

// SUBMIT
const { handleSubmit, submitLoading, updateLoading, submitText, submitSavingText } = useCrudSubmit(
  props.store,
  api,
  formData,
  resetForm
)
</script>
`;
