<script setup>
import { ref } from 'vue'

const inventoryItems = ref([
  { id: 'INV 101', itemName: 'Rabies Vaccine 10ml', category: 'Medicine', stock: 45, unit: 'Vials', status: 'In Stock' },
  { id: 'INV 102', itemName: 'Premium Dog Food 5kg', category: 'Supplies', stock: 2, unit: 'Bags', status: 'Low Stock' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-xl font-bold text-gray-800 tracking-tight">Supply & Equipment Stock</h3>
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Update Access Only</span>
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
              <td class="py-5 font-bold text-gray-900 text-xs">{{ item.id }}</td>
              <td class="py-5 text-gray-500">{{ item.itemName }}</td>
              <td class="py-5 text-gray-500">{{ item.category }}</td>
              <td class="py-5 font-bold">
                 <span :class="item.stock <= 5 ? 'text-red-500' : 'text-gray-700'">{{ item.stock }} {{ item.unit }}</span>
              </td>
              <td class="py-5">
                <span :class="[
                  'px-4 py-1.5 rounded-full text-[10px] font-black uppercase border',
                  item.status === 'In Stock' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                ]">
                  {{ item.status }}
                </span>
              </td>
              <td class="py-5 text-right space-x-2">
                <button class="px-4 py-2 bg-gray-50 hover:bg-[#9DD7E9] hover:text-gray-900 rounded-lg font-bold text-[10px] uppercase transition-all border border-gray-100">Update Stock</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>