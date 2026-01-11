import { plural, capitalize } from "../utils/string.js";

export default ({ name, Name }) => {
  const pluralName = plural(name); // country → countries, city → cities

  return `import { useQuery } from '@tanstack/vue-query'
import { fetchAll } from '../services/${name}Service'

export function use${capitalize(
    pluralName
  )}Query(params = {}) {    // ✅ function name dynamically pluralized
  return useQuery({
    queryKey: ['${pluralName}', params],               // ✅ query key dynamically pluralized
    queryFn: () => fetchAll(params),
    staleTime: 5 * 60 * 1000,
    cacheTime: 1000 * 60 * 60,
    keepPreviousData: true,
    meta: {
      persist: true,
    },
  })
}
`;
};
