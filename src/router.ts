import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'


import dashboardRoute from '/@/routers/dashboard'
import report from '/@/routers/report'

const appName = import.meta.env.VITE_APP_TITLE;
const routes: RouteRecordRaw[] = [
  ...dashboardRoute,
  ...report,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// const useAuthStore = authStore()
// const permissionStore = useStore();
router.beforeEach((to) => {
  document.title = appName;
  if (to.meta?.pageTitle) document.title = `${to.meta?.pageTitle} - ${appName}`;

  if (to.matched.length == 0) router.push('/not-found')

  if (to.path === "/not-found") return
  // if (!useAuthStore.isAuthenticated && to.meta?.requiresAuth) router.push('/login')
  // if (useAuthStore.isAuthenticated && !to.meta?.requiresAuth) router.push('/')
  // if (useAuthStore.isAuthenticated) {
  //   permissionStore.isAuthorized(to.name as string).then((authorized: boolean) => {
  //     if (!authorized) {
  //       console.log(!authorized)
  //       router.push("/")
  //     }
  // })}
})

export default router
