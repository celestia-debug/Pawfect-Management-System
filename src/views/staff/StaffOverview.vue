<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let timer

const updateClock = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  currentDate.value = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})
onUnmounted(() => { clearInterval(timer) })

const todaysAppointments = ref([
  { id: 'APT-01', time: '09:00 AM', owner: 'Juan Dela Cruz', pet: 'Max', type: 'Checkup', status: 'Waiting' },
  { id: 'APT-02', time: '10:30 AM', owner: 'Maria Santos', pet: 'Luna', type: 'Vaccination', status: 'Scheduled' },
  { id: 'APT-03', time: '01:00 PM', owner: 'Carlos Reyes', pet: 'Rocky', type: 'Grooming', status: 'Scheduled' },
  { id: 'APT-04', time: '03:30 PM', owner: 'Juan Dela Cruz', pet: 'Bella', type: 'Follow-up', status: 'Scheduled' }
])

const lowStockItems = ref([
  { name: 'Cat Vitamins', category: 'Medical', stock: 2, unit: 'bottles' },
  { name: 'Rabies Vaccine', category: 'Medical', stock: 4, unit: 'vials' }
])

// NEW: Mock Data for Veterinarians
const veterinarians = ref([
  { id: 1, name: 'Dr. Santos', specialization: 'Veterinarian', status: 'In Session' },
  { id: 2, name: 'Dr. Reyes', specialization: 'Veterinarian', status: 'Available' },
  { id: 3, name: 'Dr. Cruz', specialization: 'Veterinarian', status: 'Off Duty' }
])

const waitingPatients = computed(() => todaysAppointments.value.filter(a => a.status === 'Waiting'))
const waitingCount = computed(() => waitingPatients.value.length)

const activeModal = ref(null) 

const openModal = (type) => {
  activeModal.value = type
}

const closeModal = () => {
  activeModal.value = null
}
</script>

<template>
  <div class="space-y-6 relative">
    
    <div class="bg-linear-to-r from-[#189AB4] to-[#9DD7E9] rounded-[28px] p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 class="text-2xl font-black tracking-tight mb-1 text-white">Good Morning, Clinic Staff!</h2>
        <p class="text-sm font-normal opacity-90">Here is your daily action plan and schedule.</p>
      </div>
      <div class="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 text-right">
        <p class="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">{{ currentDate }}</p>
        <p class="text-2xl font-black tabular-nums tracking-tight">{{ currentTime }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div @click="openModal('appointments')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all group">
        <div class="flex items-center space-x-4">
          <div class="p-4 rounded-2xl bg-blue-50 text-blue-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Appointments</p>
            <h4 class="text-2xl font-black text-gray-800">{{ todaysAppointments.length }}</h4>
          </div>
        </div>
        <svg class="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>

      <div @click="openModal('waiting')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all group">
        <div class="flex items-center space-x-4">
          <div class="p-4 rounded-2xl bg-purple-50 text-purple-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Patients Waiting</p>
            <h4 class="text-2xl font-black text-gray-800">{{ waitingCount }}</h4>
          </div>
        </div>
        <svg class="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>

      <div @click="openModal('alerts')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all group">
        <div class="flex items-center space-x-4">
          <div class="p-4 rounded-2xl bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Low Stock Alerts</p>
            <h4 class="text-2xl font-black text-gray-800">{{ lowStockItems.length }}</h4>
          </div>
        </div>
        <svg class="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm lg:col-span-2">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-xl font-normal text-gray-800 tracking-tight">Today's Live Schedule</h3>
          <span class="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-100">Live Updates</span>
        </div>
        
        <div class="space-y-4">
          <div v-if="todaysAppointments.length === 0" class="py-8 text-center text-gray-400 font-normal">No appointments scheduled for today.</div>
          
          <div v-for="apt in todaysAppointments" :key="apt.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 gap-4 transition-colors hover:bg-gray-100/50">
            
            <div class="flex items-start space-x-6">
              <div class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-black text-gray-800 text-sm shadow-sm shrink-0 w-28 text-center">
                {{ apt.time }}
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">OWNER: <span class="text-[#189AB4]">{{ apt.owner }}</span></p>
                <div class="flex items-center space-x-2">
                  <span class="text-gray-800 font-normal">{{ apt.pet }}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-xs font-normal text-gray-500">{{ apt.type }}</span>
                </div>
              </div>
            </div>

            <div class="min-w-32.5 flex justify-end">
              <span :class="[
                'px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest w-full text-center border',
                apt.status === 'Scheduled' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                apt.status === 'Waiting' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                apt.status === 'In Session' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                'bg-green-50 text-green-600 border-green-100'
              ]">
                {{ apt.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm lg:col-span-1 flex flex-col h-full">
        <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Veterinarian Status</h3>
        
        <div class="space-y-4 flex-1">
          <div v-for="vet in veterinarians" :key="vet.id" class="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 transition-colors hover:bg-gray-100/50">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-sm font-bold text-gray-800">{{ vet.name }}</h4>
                <p class="text-[10px] text-gray-400 font-normal uppercase mt-0.5">{{ vet.specialization }}</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm shrink-0">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </div>
            
            <div class="mt-1">
              <span :class="[
                'px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border inline-block w-full text-center',
                vet.status === 'Available' ? 'bg-green-50 text-green-600 border-green-100' :
                vet.status === 'In Session' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                'bg-gray-200 text-gray-500 border-gray-300'
              ]">
                {{ vet.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-if="activeModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-[28px] w-full max-w-3xl shadow-xl border border-gray-100 max-h-[85vh] flex flex-col">
        
        <div class="flex justify-between items-start mb-6 border-b border-gray-50 pb-6">
          <div>
            <h3 class="text-xl font-normal text-gray-800">
              {{ activeModal === 'appointments' ? 'All Appointments Today' : activeModal === 'waiting' ? 'Patients Currently Waiting' : 'Low Stock Alerts' }}
            </h3>
            <p class="text-[11px] font-normal text-gray-400 uppercase tracking-widest mt-1">
              {{ activeModal === 'appointments' ? 'Full schedule overview' : activeModal === 'waiting' ? 'Action required by Veterinarian' : 'Items requiring immediate restock' }}
            </p>
          </div>
          <button @click="closeModal" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 pr-2">
          
          <table v-if="activeModal === 'appointments'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-100 uppercase text-[9px] font-normal">
              <tr>
                <th class="pb-3 pl-2">Time</th>
                <th class="pb-3">Owner & Pet</th>
                <th class="pb-3">Reason</th>
                <th class="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="apt in todaysAppointments" :key="apt.id" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-bold text-gray-800 pl-2">{{ apt.time }}</td>
                <td class="py-4">
                  <span class="font-normal text-[#189AB4]">{{ apt.owner }}</span>
                  <span class="text-gray-400 mx-2">•</span>
                  <span class="font-normal text-gray-700">{{ apt.pet }}</span>
                </td>
                <td class="py-4 text-gray-500 font-normal">{{ apt.type }}</td>
                <td class="py-4 text-right pr-2 font-bold text-[10px] uppercase text-gray-400">{{ apt.status }}</td>
              </tr>
            </tbody>
          </table>

          <table v-if="activeModal === 'waiting'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-100 uppercase text-[9px] font-normal">
              <tr>
                <th class="pb-3 pl-2">Scheduled Time</th>
                <th class="pb-3">Owner</th>
                <th class="pb-3">Pet</th>
                <th class="pb-3 text-right pr-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="waitingPatients.length === 0">
                <td colspan="4" class="py-8 text-center text-gray-400 font-normal">No patients are currently waiting.</td>
              </tr>
              <tr v-for="apt in waitingPatients" :key="apt.id" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-bold text-gray-800 pl-2">{{ apt.time }}</td>
                <td class="py-4 font-normal text-[#189AB4]">{{ apt.owner }}</td>
                <td class="py-4 font-normal text-gray-700">{{ apt.pet }}</td>
                <td class="py-4 text-right pr-2 text-gray-500 font-normal">{{ apt.type }}</td>
              </tr>
            </tbody>
          </table>

          <table v-if="activeModal === 'alerts'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-100 uppercase text-[9px] font-normal">
              <tr>
                <th class="pb-3 pl-2">Item Name</th>
                <th class="pb-3">Category</th>
                <th class="pb-3 text-right pr-2">Current Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in lowStockItems" :key="index" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-normal text-gray-800 pl-2">{{ item.name }}</td>
                <td class="py-4 text-gray-500 font-normal">{{ item.category }}</td>
                <td class="py-4 text-right pr-2 font-normal text-red-500">
                  {{ item.stock }} <span class="text-[10px] uppercase ml-1 text-red-400">{{ item.unit }}</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

  </div>
</template>