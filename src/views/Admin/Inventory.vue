<script setup>
import { ref, computed } from 'vue'

const inventoryItems = ref([
  { id: '001', name: 'Rabies Vaccine', category: 'Medical', stock: 4, isActive: true, isHidden: false },
  { id: '002', name: 'Dog Kibble (10kg)', category: 'Supplies', stock: 25, isActive: true, isHidden: false },
  { id: '003', name: 'Cat Vitamins', category: 'Medical', stock: 2, isActive: true, isHidden: false }
])

const searchQuery = ref('')
const showAddModal = ref(false)
const newItem = ref({ name: '', category: 'Medical', stock: 0 })

const filteredInventory = computed(() => {
  if (!searchQuery.value) return inventoryItems.value
  return inventoryItems.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getStatus = (stock) => {
  return stock <= 5 ? 'LOW STOCK' : 'HEALTHY'
}

const increaseStock = (item) => { item.stock++ }
const decreaseStock = (item) => { if (item.stock > 0) item.stock-- }

const toggleActive = (item) => { item.isActive = !item.isActive }
const toggleHidden = (item) => { item.isHidden = !item.isHidden }

const addNewProduct = () => {
  if (!newItem.value.name) return
  
  const newId = String(inventoryItems.value.length + 1).padStart(3, '0')
  
  inventoryItems.value.push({
    id: newId,
    name: newItem.value.name,
    category: newItem.value.category,
    stock: newItem.value.stock,
    isActive: true,
    isHidden: false
  })
  
  showAddModal.value = false
  newItem.value = { name: '', category: 'Medical', stock: 0 }
}
</script>

<template>
  <div class="animate-in fade-in duration-700 space-y-8">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div class="relative w-full max-w-md">
        <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search supplies or medicine..." 
          class="w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-[24px] text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20 shadow-sm transition-all text-gray-600" 
        />
      </div>

      <button @click="showAddModal = true" class="px-8 py-4 bg-[#189AB4] text-white rounded-[24px] font-bold text-sm shadow-sm hover:bg-[#15879e] transition-colors whitespace-nowrap">
        + Add New Product
      </button>

    </div>

    <div class="bg-white rounded-[32px] p-10 border border-gray-50 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Inventory Tracking</h3>
      
      <div class="grid grid-cols-12 gap-4 pb-4 border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
        <div class="col-span-3">Item Details</div>
        <div class="col-span-2">Category</div>
        <div class="col-span-3">Quick Adjust Stock</div>
        <div class="col-span-2">Status</div>
        <div class="col-span-2 text-right">Admin Actions</div>
      </div>

      <div v-if="filteredInventory.length === 0" class="py-12 text-center text-sm text-gray-400">
        No matching products found.
      </div>

      <div class="space-y-2 mt-4">
        <div v-for="item in filteredInventory" :key="item.id" 
             :class="['grid grid-cols-12 gap-4 items-center p-4 rounded-2xl transition-all', 
                      item.isHidden ? 'bg-gray-50 opacity-60' : 'bg-gray-50/50 hover:bg-gray-50']">
          
          <div class="col-span-3 flex flex-col">
            <span class="text-gray-800 font-normal text-[15px]">{{ item.name }}</span>
            <span class="text-gray-400 text-[11px] uppercase mt-0.5">INV {{ item.id }}</span>
          </div>

          <div class="col-span-2">
            <span class="text-gray-500 font-normal text-sm">{{ item.category }}</span>
          </div>

          <div class="col-span-3 flex items-center space-x-2">
            <button @click="decreaseStock(item)" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
            </button>
            
            <input 
              v-model.number="item.stock" 
              type="number" 
              min="0"
              class="w-12 text-center text-[15px] font-normal text-gray-800 border-none bg-transparent p-0 outline-none focus:ring-0" 
            />
            
            <button @click="increaseStock(item)" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>

          <div class="col-span-2 flex items-center">
            <span :class="['px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest', 
              getStatus(item.stock) === 'HEALTHY' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#E65100]']">
              {{ getStatus(item.stock) }}
            </span>
          </div>

          <div class="col-span-2 flex items-center justify-end space-x-2">
            <button @click="toggleActive(item)" 
                    :class="['px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors',
                             item.isActive ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100']">
              {{ item.isActive ? 'Active' : 'Inactive' }}
            </button>

            <button @click="toggleHidden(item)" class="px-3 py-1.5 bg-white text-gray-500 border border-gray-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
              {{ item.isHidden ? 'Unhide' : 'Hide' }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95">
        <h3 class="text-xl font-black text-gray-800 mb-6 uppercase tracking-tight">Add New Product</h3>
        
        <div class="space-y-5">
          <div>
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Product Name</label>
            <input v-model="newItem.name" type="text" placeholder="e.g. Surgical Masks" class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Category</label>
              <select v-model="newItem.category" class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none text-gray-600">
                <option value="Medical">Medical</option>
                <option value="Supplies">Supplies</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-2">Initial Stock</label>
              <input v-model="newItem.stock" type="number" class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#189AB4]/20" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-4">
            <button @click="showAddModal = false" class="py-4 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Cancel</button>
            <button @click="addNewProduct" class="py-4 bg-[#189AB4] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#15879e] transition-colors">Save</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>