import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardOverview from '../views/DashboardOverview.vue'
import MedicalRecords from '../views/MedicalRecords.vue'
import Vaccinations from '../views/Vaccinations.vue'
import Prescriptions from '../views/Prescriptions.vue'
import Appointments from '../views/Appointments.vue'
import Transparency from '../views/Transparency.vue'
import Inventory from '../views/Inventory.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { 
      path: '/dashboard', 
      component: Dashboard,
      children: [
        { path: '', component: DashboardOverview },
        { path: 'medical-records', component: MedicalRecords },
        { path: 'vaccinations', component: Vaccinations },
        { path: 'prescriptions', component: Prescriptions },
        { path: 'appointments', component: Appointments },
        { path: 'transparency', component: Transparency },
        { path: 'inventory', component: Inventory }
      ]
    }
  ]
})

export default router