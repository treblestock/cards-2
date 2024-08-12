<script setup lang="ts">
import Repetition from '~/components/Repetition.vue'


const props = defineProps<{
  cardSetName: string
}>()
</script>

<template>
  <Repetition :cardSetName="props.cardSetName"></Repetition>  
</template>

<style scoped>
@import "~css/consts";


</style>