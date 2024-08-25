import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const setting = ref({
        rythmeWork: 'regular',
        intervalDays: 60
    })

    const specificDays = ref<number[]>([])

    const setRythmeWork = (rythme: string) => {
        setting.value.rythmeWork = rythme
    }

    const setIntervalDays = (interval: number) => {
        setting.value.intervalDays = +interval
    }

    return {
        setting,
        setRythmeWork,
        setIntervalDays,
        specificDays
    }
})