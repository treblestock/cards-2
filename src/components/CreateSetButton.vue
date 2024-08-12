<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import PlusIcon from '~icons/plus.png'


const emit = defineEmits<{
  'create:set': []
}>()




</script>

<template>
  <button class="action-toolbar-icon imga"
    @click="emit('create:set')"
  >
    <img :src="PlusIcon" alt="">
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