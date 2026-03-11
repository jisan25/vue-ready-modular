// lib/templates/page.template.js

export default ({ name, Name, parent = null, subName = null }) => {
  return `<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <PageTitle>{{ store.moduleName }} List</PageTitle>
      </div>
      <BaseButton @click="store.handleToggleModal('add')">
        Add {{ store.moduleName }}
      </BaseButton>
    </div>

    <!-- Bulk Delete & Filters -->
    <div class="flex justify-between items-center my-4">
      <!-- BULK DELETE -->
      <div>
        <BaseButton
          v-if="selectedIds.length"
          class="bg-red-600 text-white hover:bg-red-700"
          @click="bulkDelete"
        >
          Delete Selected ({{ selectedIds.length }})
        </BaseButton>
      </div>

      <!-- FILTERS -->
      <TableFilters
        :filters="filters"
        :has-active-filters="hasActiveFilters"
        @reset="resetFilters"
      />
    </div>

    <!-- Content Card -->
    <div class="rounded-lg bg-white shadow-sm">
      <BaseTable
        v-if="!isLoading"
        :columns="columns"
        :rows="rows"
        show-actions
        selectable
        :selected-ids="selectedIds"
        @toggleAll="(checked) => toggleAll(rows, checked)"
        @toggleRow="toggleRow"
      >
        <template #actions="{ row }">
          <button @click="onView(row)" class="text-blue-600 cursor-pointer">
            <i class="fa fa-eye"></i>
          </button>

          <button @click="onEdit(row)" class="text-green-600 cursor-pointer">
            <i class="fa fa-pencil"></i>
          </button>

          <button @click="onDelete(row)" class="text-red-600 cursor-pointer">
            <i class="fa fa-trash"></i>
          </button>
        </template>
      </BaseTable>

      <!-- Pagination -->
      <BasePagination
        v-if="!isLoading"
        :total="total"
        :showing="showing"
        :links="links"
        :per-page="perPage"
        @update:page="setPage"
        @update:perPage="setPerPage"
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
import { use${parent ? subName : Name}Store } from '@/modules/${parent || name}/stores/${parent ? subName : Name}Store'
import { use${parent ? subName : Name}Query } from '@/modules/${parent || name}/queries/use${parent ? subName : Name}Query'
import { use${parent ? subName : Name}Mutations } from '@/modules/${parent || name}/queries/use${parent ? subName : Name}Mutations'

import { usePagination } from '@/shared/composables/usePagination'
import { useBulkDelete } from '@/shared/composables/useBulkDelete'
import { useCrudTable } from '@/shared/composables/useCrudTable'
import { useTableFilters } from '@/shared/composables/useTableFilters'

import TableFilters from '@/shared/components/ui/TableFilters.vue'

const ViewModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/ViewModal.vue'))
const AddModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/AddModal.vue'))
const EditModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/EditModal.vue'))
const DeleteModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/DeleteModal.vue'))

const store = use${parent ? subName : Name}Store()

/* ---------------- Filters ---------------- */
const { filters, hasActiveFilters, resetFilters } = useTableFilters({
  searchQuery: '',
  from_date: null,
  to_date: null,
})

/* ---------------- Pagination ---------------- */
const pagination = usePagination()
const { page, perPage, total, showing, links, setPage, setPerPage } = pagination

/* ---------------- Query ---------------- */
const { data, isLoading } = use${parent ? subName : Name}Query(page, perPage, filters)
pagination.bindMeta(data)

/* ---------------- Mutations ---------------- */
const { removeItems } = use${parent ? subName : Name}Mutations(store.moduleName)
/* ---------------- Bulk Delete ---------------- */
const { selectedIds, toggleAll, toggleRow, bulkDelete } = useBulkDelete(removeItems, {
  confirmText: 'Are you sure to delete selected records?',
})

/* ---------------- Table ---------------- */
const { columns, onView, onEdit, onDelete } = useCrudTable(store, [
  { key: 'name', label: '${parent ? subName : Name}' },
])

const rows = computed(() => data.value?.data?.data ?? [])
</script>
`;
};
