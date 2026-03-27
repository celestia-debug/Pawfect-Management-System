<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showModal = ref(false)
const selectedPet = ref(null)
const ownerPets = ref([])

const vaccineRecords = ref([
  { id: 'VAC 001', ownerName: 'Juan Dela Cruz', petName: 'Max', species: 'Dog', breed: 'Golden Retriever', status: 'Up to Date',
    vaccines: [
      { name: 'Rabies', dateGiven: 'Jan 12, 2026', nextDue: 'Jan 12, 2027', vet: 'Dr. Santos' },
      { name: 'DHPPi', dateGiven: 'Mar 05, 2026', nextDue: 'Mar 05, 2027', vet: 'Dr. Reyes' }
    ]
  },
  { id: 'VAC 002', ownerName: 'Juan Dela Cruz', petName: 'Bella', species: 'Dog', breed: 'Pug', status: 'Due Soon',
    vaccines: [
      { name: 'Bordetella', dateGiven: 'Apr 15, 2025', nextDue: 'Apr 15, 2026', vet: 'Dr. Reyes' }
    ]
  },
  { id: 'VAC 003', ownerName: 'Maria Santos', petName: 'Luna', species: 'Cat', breed: 'Siamese', status: 'Up to Date',
    vaccines: [
      { name: 'FVRCP', dateGiven: 'Dec 10, 2025', nextDue: 'Dec 10, 2026', vet: 'Dr. Santos' }
    ]
  }
])

const filteredVaccines = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return vaccineRecords.value.filter(record => 
    record.ownerName.toLowerCase().includes(query) || 
    record.petName.toLowerCase().includes(query)
  )
})

const openVaccineModal = (pet) => {
  selectedPet.value = pet
  ownerPets.value = vaccineRecords.value.filter(p => p.ownerName === pet.ownerName)
  showModal.value = true
}

const switchPet = (siblingPet) => {
  selectedPet.value = siblingPet
}
</script>

<template>
  <div class="space-y-6 relative">
    
    <div class="flex items-center space-x-2 bg-white px-6 py-3 rounded-[24px] border border-gray-100 shadow-sm w-full md:w-96">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <input v-model="searchQuery" type="text" placeholder="Search owner name..." class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Vaccination Tracking</h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-normal">
            <tr>
              <th class="pb-5 pl-4">Record ID</th>
              <th class="pb-5">Owner Name</th>
              <th class="pb-5 text-center">Status</th>
              <th class="pb-5 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-if="filteredVaccines.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-400 font-normal">No records found.</td>
            </tr>
            <tr v-for="record in filteredVaccines" :key="record.id" @click="openVaccineModal(record)" class="border-b border-gray-50 last:border-none hover:bg-gray-50/80 cursor-pointer transition-colors group">
              <td class="py-5 px-4 font-normal text-gray-400 text-xs">{{ record.id }}</td>
              
              <td class="py-5 font-normal text-[#189AB4]">{{ record.ownerName }}</td>

              <td class="py-5 text-center">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-[9px] font-normal uppercase border',
                  record.status === 'Up to Date' ? 'bg-green-50 text-green-600 border-green-100' : 
                  record.status === 'Due Soon' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-red-50 text-red-600 border-red-100'
                ]">
                  {{ record.status }}
                </span>
              </td>
              <td class="py-5 text-right pr-4">
                <button class="px-5 py-2 bg-gray-50 group-hover:bg-[#9DD7E9] group-hover:text-gray-900 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                  View Log
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal && selectedPet" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-[28px] w-full max-w-2xl shadow-xl border border-gray-100 max-h-[85vh] flex flex-col">
        
        <div class="flex flex-col mb-6 border-b border-gray-50 pb-6">
          <div class="flex justify-between items-start w-full">
            <div>
              <h3 class="text-2xl font-normal text-gray-800">Vaccinations: <span class="font-normal">{{ selectedPet.petName }}</span></h3>
              <p class="text-[11px] font-normal text-gray-400 uppercase tracking-widest mt-1">
                OWNER: <span class="text-[#189AB4] font-bold">{{ selectedPet.ownerName }}</span>
              </p>
              <p class="text-[10px] font-normal text-gray-400 uppercase tracking-widest mt-2">
                {{ selectedPet.species }} • {{ selectedPet.breed }}
              </p>
            </div>
            <button @click="showModal = false" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div v-if="ownerPets.length > 1" class="mt-6 flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl w-fit border border-gray-100">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Switch Pet:</span>
            <button v-for="sibling in ownerPets" :key="sibling.id" @click="switchPet(sibling)"
                    :class="[
                      'px-4 py-2 rounded-xl text-xs font-normal transition-all',
                      selectedPet.id === sibling.id ? 'bg-[#9DD7E9] text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-200'
                    ]">
              {{ sibling.petName }}
            </button>
          </div>
        </div>

        <div class="overflow-y-auto flex-1 pr-2">
          <table class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-100 uppercase text-[9px] font-normal">
              <tr>
                <th class="pb-3">Vaccine Name</th>
                <th class="pb-3">Date Given</th>
                <th class="pb-3">Vet Doctor</th>
                <th class="pb-3 text-right">Next Due</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="selectedPet.vaccines.length === 0">
                <td colspan="4" class="py-8 text-center text-gray-400 font-normal">No vaccination history recorded.</td>
              </tr>
              <tr v-for="(vax, index) in selectedPet.vaccines" :key="index" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-normal text-gray-800">{{ vax.name }}</td>
                <td class="py-4 text-gray-500 font-normal">{{ vax.dateGiven }}</td>
                <td class="py-4 font-normal text-[#189AB4]">{{ vax.vet }}</td>
                <td class="py-4 text-right font-normal text-orange-500">{{ vax.nextDue }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>