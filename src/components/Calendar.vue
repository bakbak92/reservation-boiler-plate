<template>
  <v-calendar :min-date="new Date()" @dayclick="handleSelectDate" />
</template>

<script setup lang="ts">
import type { CalendarDay } from '@/types/calendar'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()
const { selectDate } = calendarStore
const handleSelectDate = (date: CalendarDay) => {
  console.log(date)
  selectDate(date)
}
</script>