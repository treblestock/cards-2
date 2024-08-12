import { defineStore } from "pinia"


function isToday(date: Date) {
  const today = new Date()

  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
}


const TOTAL_REPEATED_LOCAL_STORAGE_KEY = 'totalRepeated'
const TODAY_REPEATED_LOCAL_STORAGE_KEY = 'todayRepeated'
const LAST_APP_LAUNCH_DATE_LOCAL_STORAGE_KEY = 'lastAppLaunchDate'


export default defineStore('stats', {
  state: () => ({
    repeatedToday: 0,
    repeatedTotal: 0,
  }),
  getters: {
    
  },
  actions: {
    loadStatsFromLocalStorage() {
      const repeatedTotalFromStorageRaw = localStorage.getItem(TOTAL_REPEATED_LOCAL_STORAGE_KEY)
      this.repeatedTotal = repeatedTotalFromStorageRaw ? JSON.parse(repeatedTotalFromStorageRaw) : 0
  
  
      const lastAppLaunchDateRaw = localStorage.getItem(LAST_APP_LAUNCH_DATE_LOCAL_STORAGE_KEY)
  
      if (!lastAppLaunchDateRaw || !isToday(new Date(lastAppLaunchDateRaw) ) ) {
        localStorage.setItem(TODAY_REPEATED_LOCAL_STORAGE_KEY, JSON.stringify(0) )
      }
  
  
      const repeatedTodayFromStorageRaw = localStorage.getItem(TOTAL_REPEATED_LOCAL_STORAGE_KEY)
      this.repeatedToday = repeatedTodayFromStorageRaw ? JSON.parse(repeatedTodayFromStorageRaw) : 0
    },
    saveStats() {
      localStorage.setItem(TOTAL_REPEATED_LOCAL_STORAGE_KEY, JSON.stringify(this.repeatedTotal))
      localStorage.setItem(TODAY_REPEATED_LOCAL_STORAGE_KEY, JSON.stringify(this.repeatedToday))
    },

    incrementCorrectAnswerStats() {
      this.repeatedToday++
      this.repeatedTotal++
      this.saveStats()
    }
  },
  onRegister() {
    this.loadStatsFromLocalStorage()
  },
})

