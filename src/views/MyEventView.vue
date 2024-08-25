<template>
    <main class="page-event">
        <div class="wrapper">
            <SettingEvent />
            <v-calendar 
                :min-date="new Date()"
                :max-date="maxDate"
                :disabled-dates="disabledDates"
                :attributes="attributes"
                :select-attribute="selectAttribute"
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
import { computed, ref } from 'vue'
import { regular, weekends, allDays, getWeekdays } from '@/utils/dates'

const calendarStore = useCalendarStore()
const settingStore = useSettingStore()
const { selectDate } = calendarStore
const { dateHasSelected } = storeToRefs(calendarStore)
const { setting, specificDays } = storeToRefs(settingStore)

const dateSelected = ref<Date | null>(null)
const handleSelectDate = (date: CalendarDay) => {
    console.log(date)
    if (!date.isDisabled) {
        selectDate(date)
        dateSelected.value = date.date
    }
}
const generateDates = (maxDate: Date, allowedDays: number[]) => {
    const dates = [];
    let currentDate = new Date();
    const endDate = new Date(maxDate.setDate(maxDate.getDate() + 1));

    while (currentDate <= endDate) {
        const currentDay = currentDate.getDay();

        // Vérifier si le jour actuel est dans la liste des jours autorisés
        if (allowedDays.includes(currentDay) &&
            (!dateSelected.value || currentDate.toDateString() !== dateSelected.value.toDateString())) {
            dates.push(new Date(currentDate));
        }

        // Passer au jour suivant
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const maxDate = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() + setting.value.intervalDays)
    return date
})

const listeDays = computed(() => {
   if(setting.value.rythmeWork === 'regular') {
       return regular
   } else if(setting.value.rythmeWork === 'weekend') {
       return weekends
   } if(setting.value.rythmeWork === 'specific') {
       return specificDays.value
    }
    else {
       return allDays
   }
})
const selectAttribute = ref({
    dot: true
});

const attributes = computed(() => {
    return [
        {
            content: {
                color: '#3a86ff',
                style: {
                    backgroundColor: '#bde0fe',
                }
            },
            dates: generateDates(maxDate.value, listeDays.value),
        },
        {
            highlight: {
                color: 'blue',
            },
            dates: [new Date(2024, 8, 27), dateSelected.value]
        }
    ]
})
const disabledDates = computed(() => {
    return [
        {
            repeat: {
                weekdays: getWeekdays(listeDays.value),
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