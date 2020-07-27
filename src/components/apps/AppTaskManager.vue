<template>
  <WinApp
    :title="'Task Manager'"
    :icon="app.icon"
    :style="coreStyle"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="wrapper">
      <section class="action-bar">
        <div class="item">File</div>
        <div class="item">Edit</div>
        <div class="item">Format</div>
        <div class="item">View</div>
        <div class="item">Help</div>
      </section>
      <section class="processes">
        <div
          class="process"
          v-for="(process, index) in runningProcesses"
          :key="index"
          @click="onClickProcess(process)"
          :class="{ selected: process == selected }"
        >
          <div class="icon">
            <img :src="getProcessIcon(process)" />
          </div>
          <div class="name">{{ process.name }}</div>
        </div>
      </section>
      <section class="bottom">
        <div
          class="btn-end-task"
          :class="{ active: selected != null }"
          @click="onPressEndTask(selected)"
        >End Task</div>
      </section>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

import store from '@/store';

export default {
  name: 'TaskManager',
  mixins: [WinAppCore],
  components: {
    WinApp
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    getProcessIcon(process) {
      return `${require('@/assets/icons/' + process.icon + '.png')}`;
    },
    onClickProcess(process) {
      this.selected = process;
    },
    onPressEndTask(process) {
      if (this.selected == null) return;
      // Force close app
      process.instance.exitApp();
      this.selected = null;
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(400, 180);
  },
  computed: {
    runningProcesses: function() {
      return store.getters.getRunningProcesses();
    }
  }
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 400px !important;
  height: 340px !important;
  background-color: white;

  .wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .action-bar {
    flex-direction: row;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid rgb(226, 226, 226);
    user-select: none;

    .item {
      font-size: 0.79em;
      color: rgb(59, 59, 59);
      padding: 4px 6px 4px 6px;
      cursor: default;

      &:hover {
        background-color: $aqua-blue;
      }
    }
  }

  .processes {
    flex-direction: column;
    font-size: 1em;
    color: rgb(51, 51, 51);
    overflow-y: scroll;
    flex-grow: 1;
    justify-content: flex-start;

    .process {
      font-size: 0.9em;
      padding: 7px 5px 7px 15px;
      cursor: default;
      align-items: center;
      user-select: none;

      &:hover {
        background-color: rgb(229, 243, 255);
      }

      .icon {
        img {
          height: 24px;
          margin-right: 11px;
        }
      }

      &.selected {
        background-color: rgb(205, 232, 255);
      }
    }
  }

  .bottom {
    width: 100%;
    height: 60px;
    border-top: 1px solid rgb(180, 180, 180);
    align-items: center;

    .btn-end-task {
      height: 18px;
      padding: 6px 10px 6px 10px;
      border-radius: 3px;
      align-items: center;
      justify-content: center;
      background-color: rgb(204, 204, 204);
      border: 1px solid rgb(191, 191, 191);
      color: rgb(153, 133, 164);
      margin-left: auto;
      margin-right: 15px;
      cursor: default;
      user-select: none;
      transition: 0.1s;

      &.active {
        color: rgb(43, 43, 43);
        background-color: rgb(225, 225, 225);
        border: 1px solid rgb(173, 173, 173);
      }
    }
  }
}
</style>
