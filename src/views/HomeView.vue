<template>
  <main>
    <Calendar />
    <Schedules v-if="dateHasSelected" />
  </main>
</template>
<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import Schedules from '@/components/Schedules.vue'
import { useCalendarStore } from '@/stores/calendar'
import { storeToRefs } from 'pinia'

const calendarStore = useCalendarStore()
const { dateHasSelected } = storeToRefs(calendarStore)
</script>
