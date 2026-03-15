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

import StaffDashboard from '../views/staff/StaffDashboard.vue'
import StaffOverview from '../views/staff/StaffOverview.vue'
import StaffInventory from '../views/staff/StaffInventory.vue'
import StaffMedicalRecords from '../views/staff/StaffMedicalRecords.vue'
import StaffVaccinations from '../views/staff/StaffVaccinations.vue'
import StaffAppointments from '../views/staff/StaffAppointments.vue'
import StaffTransparency from '../views/staff/StaffTransparency.vue'

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
    },
    {
      path: '/staff',
      component: StaffDashboard,
      children: [
        { path: '', component: StaffOverview },
        { path: 'inventory', component: StaffInventory },
        { path: 'medical-records', component: StaffMedicalRecords },
        { path: 'vaccinations', component: StaffVaccinations },
        { path: 'appointments', component: StaffAppointments },
        { path: 'transparency', component: StaffTransparency }
      ]
    }
  ]
})

export default router