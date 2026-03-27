<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { appointmentStore } from '../appointmentStore'

const router = useRouter()
const step = ref(1) // 1: Owner Info, 2: Pet Info

const form = ref({
  ownerName: '',
  email: '',
  petName: '',
  breed: ''
})

const goBackToLogin = () => {
  router.push('/')
}

const handleRegister = () => {
  // Logic: Save to the store so the system recognizes the new "First Timer"
  appointmentStore.addOwner({
    name: form.value.ownerName,
    email: form.value.email,
    pets: [{ name: form.value.petName, breed: form.value.breed }]
  })
  
  // Direct to customer portal as a first timer
  router.push('/customer')
}
</script>

<template>
  <div class="min-h-screen bg-[#E6F4F1] flex items-center justify-center p-6 font-sans">
    <div class="bg-white rounded-[48px] shadow-sm w-full max-w-[480px] p-12 border border-gray-50">
      
      <div class="flex flex-col items-center mb-10">
        <img src="/logo.png" alt="Pawfect Logo" class="w-16 h-16 object-contain mb-4" />
        <h1 class="text-2xl font-black text-gray-800 tracking-tight uppercase">Join Pawfect</h1>
        <p class="text-[9px] font-black text-[#189AB4] uppercase tracking-[0.2em] mt-2">Step {{ step }} of 2</p>
      </div>

      <div v-if="step === 1" class="space-y-6 animate-in slide-in-from-right duration-300">
        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Full Name</label>
          <input v-model="form.ownerName" type="text" placeholder="e.g. Juan Dela Cruz" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
        </div>
        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Email Address</label>
          <input v-model="form.email" type="email" placeholder="name@email.com" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
        </div>
        
        <div class="grid grid-cols-1 gap-3 pt-4">
          <button @click="step = 2" class="w-full py-5 bg-[#189AB4] text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#189AB4]/20 hover:scale-[1.02] active:scale-95 transition-all">
            Continue to Pet Info
          </button>
          <button @click="goBackToLogin" class="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">
            Already have an account? Log In
          </button>
        </div>
      </div>

      <div v-if="step === 2" class="space-y-6 animate-in slide-in-from-right duration-300">
        <div class="bg-blue-50/50 p-6 rounded-3xl mb-4">
          <p class="text-[9px] font-bold text-[#189AB4] uppercase tracking-widest text-center leading-relaxed">
            Register your first pet to complete your clinical profile.
          </p>
        </div>

        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Pet Name</label>
          <input v-model="form.petName" type="text" placeholder="What is your pet called?" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
        </div>
        <div>
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Breed</label>
          <input v-model="form.breed" type="text" placeholder="e.g. Golden Retriever" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
        </div>

        <div class="grid grid-cols-2 gap-4 pt-6">
          <button @click="step = 1" class="py-5 bg-gray-100 text-gray-400 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Back
          </button>
          <button @click="handleRegister" class="py-5 bg-[#189AB4] text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#189AB4]/20 hover:scale-[1.02] active:scale-95 transition-all">
            Finish
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>