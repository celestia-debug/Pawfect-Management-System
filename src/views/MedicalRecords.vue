<script setup>
import { ref } from 'vue'

const medicalRecords = ref([
  { id: 'MED-001', petName: 'Bella', owner: 'Maria Santos', condition: 'Routine Checkup', status: 'Active' },
  { id: 'MED-002', petName: 'Max', owner: 'Juan Dela Cruz', condition: 'Allergy Treatment', status: 'Active' },
  { id: 'MED-003', petName: 'Luna', owner: 'Ana Reyes', condition: 'Dental Scaling', status: 'Hidden' }
])

const updateRecordStatus = (recordId, actionType) => {
  console.log(`Sending API request to ${actionType} record ${recordId}`)
}
</script>

<template>
  <div class="bg-[#FFFFFF] rounded-3xl p-8 shadow-sm border border-[#BFEAF6]">
    <div class="flex justify-between items-center mb-8">
      <h3 class="text-xl font-bold text-[#333333]">Pet Medical Records</h3>
      <button class="bg-[#9DD7E9] hover:bg-[#BFEAF6] text-[#333333] px-6 py-2.5 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5">
        + Add Medical Record
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="text-[#333333] opacity-70 border-b-2 border-[#BFEAF6]">
          <tr>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Record ID</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Pet Name</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Owner</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Condition</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Status</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs text-right">Admin Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F4F8FA] text-[#333333]">
          
          <tr v-for="record in medicalRecords" :key="record.id" class="hover:bg-[#F4F8FA] transition-colors group">
            <td class="py-5 font-bold">#{{ record.id }}</td>
            <td class="py-5 font-medium">{{ record.petName }}</td>
            <td class="py-5 text-gray-600">{{ record.owner }}</td>
            <td class="py-5 text-gray-600">{{ record.condition }}</td>
            <td class="py-5">
              <span :class="[
                'px-4 py-1.5 rounded-full text-xs font-bold border',
                record.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
              ]">
                {{ record.status }}
              </span>
            </td>
            <td class="py-5 text-right space-x-2">
              <button @click="updateRecordStatus(record.id, 'edit')" class="px-3 py-1.5 bg-[#F4F8FA] hover:bg-[#BFEAF6] rounded-lg font-semibold transition-colors">Edit</button>
              <button v-if="record.status === 'Active'" @click="updateRecordStatus(record.id, 'hide')" class="px-3 py-1.5 bg-[#F4F8FA] hover:bg-[#BFEAF6] rounded-lg font-semibold transition-colors">Hide</button>
              <button v-if="record.status === 'Hidden'" @click="updateRecordStatus(record.id, 'unhide')" class="px-3 py-1.5 bg-[#F4F8FA] hover:bg-[#BFEAF6] rounded-lg font-semibold transition-colors">Unhide</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>