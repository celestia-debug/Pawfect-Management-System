<script setup>
import { useRoute } from 'vue-router'

// This checks exactly which page you are on to move the blue highlight
const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans">
    
    <aside class="w-72 bg-white border-r border-gray-100 flex flex-col p-8 fixed h-full z-10">
      <div class="flex items-center space-x-3 mb-12">
        <img src="/logo.png" alt="Pawfect Logo" class="w-12 h-12 object-contain" />
        <h1 class="text-xl font-black text-gray-800 tracking-tighter uppercase">Pawfect</h1>
      </div>
      
      <nav class="flex-1 space-y-2">
        <router-link 
          to="/admin" 
          :class="['flex items-center space-x-4 p-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-colors', 
                   route.path === '/admin' ? 'bg-[#E6F4F1] text-[#189AB4]' : 'text-gray-400 hover:bg-gray-50']"
        >
          <span>📊 Dashboard Overview</span>
        </router-link>
        
        <router-link 
          to="/admin/inventory" 
          :class="['flex items-center space-x-4 p-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-colors', 
                   route.path === '/admin/inventory' ? 'bg-[#E6F4F1] text-[#189AB4]' : 'text-gray-400 hover:bg-gray-50']"
        >
          <span>📦 Inventory Management</span>
        </router-link>
      </nav>

      <router-link to="/" class="p-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">
        Secure Logout
      </router-link>
    </aside>

    <main class="flex-1 ml-72 p-12">
      
      <header class="mb-12">
        <div>
          <h2 class="text-4xl font-black text-gray-800 tracking-tight">Supervisory Portal</h2>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">System Supervision Mode</p>
        </div>
      </header>
      
      <router-view />
    </main>
    
  </div>
</template>