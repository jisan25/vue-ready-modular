// lib/templates/page.template.js
import { plural, capitalize } from "../utils/string.js";

export default ({ name, Name }) => {
  const pluralName = capitalize(plural(Name)); // Country -> Countries

  return `<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageTitle>{{ store.moduleName }} List</PageTitle>
      <BaseButton @click="store.handleToggleModal('add')">
        Add {{ store.moduleName }}
      </BaseButton>
    </div>

    <div class="rounded-lg bg-white shadow-sm">
      <BaseTable
        v-if="!isLoading"
        :columns="columns"
        :rows="rows"
        show-actions
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <AddModal />
      <EditModal />
      <ViewModal />
      <DeleteModal />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { use${pluralName}Query } from '../queries/use${pluralName}Query'
import { use${Name}Store } from '../stores/${name}Store'

const ViewModal = defineAsyncComponent(() => import('./components/ViewModal.vue'))
const AddModal = defineAsyncComponent(() => import('./components/AddModal.vue'))
const EditModal = defineAsyncComponent(() => import('./components/EditModal.vue'))
const DeleteModal = defineAsyncComponent(() => import('./components/DeleteModal.vue'))

const store = use${Name}Store()
const { data, isLoading } = use${pluralName}Query()

const columns = [
  { key: 'sl', label: 'SL' },
  { key: 'name', label: '${Name}' },
  { key: 'created_at', label: 'Created At' },
  { key: 'updated_at', label: 'Updated At' }
]

const rows = computed(() => data.value?.data?.data ?? [])

function onView(row) {
  store.handleToggleModal('view', row)
}
function onEdit(row) {
  store.handleToggleModal('edit', row)
}
function onDelete(row) {
  store.handleToggleModal('delete', row)
}
</script>
`;
};
