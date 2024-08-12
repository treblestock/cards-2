<script setup lang="ts">
import type {Card, CardTuple} from '~/types'
import CardComp from '~/components/Card.vue'
import {ref, computed} from 'vue'
import { useRouter } from 'vue-router'


import { shuffleArr } from '~/utils'

const router = useRouter()

const props = defineProps<{
  cardSetName: string
}>()

// MODEL AND ANSWER LOGIC

import useStoreStats from '~/stores/stats'
const statsStore = useStoreStats()

import useStoreCards from '~/stores/cards'
const cardsStore = useStoreCards()


// const cards = computed(() => {
//   const cardsAsKeyValuePairs = cardsStore.cardSets[props.cardSetName] || {}
//   return Object.entries(cardsAsKeyValuePairs)
// })

// const shuffledCards = computed(() => shuffleArr(cards.value) )
const cardsAsKeyValuePairs = cardsStore.cardSets[props.cardSetName] || {}
const cardsAsTuples: CardTuple[] = Object.entries(cardsAsKeyValuePairs)

const cards = ref(shuffleArr(cardsAsTuples.filter(Boolean)) )

const currentCards = computed<CardTuple[]>(() => [cards.value[0], cards.value[1]])
// const currentCards = computed<CardTuple[]>(() => cards.value.filter(Boolean))


function answerCorrect() {
  cards.value.shift()
  statsStore.incrementCorrectAnswerStats()

}
function answerWrong() {
  if (!cards.value.length) throw new Error(`
    CardsIterator.vue: tried to answer when there no cards to repeat
  `)
  // @ts-ignore
  cards.value.push(cards.value.shift() )
}

watch(cards.value, () => {
  if (cards.value.length <= 0) {
    router.push({name: 'cardSetsList'})
  }

})



// UI LOGIC
const PX_MAX_TOP_CARD_OFFSET_DISTANCE = 200
const PX_DISTANCE_TO_SWIPE_CARD = 100
const TOP_CARD_MAX_ROTATION_DEG = 5

const animationPercentage = computed<number>(() => {
  return topCardOffset.value / PX_MAX_TOP_CARD_OFFSET_DISTANCE
})





const _topCardOffset = ref(0)
const topCardOffset = computed<number>({
  get() {
    return _topCardOffset.value
  },
  set(newValue: number) {
    if (newValue > PX_MAX_TOP_CARD_OFFSET_DISTANCE) {
      newValue = PX_MAX_TOP_CARD_OFFSET_DISTANCE
    }
    if (newValue < -PX_MAX_TOP_CARD_OFFSET_DISTANCE) {
      newValue = -PX_MAX_TOP_CARD_OFFSET_DISTANCE
    }
    _topCardOffset.value = newValue
  }
})

// derived css values
const cssRotationDeg = computed<string>(() => TOP_CARD_MAX_ROTATION_DEG * animationPercentage.value + 'deg')
const cssTranslateOffsetValue = computed<string>(() => -topCardOffset.value + 'px')

const CORRECT_ANSWER_CARD_COLOR = '#00AC6B'
const WRONG_ANSWER_CARD_COLOR = '#FF6F00'
const PENDING_ANSWER_CARD_COLOR = '#3BA3D0'


const cssCurrentColor = computed<string>(() => {
  if (topCardOffset.value > PX_DISTANCE_TO_SWIPE_CARD) return CORRECT_ANSWER_CARD_COLOR
  if (topCardOffset.value < -PX_DISTANCE_TO_SWIPE_CARD) return WRONG_ANSWER_CARD_COLOR
  return PENDING_ANSWER_CARD_COLOR
})

const cssBorder = computed<string>(() => {
  return `1px 1px 5px .2px ${cssCurrentColor.value}`
})


// pointer handling
const topCardDragStartPosition = ref<null | number>(null)

function onPointerDown(event: TouchEvent) {
  topCardDragStartPosition.value = event.touches[0].clientY
  console.log(topCardDragStartPosition.value)
  const cardHTML = (event.target as HTMLElement).closest('.card') as HTMLElement
  cardHTML.classList.add('_with-shadow')
  cardHTML.classList.add('_active')
}
function onPoinetrMove(event: TouchEvent) {
  if (!topCardDragStartPosition.value) return
  const offset = topCardDragStartPosition.value - event.touches[0].clientY
  topCardOffset.value = offset
}
function onPointerUp(event: PointerEvent) {
  if (topCardOffset.value >= PX_DISTANCE_TO_SWIPE_CARD) {
    answerCorrect()
  }
  if (topCardOffset.value <= -PX_DISTANCE_TO_SWIPE_CARD) {
    answerWrong()
  }
  const cardHTML = (event.target as HTMLElement).closest('.card') as HTMLElement
  cardHTML.classList.remove('_active')
  topCardDragStartPosition.value = null
  topCardOffset.value = 0
}


</script>

<template>
  <div class="cards-iterator">
    <div class="current-card-field">
        <CardComp class="card"
          v-for="[question, answer] in currentCards" :key="question" 
          :upside="question"
          :downside="answer"
          @touchstart="onPointerDown"
          @touchmove="onPoinetrMove"
          @touchend="onPointerUp"
        />
    </div>
  </div>
</template>

<style scoped>
@import "~css/consts";

.cards-iterator {
  height: 90vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.current-card-field {
  width: 90%;
  height: 30%;

  position: relative;
}


.card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  user-select: none;

  --card-color: v-bind(cssCurrentColor);

  &._with-shadow {
    box-shadow: v-bind(cssBorder);
  }

  &:first-child {
    z-index: 1;
    translate: 0 v-bind(cssTranslateOffsetValue);
    rotate: v-bind(cssRotationDeg);
  }
}

</style>