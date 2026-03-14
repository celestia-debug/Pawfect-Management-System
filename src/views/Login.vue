<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">

    <div class="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">

      <div class="text-center mb-8">
        <img src="/logo.png" alt="Pawfect PH Logo" class="h-24 mx-auto mb-6 object-contain" />
        
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin <span class="text-teal-600">Portal</span>
        </h2>
        <p class="text-sm text-gray-500 mt-2 font-medium uppercase tracking-widest">Pawfect PH Co., Ltd</p>
      </div>

      <form class="space-y-6" @submit.prevent="$router.push('/dashboard')">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input type="email" id="email" required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200 text-gray-900 bg-gray-50 focus:bg-white"
            placeholder="admin@pawfectph.com">
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" required
              class="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200 text-gray-900 bg-gray-50 focus:bg-white"
              placeholder="••••••••">

            <button type="button" @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-teal-600 transition-colors">
              
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>

            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mt-4">
          <label class="flex items-center text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer">
            <span class="ml-2">Remember me</span>
          </label>
        </div>

        <button type="submit"
          class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-teal-200 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm tracking-widest uppercase">
          Secure Login
        </button>
      </form>

    </div>
  </div>
</template>