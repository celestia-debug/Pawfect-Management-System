<script setup>
import { ref, computed } from 'vue'

const searchOwner = ref('')
const selectedOwnerId = ref(null)
const selectedPet = ref(null)
const showEntryModal = ref(false)

// 1. DATABASE: Pets grouped by Owner IDs
const pets = ref([
  { id: 'P-1001', ownerId: 'OWN-501', name: 'Max', owner: 'Juan Dela Cruz', species: 'Dog', breed: 'Golden Retriever', history: [{ date: 'Jan 15, 2026', case: 'Skin Allergy', treatment: 'Apoquel 16mg', vet: 'Dr. Reyes' }] },
  { id: 'P-1003', ownerId: 'OWN-501', name: 'Bella', owner: 'Juan Dela Cruz', species: 'Dog', breed: 'Pug', history: [{ date: 'Mar 05, 2026', case: 'Vaccination', treatment: 'DHPPi', vet: 'Dr. Reyes' }] },
  { id: 'P-1002', ownerId: 'OWN-909', name: 'Luna', owner: 'Maria Santos', species: 'Cat', breed: 'Siamese', history: [{ date: 'Feb 10, 2026', case: 'Annual Physical', treatment: 'N/A', vet: 'Dr. Reyes' }] },
  { id: 'P-1004', ownerId: 'OWN-702', name: 'Kobe', owner: 'Roberto Gomez', species: 'Dog', breed: 'Shih Tzu', history: [] }
])

// 2. LOGIC: Get unique list of Owners from the pet database
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

// 3. SEARCH: Filters the list of Owners
const filteredOwners = computed(() => {
  const query = searchOwner.value.toLowerCase().trim()
  return uniqueOwners.value.filter(owner => 
    owner.name.toLowerCase().includes(query) || 
    owner.id.toLowerCase().includes(query)
  )
})

// 4. SELECTION: Find pets belonging to the clicked owner
const petsOfSelectedOwner = computed(() => {
  return pets.value.filter(p => p.ownerId === selectedOwnerId.value)
})

const selectOwner = (ownerId) => {
  selectedOwnerId.value = ownerId
  selectedPet.value = null // Reset pet view when switching owners
}

const selectPet = (pet) => {
  selectedPet.value = pet
}

// 5. MODAL LOGIC
const newEntry = ref({ diagnosis: '', treatment: '' })
const saveEntry = () => {
  if (!newEntry.value.diagnosis) return
  selectedPet.value.history.unshift({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    case: newEntry.value.diagnosis,
    treatment: newEntry.value.treatment,
    vet: 'Dr. Reyes'
  })
  newEntry.value = { diagnosis: '', treatment: '' }
  showEntryModal.value = false
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)] font-sans">
    
    <div class="lg:col-span-4 flex flex-col space-y-4">
      <div class="bg-white p-4 rounded-4xlrder border-gray-100 shadow-sm">
        <div class="relative">
          <input v-model="searchOwner" type="text" placeholder="Search Owner Name or ID..." class="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#189AB4]/20 text-sm font-medium" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <div class="bg-white rounded-[40px] border border-gray-100 shadow-sm flex-1 overflow-y-auto p-4">
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Owner Registry</h3>
        
        <div class="space-y-2">
          <button v-for="owner in filteredOwners" :key="owner.id" @click="selectOwner(owner.id)" 
            class="w-full text-left p-5 rounded-3xl transition-all border border-transparent group"
            :class="selectedOwnerId === owner.id ? 'bg-[#189AB4]/10 border-[#189AB4]/20' : 'hover:bg-gray-50'">
            <div class="flex justify-between items-center">
              <span class="font-bold text-gray-800">{{ owner.name }}</span>
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">{{ owner.id }}</span>
            </div>
            <p class="text-[10px] text-[#189AB4] mt-1 font-bold uppercase tracking-tight">{{ owner.petCount }} Registered Pet(s)</p>
          </button>

          <div v-if="filteredOwners.length === 0" class="py-12 px-6 text-center">
             <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
               <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
             </div>
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">This owner does not<br/>have records</p>
             <button @click="searchOwner = ''" class="mt-4 text-[10px] font-black text-[#189AB4] uppercase tracking-widest hover:underline">Clear Search</button>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      
      <div v-if="selectedOwnerId && !selectedPet" class="flex-1 flex flex-col p-10">
        <h2 class="text-3xl font-black text-gray-800 tracking-tighter mb-2">Owner: {{ uniqueOwners.find(o => o.id === selectedOwnerId).name }}</h2>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">Select a patient to view medical history</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button v-for="pet in petsOfSelectedOwner" :key="pet.id" @click="selectPet(pet)"
            class="p-8 bg-gray-50 rounded-4xl border border-gray-100 hover:border-[#189AB4] hover:bg-[#189AB4]/5 transition-all text-left group">
            <div class="flex justify-between items-start mb-4">
              <span class="text-2xl font-black text-gray-800">{{ pet.name }}</span>
              <span class="text-[9px] font-black text-[#189AB4] bg-white px-2 py-1 rounded-md border border-[#189AB4]/20 uppercase">{{ pet.id }}</span>
            </div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ pet.species }} • {{ pet.breed }}</p>
          </button>
        </div>
      </div>

      <div v-else-if="selectedPet" class="flex flex-col h-full animate-in fade-in duration-300">
        <div class="p-10 border-b border-gray-50 bg-gray-50/20 flex justify-between items-center">
          <div>
            <button @click="selectedPet = null" class="text-[9px] font-black text-[#189AB4] uppercase tracking-widest mb-4 flex items-center hover:underline">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
              Back to Owner's Pets
            </button>
            <h2 class="text-4xl font-black text-gray-800 tracking-tighter">{{ selectedPet.name }}</h2>
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-1">{{ selectedPet.species }} ID: {{ selectedPet.id }}</p>
          </div>
          <button @click="showEntryModal = true" class="px-8 py-4 bg-[#189AB4] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            + Log Medical Case
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-8">
           <div v-for="(record, index) in selectedPet.history" :key="index" class="relative pl-10 border-l-2 border-[#D1F2EB] pb-10 last:pb-0">
             <div class="absolute -left-2.75 top-0 w-5 h-5 bg-white border-4 border-[#189AB4] rounded-full shadow-sm"></div>
             <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div class="flex justify-between mb-4">
                  <span class="text-[10px] font-black text-[#189AB4] uppercase tracking-widest">{{ record.date }}</span>
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vet: {{ record.vet }}</span>
                </div>
                <h4 class="text-xl font-bold text-gray-800 mb-3">{{ record.case }}</h4>
                <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl"><strong>Treatment:</strong> {{ record.treatment }}</p>
             </div>
           </div>
           <div v-if="selectedPet.history.length === 0" class="text-center py-20 text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">No history found.</div>
        </div>
      </div>

      <div v-else class="flex-1 flex flex-col items-center justify-center">
        <img src="/logo.png" class="w-24 h-24 opacity-5 grayscale mb-6" />
        <p class="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">Select an owner to begin</p>
      </div>
    </div>

    <div v-if="showEntryModal" class="fixed inset-0 bg-black/50 backdrop-blur-md z-100 flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-xl rounded-[48px] p-12 shadow-2xl animate-in zoom-in-95">
        <h3 class="text-3xl font-black text-gray-800 mb-2 tracking-tight">Clinical Entry</h3>
        <p class="text-xs font-bold text-[#189AB4] uppercase tracking-widest mb-10">Patient: {{ selectedPet.name }}</p>
        <div class="space-y-6">
          <input v-model="newEntry.diagnosis" type="text" placeholder="Diagnosis Title" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#189AB4]/20" />
          <textarea v-model="newEntry.treatment" rows="5" placeholder="Treatment & Plan..." class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#189AB4]/20 resize-none"></textarea>
          <div class="grid grid-cols-2 gap-4 pt-4">
            <button @click="showEntryModal = false" class="py-5 bg-gray-100 text-gray-500 rounded-3xl text-[11px] font-black uppercase tracking-widest">Discard</button>
            <button @click="saveEntry" class="py-5 bg-[#189AB4] text-white rounded-3xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-[#189AB4]/20">Save to File</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>