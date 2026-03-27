<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showModal = ref(false)
const formData = ref({ id: '', name: '', category: '', stock: 0, unit: '' })

const inventoryItems = ref([
  { id: 'INV 001', name: 'Rabies Vaccine', category: 'Medical', stock: 4, unit: 'vials' },
  { id: 'INV 002', name: 'Dog Kibble (10kg)', category: 'Supplies', stock: 25, unit: 'bags' },
  { id: 'INV 003', name: 'Cat Vitamins', category: 'Medical', stock: 2, unit: 'bottles' }
])

const filteredInventory = computed(() => {
  return inventoryItems.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const increaseStock = (item) => {
  item.stock++
}

const decreaseStock = (item) => {
  if (item.stock > 0) item.stock--
}

const openAddModal = () => {
  // Sets default category to 'Medical' so the dropdown isn't blank
  formData.value = { id: `INV 00${inventoryItems.value.length + 1}`, name: '', category: 'Medical', stock: 0, unit: '' }
  showModal.value = true
}

const saveProduct = () => {
  inventoryItems.value.push({ ...formData.value })
  showModal.value = false
}
</script>

<template>
  <div class="space-y-6 relative">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center space-x-2 bg-white px-6 py-3 rounded-3xl border border-gray-100 shadow-sm w-full md:w-96">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input v-model="searchQuery" type="text" placeholder="Search supplies or medicine..." class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
      </div>

      <button @click="openAddModal" class="bg-[#189AB4] hover:bg-[#148299] text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-md">
        + Add New Product
      </button>
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <h3 class="text-xl font-normal text-gray-800 tracking-tight mb-8">Inventory Tracking</h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-normal">
            <tr>
              <th class="pb-5 pl-4">Item Details</th>
              <th class="pb-5">Category</th>
              <th class="pb-5 text-center">Quick Adjust Stock</th>
              <th class="pb-5 text-right pr-4">Status</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-if="filteredInventory.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-400 font-normal">No items match your search.</td>
            </tr>
            <tr v-for="item in filteredInventory" :key="item.id" class="border-b border-gray-50 last:border-none hover:bg-gray-50/50">
              
              <td class="py-5 px-4">
                <div class="text-gray-800 font-normal">{{ item.name }}</div>
                <div class="text-[10px] text-gray-400 font-normal uppercase mt-0.5">{{ item.id }}</div>
              </td>

              <td class="py-5 text-gray-500 font-normal">{{ item.category }}</td>

              <td class="py-5 text-center">
                <div class="inline-flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-xl px-2 py-1">
                  <button @click="decreaseStock(item)" class="w-8 h-8 rounded-lg bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-500 font-normal text-lg transition-colors">-</button>
                  
                  <input v-model.number="item.stock" type="number" class="w-12 text-center bg-transparent border-none focus:ring-0 text-gray-700 text-lg font-normal p-0 outline-none" />
                  
                  <button @click="increaseStock(item)" class="w-8 h-8 rounded-lg bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-500 font-normal text-lg transition-colors">+</button>
                </div>
              </td>

              <td class="py-5 text-right pr-4">
                <span :class="[
                  'px-3 py-1.5 rounded-xl text-[9px] font-normal uppercase border',
                  item.stock > 10 ? 'bg-green-50 text-green-600 border-green-100' : 
                  item.stock > 0 ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-red-50 text-red-600 border-red-100'
                ]">
                  {{ item.stock > 10 ? 'Healthy' : item.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-[28px] w-full max-w-sm shadow-xl border border-gray-100">
        <h3 class="text-xl font-normal text-gray-800 mb-6">Add New Product</h3>
        
        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Item Name</label>
            <input v-model="formData.name" type="text" class="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#9DD7E9]" />
          </div>
          
          <div>
            <label class="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Category</label>
            <div class="relative mt-1">
              <select v-model="formData.category" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#9DD7E9] appearance-none text-gray-700">
                <option value="Medical">Medical</option>
                <option value="Supplies">Supplies</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-1/2">
              <label class="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Starting Stock</label>
              <input v-model="formData.stock" type="number" class="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#9DD7E9]" />
            </div>
            <div class="w-1/2">
              <label class="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Unit</label>
              <input v-model="formData.unit" type="text" class="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#9DD7E9]" />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-8">
          <button @click="showModal = false" class="px-5 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl text-sm font-normal">Cancel</button>
          <button @click="saveProduct" class="px-5 py-2.5 bg-[#189AB4] hover:bg-[#148299] text-white rounded-xl text-sm font-bold shadow-sm">Add Product</button>
        </div>
      </div>
    </div>

  </div>
</template>