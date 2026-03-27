<script setup>
import { ref } from 'vue'

const feeSchedule = ref([
  { service: 'General Checkup', price: 'PHP 500.00' },
  { service: 'Rabies Vaccination', price: 'PHP 350.00' },
  { service: 'Deworming', price: 'PHP 250.00' },
  { service: 'Nail Clipping', price: 'PHP 150.00' },
  { service: 'Full Grooming', price: 'PHP 800.00' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Standard Fee Schedule</h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-normal">
            <tr>
              <th class="pb-5 pl-4">Service Description</th>
              <th class="pb-5 text-right pr-4">Standard Rate</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(fee, index) in feeSchedule" :key="index" class="border-b border-gray-50 last:border-none">
              <td class="py-5 px-4 font-normal text-gray-700">{{ fee.service }}</td>
              <td class="py-5 text-right pr-4 font-normal text-gray-700">{{ fee.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</template>