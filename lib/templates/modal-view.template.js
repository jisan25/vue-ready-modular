// lib/templates/view-modal.template.js
export default ({ name, Name, subName=null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isViewModal"
    :title="\`View \${store.moduleName} Details\`"
    @close="store.handleToggleModal"
    :className="'max-w-[95vw] xl:max-w-[80vw]'"
  >
    <ViewModalLayout>
      <pre>{{ store.item }}</pre>
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

    
    </ViewModalLayout>
  </BaseModal>
</template>

<script setup>
import { use${subName || Name}Store } from '@/modules/${parent || name}/stores/${subName || Name}Store'
import ViewModalLayout from '@/shared/components/ui/ViewModalLayout.vue'


const store = use${subName || Name}Store()


</script>
`;
