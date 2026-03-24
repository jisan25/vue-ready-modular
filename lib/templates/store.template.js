export default ({
  name,
  Name,
  subName = null,
}) => `import { defineStore } from 'pinia'
import { useModalHelpers } from '@/shared/composables/useModalHelpers'

export const use${subName || Name}Store = defineStore('${subName || Name}', () => {

  const moduleName = '${subName || name}'

  const {
    item,
    type,
    isModal,
    isViewModal,
    isEditModal,
    title,
    handleToggleModal,
    handleReset,
  } = useModalHelpers(moduleName)

  return {
    item,
    type,
    isModal,
    isViewModal,
    isEditModal,
    moduleName,
    title,
    handleToggleModal,
    handleReset,
  }
})
`;
