
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaulLayout from '~/layouts/default.vue'

import { propsParser } from './utils/index.ts'


const BASE_URL = import.meta.env.BASE_URL || '/'

const routes = [
  {
    path: BASE_URL,
    props: propsParser,
    component: DefaulLayout,
    redirect: 'cardSetsList',
    children: [
      {
        path: 'cardSetsList',
        name: 'cardSetsList',
        props: propsParser,
        component: () => import('~/pages/CardSetsList.vue'),
        children: [
          
        ],
      },
      {
        path: 'newCardSetForm',
        name: 'newCardSetForm',
        props: propsParser,
        component: () => import('~/pages/NewCardSetForm.vue'),
        children: [
          
        ],
      },
      {
        path: 'repetition/:cardSetName',
        name: 'repetition',
        props: propsParser,
        component: () => import('~/pages/CardsRepetition.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]

const router = createRouter({
  routes,
  history: createWebHistory(),
})



export default router