<template>
  <div class="desktop" :style="{ backgroundImage: desktopWallpaper }">
    <div class="icons" ref="icons">
      <DesktopIcon
        v-for="(app, index) in $store.getters.getDesktopShortcuts()"
        :key="index"
        :app="app"
        :shortcutDetails="$store.getters.getDesktopShortcuts(app)"
        :icon="app.icon"
      />
    </div>
    <div ref="apps"></div>
    <Taskbar />
  </div>
</template>

<script>
import Vue from 'vue';
import { EventBus } from '@/util/event-bus.js';
import Taskbar from '@/views/Taskbar.vue';

// Desktop icons
import DesktopIcon from '@/components/DesktopIcon.vue';

// Apps
import Email from '@/components/apps/AppEmail.vue';
import Spotify from '@/components/apps/AppSpotify.vue';
import Terminal from '@/components/apps/AppTerminal.vue';

import store from '@/store';

export default {
  name: 'Desktop',
  components: {
    Taskbar,
    DesktopIcon,
    Email,
    Spotify,
    Terminal
  },
  data() {
    return {
      wallpaper: '@/assets/wallpapers/naruto.jpg'
    };
  },
  methods: {
    async launchApp(app) {
      // Create instance
      // console.log(app.name)
      var _comp = this.$options.__proto__.components[app.name];

      // Check that a matching component was found
      if (_comp == undefined) {
        console.log('App not installed (' + app.name + ')');
        return;
      }

      if (!app.stackable && this.$store.getters.getProcessCount(app.name) >= 1)
        return;

      // Add to processes
      var _procId = await this.$store.dispatch({
        type: 'createProccess',
        app: app
      });

      var ComponentClass = Vue.extend(_comp);
      var instance = new ComponentClass({
        propsData: { app: app, procId: _procId }
      });
      instance.$mount(); // pass nothing
      this.$refs.apps.appendChild(instance.$el);
    },
    lockPC() {
      console.log('locking');
      store.dispatch({
        type: 'lockPC'
      });
    }
  },
  computed: {
    desktopWallpaper: function() {
      return `url(${require('@/assets/wallpapers/diamond.jpg')})`;
    }
  },
  mounted() {
    // Subscribe to relevant events
    EventBus.$on('OPEN_APP', app => {
      this.launchApp(app);
    });
  },
  destroyed() {
    // Stop listening.
    EventBus.$off('OPEN_APP');
  }
};
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

  .icons {
    position: absolute;
  }
}
</style>
