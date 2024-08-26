import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CalendarDay } from '@/types/calendar.ts'

export const useCalendarStore = defineStore('calendar', () => {
  const dateSelected = ref<CalendarDay>({
    endDate: new Date(),
    isDisabled: false,
    ariaLabel: '',
    date: new Date(),
  })

  const dateHasSelected = ref<boolean>(false)
  
  const selectDate = (date: CalendarDay) => {
    console.log(date)
    if (!date.isDisabled) {
      dateSelected.value = date
      dateHasSelected.value = true
    }
  }
  
  return {
    dateSelected,
    dateHasSelected,
    selectDate
  }
})