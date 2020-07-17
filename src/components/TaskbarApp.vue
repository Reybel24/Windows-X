<template>
  <div class="app" :class="{ active: isActive }" @click="onClick">
    <img :src="this.iconSrc" />
    <div class="active-indicator" :class="{ visible: isOpen }"></div>
  </div>
</template>

<script>
export default {
  name: 'TaskbarApp',
  components: {},
  props: {
    icon: {
      type: String,
      default: 'windows-10-logo',
      required: false
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: false
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    onClick () {
      this.isOpen = !this.isOpen
      if (!this.isOpen) this.isActive = false
    }
  },
  computed: {
    iconSrc: function () {
      return `${require('@/assets/icons/' + this.icon + '.png')}`
    }
  }
}
</script>

<style scoped lang='scss'>
.app {
  width: auto;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  // padding: 0 14px 0 14px;

  &:hover {
    background-color: rgb(99, 99, 99) !important;
  }

  &.active {
    background-color: rgb(87, 87, 87);
  }

  &:hover:active {
    background-color: red;
  }

  img {
    width: auto;
    height: 57%;
    margin-top: 9px;
  }

  .active-indicator {
    width: 52px;
    height: 2px;
    background-color: white;
    margin-top: auto;
    opacity: 0;

    &.visible {
      opacity: 1;
    }
  }
}
</style>
