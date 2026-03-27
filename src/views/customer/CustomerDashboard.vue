<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const customerLinks = [
  { name: 'My Pet Home', path: '/customer', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Book Appointment', path: '/customer/book-appointment', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
]
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans">
    <aside class="w-72 bg-white border-r border-gray-100 flex flex-col p-8 fixed h-full z-10">
      <div class="flex items-center space-x-3 mb-12">
        <img src="/logo.png" alt="Pawfect Logo" class="w-12 h-12 object-contain" />
        <div>
          <h1 class="text-xl font-black text-gray-800 tracking-tighter uppercase leading-none">Pawfect</h1>
          <p class="text-[9px] font-bold text-[#189AB4] uppercase tracking-widest mt-1">Pet Owner</p>
        </div>
      </div>
      <nav class="flex-1 space-y-2">
        <router-link v-for="link in customerLinks" :key="link.name" :to="link.path"
          :class="['flex items-center space-x-4 p-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-colors', 
                   route.path === link.path ? 'bg-[#98D2EB]/30 text-[#189AB4]' : 'text-gray-400 hover:bg-gray-50']">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path></svg>
          <span>{{ link.name }}</span>
        </router-link>
      </nav>
      <router-link to="/" class="p-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">
        Secure Logout
      </router-link>
    </aside>
    <main class="flex-1 ml-72 p-12">
      <router-view />
    </main>
  </div>
</template>