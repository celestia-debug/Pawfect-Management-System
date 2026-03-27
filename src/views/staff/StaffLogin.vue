<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  router.push('/staff')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
    <div class="bg-white rounded-[28px] shadow-sm border border-gray-100 w-full max-w-md p-10">
      
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-[#189AB4]/10 text-[#189AB4] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <h1 class="text-2xl font-black text-gray-800 tracking-tight">Clinic Staff Portal</h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">PAWFECT CLINICAL SYSTEM</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Staff Email</label>
          <input v-model="email" type="email" placeholder="frontdesk@pawfect.com" required class="w-full mt-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9DD7E9] text-sm text-gray-800" />
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