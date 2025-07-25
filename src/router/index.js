import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import StockMonitor from '@/views/StockMonitor.vue'
import PurchaseForm from '@/views/PurchaseForm.vue'
import TransactionLogs from '@/views/TransactionLogs.vue'
import StockAvailability from '@/views/StockAvailability.vue'
import InventoryManagement from '@/views/InventoryManagement.vue'
import DeleteConfirmation from '@/views/DeleteConfirmation.vue'



const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/stock-monitor',
    name: 'StockMonitor',
    component: StockMonitor
  },
  {
    path: '/purchase-form',
    name: 'PurchaseForm',
    component: PurchaseForm
  },
  {
    path: '/transactions', 
    name: 'TransactionLogs',
    component: TransactionLogs
  },
  {
    path: '/stock-availability',
    name: 'StockAvailability',
    component: StockAvailability
  },
  {
    path: '/transfer',
    name: 'InventoryManagement',
    component: InventoryManagement
  },
  {
  path: '/item/:id',
  name: 'ItemDetail',
  component: () => import('@/components/ItemDetail.vue'),
  props: true
},
{
  path: '/update-form',
  name: 'UpdateForm',
  component: () => import('@/views/UpdateForm.vue')
},
{
path: '/delete/:id',
    name: 'DeleteConfirmation',
    component: DeleteConfirmation
  },
  {
  path: '/transfer-request',
  name: 'TransferRequest',
  component: () => import('@/views/TransferRequest.vue')
},
{
  path: '/report-damage-item',
  name: 'ReportDamage',
  component: () => import('@/views/ReportDamageItem.vue')
},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
