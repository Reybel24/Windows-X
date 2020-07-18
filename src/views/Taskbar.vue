<template>
  <div class="taskbar">
    <div class="windows-logo">
      <img src="@/assets/icons/windows-10-logo.png" />
    </div>

    <!-- Apps -->
    <div class="apps-group">
      <TaskbarApp icon="icon_firefox" isOpen />
      <TaskbarApp icon="icon_file-explorer" />
      <TaskbarApp icon="icon_spotify" />
      <TaskbarApp icon="icon_steam" isOpen />
      <TaskbarApp icon="icon_word" isOpen isActive />
      <TaskbarApp icon="icon_outlook" />
    </div>
  </div>
</template>

<script>
import TaskbarApp from '@/components/TaskbarApp.vue'

export default {
  name: 'Taskbar',
  components: {
    TaskbarApp
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
  // filter: blur(10px);

  .windows-logo {
    width: auto;
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
