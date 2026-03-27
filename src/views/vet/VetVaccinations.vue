<script setup>
import { ref, computed } from 'vue'

const searchOwner = ref('')
const selectedOwnerId = ref(null)
const selectedPet = ref(null)
const showVaxModal = ref(false)

// 1. Inventory Options (For the Vaccine Name dropdown)
const vaccineInventory = [
  'Rabies (1-Year)', 
  'DHPPi (Distemper/Parvo)', 
  'Bordetella', 
  'Leptospirosis', 
  'FVRCP (Cat Flu)'
]

const pets = ref([
  { id: 'P-1001', ownerId: 'OWN-501', name: 'Max', owner: 'Juan Dela Cruz', species: 'Dog', breed: 'Golden Retriever', 
    vaxHistory: [{ name: 'Rabies', date: 'Mar 15, 2025', due: 'Mar 15, 2026', vet: 'Dr. Reyes' }] },
  { id: 'P-1003', ownerId: 'OWN-501', name: 'Bella', owner: 'Juan Dela Cruz', species: 'Dog', breed: 'Pug', vaxHistory: [] },
  { id: 'P-1002', ownerId: 'OWN-909', name: 'Luna', owner: 'Maria Santos', species: 'Cat', breed: 'Siamese', 
    vaxHistory: [{ name: 'FVRCP', date: 'Mar 28, 2026', due: 'Mar 2, 2027', vet: 'Dr. Reyes' }] }
])

// 2. Logic to group owners for the sidebar search
const uniqueOwners = computed(() => {
  const ownersMap = {}
  pets.value.forEach(pet => {
    if (!ownersMap[pet.ownerId]) {
      ownersMap[pet.ownerId] = { id: pet.ownerId, name: pet.owner, petCount: 0 }
    }
    ownersMap[pet.ownerId].petCount++
  })
  return Object.values(ownersMap)
})

const filteredOwners = computed(() => {
  const query = searchOwner.value.toLowerCase().trim()
  return uniqueOwners.value.filter(o => o.name.toLowerCase().includes(query))
})

const selectOwner = (ownerId) => {
  selectedOwnerId.value = ownerId
  const ownerPets = pets.value.filter(p => p.ownerId === ownerId)
  selectedPet.value = ownerPets[0] // Auto-select the first pet
}

// 3. Form for the Modal
const newVax = ref({ name: '', due: '' })

const saveVax = () => {
  if (!newVax.value.name || !newVax.value.due) return
  
  selectedPet.value.vaxHistory.unshift({
    name: newVax.value.name,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    due: new Date(newVax.value.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    vet: 'Dr. Reyes'
  })
  
  newVax.value = { name: '', due: '' }
  showVaxModal.value = false
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)] font-sans">
    
    <div class="lg:col-span-4 flex flex-col space-y-4">
      <div class="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm">
        <div class="relative">
          <input v-model="searchOwner" type="text" placeholder="Search owner name..." class="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#189AB4]/20 text-sm font-medium" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <div class="bg-white rounded-[40px] border border-gray-100 shadow-sm flex-1 overflow-y-auto p-4">
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Owner Registry</h3>
        <div class="space-y-2">
          <button v-for="owner in filteredOwners" :key="owner.id" @click="selectOwner(owner.id)" 
            class="w-full text-left p-5 rounded-[24px] transition-all border border-transparent"
            :class="selectedOwnerId === owner.id ? 'bg-[#189AB4]/10 border-[#189AB4]/20' : 'hover:bg-gray-50'">
            <span class="font-bold text-gray-800">{{ owner.name }}</span>
            <p class="text-[10px] text-[#189AB4] mt-1 font-bold uppercase tracking-tight">{{ owner.petCount }} Pet(s)</p>
          </button>

          <div v-if="filteredOwners.length === 0" class="py-12 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">
            This owner does not have records
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div v-if="selectedPet" class="flex flex-col h-full">
        
        <div class="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
          <div>
            <h2 class="text-3xl font-black text-gray-800 tracking-tighter">{{ selectedPet.name }}'s Immunization</h2>
            <p class="text-[11px] font-bold text-[#189AB4] uppercase tracking-widest mt-1">Owner: {{ selectedPet.owner }}</p>
          </div>
          <button @click="showVaxModal = true" class="px-8 py-4 bg-[#189AB4] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            + Administer Vaccine
          </button>
        </div>

        <div class="p-10 overflow-y-auto">
          <div class="flex space-x-2 mb-8">
            <button v-for="pet in pets.filter(p => p.ownerId === selectedOwnerId)" :key="pet.id" @click="selectedPet = pet"
              :class="['px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all', selectedPet.id === pet.id ? 'bg-[#9DD7E9] text-gray-800' : 'bg-gray-50 text-gray-400 hover:bg-gray-100']">
              {{ pet.name }}
            </button>
          </div>

          <table class="w-full text-left">
            <thead class="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th class="pb-4">Vaccine</th>
                <th class="pb-4">Date Given</th>
                <th class="pb-4">Next Due</th>
                <th class="pb-4 text-right">Vet</th>
              </tr>
            </thead>
            <tbody class="text-sm font-normal">
              <tr v-for="vax in selectedPet.vaxHistory" :key="vax.name" class="border-b border-gray-50/50 last:border-none">
                <td class="py-6 font-bold text-gray-800">{{ vax.name }}</td>
                <td class="py-6 text-gray-500">{{ vax.date }}</td>
                <td class="py-6">
                  <span class="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100">{{ vax.due }}</span>
                </td>
                <td class="py-6 text-right text-[10px] font-black text-gray-300 uppercase">{{ vax.vet }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showVaxModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-xl rounded-[40px] p-12 shadow-2xl">
        <h3 class="text-3xl font-black text-gray-800 mb-8 tracking-tight">Vaccinations: {{ selectedPet.name }}</h3>
        
        <div class="space-y-6">
          <div>
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vaccine Name</label>
            <select v-model="newVax.name" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none cursor-pointer">
              <option disabled value="">Select Vaccine...</option>
              <option v-for="v in vaccineInventory" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Next Due Date</label>
            <input v-model="newVax.due" type="date" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none" />
          </div>

          <div class="grid grid-cols-2 gap-4 pt-6">
            <button @click="showVaxModal = false" class="py-4 bg-gray-100 text-gray-400 rounded-3xl text-[11px] font-black uppercase">Cancel</button>
            <button @click="saveVax" class="py-4 bg-[#189AB4] text-white rounded-3xl text-[11px] font-black uppercase shadow-lg shadow-[#189AB4]/20">Log Vaccine</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>