<template>
  <div class="terminal-border" @mousedown="dragWindow">
    <div class="actions">
      <div @click="$emit('click-close')"><i class="fas fa-circle" :class="'icon exit'"></i></div>
      <div @click="$emit('click-minimize')"><i class="fas fa-circle" :class="'icon minimize'"></i></div>
      <div @click="$emit('click-maximize')"><i class="fas fa-circle" :class="'icon maximize'"></i></div>
    </div>

    <div class="title text-terminal text-black">
      <font-awesome-icon :icon="['fas', 'folder-open']" class="icon" />
      {{ this.title }}
    </div>

    <!-- Fix to allow text to be perfectly centered -->
    <div class="actions hide">
      <font-awesome-icon :icon="['fas', 'circle']" class="icon exit" />
      <font-awesome-icon :icon="['fas', 'circle']" class="icon minimize" />
      <font-awesome-icon :icon="['fas', 'circle']" class="icon maximize" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBorder',
  props: {
    title: {
      type: String,
      default: 'Unnamed',
      required: false
    }
  },
  data () {
    return {
      isPressing: false
    }
  },
  methods: {
    dragWindow ($event) {
      this.$emit('drag-window', $event)
    }
  }
}
</script>

<style scoped lang="scss">
.terminal-border {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 30px;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: space-between;
  cursor: default;

  .actions {
    padding-left: 10px;

    &.hide {
      opacity: 0 !important;
    }
  }

  .icon {
    color: #585858;
    font-size: 16px;
    padding: 0px 7px 0px 0px;
    cursor: pointer;

    &.exit {
      color: #ee5e58;
    }
    &.maximize {
      color: #58ee65;
    }
    &.minimize {
      color: #eec958;
    }
  }

  .title {
    font-size: 16px;

    .icon {
      color: rgb(124, 124, 124);
      padding-right: 7px;
    }
  }
}
</style>
