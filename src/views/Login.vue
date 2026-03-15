<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  if (email.value === 'admin@pawfect.com') {
    router.push('/dashboard')
  } else if (email.value === 'staff@pawfect.com') {
    router.push('/staff')
  } else {
    alert('Please use admin@pawfect.com or staff@pawfect.com')
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#F4F8FA]">
    <div class="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 w-96">
      
      <div class="flex justify-center mb-8">
         <img src="/logo.png" class="h-16 object-contain" alt="Pawfect Logo" />
      </div>
      
      <h2 class="text-2xl font-black text-gray-800 text-center mb-6">Portal Login</h2>
      
      <div class="space-y-4">
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
          <input v-model="email" type="email" placeholder="Enter your email" class="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9DD7E9] text-sm" />
        </div>
        
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
          <div class="relative mt-1">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#9DD7E9] text-sm pr-10" />
            
            <button @click="showPassword = !showPassword" type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
              
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              
            </button>
          </div>
        </div>
        
        <button @click="handleLogin" class="w-full py-3.5 mt-4 bg-[#9DD7E9] hover:bg-[#8bc5d6] text-gray-900 rounded-xl font-bold transition-all shadow-sm">
          Secure Login
        </button>
      </div>
      
    </div>
  </div>
</template>