<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = () => {
  const userEmail = email.value.toLowerCase()
  errorMessage.value = ""

  if (!userEmail.endsWith('@pawfect.com')) {
    errorMessage.value = "Please use a registered @pawfect.com email"
    return
  }

  if (userEmail.includes('admin')) {
    router.push('/admin')
  } else if (userEmail.includes('staff')) {
    router.push('/staff')
  } else if (userEmail.includes('vet') || userEmail.includes('dr')) {
    router.push('/vet')
  } else {
    router.push('/customer')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#E6F4F1] flex items-center justify-center p-6 font-sans">
    <div class="bg-white rounded-[48px] shadow-sm w-full max-w-112.5 p-12 flex flex-col items-center border border-gray-50">
      
      <img src="/logo.png" alt="Pawfect Logo" class="w-24 h-24 object-contain mb-8" />

      <div class="text-center mb-10">
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Pawfect Portal</h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Clinic Management System</p>
      </div>

      <div v-if="errorMessage" class="w-full mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
        <p class="text-[10px] font-black text-red-600 uppercase text-center">{{ errorMessage }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="w-full space-y-6">
        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="username@pawfect.com" 
            required 
            class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#189AB4]/20 text-sm outline-none transition-all" 
          />
        </div>

        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••" 
              required 
              class="w-full px-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#189AB4]/20 text-sm outline-none transition-all" 
            />
            
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#189AB4] transition-colors"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.076m3.19-3.19A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.012 2.745M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0l3 3m-3-3l-3-3" />
              </svg>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-5 bg-[#189AB4] text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#189AB4]/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
        >
          Secure Login
        </button>
      </form>

      <div class="mt-10 pt-8 border-t border-gray-50 w-full text-center">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          New to the clinic? 
          <router-link to="/register" class="text-[#189AB4] hover:underline ml-1">Create Client Account</router-link>
        </p>
      </div>

    </div>
  </div>
</template>