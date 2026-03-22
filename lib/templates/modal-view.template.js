// lib/templates/view-modal.template.js
export default ({ name, Name, subName=null, parent = null }) => `
<template>
  <BaseModal
    :isVisible="store.isViewModal"
    :title="\`View \${store.moduleName} Details\`"
    @close="store.handleToggleModal"
    :className="'max-w-[95vw] xl:max-w-[80vw]'"
  >
    <ScrollableLayout>
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

    
    </ScrollableLayout>
  </BaseModal>
</template>

<script setup>
defineProps({
  store: {
    type: Object,
    required: true,
  },
})

</script>
`;
