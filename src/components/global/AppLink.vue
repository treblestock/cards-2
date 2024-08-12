<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink} from 'vue-router'

import { modifyRouteTo, type WithParamsAny } from '~/router/utils'

const props  = defineProps<WithParamsAny>() // vue-macros required for import types


const isExternalLink = computed(() => 
  typeof props.to === 'string' && props.to.startsWith('http')
) 


</script>

<template>
  <a class="link" target="_blank"
    v-if="isExternalLink" 
    :href="typeof to === 'string' ? to : undefined"
    :="$attrs" 
  >
    <slot />
  </a>
  <RouterLink class="link"
    v-else
    :="$attrs"
    :to="modifyRouteTo(to || {})"
    v-slot="slotProps"
  >
    <slot class="link__inner"
      v-bind="slotProps"
    />
  </RouterLink>
</template>

<style scoped>

.link {
  &__inner {
    user-select: none;
  }
}


</style>