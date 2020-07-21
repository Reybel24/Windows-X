<template>
  <div class="taskbar">
    <div class="windows-logo" @click="openStartMenu()">
      <i class="fab fa-windows icon"></i>
    </div>

    <!-- Apps -->
    <div class="apps-group">
      <TaskbarApp
        v-for="(app, index) in this.$store.getters.getAppsInTaskbar"
        :key="index"
        :app="app"
        :icon="app.icon"
        :isOpen="app.isOpen"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';
import store from '@/store';

// Layout
import TaskbarApp from '@/components/layout/TaskbarApp.vue';

export default {
  name: 'Taskbar',
  components: {
    TaskbarApp
  },
  methods: {
    openStartMenu() {
      EventBus.$emit('OPEN_START_MENU');
    }
  }
};
</script>

<style scoped lang='scss'>
.taskbar {
  width: 100%;
  height: 43px;
  margin-top: auto;
  background-color: rgb(37, 37, 37);
  opacity: 0.94;
  align-items: center;
  padding: 0 8px 0 0px;
  z-index: 10;

  .windows-logo {
    width: 27px;
    height: 100%;
    align-items: center;
    padding: 0 9px 0 12px;
    color: white;
    font-size: 1.4em;
    transition: .1s;

    &:hover {
      background-color: rgb(59, 55, 50);
      color: rgb(135, 131, 128);
    }

    &:hover:active {
      background-color: rgb(47, 42, 38);
      color: rgb(93, 90, 88);

      .icon {
        transform: scale(0.92, 0.92);
      }
    }

    img {
      width: 100%;
      height: 60%;
    }
  }

  .apps-group {
    height: 100%;
    margin-left: 10px;

    .app {
      margin: 0 5px 0 5px;
    }
  }
}
</style>
