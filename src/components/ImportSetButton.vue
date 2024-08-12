<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import ImportIcon from '~icons/import.png'


const emit = defineEmits<{
  'import:set': []
}>()




</script>

<template>
  <button class="action-toolbar-icon imga"
    @click="emit('import:set')"
  >
    <img :src="ImportIcon" alt="">
  </button>  
</template>

<style scoped>
@import "~css/consts";


.imga {
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  } 
}

</style>