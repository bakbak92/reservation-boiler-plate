<template>
    <main class="page-event">
        <div class="wrapper">
            <SettingEvent />
            <v-calendar 
                :min-date="new Date()"
                :max-date="maxDate"
                :disabled-dates="disabledDates"
                @dayclick="handleSelectDate"
            />
            <div>
                <Schedules v-if="dateHasSelected" />
            </div>
        </div>
    </main>

</template>
<script lang="ts" setup>
import type { CalendarDay } from '@/types/calendar'
import Schedules from '@/components/Schedules.vue'
import SettingEvent from '@/components/SettingEvent.vue'
import { useCalendarStore } from '@/stores/calendar'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'
import { ref } from 'vue'
const calendarStore = useCalendarStore()
const settingStore = useSettingStore()
const { selectDate } = calendarStore
const { dateHasSelected } = storeToRefs(calendarStore)
const { maxDate } = storeToRefs(settingStore)
const handleSelectDate = (date: CalendarDay) => {
    console.log(date)
    selectDate(date)
}

const disabledDates = ref([
  {
    repeat: {
        weekdays: [2, 3, 4, 5, 6],
    },
  },
]);

const regular = [2, 3, 4, 5, 6]
const weekends = [1, 7]
</script>
<style lang="scss">
.page-event {
    .wrapper {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
}
</style>