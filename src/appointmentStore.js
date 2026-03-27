import { reactive } from 'vue'

export const appointmentStore = reactive({
  // Existing schedule for the clinic
  schedule: [
    { id: '101', time: '09:00 AM', date: '2026-03-30', owner: 'Juan Dela Cruz', pet: 'Max', species: 'Dog', status: 'Completed', vetId: '1', diagnosis: 'Annual Rabies Shot' },
    { id: '102', time: '10:30 AM', date: '2026-03-30', owner: 'Maria Santos', pet: 'Bella', species: 'Cat', status: 'In Session', vetId: '2' }
  ],

  // Track taken slots to prevent double booking
  bookedSlots: [
    { date: '2026-03-30', time: '09:00 AM', vetId: '1' },
    { date: '2026-03-30', time: '10:30 AM', vetId: '2' }
  ],

  vets: [
    { id: '1', name: 'Dr. Reyes', specialty: 'Surgery', available: true },
    { id: '2', name: 'Dr. Santos', specialty: 'Dermatology', available: true },
    { id: '3', name: 'Dr. Gomez', specialty: 'General', available: false } // Shows as Unavailable
  ]
})