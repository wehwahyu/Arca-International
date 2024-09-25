import {RouteRecordRaw} from "vue-router";

const dashboardRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/dashboard/Form.vue'),
    meta: { requiresAuth: false, pageTitle: "Sale Products" }
  },
]
export default dashboardRoute
