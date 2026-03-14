<script setup>
import { ref } from 'vue'

const inventoryItems = ref([
  { id: 'INV-101', itemName: 'Rabies Vaccine (10ml)', category: 'Medicine', stock: 45, unit: 'Vials', status: 'In Stock' },
  { id: 'INV-102', itemName: 'Premium Dog Food (5kg)', category: 'Supplies', stock: 2, unit: 'Bags', status: 'Low Stock' },
  { id: 'INV-103', itemName: 'Surgical Syringes', category: 'Equipment', stock: 0, unit: 'Units', status: 'Out of Stock' },
  { id: 'INV-104', itemName: 'Parvovirus Test Kit', category: 'Diagnostics', stock: 12, unit: 'Kits', status: 'In Stock' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm w-full md:w-96">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input type="text" placeholder="Search inventory..." class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
      </div>
      
      <div class="flex items-center space-x-2">
        <button class="px-5 py-2.5 bg-[#9DD7E9] text-gray-900 rounded-xl text-xs font-bold shadow-sm">All Items</button>
        <button class="px-5 py-2.5 bg-white text-gray-500 rounded-xl text-xs font-bold border border-gray-100">Low Stock</button>
      </div>
    </div>

    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-xl font-bold text-gray-800 tracking-tight">Supply & Equipment Stock</h3>
        <button class="bg-[#9DD7E9] hover:bg-[#8bc5d6] text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
          + Add New Item
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-gray-400 border-b border-gray-50">
            <tr>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Item ID</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Item Name</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Category</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Stock Level</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px]">Status</th>
              <th class="pb-5 font-bold uppercase tracking-widest text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-gray-700 font-medium">
            <tr v-for="item in inventoryItems" :key="item.id" class="group hover:bg-gray-50/50 transition-colors">
              <td class="py-5 font-bold text-gray-900 text-xs">#{{ item.id }}</td>
              
              <td class="py-5 text-gray-500">{{ item.itemName }}</td>
              
              <td class="py-5 text-gray-500">{{ item.category }}</td>
              <td class="py-5 font-bold">
                <span :class="item.stock <= 5 ? 'text-red-500' : 'text-gray-700'">
                  {{ item.stock }} {{ item.unit }}
                </span>
              </td>
              <td class="py-5">
                <span :class="[
                  'px-4 py-1.5 rounded-full text-[10px] font-black uppercase border',
                  item.status === 'In Stock' ? 'bg-green-50 text-green-600 border-green-100' : '',
                  item.status === 'Low Stock' ? 'bg-orange-50 text-orange-600 border-orange-100' : '',
                  item.status === 'Out of Stock' ? 'bg-red-50 text-red-600 border-red-100' : ''
                ]">
                  {{ item.status }}
                </span>
              </td>
              <td class="py-5 text-right space-x-2">
                <button class="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg font-bold text-[10px] uppercase transition-all border border-gray-100">Update Stock</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>