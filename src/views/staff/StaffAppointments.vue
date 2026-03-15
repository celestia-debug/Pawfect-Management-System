<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const phTime = ref('')
let timer

const updateTime = () => {
  const options = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
  phTime.value = new Intl.DateTimeFormat('en-US', options).format(new Date())
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const today = new Date()
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
const currentMonthDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const currentMonthName = computed(() => monthNames[currentMonthDate.value.getMonth()])
const currentYear = computed(() => currentMonthDate.value.getFullYear())

const prevMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() + 1, 1)
}

const selectDay = (day) => {
  if (day) selectedDate.value = day
}

const calendarDays = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  const days = []
  
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }
  return days
})

const formatDateString = (dateObj) => {
  if (!dateObj) return ''
  const y = dateObj.getFullYear()
  const m = String(dateObj.getMonth() + 1).padStart(2, '0')
  const d = String(dateObj.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const selectedDateFormatted = computed(() => {
  return `${monthNames[selectedDate.value.getMonth()]} ${String(selectedDate.value.getDate()).padStart(2, '0')} ${selectedDate.value.getFullYear()}`
})

const appointments = ref([
  { id: 'APT 001', ownerName: 'Levi', petName: 'Max', time: '09:00 AM', reason: 'Annual Checkup', status: 'Confirmed', dateStr: '2026-03-15' },
  { id: 'APT 002', ownerName: 'Goju', petName: 'Luna', time: '11:30 AM', reason: 'Vaccination', status: 'Pending', dateStr: '2026-03-15' },
  { id: 'APT 003', ownerName: 'Channy', petName: 'Simba', time: '02:00 PM', reason: 'Ear Infection', status: 'Confirmed', dateStr: '2026-03-16' },
  { id: 'APT 004', ownerName: 'Louis', petName: 'Bella', time: '10:00 AM', reason: 'Routine Checkup', status: 'Pending', dateStr: '2026-03-18' }
])

const dailyAgenda = computed(() => {
  const targetStr = formatDateString(selectedDate.value)
  return appointments.value.filter(apt => apt.dateStr === targetStr)
})
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm gap-4">
      <div>
        <h3 class="text-xl font-bold text-gray-800 tracking-tight">Daily Schedule</h3>
        <p class="text-xs font-bold text-[#189AB4] mt-1 tracking-widest uppercase">Philippine Time  {{ phTime }}</p>
      </div>
      </div>

    <div class="flex flex-col lg:flex-row gap-6">
      
      <div class="w-full lg:w-1/3 bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm h-fit">
        <div class="flex justify-between items-center mb-6">
          <button @click="prevMonth" class="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <h4 class="font-bold text-gray-800">{{ currentMonthName }} {{ currentYear }}</h4>
          <button @click="nextMonth" class="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 mb-2 text-center">
          <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <div v-for="(day, index) in calendarDays" :key="index" class="aspect-square flex items-center justify-center p-1">
            <button 
              v-if="day"
              @click="selectDay(day)"
              :class="[
                'w-full h-full rounded-xl text-sm font-bold transition-all flex items-center justify-center',
                formatDateString(day) === formatDateString(selectedDate) ? 'bg-[#9DD7E9] text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-50',
                formatDateString(day) === formatDateString(today) && formatDateString(day) !== formatDateString(selectedDate) ? 'border border-[#9DD7E9] text-[#189AB4]' : ''
              ]">
              {{ day.getDate() }}
            </button>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-2/3 bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 tracking-tight mb-6">Appointments for {{ selectedDateFormatted }}</h3>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-50">
              <tr>
                <th class="pb-4 font-bold uppercase tracking-widest text-[10px]">Time</th>
                <th class="pb-4 font-bold uppercase tracking-widest text-[10px]">Owner Name</th>
                <th class="pb-4 font-bold uppercase tracking-widest text-[10px]">Pet Name</th>
                <th class="pb-4 font-bold uppercase tracking-widest text-[10px]">Reason</th>
                <th class="pb-4 font-bold uppercase tracking-widest text-[10px] text-right">Status</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              
              <tr v-for="apt in dailyAgenda" :key="apt.id" class="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                <td class="py-4 font-bold text-gray-900">{{ apt.time }}</td>
                <td class="py-4 font-bold text-[#189AB4]">{{ apt.ownerName }}</td>
                <td class="py-4 text-gray-500">{{ apt.petName }}</td>
                <td class="py-4 text-gray-500">{{ apt.reason }}</td>
                <td class="py-4 text-right">
                  <span :class="[
                    'px-3 py-1.5 rounded-full text-[9px] font-black uppercase border inline-block',
                    apt.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  ]">
                    {{ apt.status }}
                  </span>
                </td>
              </tr>

              <tr v-if="dailyAgenda.length === 0">
                <td colspan="5" class="py-12 text-center">
                  <div class="text-gray-400 font-medium mb-1">No appointments booked for this date</div>
                  <div class="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Enjoy the free time</div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>