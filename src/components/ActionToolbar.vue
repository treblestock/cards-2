<script setup lang="ts">
import {useRouter} from 'vue-router'


import CreateSetButton from '~/components/CreateSetButton.vue'
import ImportSetButton from '~/components/ImportSetButton.vue'


import useStoreCards from '~/stores/cards'
const cardsStore = useStoreCards()


import useUpload from '~/composables/useUpload'
import { CardSetData } from '~/types';

function importSet() {
  useUpload({
    onload(filename, data) {
      const cardSetName = filename.split('.')[0]
      const cards: CardSetData = JSON.parse(data)
      cardsStore.createCardSet(cardSetName, cards)
    },
  })
}



const router = useRouter()

function navigateCreateSetForm() {
  router.push({name: 'newCardSetForm'})
}



</script>

<template>
  <div class="action-toolbar">
    <ImportSetButton class="action-toolbar-icon"
      @import:set="importSet"
    ></ImportSetButton>
    <CreateSetButton class="action-toolbar-icon"
      @create:set="navigateCreateSetForm"
    ></CreateSetButton>
  </div>
</template>

<style scoped>
@import "~css/consts";


$icon-size: 30px;


.action-toolbar {
  position: fixed;
  bottom: 20px;
  right: 20px;

  display: flex;
  gap: 20px;
}


.action-toolbar-icon {
  width: $icon-size;
  height: $icon-size;

  box-shadow: 0 0 2px 1px #ccc;
}


</style>