export default ({ name, Name, parent = null, subName = null }) => {
  return `<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="capitalize">
        <PageTitle>{{ store.moduleName }} Management</PageTitle>
      </div>
      <BaseButton v-can="'${name}.create'" @click="store.handleToggleModal('add')">
        Add {{ store.moduleName }}
      </BaseButton>
    </div>

    <!-- Bulk Delete & Filters -->
    <div class="flex justify-between items-center my-4">
      <!-- BULK DELETE -->
      <div>
        <BaseButton
          v-can="'${name}.delete'"
          v-if="selectedIds.length"
          class="bg-red-600 text-white hover:bg-red-700"
          @click="bulkDelete"
          :disabled="removeItemsLoading"
        >
          <span v-if="removeItemsLoading">Deleting...</span>
          <span v-else>Delete Selected ({{ selectedIds.length }})</span>
        </BaseButton>
      </div>

      <!-- FILTERS -->
      <TableFilters
        :filters="filters"
        :has-active-filters="hasActiveFilters"
         :available-filters="availableFilters"
        @reset="resetFilters"
      />
    </div>

    <!-- Content Card -->
    <div class="rounded-lg bg-white shadow-sm">
      <BaseTableSkeleton v-if="isLoading" :columns="columns.length" :rows="perPage" />
      <BaseTable
        v-else
        :columns="columns"
        :rows="rows"
        :current-page="page"
        :per-page="perPage"
        show-actions
        selectable
        :selected-ids="selectedIds"
        @toggleAll="(checked) => toggleAll(rows, checked)"
        @toggleRow="toggleRow"
        @onRowClick="onView"
      >
        <template #actions="{ row }">
          <button v-can="'${name}.view'" @click="onView(row)" class="text-blue-600 cursor-pointer">
            <i class="fa fa-eye"></i>
          </button>

          <button v-can="'${name}.edit'" @click="onEdit(row)" class="text-green-600 cursor-pointer">
            <i class="fa fa-pencil"></i>
          </button>

          <button v-can="'${name}.delete'" @click="confirmDelete(row.id)" class="text-red-600 cursor-pointer">
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

       <FormModal :extraData="extraData" :store="store"  v-can="['${name}.create', '${name}.edit']" />
      <ViewModal :store="store" v-can="'${name}.view'" />
    </div>
  </div>
</template>

<script setup>
import {  computed, defineAsyncComponent } from 'vue'
import { use${parent ? subName : Name}Store } from '@/modules/${parent || name}/stores/${parent ? subName : Name}Store'

import { usePagination } from '@/shared/composables/usePagination'
import { useBulkDelete } from '@/shared/composables/useBulkDelete'
import { useCrudTable } from '@/shared/composables/useCrudTable'
import { useTableFilters } from '@/shared/composables/useTableFilters'

import TableFilters from '@/shared/components/ui/TableFilters.vue'
import { useDeleteWithConfirm } from '@/shared/composables/useDeleteWithConfirm'
import { useCrudMutations } from '@/shared/composables/useCrudMutations'
import { useCrudQuery } from '@/shared/composables/useCrudQuery'
import { useSyncDynamicFilters } from '@/shared/composables/useSyncDynamicFilters'


const ViewModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/ViewModal.vue'))
const FormModal = defineAsyncComponent(() => import('./${!parent ? "components" : `${subName}Parts`}/FormModal.vue'))


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
const { data, rows,extraData, tableColumns, availableFilters, isLoading } = useCrudQuery(
store.moduleName, 
page,
perPage, 
filters
)
pagination.bindMeta(data)
useSyncDynamicFilters(availableFilters, filters)

/* ---------------- Mutations ---------------- */
const { remove, removeItems, removeItemsLoading } = useCrudMutations(store.moduleName)

/* ---------------- Bulk Delete ---------------- */
const { selectedIds, toggleAll, toggleRow, bulkDelete } = useBulkDelete(removeItems)

/* ---------------- Table ---------------- */

const computedFields = computed(() => {
  const cols = tableColumns.value
  return Array.isArray(cols) ? cols : []
})

const { confirmDelete } = useDeleteWithConfirm(remove)

const { columns, onView, onEdit } = useCrudTable(store, computedFields)

</script>
`;
};
