import {RouteRecordRaw} from "vue-router";

const authRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
    meta: { layout: 'empty' },
  },
]
export default authRoute
