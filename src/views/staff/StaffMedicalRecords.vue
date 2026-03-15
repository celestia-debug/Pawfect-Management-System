<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const openOwners = ref([])

const groupedRecords = ref([
  {
    id: 'OWN 01',
    ownerName: 'Levi',
    pets: [
      { id: 'MED 001', petName: 'Max', condition: 'Allergy Treatment', status: 'Active' },
      { id: 'MED 002', petName: 'Buster', condition: 'Routine Checkup', status: 'Active' },
      { id: 'MED 003', petName: 'Bella', condition: 'Vaccination', status: 'Active' }
    ]
  },
  {
    id: 'OWN 02',
    ownerName: 'Goju',
    pets: [
      { id: 'MED 004', petName: 'Luna', condition: 'Ear Infection', status: 'Active' }
    ]
  }
])

const filteredRecords = computed(() => {
  if (!searchQuery.value) {
    return groupedRecords.value
  }
  return groupedRecords.value.filter(owner => 
    owner.ownerName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleOwner = (ownerId) => {
  const index = openOwners.value.indexOf(ownerId)
  if (index > -1) {
    openOwners.value.splice(index, 1)
  } else {
    openOwners.value.push(ownerId)
  }
}
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm w-full md:w-96">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search owner name..." 
          class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" 
        />
      </div>
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-xl font-bold text-gray-800 tracking-tight">Pet Medical Records</h3>
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Update Access Only</span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50">
            <tr>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px] pl-4">Owner ID</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Owner Name</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Total Pets</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px] text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            
            <template v-for="owner in filteredRecords" :key="owner.id">
              <tr class="group hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                <td class="py-5 px-4 font-bold text-gray-900 text-xs">{{ owner.id }}</td>
                <td class="py-5 font-bold text-[#189AB4]">{{ owner.ownerName }}</td>
                <td class="py-5 text-gray-500">{{ owner.pets.length }} Pets</td>
                <td class="py-5 text-right pr-4">
                  <button @click="toggleOwner(owner.id)" class="px-4 py-2 bg-gray-50 hover:bg-[#9DD7E9] hover:text-gray-900 rounded-lg font-bold text-[10px] uppercase transition-all border border-gray-100">
                    {{ openOwners.includes(owner.id) ? 'Hide Pets' : 'View Pets' }}
                  </button>
                </td>
              </tr>
              
              <tr v-if="openOwners.includes(owner.id)" class="bg-[#F8FAFC]">
                <td colspan="4" class="p-6 border-b border-gray-100 shadow-inner">
                  <table class="w-full text-left text-sm">
                    <thead class="text-gray-400 border-b border-gray-100">
                      <tr>
                        <th class="pb-3 font-bold uppercase tracking-widest text-[9px]">Record ID</th>
                        <th class="pb-3 font-bold uppercase tracking-widest text-[9px]">Pet Name</th>
                        <th class="pb-3 font-bold uppercase tracking-widest text-[9px]">Condition</th>
                        <th class="pb-3 font-bold uppercase tracking-widest text-[9px]">Status</th>
                        <th class="pb-3 font-bold uppercase tracking-widest text-[9px] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="pet in owner.pets" :key="pet.id">
                        <td class="py-4 font-bold text-gray-900 text-xs">{{ pet.id }}</td>
                        <td class="py-4 text-gray-500">{{ pet.petName }}</td>
                        <td class="py-4 text-gray-500">{{ pet.condition }}</td>
                        <td class="py-4">
                          <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase border bg-green-50 text-green-600 border-green-100">
                            {{ pet.status }}
                          </span>
                        </td>
                        <td class="py-4 text-right">
                          <button class="px-3 py-1.5 bg-white hover:bg-[#9DD7E9] hover:text-gray-900 rounded-md font-bold text-[9px] uppercase transition-all border border-gray-200">Update</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>

            <tr v-if="filteredRecords.length === 0">
              <td colspan="4" class="py-10 text-center text-gray-400 font-medium">
                No owners found matching that name
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>