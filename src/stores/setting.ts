import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const setting = ref({
        rythmeWork: 'regular',
        intervalDays: 60
    })
    const maxDate = computed(() => {
        const date = new Date()
        date.setDate(date.getDate() + setting.value.intervalDays)
        return date
    })
    return {
        setting,
        maxDate,
    }
})