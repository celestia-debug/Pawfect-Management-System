<script setup>
import { ref } from 'vue'

const auditLogs = ref([
  { id: 'LOG 001', user: 'ST 02', action: 'Updated Stock', module: 'Inventory', time: 'Mar 15 2026 09:15 AM' },
  { id: 'LOG 002', user: 'AD 01', action: 'Issued Prescription', module: 'Prescriptions', time: 'Mar 15 2026 10:30 AM' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-bold text-gray-800 mb-8 tracking-tight">Transparency Dashboard</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50">
            <tr>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Log ID</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">User</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Action</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Module</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-gray-700 font-medium">
            <tr v-for="log in auditLogs" :key="log.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="py-5 font-bold text-gray-900 text-xs">{{ log.id }}</td>
              <td class="py-5 text-gray-500">{{ log.user }}</td>
              <td class="py-5 text-gray-800 font-semibold">{{ log.action }}</td>
              <td class="py-5 text-gray-500">{{ log.module }}</td>
              <td class="py-5 text-gray-400 text-xs">{{ log.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>