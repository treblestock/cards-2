<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import deckIcon from '~icons/card-set.png'
import useLocalStorageSyncedRef from '~/composables/useLocalStorageSyncedRef'


import useStoreStats from '~/stores/stats'
const statsStore = useStoreStats()

const totalRepeated = computed(() => statsStore.repeatedTotal)
const todayRepeated = computed(() => statsStore.repeatedToday)






</script>

<template>
  <div class="header">
    <div class="left">
      <AppLink
        :to="{name: 'cardSetsList'}">
        <div class="imga">
          <img :src="deckIcon" alt="">
        </div>
      </AppLink>
    </div>
    <div class="right">

      <div class="row">
        <span>total: </span>
        <b>{{ totalRepeated }}</b>
      </div>

      <div class="row">
        <span>today: </span>
        <b>{{ todayRepeated }}</b>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import "~css/consts";


.header {
  border-bottom: 1px solid $color-primary;
  padding: 5px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.imga {
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
}

.right {
  margin: 0 0 0 auto;
  width: 150px;
}

.row {
  display: flex;
  justify-content: space-between;
}
</style>