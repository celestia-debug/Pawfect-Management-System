<template>
  <div class="bg-[#FFFFFF] rounded-3xl p-8 shadow-sm border border-[#BFEAF6]">
    <div class="flex justify-between items-center mb-8">
      <h3 class="text-xl font-bold text-[#333333]">Appointment Scheduling</h3>
      <button class="bg-[#9DD7E9] hover:bg-[#BFEAF6] text-[#333333] px-6 py-2.5 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5">
        + New Appointment
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="text-[#333333] opacity-70 border-b-2 border-[#BFEAF6]">
          <tr>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Apt ID</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Owner Name</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Pet Name</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Date & Time</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs">Status</th>
            <th class="pb-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F4F8FA] text-[#333333]">
          <tr class="hover:bg-[#F4F8FA] transition-colors group">
            <td class="py-5 font-bold">#APT1029</td>
            <td class="py-5 font-medium">Carlos Mendoza</td>
            <td class="py-5 text-gray-600">Rocky</td>
            <td class="py-5 font-bold text-gray-700">Oct 24, 10:00 AM</td>
            <td class="py-5">
              <span class="px-4 py-1.5 rounded-full text-xs font-bold border bg-green-50 text-green-700 border-green-200">
                Confirmed
              </span>
            </td>
            <td class="py-5 text-right space-x-2">
              <button class="px-3 py-1.5 bg-[#F4F8FA] hover:bg-[#BFEAF6] rounded-lg font-semibold transition-colors">Edit</button>
              <button class="px-3 py-1.5 bg-[#F4F8FA] hover:bg-[#BFEAF6] rounded-lg font-semibold transition-colors">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>