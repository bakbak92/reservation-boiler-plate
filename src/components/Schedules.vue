<template>
  <div class="schedules">
    <h1>Schedules</h1>
    <div v-for="schedule in schedules" :key="schedule.debut">
      <h2>{{ schedule.debut }} - {{ schedule.fin }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const schedules = ref<any>([])
 onMounted(() => {
   schedules.value = genererCreneaux(30, "08:00", "12:00");
 })

 function genererCreneaux(minute, hourStart, hourEnd) {
    // Convertir les heures de début et de fin en objets Date
    let debut = new Date(`1970-01-01T${hourStart}:00`);
    let fin = new Date(`1970-01-01T${hourEnd}:00`);
    
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