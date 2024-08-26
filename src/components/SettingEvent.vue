<template>
    <div class="setting-event">
        <h2>Parametrage</h2>
        <div class="event-interval">
            <h3>Disponibilité</h3>
            <div class="form-item">
                <p>Les clients peuvent booker un créneau jusqu'a</p>
                <div class="input-days">
                    <el-input
                        v-model="intervalDays"
                        placeholder="Entrez un nombre"
                        type="number"
                        @input="setIntervalDays(intervalDays)"
                    />
                    <span>jours</span>
                </div>
            </div>
            <div class="form-item">
                <p>Rythme de travail</p>
                <el-select
                    v-model="rythmeWork"
                    placeholder="Selectionnez un rythme de travail"
                    @change="setRythmeWork(rythmeWork)"
                >
                    <el-option
                        v-for="item in optionRythmeWork"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
            <div class="form-item" v-if="rythmeWork === 'specific'">
                <p>Choisir un jour spécifique</p>
                <el-checkbox-group v-model="checkedDays" @change="changeCheckedDays">
                    <el-checkbox :label="1">Lundi</el-checkbox>
                    <el-checkbox :label="2">Mardi</el-checkbox>
                    <el-checkbox :label="3">Mercredi</el-checkbox>
                    <el-checkbox :label="4">Jeudi</el-checkbox>
                    <el-checkbox :label="5">Vendredi</el-checkbox>
                    <el-checkbox :label="6">Samedi</el-checkbox>
                    <el-checkbox :label="0">Dimanche</el-checkbox>
                </el-checkbox-group>
                <ElButton type="primary" :disabled="disabledCheckdays">Valider</ElButton>
            </div>
            <div class="form-item">
                <p>Heure de Disponibilité par jour <span class="btn-plus">+</span></p>
                <div v-for="(time, i) in timesFiltered" :key="i" class="time-item">
                    <div class="label-day">
                        <span class="day">{{ getWeekdays(time.weekday) }}</span>
                        <ElButton type="primary" circle @click="addInterval(i)">
                            <i class="fa-solid fa-plus"></i>
                        </ElButton>
                    </div>
                    <div v-for="(interval, j) in time.intervals" :key="j" class="interval-item">
                        <ElTimeSelect
                            placeholder="Heure de début"
                            v-model="interval.start"
                            :picker-options="{
                                start: '08:00',
                                step: duration,
                                end: '18:00'
                            }"
                        />
                        <span>à</span>
                        <ElTimeSelect
                            placeholder="Heure de fin"
                            v-model="interval.end"
                            :picker-options="{
                                start: '08:00',
                                step: duration,
                                end: '18:00'
                            }"
                        />
                        <ElButton type="danger" circle @click="removeInterval(i, j)">
                            <i class="fa-solid fa-trash"></i>
                        </ElButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { 
    ElInput, ElSelect, ElOption, ElCheckboxGroup, ElCheckbox, ElButton,
    ElTimeSelect
} from 'element-plus'
import { ref, onMounted, watch, computed } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { setRythmeWork, setIntervalDays } = settingStore
const { setting, specificDays } = storeToRefs(settingStore)
const intervalDays = ref<number>(60)
const rythmeWork = ref<string>('')
const optionRythmeWork = ref([
    {
        label: 'Tous les jours de la semaine',
        value: 'regular'
    },
    {
        label: 'Tous les week-ends',
        value: 'weekend'
    },
    {
        label: 'Tous les jours',
        value: 'all'
    },
    {
        label: 'Jours spécifiques',
        value: 'specific'
    }
])

const duration = ref<string>('00:30')
const times = ref([
    {
        weekday: 1,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 2,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 3,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 4,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 5,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 6,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    },
    {
        weekday: 0,
        intervals: [
            {
                start: '08:00',
                end: '12:00'
            }
        ]
    }
])


const checkedDays = ref<number[]>([0, 6])
const disabledCheckdays = ref(true)
const timesFiltered = computed(() => {
    return times.value.filter((time) => checkedDays.value.includes(time.weekday))
})
const changeCheckedDays = (value:any) => {
    disabledCheckdays.value = false
    checkedDays.value = value
    specificDays.value = value
}
const getWeekdays = (day: number) => {
    const weekdays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return weekdays[day]
}
const addInterval = (index: number) => {
    times.value[index].intervals.push({
        start: '08:00',
        end: '12:00'
    })
}
const removeInterval = (index: number, intervalIndex: number) => {
    times.value[index].intervals.splice(intervalIndex, 1)
}
watch(() => setting.value.rythmeWork, (value) => {
    if(value === 'all') {
        checkedDays.value = [0, 1, 2, 3, 4, 5, 6]
        specificDays.value = [0, 1, 2, 3, 4, 5, 6]
    } else if(value === 'regular') {
        checkedDays.value = [1, 2, 3, 4, 5]
        specificDays.value = [1, 2, 3, 4, 5]
    } else if(value === 'weekend') {
        checkedDays.value = [0, 6]
        specificDays.value = [0, 6]
    }
})

onMounted(() => {
    intervalDays.value = setting.value.intervalDays
    rythmeWork.value = setting.value.rythmeWork
    if(setting.value.rythmeWork === 'all') {
        checkedDays.value = [0, 1, 2, 3, 4, 5, 6]
        specificDays.value = [0, 1, 2, 3, 4, 5, 6]
    } else if(setting.value.rythmeWork === 'regular') {
        checkedDays.value = [1, 2, 3, 4, 5]
        specificDays.value = [1, 2, 3, 4, 5]
    } else if(setting.value.rythmeWork === 'weekend') {
        checkedDays.value = [0, 6]
        specificDays.value = [0, 6]
    }
})
</script>
<style lang="scss">
.setting-event {
    .event-interval {
        .form-item {
            .input-days {
                display: flex;
                gap: 10px;
            }
        }
        .time-item {
            margin-bottom: 20px;
            .day {
                min-width: 80px;
                display: inline-block;
                margin-bottom: 10px;
            }
            .interval-item {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
            .label-day {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
        }
    }
}
.el-button {
    &.is-circle {
        min-width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        i {
            font-size: 12px;
        }
    }
}
</style>