import { plural } from "../utils/string.js";

export default ({ name, Name, parent = null, subName = null }) => {
  const pluralName = plural(name); // country → countries, city → cities

  return `import { useQuery } from '@tanstack/vue-query'
import { fetchAll } from '../services/${subName || Name}Service'
import { computed, unref } from 'vue'

export function use${subName || Name}Query(pageRef, perPageRef, filtersRef) {
  const page = computed(() => unref(pageRef))
  const perPage = computed(() => unref(perPageRef))
  const search = computed(() => unref(filtersRef)?.searchQuery?.trim())
  const fromDate = computed(() => unref(filtersRef)?.from_date)
  const toDate = computed(() => unref(filtersRef)?.to_date)
  const cacheKey = '${pluralName}'

  const query = useQuery({
    queryKey: computed(() => [
      cacheKey,
      page.value,
      perPage.value,
      search.value && search.value.length >= 3 ? search.value : 'all',
      fromDate.value || 'all',
      toDate.value || 'all',
    ]),
    queryFn: () => fetchAll(page.value, perPage.value, {
      search: search.value,
      from_date: fromDate.value,
      to_date: toDate.value,
    }),
    enabled: computed(() => !search.value || search.value.length >= 3),
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    keepPreviousData: true,
    meta: {
      persist: true,
    },
  })

  /* ✅ Prepare rows here */
  const rows = computed(() => query.data.value?.data?.data ?? [])

  return {
    ...query,
    rows,
  }
}`;
};
