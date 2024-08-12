import { defineStore } from "pinia"
import type { CardSetData } from "~/types"


const CARD_SETS_NAMES_LIST_LOCAL_STORAGE_KEY = 'cardSets'
const CARD_SET_LOCAL_STORAGE_PREFIX = 'cardSet_'




export default defineStore('cardSets', {
  state: () => ({
    cardSets: {} as Record<string, CardSetData>
  }),
  getters: {
    
  },
  actions: {
    getCardSetsNames() {
      const cardSetsNamesRaw = localStorage.getItem(CARD_SETS_NAMES_LIST_LOCAL_STORAGE_KEY)
      return cardSetsNamesRaw ? JSON.parse(cardSetsNamesRaw) as string[] : []
    },
    updateCardSetsNames(cardSetsNames: string[]) {
      const stringifiedCardSetsNames = JSON.stringify(cardSetsNames)
      localStorage.setItem(CARD_SETS_NAMES_LIST_LOCAL_STORAGE_KEY, stringifiedCardSetsNames)
    },
    getCardSetLocalStorageKey(cardSetName: string) {
      return CARD_SET_LOCAL_STORAGE_PREFIX + cardSetName
    },
    loadCardSetsFromLocalStorage() {
      const cardSetsNames: string[] = this.getCardSetsNames()

      for (const cardSetName of cardSetsNames) {
        const cardSetLocalStorageKey = this.getCardSetLocalStorageKey(cardSetName)
        const cardSetRawData = localStorage.getItem(cardSetLocalStorageKey) as string
        const cardSetData = JSON.parse(cardSetRawData) as Record<string, string>

        this.cardSets[cardSetName] = cardSetData
      }
    },
    createCardSet(cardSetName: string, cards: CardSetData) {
      this.cardSets[cardSetName] = cards
      const cardSetsNames = this.getCardSetsNames()
      cardSetsNames.push(cardSetName)
      this.updateCardSetsNames(cardSetsNames)

      const cardSetLocalStorageKey = this.getCardSetLocalStorageKey(cardSetName)
      localStorage.setItem(cardSetLocalStorageKey, JSON.stringify(cards))
    },
  },
  onRegister() {
    this.loadCardSetsFromLocalStorage()
  }
})