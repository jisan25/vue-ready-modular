// lib/templates/routes.template.js
import { plural } from "../utils/string.js";

export default ({ name, Name }) => {
  const pathName = plural(name);
  const routeName = `${Name}List`;

  return `import ${Name}Page from './pages/${Name}Page.vue'
import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
  {
    path: '/${pathName}',
    component: DashboardLayout,
    meta: { requiresAuth: true },
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
