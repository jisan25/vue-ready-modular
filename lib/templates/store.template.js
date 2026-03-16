export default ({  Name, subName=null }) => `import { defineStore } from 'pinia'
import { useModalHelpers } from '@/shared/composables/useModalHelpers'

export const use${subName || Name}Store = defineStore('${subName || Name}', () => {
  const {
    item,
    isModal,
    isViewModal,
    isEditModal,
    isDeleteModal,
    handleToggleModal,
    handleReset,
  } = useModalHelpers()

  const moduleName = '${subName || Name}'

  return {
    item,
    isModal,
    isViewModal,
    isEditModal,
    isDeleteModal,
    moduleName,
    handleToggleModal,
    handleReset,
  }
})
`;
