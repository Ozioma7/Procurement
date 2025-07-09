import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import StockMonitor from '@/views/StockMonitor.vue'
import PurchaseForm from '@/views/PurchaseForm.vue'
import TransactionLogs from '@/views/TransactionLogs.vue'
import StockAvailability from '@/views/StockAvailability.vue'
import InventoryManagement from '@/views/InventoryManagement.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
