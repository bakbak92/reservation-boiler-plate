<template>
    <main class="page-event">
        <div class="wrapper">
            <SettingEvent />
            <v-calendar 
                :min-date="new Date()"
                :max-date="maxDate"
                :disabled-dates="disabledDates"
                :attributes="attributes"
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
import { ref, computed } from 'vue'
const calendarStore = useCalendarStore()
const settingStore = useSettingStore()
const { selectDate } = calendarStore
const { dateHasSelected } = storeToRefs(calendarStore)
const { setting } = storeToRefs(settingStore)

const regular = [2, 3, 4, 5, 6]
const weekends = [1, 7]

const handleSelectDate = (date: CalendarDay) => {
    return 'selected-bakbak'
}
const generateDates = (maxDate:Date, includeWeekends = false) => {
    const dates = []
    let currentDate = new Date()
    const endDate = new Date(maxDate.setDate(currentDate.getDate() + 1))

    while (currentDate <= endDate) {
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

      if ((includeWeekends && isWeekend) || (!includeWeekends && !isWeekend)) {
        dates.push(new Date(currentDate));
      }

      // Passer au jour suivant
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const maxDate = computed(() => {
    const date = new Date()
    console.log(date, date.getDate())
    date.setDate(date.getDate() + setting.value.intervalDays)
    return date
})

const withWeekends = computed(() => {
    return setting.value.rythmeWork !== 'regular'
})

const attributes = computed(() => {
    return [
        {
            key: 'today',
            highlight: {
                color: 'white',
            },
            dates: generateDates(maxDate.value, withWeekends.value),
        }
    ]
})
const disabledDates = computed(() => {
    return [
        {
            repeat: {
                weekdays: setting.value.rythmeWork === 'regular' ? weekends : regular
            }
        }
    ]
})

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