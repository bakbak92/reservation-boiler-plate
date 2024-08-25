<template>
  <div class="schedules">
    <h1>Schedules {{ dateSelected.ariaLabel }}</h1>
    <div v-for="schedule in schedules" :key="schedule.debut">
      <div class="schedule-item">{{ schedule.debut }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { storeToRefs } from 'pinia'

const calendarStore = useCalendarStore()
const { dateSelected } = storeToRefs(calendarStore)

const schedules = ref<any>([])
 onMounted(() => {
   schedules.value = genererCreneaux(30, "08:00", "12:00");
 })
 // minute and hourStart and hourEnd are the parameters from database
 function genererCreneaux(minute: number, hourStart: string, hourEnd: string) {
  let currentDate = dateSelected.value.endDate; // Obtient la date actuelle
  let debut = new Date(currentDate);
  let fin = new Date(currentDate);

  debut.setHours(parseInt(hourStart.split(':')[0], 10), parseInt(hourStart.split(':')[1], 10), 0, 0);
  fin.setHours(parseInt(hourEnd.split(':')[0], 10), parseInt(hourEnd.split(':')[1], 10), 0, 0);
    
    // Convertir la durée du créneau en millisecondes
    let dureeMs = minute * 60 * 1000;
    
    let creneaux = [];
    
    // Générer les créneaux
    while (debut.getTime() + dureeMs <= fin.getTime()) {
        let debutCreneau = new Date(debut);
        let finCreneau = new Date(debut.getTime() + dureeMs);
        
        creneaux.push({
            debut: debutCreneau.toTimeString().substring(0, 5),
            fin: finCreneau.toTimeString().substring(0, 5)
        });
        
        // Avancer au créneau suivant
        debut = new Date(debut.getTime() + dureeMs);
    }
    
    return creneaux;
}

</script>
<style lang="scss" scoped>
.schedules {
  .schedule-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
}
</style>