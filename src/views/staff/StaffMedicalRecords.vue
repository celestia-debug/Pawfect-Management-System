<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showModal = ref(false)
const selectedRecord = ref(null)
const ownerPets = ref([])

const medicalRecords = ref([
  { id: 'MED 001', ownerName: 'Juan Dela Cruz', petName: 'Max', species: 'Dog', breed: 'Golden Retriever', 
    history: [
      { date: 'Oct 12, 2025', condition: 'Ear Infection', treatment: 'Ear drops prescribed', vet: 'Dr. Santos' },
      { date: 'Jan 15, 2026', condition: 'Annual Checkup', treatment: 'All clear, healthy weight', vet: 'Dr. Reyes' }
    ] 
  },
  { id: 'MED 002', ownerName: 'Juan Dela Cruz', petName: 'Bella', species: 'Dog', breed: 'Pug', 
    history: [
      { date: 'Nov 05, 2025', condition: 'Skin Allergy', treatment: 'Medicated shampoo', vet: 'Dr. Reyes' }
    ] 
  },
  { id: 'MED 003', ownerName: 'Maria Santos', petName: 'Luna', species: 'Cat', breed: 'Siamese', 
    history: [
      { date: 'Feb 10, 2026', condition: 'Allergic Reaction', treatment: 'Antihistamine shot', vet: 'Dr. Santos' }
    ] 
  }
])

const filteredRecords = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return medicalRecords.value.filter(record => 
    record.ownerName.toLowerCase().includes(query) || 
    record.petName.toLowerCase().includes(query)
  )
})

const openRecordModal = (record) => {
  selectedRecord.value = record
  ownerPets.value = medicalRecords.value.filter(p => p.ownerName === record.ownerName)
  showModal.value = true
}

const switchPet = (siblingPet) => {
  selectedRecord.value = siblingPet
}
</script>

<template>
  <div class="space-y-6 relative">
    
    <div class="flex items-center space-x-2 bg-white px-6 py-3 rounded-3xl border border-gray-100 shadow-sm w-full md:w-96">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <input v-model="searchQuery" type="text" placeholder="Search owner name..." class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Patient Medical Records</h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-normal">
            <tr>
              <th class="pb-5 pl-4">Record ID</th>
              <th class="pb-5">Owner Name</th>
              <th class="pb-5 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-if="filteredRecords.length === 0">
              <td colspan="3" class="py-8 text-center text-gray-400 font-normal">No records found.</td>
            </tr>
            
            <tr v-for="record in filteredRecords" :key="record.id" @click="openRecordModal(record)" class="border-b border-gray-50 last:border-none hover:bg-gray-50/80 cursor-pointer transition-colors group">
              <td class="py-5 px-4 font-normal text-gray-400 text-xs">{{ record.id }}</td>
              
              <td class="py-5 font-normal text-[#189AB4] group-hover:underline transition-all">
                {{ record.ownerName }}
              </td>

              <td class="py-5 text-right pr-4">
                <button class="px-5 py-2 bg-gray-50 group-hover:bg-[#9DD7E9] group-hover:text-gray-900 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                  View Record
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal && selectedRecord" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-[28px] w-full max-w-3xl shadow-xl border border-gray-100 max-h-[85vh] flex flex-col">
        
        <div class="flex flex-col mb-6 border-b border-gray-50 pb-6">
          <div class="flex justify-between items-start w-full">
            <div>
              <h3 class="text-2xl font-normal text-gray-800">Medical Records: <span class="font-normal">{{ selectedRecord.petName }}</span></h3>
              <p class="text-[11px] font-normal text-gray-400 uppercase tracking-widest mt-1">
                OWNER: <span class="text-[#189AB4] font-bold">{{ selectedRecord.ownerName }}</span>
              </p>
              <p class="text-[10px] font-normal text-gray-400 uppercase tracking-widest mt-2">
                {{ selectedRecord.species }} • {{ selectedRecord.breed }}
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
                      selectedRecord.id === sibling.id ? 'bg-[#9DD7E9] text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-200'
                    ]">
              {{ sibling.petName }}
            </button>
          </div>
        </div>

        <div class="overflow-y-auto flex-1 pr-2">
          <table class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-100 uppercase text-[9px] font-normal">
              <tr>
                <th class="pb-3">Date of Visit</th>
                <th class="pb-3">Condition / Reason</th>
                <th class="pb-3">Treatment / Notes</th>
                <th class="pb-3 text-right">Vet Doctor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="selectedRecord.history.length === 0">
                <td colspan="4" class="py-8 text-center text-gray-400 font-normal">No medical history recorded.</td>
              </tr>
              <tr v-for="(visit, index) in selectedRecord.history" :key="index" class="border-b border-gray-50 last:border-none">
                <td class="py-4 text-gray-500 font-normal">{{ visit.date }}</td>
                <td class="py-4 font-normal text-gray-800">{{ visit.condition }}</td>
                <td class="py-4 text-gray-600 font-normal">{{ visit.treatment }}</td>
                <td class="py-4 text-right font-normal text-[#189AB4]">{{ visit.vet }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>