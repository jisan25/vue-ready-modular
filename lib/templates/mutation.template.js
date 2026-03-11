import { plural } from "../utils/string.js";

export default ({ name, Name, subName=null }) => 
{
const pluralName = plural(name); // country → countries, city → cities

  return `import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  submitData,
  updateData,
  deleteItem,
  bulkDelete
} from '../services/${subName || Name}Service'
import { toast } from '@/shared/config/toastConfig'

export function use${subName || Name}Mutations(moduleName, options = {}) {
  const queryClient = useQueryClient()

  const handleSuccess = (data, variables) => {
    toast.success(\`\${moduleName} operation successful\`)
    queryClient.invalidateQueries(['${pluralName}'])
    options.onSuccess?.(data, variables)
  }

  const handleError = (error) => {
    console.error(error)
    toast.error(\`Request Failed: \${error?.message || 'Unknown error'}\`)
    options.onError?.(error)
  }

  const submit = useMutation({
    mutationFn: submitData,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  const update = useMutation({
    mutationFn: updateData,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  const remove = useMutation({
    mutationFn: deleteItem,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  const removeItems = useMutation({
    mutationFn: bulkDelete,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  return { submit, update, remove, removeItems }
}
`;
};
