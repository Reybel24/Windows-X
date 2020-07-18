<template>
  <div class="desktop" :style="{ backgroundImage: desktopWallpaper }">
    <div ref="apps"></div>
    <Taskbar />
  </div>
</template>

<script>
import Vue from 'vue'
import { EventBus } from '@/util/event-bus.js'
import Taskbar from '@/views/Taskbar.vue'

// Apps
import Email from '@/components/apps/AppEmail.vue'
import Spotify from '@/components/apps/AppSpotify.vue'

export default {
  name: 'Desktop',
  components: {
    Taskbar,
    Email,
    Spotify
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    desktopWallpaper: function () {
      return `url(${require('@/assets/wallpapers/diamond.jpg')})`
    }
  },
  mounted () {
    // Subscribe to relevant events
    EventBus.$on('OPEN_APP', (app) => {
      // Create instance
      console.log(app.name)
      var _comp = this.$options.__proto__.components[app.name]

      // Check that a matching component was found
      if (_comp == undefined) {
        console.log("component not found")
        return;
      }

      var ComponentClass = Vue.extend(_comp)
      var instance = new ComponentClass({
        propsData: { app: app }
      })
      instance.$mount() // pass nothing
      this.$refs.apps.appendChild(instance.$el)
    })
  },
  destroyed () {
    // Stop listening.
    EventBus.$off('OPEN_APP')
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
