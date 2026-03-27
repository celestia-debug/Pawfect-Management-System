<script setup>
import { ref, computed } from 'vue'
import { appointmentStore } from '../../appointmentStore'

const booking = ref({
  pet: 'Max',
  date: '',
  time: '',
  vetId: '1'
})

// Modal States
const showConfirmModal = ref(false)
const showSuccessModal = ref(false)

const viewDate = ref(new Date()) 
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM']

const currentMonthName = computed(() => {
  return viewDate.value.toLocaleString('default', { month: 'short', year: 'numeric' })
})

const daysInMonth = computed(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  
  const days = []
  for (let i = 0; i < firstDay; i++) { days.push(null) }
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const bookedForDate = appointmentStore.bookedSlots.filter(s => s.date === dateStr)
    const isFull = bookedForDate.length >= (timeSlots.length * appointmentStore.vets.length)
    days.push({ day: d, date: dateStr, isFull: isFull })
  }
  return days
})

const prevMonth = () => { viewDate.value = new Date(viewDate.value.setMonth(viewDate.value.getMonth() - 1)) }
const nextMonth = () => { viewDate.value = new Date(viewDate.value.setMonth(viewDate.value.getMonth() + 1)) }

const isTimeSlotFull = (time) => {
  if (!booking.value.date) return false
  const matches = appointmentStore.bookedSlots.filter(s => s.date === booking.value.date && s.time === time)
  return matches.length >= appointmentStore.vets.length
}

// Logic flow for modals
const triggerConfirm = () => { showConfirmModal.value = true }
const closeConfirm = () => { showConfirmModal.value = false }

const finalizeBooking = () => {
  showConfirmModal.value = false
  // Logic to push to store could go here
  showSuccessModal.value = true
}

const closeSuccess = () => {
  showSuccessModal.value = false
  // Optional: Reset booking or redirect
}
</script>

<template>
  <div class="animate-in fade-in duration-700">
    
    <div class="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm max-w-md mx-auto relative z-0">
      
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-[#E6F4F1] rounded-lg flex items-center justify-center text-[#189AB4]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-sm font-normal text-gray-800 tracking-tight">Quick Schedule</h3>
        </div>

        <div class="flex items-center bg-gray-50 px-1 py-1 rounded-xl border border-gray-100">
          <button @click="prevMonth" class="p-1.5 hover:bg-white rounded-lg transition-all text-gray-400">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <span class="px-2 text-[9px] font-black text-gray-500 min-w-[80px] text-center uppercase tracking-widest">{{ currentMonthName }}</span>
          <button @click="nextMonth" class="p-1.5 hover:bg-white rounded-lg transition-all text-gray-400">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <div class="flex items-center space-x-4 mb-5 px-1">
        <div class="flex items-center space-x-1.5"><div class="w-2 h-2 rounded-full bg-green-400"></div><span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Available</span></div>
        <div class="flex items-center space-x-1.5"><div class="w-2 h-2 rounded-full bg-red-400"></div><span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Full</span></div>
      </div>

      <div class="grid grid-cols-7 gap-1 mb-6">
        <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day" class="text-center py-1 text-[8px] font-black text-gray-200 uppercase tracking-widest">{{ day }}</div>
        <div v-for="(item, index) in daysInMonth" :key="index">
          <div v-if="!item" class="aspect-square"></div>
          <button v-else @click="booking.date = item.date; booking.time = ''" :disabled="item.isFull"
            :class="['w-full aspect-square rounded-xl border transition-all flex items-center justify-center relative',
                     booking.date === item.date ? 'bg-[#189AB4] border-[#189AB4] text-white shadow-sm' : 
                     item.isFull ? 'bg-red-50 border-red-50 text-red-300 cursor-not-allowed' : 'bg-green-50 border-green-50 text-green-500 hover:border-green-200']">
            <span class="text-[11px] font-normal">{{ item.day }}</span>
          </button>
        </div>
      </div>

      <div v-if="booking.date" class="animate-in slide-in-from-bottom-2 duration-500 pt-4 border-t border-gray-50">
        <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3">Available Times</p>
        <div class="grid grid-cols-3 gap-1.5">
          <button v-for="time in timeSlots" :key="time" @click="booking.time = time" :disabled="isTimeSlotFull(time)"
            :class="['py-2 rounded-lg border transition-all text-[8px] font-black uppercase tracking-widest',
                     booking.time === time ? 'bg-[#189AB4] text-white border-[#189AB4]' : 
                     isTimeSlotFull(time) ? 'bg-red-50 border-red-50 text-red-300 cursor-not-allowed' : 'bg-green-50 border-green-50 text-green-500 hover:border-green-200']">
            {{ time }}
          </button>
        </div>
        <button @click="triggerConfirm" :disabled="!booking.time"
          class="w-full mt-6 py-4 bg-[#189AB4] text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-md hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-20">
          Confirm for {{ booking.pet }}
        </button>
      </div>
    </div>

    <div v-if="showConfirmModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-xs rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-6 mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h4 class="text-center text-gray-800 font-normal text-lg mb-2">Confirm Booking?</h4>
        <p class="text-center text-[10px] text-gray-400 font-normal uppercase tracking-widest mb-8 leading-relaxed">
          Requesting a visit for <span class="text-[#189AB4]">{{ booking.pet }}</span>
        </p>
        <div class="grid grid-cols-2 gap-3">
          <button @click="closeConfirm" class="py-3 bg-gray-50 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest">Cancel</button>
          <button @click="finalizeBooking" class="py-3 bg-[#189AB4] text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">Yes</button>
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-xs rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
        <div class="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center text-green-500 mb-6 mx-auto">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h4 class="text-gray-800 font-normal text-xl mb-4 uppercase tracking-tight">Appointment Booked</h4>
        <div class="bg-gray-50 rounded-2xl p-4 mb-8 space-y-2">
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Scheduled for {{ booking.pet }}</p>
          <p class="text-gray-700 font-normal text-xs">{{ booking.date }}</p>
          <p class="text-[#189AB4] font-normal text-sm">{{ booking.time }}</p>
        </div>
        <button @click="closeSuccess" class="w-full py-4 bg-gray-800 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg">Close Details</button>
      </div>
    </div>

  </div>
</template>