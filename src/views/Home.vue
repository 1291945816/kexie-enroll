<template>
  <div id="bg"></div>
</template>

<script>
import Vanta from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'
export default {
  mounted() {
    Vanta({
      el: '#bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: '#80deea',
      backgroundColor: '#092940',
      THREE,
    })
  },
}
</script>

<style scoped>
#bg {
  height: calc(100vh - 181px);
}
</style>