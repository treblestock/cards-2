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

.layout {
  max-height: 100vh;

  display: flex;
  flex-direction: column;
}

.header {
  flex: 0 0 auto;
}
.main {
  flex: 1 1 auto;
}

</style>