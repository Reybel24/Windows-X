<template>
  <div class="desktop" :style="{ backgroundImage: desktopWallpaper }">
    <Email />
    <Taskbar />
  </div>
</template>

<script>
import Taskbar from '@/views/Taskbar.vue'

// Apps
import Email from '@/components/apps/Email.vue'

export default {
  name: 'Desktop',
  components: {
    Taskbar,
    Email
  },
  computed: {
    desktopWallpaper: function () {
      return `url(${require('@/assets/wallpapers/earth.jpg')})`
    }
  }
}
</script>

<style scoped lang='scss'>
.desktop {
  width: 100vw;
  height: 100vh;
  background-color: rgb(59, 59, 59);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
