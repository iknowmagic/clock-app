import MainLayout from '@/layouts/MainLayout.vue'
import { loadPage } from '@/router/helpers/loadPage'

export default [
  {
    path: '/',
    component: MainLayout
  },
  { path: '*', component: () => loadPage('NotFound'), name: 'NotFound' }
]
