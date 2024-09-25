import {RouteRecordRaw} from "vue-router";

const moduleName = 'Report'
const modulePath = 'report'
const route: RouteRecordRaw[] = [
  {
    path: `/${modulePath}`,
    name: moduleName,
    component: () => import('@/pages/report/Index.vue'),
    meta: { requiresAuth: false, pageTitle: "Reports" }
  },
];

export default route;