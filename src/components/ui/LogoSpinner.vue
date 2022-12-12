<template>
    <svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 143.95"><g data-name="Layer 2"><g data-name="Layer 1"><ellipse class="cls-1" cx="72" cy="71.98" rx="72" ry="71.98"/><path class="cls-2" d="M50.77,85a18.86,18.86,0,0,1,0-26h0A18.74,18.74,0,1,0,23.7,59h0a18.86,18.86,0,0,1,0,26h0a18.74,18.74,0,1,0,27.07,0Z"/><path class="cls-2" d="M120.3,85a18.86,18.86,0,0,1,0-26h0a18.74,18.74,0,1,0-27.07,0h0a18.86,18.86,0,0,1,0,26h0a18.74,18.74,0,1,0,27.07,0Z"/><circle class="cls-2" cx="71.58" cy="71.98" r="18.73"/><circle class="cls-1" cx="71.36" cy="72.49" r="8.74"/><circle class="cls-1" cx="36.84" cy="97.56" r="8.74"/><circle class="cls-1" cx="106.84" cy="45.56" r="8.74"/></g></g></svg>
</template>
<style scoped>
.cls-1{fill:red;}
.cls-2{fill:#fff;}

.spinner {
    animation: 3s rotate cubic-bezier(0.68, -0.6, 0.32, 1.6) alternate infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

</style>