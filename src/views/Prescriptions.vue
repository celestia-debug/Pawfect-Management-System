<script setup>
import { ref } from 'vue'

const prescriptionRecords = ref([
  { id: 'RX9021', petName: 'Simba', owner: 'Carlos Mendoza', medication: 'Amoxicillin', dosage: '50mg / Twice Daily', status: 'Active' },
  { id: 'RX9022', petName: 'Luna', owner: 'Ana Reyes', medication: 'Meloxicam', dosage: '1 tablet / Daily', status: 'Active' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-xl font-bold text-gray-800 tracking-tight">Prescription Management</h3>
        <button class="bg-[#9DD7E9] hover:bg-[#8bc5d6] text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
          + Issue Prescription
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50">
            <tr>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Rx ID</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Pet Name</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Owner Name</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Medication</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Dosage & Frequency</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Status</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-gray-700 font-medium">
            <tr v-for="record in prescriptionRecords" :key="record.id" class="group hover:bg-gray-50/50 transition-colors">
              <td class="py-5 font-bold text-gray-900 text-xs">#{{ record.id }}</td>
              
              <td class="py-5 text-gray-500">{{ record.petName }}</td>
              
              <td class="py-5 text-gray-500">{{ record.owner }}</td>
              <td class="py-5 text-gray-500">{{ record.medication }}</td>
              <td class="py-5 text-gray-500">{{ record.dosage }}</td>
              <td class="py-5">
                <span class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase border bg-blue-50 text-blue-600 border-blue-100">
                  {{ record.status }}
                </span>
              </td>
              <td class="py-5 text-right space-x-2">
                <button class="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg font-bold text-[10px] uppercase transition-all border border-gray-100">View</button>
                <button class="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg font-bold text-[10px] uppercase transition-all border border-gray-100">Complete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>