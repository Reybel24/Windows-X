<template>
  <div class="taskbar">
    <div class="windows-logo">
      <img src="@/assets/icons/windows-10-logo.png" />
    </div>

    <!-- Apps -->
    <div class="apps-group">
      <TaskbarApp v-for="(app, index) in this.$store.getters.getAppsInTaskbar" :key="index" :app="app" :icon="app.icon" :isOpen="app.isOpen" />
    </div>
  </div>
</template>

<script>
import TaskbarApp from '@/components/TaskbarApp.vue'

export default {
  name: 'Taskbar',
  components: {
    TaskbarApp
  },
  methods: {
    clickApp () {
      console.log('hmmmm')
      // this.$emit('click-app', app, $event)
    }
  }
}
</script>

<style scoped lang='scss'>
.taskbar {
  width: 100%;
  height: 43px;
  margin-top: auto;
  background-color: rgb(37, 37, 37);
  opacity: .94;
  align-items: center;
  padding: 0 8px 0 0px;
  z-index: 10;

  .windows-logo {
    width: 27px;
    height: 100%;
    align-items: center;
    padding: 0 9px 0 9px;

    &:hover {
      background-color: rgb(99, 99, 99);
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
