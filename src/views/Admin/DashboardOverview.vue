<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let timer

const updateClock = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  currentDate.value = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

// --- 1. INTERACTIVE SUPERVISION CARDS ---
const supervisionStats = ref([
  { id: 'pets', title: 'Registered Pets & Owners', count: '124', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'bg-blue-50 text-blue-500' },
  { id: 'appointments', title: 'Appointments Today', count: '12', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-green-50 text-green-500' },
  { id: 'alerts', title: 'Critical Stock Alerts', count: '3', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'bg-orange-50 text-orange-500' }
])

// --- 2. MODAL STATE, SEARCH & DATA ---
const activeModal = ref(null)
const modalSearchQuery = ref('')

const registeredPetsData = ref([
  { ownerId: 'OWN 001', ownerName: 'Juan Dela Cruz', contact: '09123456789', pets: 'Max, Bella' },
  { ownerId: 'OWN 002', ownerName: 'Maria Santos', contact: '09987654321', pets: 'Luna' },
  { ownerId: 'OWN 003', ownerName: 'Carlos Reyes', contact: '09456123789', pets: 'Simba, Nala, Rocky' }
])

const todayAppointmentsData = ref([
  { time: '09:00 AM', ownerName: 'Juan Dela Cruz', petName: 'Max', reason: 'Annual Checkup' },
  { time: '11:30 AM', ownerName: 'Maria Santos', petName: 'Luna', reason: 'Rabies Vaccination' },
  { time: '02:00 PM', ownerName: 'Carlos Reyes', petName: 'Rocky', reason: 'Skin Allergy Check' }
])

const criticalStockData = ref([
  { id: 'INV 003', name: 'Cat Vitamins', category: 'Medicine', stock: 2, unit: 'bottles' },
  { id: 'INV 008', name: 'Rabies Vaccine', category: 'Medicine', stock: 1, unit: 'vials' },
  { id: 'INV 012', name: 'Parvo Test Kit', category: 'Diagnostics', stock: 3, unit: 'kits' }
])

// Filter Logic for Pets Modal
const filteredRegisteredPets = computed(() => {
  if (!modalSearchQuery.value) return registeredPetsData.value
  const query = modalSearchQuery.value.toLowerCase()
  return registeredPetsData.value.filter(owner => 
    owner.ownerName.toLowerCase().includes(query) || 
    owner.pets.toLowerCase().includes(query)
  )
})

// Filter Logic for Appointments Modal
const filteredAppointments = computed(() => {
  if (!modalSearchQuery.value) return todayAppointmentsData.value
  const query = modalSearchQuery.value.toLowerCase()
  return todayAppointmentsData.value.filter(apt => 
    apt.ownerName.toLowerCase().includes(query) || 
    apt.petName.toLowerCase().includes(query) ||
    apt.reason.toLowerCase().includes(query)
  )
})

const openModal = (id) => {
  modalSearchQuery.value = '' // Clears the search bar every time a new modal opens
  activeModal.value = id
}

const closeModal = () => {
  activeModal.value = null
}

// --- 3. AUDIT TRAIL DATA ---
const selectedStaffFilter = ref('All Staff')

const activityLogs = ref([
  { id: 1, staff: 'Sarah M.', role: 'Head Vet Tech', action: 'Added new medical record for Max', time: '10:42 AM', type: 'Medical' },
  { id: 2, staff: 'John D.', role: 'Receptionist', action: 'Confirmed vaccination appointment for Luna', time: '11:15 AM', type: 'Appointment' },
  { id: 3, staff: 'Sarah M.', role: 'Head Vet Tech', action: 'Updated Rabies Vaccine stock', time: '1:30 PM', type: 'Inventory' },
  { id: 4, staff: 'Mike T.', role: 'Inventory Clerk', action: 'Deactivated expired Dog Kibble batch', time: '2:05 PM', type: 'Inventory' },
  { id: 5, staff: 'John D.', role: 'Receptionist', action: 'Registered new pet owner: Maria Santos', time: '3:20 PM', type: 'Registration' }
])

const filteredLogs = computed(() => {
  if (selectedStaffFilter.value === 'All Staff') return activityLogs.value
  return activityLogs.value.filter(log => log.staff === selectedStaffFilter.value)
})

const uniqueStaff = computed(() => {
  const staffArray = activityLogs.value.map(log => log.staff)
  return ['All Staff', ...new Set(staffArray)]
})
</script>

<template>
  <div class="space-y-6 relative">
    
    <div class="bg-linear-to-r from-[#189AB4] to-[#9DD7E9] rounded-[28px] p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 class="text-2xl font-black tracking-tight mb-1 text-white">System Operations Normal</h2>
        <p class="text-sm font-medium opacity-90">All clinic modules are currently online and functioning.</p>
      </div>
      <div class="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 text-right">
        <p class="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">{{ currentDate }}</p>
        <p class="text-2xl font-black tabular-nums tracking-tight">{{ currentTime }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in supervisionStats" :key="stat.id" @click="openModal(stat.id)" class="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md duration-300 group">
        <div class="flex justify-between items-start">
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110', stat.color]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"></path></svg>
          </div>
          <div class="bg-gray-50 text-gray-400 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </div>
        </div>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.title }}</p>
        <h4 class="text-2xl font-black text-gray-800 mt-1">{{ stat.count }}</h4>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm lg:col-span-1">
        <h3 class="text-lg font-bold text-gray-800 tracking-tight mb-6">Clinic Capacity</h3>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-gray-500 uppercase tracking-widest">Appointments Today</span>
              <span class="text-[#189AB4]">12 / 20</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-[#189AB4] h-2 rounded-full" style="width: 60%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-gray-500 uppercase tracking-widest">In-Patient Cages</span>
              <span class="text-orange-500">8 / 10</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-orange-400 h-2 rounded-full" style="width: 80%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-gray-500 uppercase tracking-widest">Veterinarians on Duty</span>
              <span class="text-green-500">2 / 2</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-green-400 h-2 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm lg:col-span-2">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h3 class="text-lg font-bold text-gray-800 tracking-tight">Audit Trail</h3>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live staff activity monitor</p>
          </div>
          <div class="relative">
            <select v-model="selectedStaffFilter" class="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl text-xs font-bold focus:outline-none focus:border-[#9DD7E9]">
              <option v-for="staff in uniqueStaff" :key="staff" :value="staff">{{ staff }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        
        <div class="space-y-4 max-h-75 overflow-y-auto pr-2">
          <div v-for="log in filteredLogs" :key="log.id" class="flex items-start justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100/50 transition-colors">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-bold text-xs text-gray-400 border border-gray-100 shrink-0">
                {{ log.staff.substring(0,2).toUpperCase() }}
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800 leading-tight">{{ log.action }}</p>
                <div class="flex items-center mt-1 space-x-2">
                  <span class="text-[10px] font-black text-[#189AB4] uppercase tracking-tighter">{{ log.staff }}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-[10px] font-bold text-gray-400">{{ log.role }}</span>
                  <span class="text-gray-300">•</span>
                  <span :class="[
                    'text-[9px] font-black uppercase px-2 py-0.5 rounded-full border',
                    log.type === 'Medical' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    log.type === 'Inventory' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    log.type === 'Registration' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                    'bg-green-50 text-green-600 border-green-100'
                  ]">
                    {{ log.type }}
                  </span>
                </div>
              </div>
            </div>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-4 mt-1">{{ log.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-[28px] w-full max-w-3xl shadow-xl border border-gray-100 max-h-[85vh] flex flex-col">
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 class="text-xl font-bold text-gray-800">
            {{ activeModal === 'pets' ? 'Registered Pets & Owners Directory' : activeModal === 'appointments' ? 'Today\'s Appointment Schedule' : 'Critical Stock Alerts' }}
          </h3>
          <button @click="closeModal" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-if="activeModal === 'pets' || activeModal === 'appointments'" class="mb-6">
          <div class="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input v-model="modalSearchQuery" type="text" :placeholder="activeModal === 'pets' ? 'Search by owner name or pet name...' : 'Search by time, owner, or pet...'" class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
          </div>
        </div>

        <div class="overflow-y-auto flex-1 pr-2">
          
          <table v-if="activeModal === 'pets'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-bold">
              <tr><th class="pb-4">Owner Name</th><th class="pb-4">Contact Number</th><th class="pb-4">Registered Pets</th></tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-if="filteredRegisteredPets.length === 0">
                <td colspan="3" class="py-8 text-center text-gray-400 font-bold">No matching records found.</td>
              </tr>
              <tr v-for="owner in filteredRegisteredPets" :key="owner.ownerId" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-bold text-[#189AB4]">{{ owner.ownerName }}</td>
                <td class="py-4 font-bold">{{ owner.contact }}</td>
                <td class="py-4 text-gray-600 font-normal">{{ owner.pets }}</td>
              </tr>
            </tbody>
          </table>

          <table v-if="activeModal === 'appointments'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-bold">
              <tr><th class="pb-4">Time</th><th class="pb-4">Owner</th><th class="pb-4">Pet</th><th class="pb-4">Reason</th></tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-if="filteredAppointments.length === 0">
                <td colspan="4" class="py-8 text-center text-gray-400 font-bold">No matching appointments found.</td>
              </tr>
              <tr v-for="apt in filteredAppointments" :key="apt.time" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-bold text-gray-800">{{ apt.time }}</td>
                <td class="py-4 font-bold text-[#189AB4]">{{ apt.ownerName }}</td>
                <td class="py-4 text-gray-600 font-normal">{{ apt.petName }}</td>
                <td class="py-4 font-medium">{{ apt.reason }}</td>
              </tr>
            </tbody>
          </table>

          <table v-if="activeModal === 'alerts'" class="w-full text-left text-sm">
            <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-bold">
              <tr><th class="pb-4">Item Details</th><th class="pb-4">Category</th><th class="pb-4">Current Stock</th></tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-for="item in criticalStockData" :key="item.id" class="border-b border-gray-50 last:border-none">
                <td class="py-4 font-normal text-gray-800">{{ item.name }}</td>
                <td class="py-4 text-gray-500">{{ item.category }}</td>
                <td class="py-4 text-red-500 font-normal">
                  {{ item.stock }} <span class="text-[10px] uppercase ml-1 text-red-400">{{ item.unit }}</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

  </div>
</template>