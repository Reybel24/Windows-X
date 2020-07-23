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
    <StartMenu />
    <Taskbar />
  </div>
</template>

<script>
// Backbone
import Win32 from '@/components/core/Win32.vue';
import WinAppHooks from '@/components/core/WinAppHooks.vue';

// Events
import { EventBus } from '@/util/event-bus.js';

// Layout
import Taskbar from '@/components/layout/Taskbar.vue';
// import TaskbarTop from '@/components/layout/TaskbarTop.vue';
import StartMenu from '@/components/layout/StartMenu.vue';

// Desktop icons
import DesktopIcon from '@/components/layout/DesktopIcon.vue';

import store from '@/store';

export default {
  name: 'Desktop',
  mixins: [Win32, WinAppHooks],
  components: {
    Taskbar,
    // TaskbarTop,
    DesktopIcon,
    StartMenu
  },
  data() {
    return {
      wallpaper: '@/assets/wallpapers/naruto.jpg'
    };
  },
  methods: {},
  computed: {
    desktopWallpaper: function() {
      return `url(${require('@/assets/wallpapers/windows-10.jpg')})`;
    }
  },
  mounted() {
    // Launch on startup
    var app = store.getters.getAppByName('Sticky Note');
    EventBus.$emit('LAUNCH_APP', app, {
      title: 'Greetings',
      content:
        'Welcome and thanks for visiting! Everything you see here, including all of the apps, was painstakingly and meticulously re-created from scratch by me (except for the dinosaur game). The apps are just meant to be toy versions of their real-life counterparts and have very limited, if any, functionality. Feel free to look around and I hope this is as amusing to you as it was for me while creating it! - Reybel C.'
    });
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
  flex-direction: column;

  .icons {
    position: absolute;
  }
}
</style>
