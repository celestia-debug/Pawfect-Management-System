<script setup>
import { computed } from 'vue'
import { appointmentStore } from '../../appointmentStore'

// Filters the global store for completed visits for 'Max'
const medicalHistory = computed(() => 
  appointmentStore.schedule.filter(a => a.pet === 'Max' && a.status === 'Completed')
)
</script>

<template>
  <div class="animate-in fade-in duration-700 space-y-8">
    
    <div class="bg-gradient-to-r from-[#189AB4] to-[#9DD7E9] rounded-[40px] p-10 text-white shadow-sm flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black tracking-tight mb-2 uppercase">Pet Wellness Center</h2>
        <p class="text-sm font-normal opacity-90">View your medical archives and schedule new visits</p>
      </div>
      <router-link to="/customer/book-appointment" class="px-8 py-4 bg-white text-[#189AB4] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
        Book Appointment
      </router-link>
    </div>

    <div class="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Registered Pets</h3>
      <div class="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center space-x-6">
        <div class="w-16 h-16 bg-[#E6F4F1] rounded-3xl flex items-center justify-center text-[#189AB4]">
           <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
        <div>
          <p class="text-gray-800 font-normal text-2xl">Max</p>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Golden Retriever 01 year old</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Pet Medical History</h3>
      
      <div v-if="medicalHistory.length === 0" class="py-12 text-center border-2 border-dashed border-gray-50 rounded-[40px]">
        <p class="text-[10px] font-black text-gray-300 uppercase tracking-widest">No past medical records found</p>
      </div>

      <div class="space-y-4">
        <div v-for="visit in medicalHistory" :key="visit.id" class="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <p class="text-[10px] font-black text-[#189AB4] uppercase tracking-widest mb-1">{{ visit.date }}</p>
              <p class="text-gray-800 font-normal text-lg">{{ visit.diagnosis }}</p>
              <p class="text-xs text-gray-400 font-normal">Attending Dr Reyes</p>
            </div>
          </div>
          <button class="mt-4 md:mt-0 px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
            Download Results
          </button>
        </div>
      </div>
    </div>

  </div>
</template>