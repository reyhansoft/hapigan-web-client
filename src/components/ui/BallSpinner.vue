<template>
  <div :class="`lds-ellipsis-${props.size}`">
    <div :style="`background: ${props.color}`"></div>
    <div :style="`background: ${props.color}`"></div>
    <div :style="`background: ${props.color}`"></div>
    <div :style="`background: ${props.color}`"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: { type: String, required: false, default: 'md'},
  color: { type: String, required: false, default: '#3b82f6'}
})
</script>

<style scoped>
.lds-ellipsis-sm {
  display: inline-block;
  position: relative;
  width: 45px;
  height: 10px;
}
.lds-ellipsis-sm div {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis-sm div:nth-child(1) {
  left: 3px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis-sm div:nth-child(2) {
  left: 3px;
  animation: lds-ellipsis2-sm 0.6s infinite;
}
.lds-ellipsis-sm div:nth-child(3) {
  left: 19px;
  animation: lds-ellipsis2-sm 0.6s infinite;
}
.lds-ellipsis-sm div:nth-child(4) {
  left: 35px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis2-sm {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(16px, 0);
  }
}


.lds-ellipsis-md {
  display: inline-block;
  position: relative;
  width: 70px;
}
.lds-ellipsis-md div {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(59, 130, 246);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis-md div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis-md div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2-md 0.6s infinite;
}
.lds-ellipsis-md div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2-md 0.6s infinite;
}
.lds-ellipsis-md div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2-md {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>