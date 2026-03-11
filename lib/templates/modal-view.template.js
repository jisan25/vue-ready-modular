// lib/templates/view-modal.template.js
export default ({ name, Name, subName=null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isViewModal"
    :title="\`View \${store.moduleName} Details\`"
    :className="'max-w-[95vw] xl:max-w-[80vw]'"
    @close="store.handleToggleModal"
  >
    <ViewModalLayout>
      <div class="space-y-2">
        <p class="text-lg">
          <strong>ID:</strong>
          {{ store.item?.id }}
        </p>
        <p class="text-lg">
          <strong>Name:</strong>
          {{ store.item?.name }}
        </p>
        <p class="text-lg">
          <strong>Created At:</strong>
          {{ store.item?.created_at }}
        </p>
        <p class="text-lg">
          <strong>Updated At:</strong>
          {{ store.item?.updated_at }}
        </p>
      </div>

      <!-- Related Items -->
      <h2 class="text-lg font-semibold py-3">
        {{ store.item?.name }} Clients
      </h2>

      <BaseTable
        v-if="store.item?.clients"
        :columns="columns"
        :rows="store.item.clients"
      />
    </ViewModalLayout>
  </BaseModal>
</template>

<script setup>
import { use${subName || Name}Store } from '@/modules/${parent || name}/stores/${subName || Name}Store'
import ViewModalLayout from '@/shared/components/ui/ViewModalLayout.vue'
import { useCrudTable } from '@/shared/composables/useCrudTable'

const store = use${subName || Name}Store()

const { columns } = useCrudTable(store, [
  { key: 'name', label: 'Client' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'client_id', label: 'Client ID' },
  { key: 'country', label: '${subName || Name}' },
])
</script>
`;
