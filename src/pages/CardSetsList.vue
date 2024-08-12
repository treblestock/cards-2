<script setup lang="ts">



import useStoreCards from '~/stores/cards'
const cardsStore = useStoreCards()


import ActionToolbar from '~/components/ActionToolbar.vue'


const cardsSets = computed(() => cardsStore.cardSets)


</script>

<template>
  <div class="page">
    <div class="card-sets">
      <AppLink class="card-set-widget" 
        v-for="(cards, cardSetName) in cardsSets" :key="cardSetName"
        :to="{
          name: 'repetition',
          params: {
            cardSetName: cardSetName
          }
        }"
      >
        {{ cardSetName }}
      </AppLink>

    </div>


    <ActionToolbar class="action-toolbar"></ActionToolbar>

  </div>
</template>

<style scoped>
@import "~css/consts";

.page {
}
.card-sets {
}
.card-set-widget {
  display: block;
  padding: 20px 10px;
  
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0;
    translate: -50% 0;


    width: 90%;
    height: .5px;
    background: $color-primary;
  }
}
.action-toolbar {
}

</style>