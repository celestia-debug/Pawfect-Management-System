<script setup>
import { ref } from 'vue'

const todayStats = ref([
  { title: 'Appointments Today', count: '4', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-blue-50 text-blue-500' },
  { title: 'Low Stock Items', count: '2', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-orange-50 text-orange-500' },
  { title: 'Pending Records', count: '1', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-green-50 text-green-500' }
])

const recentActivity = ref([
  { id: 1, action: 'Channy booked an appointment', time: '10 mins ago' },
  { id: 2, action: 'Rabies Vaccine stock updated', time: '1 hour ago' },
  { id: 3, action: 'Luna medical record updated', time: '2 hours ago' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-linear-to-r from-[#189AB4] to-[#9DD7E9] rounded-[28px] p-8 text-white shadow-sm flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-black tracking-tight mb-1 text-white">Welcome to the Staff's Dashboard</h2>
        <p class="text-sm font-medium opacity-90">Here is your quick overview for today's operations.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in todayStats" :key="stat.title" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center space-x-4">
        <div :class="['p-4 rounded-2xl', stat.color]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"></path>
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.title }}</p>
          <h4 class="text-2xl font-black text-gray-800">{{ stat.count }}</h4>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-bold text-gray-800 tracking-tight mb-6">Recent Clinic Activity</h3>
      <div class="space-y-4">
        <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 rounded-full bg-[#189AB4]"></div>
            <p class="text-sm font-bold text-gray-700">{{ activity.action }}</p>
          </div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>