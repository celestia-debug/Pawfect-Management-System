<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  router.push('/admin')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
    <div class="bg-white rounded-[28px] shadow-sm border border-gray-100 w-full max-w-md p-10">
      
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-gray-100 text-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h1 class="text-2xl font-black text-gray-800 tracking-tight">System Admin</h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">PAWFECT CLINICAL SYSTEM</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Email</label>
          <input v-model="email" type="email" placeholder="admin@pawfect.com" required class="w-full mt-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm text-gray-800" />
        </div>

        <div>
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required class="w-full mt-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm text-gray-800" />
        </div>

        <button type="submit" class="w-full py-4 mt-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
          Authorize Access
        </button>
      </form>
      
    </div>
  </div>
</template>