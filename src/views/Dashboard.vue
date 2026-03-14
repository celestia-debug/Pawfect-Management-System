<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Controls the Sidebar links and icons
const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Pet Medical Records', path: '/dashboard/medical-records', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Vaccination Tracking', path: '/dashboard/vaccinations', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'Prescription Management', path: '/dashboard/prescriptions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { name: 'Appointment Scheduling', path: '/dashboard/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Transparency Dashboard', path: '/dashboard/transparency', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Inventory Management', path: '/dashboard/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
]

// Logic to change Header text based on page
const currentTitle = computed(() => {
  const activeItem = menuItems.find(item => item.path === route.path)
  return activeItem ? activeItem.name : 'Dashboard'
})
</script>

<template>
  <div class="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
    
    <aside class="w-[280px] bg-white border-r border-gray-100 flex flex-col justify-between hidden md:flex z-20 shadow-sm">
      <div>
        
        <div class="h-24 flex items-center px-8 mt-4 space-x-3">
          <img src="/logo.png" alt="Husky Logo" class="h-12 w-auto object-contain" />
          
          <div class="flex flex-col justify-center">
            <h1 class="text-xl font-black text-gray-800 leading-none tracking-tighter">
              PAWFECT
            </h1>
            <span class="text-[10px] font-bold text-[#189AB4] tracking-[0.2em] mt-1 uppercase">
              Admin
            </span>
          </div>
        </div>

        <nav class="mt-6 px-4 space-y-1.5">
          <button v-for="item in menuItems" :key="item.name" 
             @click="router.push(item.path)"
             :class="['w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200', 
                      route.path === item.path ? 'bg-[#9DD7E9] text-gray-900 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium']">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
            </svg>
            <span class="text-[13px] tracking-tight">{{ item.name }}</span>
          </button>
        </nav>
      </div>
      
      <div class="p-4 mb-4">
        <button @click="router.push('/')" class="flex items-center justify-center w-full px-4 py-3 bg-white text-gray-600 rounded-xl transition-colors text-[11px] font-bold border border-gray-200 hover:bg-gray-50 uppercase tracking-widest">
          Secure Logout
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col h-full relative">
      
      <header class="h-28 flex items-center justify-between px-10 bg-[#F8FAFC]">
        <div>
          <h2 class="text-[28px] font-black text-gray-800 tracking-tight">{{ currentTitle }}</h2>
          <p class="text-sm text-gray-400 mt-0.5 font-medium italic uppercase tracking-tighter">Supervision Portal</p>
        </div>
        
        <div class="flex items-center">
          <div class="flex items-center space-x-4 bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
            <div class="text-right hidden md:block">
              <p class="text-[10px] font-black text-gray-800 leading-tight uppercase tracking-tighter">Administrator</p>
              <p class="text-[9px] text-[#189AB4] font-bold">LVL 4 ACCESS</p>
            </div>
            <div class="w-10 h-10 bg-[#9DD7E9] rounded-xl flex items-center justify-center text-gray-900 font-black shadow-inner border-2 border-white">
              AD
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto px-10 pb-10">
        <router-view></router-view>
      </main>
      
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
::-webkit-scrollbar-thumb:hover { background: #9DD7E9; }
</style>