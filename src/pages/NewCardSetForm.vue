<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import type { Card, CardSetData } from '~/types'

const props = defineProps<{
  
}>()



const cardSetName = ref('')




const cards = ref<CardSetData>({
  'foo': 'ups'
})
const questions = computed(() => Object.keys(cards.value))
const answers = computed(() => questions.value.map((question) => cards.value[question]))
const cardsCount = computed(() => questions.value.length)



</script>

<template>
  <div class="new-set-form">
    <form>
      <input type="text" class="card-set-name"
        v-model="cardSetName"
      >

      <div class="cards">
        <div class="card"
          v-for="i in cardsCount" :key="questions[i]"
        >
          <input type="text" 
            v-model="questions[i]"
          >
          <input type="text" 
            v-model="answers[i]"
          >
        </div>
      </div>

    </form>
  </div>
</template>

<style scoped>
@import "~css/consts";


</style>