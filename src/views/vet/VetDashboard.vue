<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navigation links specific to the Veterinarian
const navLinks = [
  { name: 'Dashboard', path: '/vet', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Pet Medical Records', path: '/vet/medical-records', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Vaccination Tracking', path: '/vet/vaccinations', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'Appointment Scheduling', path: '/vet/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
]

const handleLogout = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans text-gray-800">
    
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col justify-between fixed h-screen z-20">
      <div>
        <div class="h-24 flex items-center px-8 border-b border-gray-50">
          <img src="/logo.png" alt="Pawfect Logo" class="w-10 h-10 object-contain mr-3" />
          <div>
            <h1 class="text-lg font-black tracking-tighter leading-none text-gray-900">PAWFECT</h1>
            <p class="text-[9px] font-bold text-[#189AB4] uppercase tracking-widest mt-0.5">Veterinarian</p>
          </div>
        </div>

        <nav class="p-4 space-y-2 mt-4">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="flex items-center px-4 py-3.5 rounded-2xl transition-all duration-200 group"
            :class="route.path === link.path ? 'bg-[#9DD7E9]/30 text-[#189AB4] font-bold' : 'text-gray-500 hover:bg-gray-50 font-normal hover:text-gray-700'"
          >
            <svg class="w-5 h-5 mr-3 transition-colors" :class="route.path === link.path ? 'text-[#189AB4]' : 'text-gray-400 group-hover:text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path>
            </svg>
            <span class="text-sm tracking-wide">{{ link.name }}</span>
          </router-link>
        </nav>
      </div>

      <div class="p-4 border-t border-gray-50">
        <button @click="handleLogout" class="w-full flex items-center justify-center px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-2xl transition-all uppercase tracking-widest border border-transparent hover:border-gray-200">
          Secure Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 ml-64 flex flex-col min-h-screen">
      
      <header class="h-24 px-10 flex items-center justify-between bg-[#F8FAFC] z-10 sticky top-0">
        <div>
          <h2 class="text-2xl font-black text-gray-800 tracking-tight">
            {{ route.path === '/vet' ? 'Dashboard' : navLinks.find(l => l.path === route.path)?.name }}
          </h2>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Clinical Operations Portal</p>
        </div>
        
        <div class="flex items-center bg-white border border-gray-100 rounded-full pl-4 pr-1.5 py-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div class="text-right mr-3 hidden md:block">
            <p class="text-[9px] font-black text-gray-800 uppercase tracking-widest">Clinic Vet</p>
            <p class="text-[8px] font-bold text-[#189AB4] uppercase tracking-widest">Lvl 3 Access</p>
          </div>
          <div class="w-9 h-9 rounded-full bg-linear-to-br from-[#189AB4] to-[#9DD7E9] flex items-center justify-center text-white font-black text-xs shadow-inner">
            DR
          </div>
        </div>
      </header>

      <div class="p-10 pt-4 flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>