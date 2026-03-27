<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { appointmentStore } from '../../appointmentStore'

// --- CLOCK LOGIC ---
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

// --- MODAL LOGIC ---
const showModal = ref(false)
const modalTitle = ref('')
const modalData = ref([])

const openModal = (type) => {
  showModal.value = true
  if (type === 'appointments') {
    modalTitle.value = 'My Appointments'
    modalData.value = appointmentStore.schedule
  } else if (type === 'waiting') {
    modalTitle.value = 'Patients Waiting'
    modalData.value = appointmentStore.schedule.filter(a => a.status === 'Waiting' || a.status === 'In Session')
  } else if (type === 'labs') {
    modalTitle.value = 'Lab Results'
    modalData.value = [
      { pet: 'Max', test: 'Blood Test', result: 'Ready' },
      { pet: 'Luna', test: 'X-Ray', result: 'Pending' }
    ]
  }
}

const closeModal = () => {
  showModal.value = false
}

// --- STATS ---
const mySchedule = computed(() => appointmentStore.schedule)
const waitingCount = computed(() => mySchedule.value.filter(a => a.status === 'Waiting' || a.status === 'In Session').length)
</script>

<template>
  <div class="space-y-6">
    
    <div class="bg-gradient-to-r from-[#189AB4] to-[#9DD7E9] rounded-[28px] p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h2 class="text-2xl font-black tracking-tight mb-1">Welcome, Dr. Reyes!</h2>
        <p class="text-sm font-normal opacity-90">Here is your clinical overview for today.</p>
      </div>
      <div class="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 text-right">
        <p class="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">{{ currentDate }}</p>
        <p class="text-2xl font-black tabular-nums tracking-tight">{{ currentTime }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div @click="openModal('appointments')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow group">
        <div class="p-4 rounded-2xl bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Appointments</p>
          <h4 class="text-2xl font-black text-gray-800">{{ mySchedule.length }}</h4>
        </div>
      </div>

      <div @click="openModal('waiting')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow group">
        <div class="p-4 rounded-2xl bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Patients Waiting</p>
          <h4 class="text-2xl font-black text-gray-800">{{ waitingCount }}</h4>
        </div>
      </div>

      <div @click="openModal('labs')" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow group">
        <div class="p-4 rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lab Results</p>
          <h4 class="text-2xl font-black text-gray-800">1</h4>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">My Daily Schedule</h3>
      <div class="space-y-4">
        <div v-for="apt in mySchedule" :key="apt.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
          <div class="flex items-start space-x-6">
            <div class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-black text-gray-800 text-sm shadow-sm shrink-0 w-28 text-center uppercase">
              {{ apt.time }}
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">OWNER <span class="text-[#189AB4]">{{ apt.owner }}</span></p>
              <div class="flex items-center space-x-2">
                <span class="text-gray-800 font-normal">{{ apt.pet }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-[10px] font-normal text-gray-400 uppercase">{{ apt.species }}</span>
              </div>
            </div>
          </div>
          <div class="min-w-[120px] flex justify-end">
            <span :class="['px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border text-center w-full shadow-sm', 
              apt.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
              apt.status === 'In Session' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
              apt.status === 'Waiting' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
              'bg-gray-100 text-gray-400 border-gray-200']">
              {{ apt.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-black text-gray-800 tracking-tight">{{ modalTitle }}</h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <div v-for="(item, index) in modalData" :key="index" class="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
            <div v-if="modalTitle !== 'Lab Results'">
              <p class="text-[10px] font-black text-[#189AB4] uppercase mb-1">{{ item.time }}</p>
              <p class="text-sm font-normal text-gray-700">{{ item.pet }} ({{ item.owner }})</p>
            </div>
            <div v-else>
              <p class="text-sm font-normal text-gray-700">{{ item.pet }} • {{ item.test }}</p>
              <p class="text-[10px] font-black text-orange-600 uppercase">{{ item.result }}</p>
            </div>
            <span v-if="modalTitle !== 'Lab Results'" class="text-[9px] font-black text-gray-400 uppercase tracking-widest border px-2 py-1 rounded-lg bg-white">
              {{ item.status }}
            </span>
          </div>
        </div>

        <div class="mt-8 flex justify-end">
          <button @click="closeModal" class="px-8 py-4 bg-gray-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-700 transition-colors shadow-lg">
            Close Report
          </button>
        </div>
      </div>
    </div>

  </div>
</template>