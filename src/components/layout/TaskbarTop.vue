<template>
  <div class="taskbar">
    
    <div class="time">Monday, 06 July at 06:06 PM</div>
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
  height: 33px;
  background-color: rgb(247, 247, 247);
  opacity: 0.94;
  align-items: center;
  justify-content: center;
  // position: absolute;
  padding: 0 8px 0 0px;
  z-index: 10;
  box-shadow: -4px 7px 6px 0px rgba(0, 0, 0, 0.21);

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
      color: rgb(66, 157, 231);
    }

    &:hover:active {
      background-color: rgb(47, 42, 38);
      color: rgb(0, 120, 215);

      .icon {
        transform: scale(0.92, 0.92);
      }
    }

    img {
      width: 100%;
      height: 60%;
    }
  }

  .time {
    color: rgb(34, 34, 34);
    font-size: .9em;
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
