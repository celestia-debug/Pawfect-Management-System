import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    
    // CUSTOMER PORTAL
    {
      path: '/customer',
      component: () => import('../views/customer/CustomerDashboard.vue'),
      children: [
        { path: '', name: 'CustomerHome', component: () => import('../views/customer/CustomerHome.vue') },
        { path: 'book-appointment', name: 'CustomerBook', component: () => import('../views/customer/CustomerBook.vue') }
      ]
    },

    // VET PORTAL (FULLY MAPPED)
    {
      path: '/vet',
      component: () => import('../views/vet/VetDashboard.vue'),
      children: [
        { 
          path: '', 
          name: 'VetOverview', 
          component: () => import('../views/vet/VetOverview.vue') 
        },
        { 
          path: 'medical-records', 
          name: 'VetMedicalRecords', 
          component: () => import('../views/vet/VetMedicalRecords.vue') 
        },
        { 
          path: 'vaccinations', 
          name: 'VetVaccinations', 
          component: () => import('../views/vet/VetVaccinations.vue') 
        },
        { 
          path: 'appointments', 
          name: 'VetAppointments', 
          component: () => import('../views/vet/VetAppointments.vue') 
        }
      ]
    },

   // STAFF PORTAL
    {
      path: '/staff',
      component: () => import('../views/staff/StaffDashboard.vue'),
      children: [
        { path: '', name: 'StaffOverview', component: () => import('../views/staff/StaffOverview.vue') },
        { path: 'medical-records', name: 'StaffMedicalRecords', component: () => import('../views/staff/StaffMedicalRecords.vue') },
        { path: 'vaccinations', name: 'StaffVaccinations', component: () => import('../views/staff/StaffVaccinations.vue') },
        { path: 'appointments', name: 'StaffAppointments', component: () => import('../views/staff/StaffAppointments.vue') },
        { path: 'transparency', name: 'StaffTransparency', component: () => import('../views/staff/StaffTransparency.vue') },
        { path: 'inventory', name: 'StaffInventory', component: () => import('../views/staff/StaffInventory.vue') }
      ]
    },

    // ADMIN PORTAL
    {
      path: '/admin',
      component: () => import('../views/Admin/Dashboard.vue'),
      children: [
        { path: '', name: 'AdminOverview', component: () => import('../views/Admin/DashboardOverview.vue') },
        { path: 'inventory', name: 'AdminInventory', component: () => import('../views/Admin/Inventory.vue') }
      ]
    }
  ]
})

export default router