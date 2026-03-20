import { plural } from "../utils/string.js";

export default ({ name, Name }) => {
  const pathName = plural(name); // e.g., 'country' → 'countries'
  const routeName = `${Name} List`; // e.g., 'CountryList'

  return `import ${Name}Page from './pages/${Name}Page.vue'
import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
  {
    path: '/${pathName}',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      permissions: ['${name}.view', '${name}.create', '${name}.edit', '${name}.delete'],
    },
    children: [
      {
        path: '',
        name: '${routeName}',
        component: ${Name}Page,
      },
    ],
  },
]
`;
};
