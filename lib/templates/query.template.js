import { plural, capitalize } from "../utils/string.js";

export default ({ name, Name }) => {
  const pluralName = plural(name); // country → countries, city → cities

  return `import { useQuery } from '@tanstack/vue-query'
import { fetchAll } from '../services/${name}Service'
import { computed, unref } from 'vue'

export function use${capitalize(pluralName)}Query(pageRef, perPageRef, filtersRef) {
  const page = computed(() => unref(pageRef))
  const perPage = computed(() => unref(perPageRef))
  const search = computed(() => unref(filtersRef)?.searchQuery?.trim())
  const fromDate = computed(() => unref(filtersRef)?.from_date)
  const toDate = computed(() => unref(filtersRef)?.to_date)
  const cacheKey = '${pluralName}'

  return useQuery({
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
}
`;
};
