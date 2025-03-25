<template>
  <div class="wave-container">
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
      <defs>
        <path id="wave" d="M-160 44c30 0 58-10 88-10s 58 10 88 10 58-10 88-10 58 10 88 10 v44h-352z" />
      </defs>
      <g class="parallax">
        <use href="#wave" x="48" y="1" class="wave1" />
        <use href="#wave" x="48" y="2" class="wave2" />
        <use href="#wave" x="48" y="3" class="wave3" />
        <use href="#wave" x="48" y="4" class="wave4" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.wave-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  margin-bottom: -7px;
  min-height: 100vh;
}

.parallax > use {
  animation: move-forever 35s cubic-bezier(.55,.5,.45,.5) infinite;
  fill: var(--p-primary-200);
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 10s;
  opacity: 0.04;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 15s;
  opacity: 0.03;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 20s;
  opacity: 0.02;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 25s;
  opacity: 0.01;
}

@keyframes move-forever {
  0% { transform: translate3d(-45px,0,0); }
  100% { transform: translate3d(45px,0,0); }
}

.dark .parallax > use {
  fill: var(--p-primary-800);
}
</style>
