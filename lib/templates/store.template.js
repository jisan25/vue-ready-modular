export default ({  Name }) => `import { defineStore } from 'pinia'
import { useModalHelpers } from '@/shared/composables/useModalHelpers'

export const use${Name}Store = defineStore('${Name}', () => {
  const {
    item,
    isModal,
    isViewModal,
    isEditModal,
    isDeleteModal,
    handleToggleModal,
    handleReset,
  } = useModalHelpers()

  const moduleName = '${Name}'
  const modalWidth = '30vw'

  return {
    item,
    isModal,
    isViewModal,
    isEditModal,
    isDeleteModal,
    moduleName,
    modalWidth,
    handleToggleModal,
    handleReset,
  }
})
`;
