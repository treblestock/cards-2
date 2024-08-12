<script setup lang="ts">
import {ref, computed, watch} from 'vue'
// @ts-ignore
import Header from '~/components/Header.vue'

</script>

<template>
  <div class="layout">
    <Header class="header"></Header>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>

</template>

<style scoped>
@import "~css/consts";


</style>