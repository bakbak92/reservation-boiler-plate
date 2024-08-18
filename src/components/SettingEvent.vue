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
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElInput, ElSelect, ElOption } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { setRythmeWork, setIntervalDays } = settingStore
const { setting } = storeToRefs(settingStore)
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
    }
])
onMounted(() => {
    intervalDays.value = setting.value.intervalDays
    rythmeWork.value = setting.value.rythmeWork
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
    }
}
</style>