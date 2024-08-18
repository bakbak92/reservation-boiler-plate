<template>
    <main class="page-event">
        <div class="wrapper">
            <SettingEvent />
            <v-calendar 
                :min-date="new Date()"
                :max-date="maxDate"
                :disabled-dates="disabledDates"
                :day-style="dateStyle"
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
    console.log(date)
    return 'selected-bakbak'
}

const maxDate = computed(() => {
    const date = new Date()
    console.log(date, date.getDate())
    date.setDate(date.getDate() + setting.value.intervalDays)
    return date
})
const dateStyle = (date: CalendarDay) => {
    console.log(date)
    return 'selected-bakbak'
}
const getStartDate = (rythme: string) => {
    let start = new Date();
    const dayOfWeek = start.getDay();

    if (rythme === 'regular') {
        // Pour le rythme régulier, on évite le weekend
        if (dayOfWeek === 0) { // Dimanche
        start.setDate(start.getDate() + 1); // Aller au lundi
        } else if (dayOfWeek === 6) { // Samedi
        start.setDate(start.getDate() + 2); // Aller au lundi
        }
    } else if (rythme === 'weekend') {
        // Pour le rythme weekend, on va au samedi le plus proche
        if (dayOfWeek === 0) { // Dimanche
        start.setDate(start.getDate() - 1); // Aller au samedi précédent
        } else if (dayOfWeek !== 6) { // Si ce n'est pas déjà samedi
        const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
        start.setDate(start.getDate() + daysUntilSaturday);
        }
    } else {
        throw new Error("Le rythme doit être 'regular' ou 'weekend'");
    }

    return start;
}
// ùettre en hightlight le jour selectionner a condition qu'il ne doit pas desactiver

const attributes = computed(() => {
    return [
        {
            key: 'today',
            highlight: {
                color: 'blue',
                fillMode: 'light'
            },
            dates: {
                start: getStartDate(setting.value.rythmeWork),
                end: maxDate.value,
                repeat: {
                    weekdays: setting.value.rythmeWork === 'regular' ? regular : weekends
                }
            }
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