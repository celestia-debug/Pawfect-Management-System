<script setup>
import { ref, computed } from 'vue'
import { appointmentStore } from '../../appointmentStore'

const searchOwner = ref('')
const statusOptions = ['Scheduled', 'Waiting', 'In Session', 'Completed']

// Filters based on Owner Name
const filteredAppointments = computed(() => {
  const query = searchOwner.value.toLowerCase().trim()
  return appointmentStore.schedule.filter(a => 
    a.owner.toLowerCase().includes(query)
  )
})

const handleStatusChange = (id, event) => {
  appointmentStore.updateStatus(id, event.target.value)
}
</script>

<template>
  <div class="space-y-6 font-sans">
    
    <div class="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
      <div class="relative max-w-md">
        <input 
          v-model="searchOwner" 
          type="text" 
          placeholder="Search owner name to manage queue" 
          class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#189AB4]/20 text-sm font-medium outline-none" 
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>

    <div class="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
          <tr>
            <th class="px-10 py-6">Owner Name</th>
            <th class="px-10 py-6">Scheduled Patient</th>
            <th class="px-10 py-6 text-center">Queue Action</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-gray-50">
          <tr v-for="apt in filteredAppointments" :key="apt.id" class="hover:bg-gray-50/30 transition-colors">
            
            <td class="px-10 py-8">
              <div class="flex flex-col">
                <span class="text-base font-bold text-gray-800">{{ apt.owner }}</span>
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">ID {{ apt.ownerId }}</span>
              </div>
            </td>

            <td class="px-10 py-8">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 rounded-full bg-[#189AB4]"></div>
                <span class="text-sm font-normal text-gray-600">{{ apt.pet }}</span>
                <span class="text-gray-300 text-xs font-normal">({{ apt.species }})</span>
              </div>
            </td>

            <td class="px-10 py-8">
              <div class="flex justify-center">
                <select 
                  :value="apt.status"
                  @change="handleStatusChange(apt.id, $event)"
                  :disabled="apt.status === 'Completed'"
                  :class="[
                    'px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border outline-none text-center transition-all min-w-40 shadow-sm',
                    apt.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100 cursor-not-allowed opacity-70' : 
                    apt.status === 'In Session' ? 'bg-blue-50 text-blue-600 border-blue-100 cursor-pointer' : 
                    'bg-white text-gray-500 border-gray-100 cursor-pointer hover:border-gray-300'
                  ]"
                >
                  <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </div>
            </td>
          </tr>

          <tr v-if="filteredAppointments.length === 0">
            <td colspan="3" class="py-24 text-center">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg class="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">This user does not have records</p>
                <button @click="searchOwner = ''" class="mt-4 text-[10px] font-black text-[#189AB4] uppercase hover:underline">Show All Appointments</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>