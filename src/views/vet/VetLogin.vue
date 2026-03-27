<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Simple redirect to the Vet Dashboard
  router.push('/vet')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
    <div class="bg-white rounded-[28px] shadow-sm border border-gray-100 w-full max-w-md p-10">
      
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-[#189AB4]/10 text-[#189AB4] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h1 class="text-2xl font-black text-gray-800 tracking-tight">Veterinarian Portal</h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">PAWFECT CLINICAL SYSTEM</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Doctor ID / Email</label>
          <input v-model="email" type="email" placeholder="e.g. dr.reyes@pawfect.com" required class="w-full mt-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9DD7E9] text-sm text-gray-800" />
        </div>

        <div>
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required class="w-full mt-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9DD7E9] text-sm text-gray-800" />
        </div>

        <button type="submit" class="w-full py-4 mt-2 bg-[#189AB4] hover:bg-[#148299] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
          Secure Login
        </button>
      </form>
      
    </div>
  </div>
</template>