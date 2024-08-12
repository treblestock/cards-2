<script setup lang="ts">
const props = defineProps<{
  upside: string
  downside: string
}>()


</script>

<template>
  <div class="card">
    <div class="upside">{{ upside }}</div>
    <div class="downside">{{ downside }}</div>
  </div>  
</template>

<style scoped>
@import "~css/consts";

.card {
  --card-color: $color-gray;
  width: 90%;
  overflow: hidden;

  background: #fff;
  border: 1px solid var(--card-color);
  border-radius: 15px;


  color: $color-primary;

  &._active .upside {
    min-height: 50%;
  }
}

.upside, .downside {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 1.8rem;
}

.upside {
  min-height: 100%;

  transition: all .2s linear;

  position: relative;
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 100%;
    left: 5%;
    width: 90%;
    height: 1px;
    background: var(--card-color);
  }
}

.downside {
  max-height: 50%;
}



</style>