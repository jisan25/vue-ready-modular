import { plural } from "../utils/string.js";

export default ({ name, Name }) => {
  const baseUrl = `/${plural(name)}`;

  return `import { useApi } from '@/shared/composables/useApi'
import { buildUrl } from '@/shared/utils/buildUrl'

const BASE_URL = '${baseUrl}'

const response = (api) => ({
  data: api.data.value,
  error: api.error.value,
})

// ✅ Fetch all with pagination & filters
export async function fetchAll(page = 1, perPage = 10, filters = {}) {
  const api = useApi()
  const url = buildUrl(BASE_URL, {
    page,
    per_page: perPage,
    ...filters,
  })

  await api.sendRequest(url)
  return response(api)
}

// ✅ Fetch single item by ID
export const fetchOne = async (id) => {
  const api = useApi()
  await api.sendRequest(\`\${BASE_URL}/\${id}\`)
  return response(api)
}

// ✅ Submit new item
export async function submitData(payload) {
  const api = useApi()
  await api.sendRequest(BASE_URL, 'POST', payload)
  if (api.error.value) throw api.error.value
  return api.data.value
}

// ✅ Update existing item
export async function updateData(payload) {
  const api = useApi()
  await api.sendRequest(\`\${BASE_URL}/\${payload.id}\`, 'POST', payload, {
    headers: { 'X-HTTP-Method-Override': 'PUT' }
  })
  if (api.error.value) throw api.error.value
  return api.data.value
}

// ✅ Delete single item
export async function deleteItem(id) {
  const api = useApi()
  await api.sendRequest(\`\${BASE_URL}/\${id}\`, 'DELETE')
  if (api.error.value) throw api.error.value
  return api.data.value
}

// ✅ Bulk delete multiple items
export async function bulkDelete(ids) {
  const api = useApi()
  await api.sendRequest(\`\${BASE_URL}/bulk-delete\`, 'POST', { ids })
  if (api.error.value) throw api.error.value
  return api.data.value
}
`;
};
