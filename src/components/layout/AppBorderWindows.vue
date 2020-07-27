<template>
  <div class="border" @mousedown="dragWindow" :class="themeStyle">
    <div class="app-icon" v-if="this.icon != null">
      <img :src="getAppIcon" />
    </div>
    <div
      class="title"
      v-if="this.title != null"
      :style="{ color: (theme == 'dark') ? 'rgb(197, 197, 197)' : 'rgb(54, 54, 54)' }"
    >{{ this.title }}</div>
    <div class="actions-group">
      <div class="action minimize" @click="$emit('click-minimize')">
        <i class="fas fa-minus" :class="'icon'"></i>
      </div>
      <div class="action maximize" @click="$emit('click-maximize')">
        <i class="fas fa-square" :class="'icon'"></i>
      </div>
      <div class="action exit" @click="$emit('click-close')">
        <i class="fas fa-times" :class="'icon'"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBorder',
  props: {
    icon: {
      type: String,
      default: null,
      required: false
    },
    title: {
      type: String,
      default: 'Unnamed',
      required: false
    },
    theme: {
      type: String,
      default: 'light',
      required: false
    }
  },
  data() {
    return {
      isPressing: false
    };
  },
  methods: {
    dragWindow($event) {
      this.$emit('drag-window', $event);
    }
  },
  computed: {
    themeStyle: function() {
      if (this.theme == 'dark') {
        return 'theme-dark';
      } else {
        return 'theme-light';
      }
    },
    getAppIcon() {
      return require('@/assets/icons/' + this.icon + '.png');
    }
  }
};
</script>

<style scoped lang="scss">
.border {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 30px;
  background-color: #cccccc;
  align-items: center;
  cursor: default;
  justify-content: space-evenly;
  user-select: none;

  .actions-group {
    width: 126px;
    height: 100%;
    margin-left: auto;

    &.hide {
      opacity: 0 !important;
    }

    .action {
      height: 100%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #797979;
      transition: 0.1s;
      flex-grow: 1;

      &:hover {
        background-color: grey;
      }

      &.exit {
        &:hover {
          color: white;
          background-color: #ee5e58;
        }
      }
      &.maximize {
        .icon {
          color: transparent;
          font-size: 8px;
          border: 2px solid #797979;
        }
        &:hover {
          color: white;
          background-color: #a8a8a8;
        }
      }
      &.minimize {
        &:hover {
          color: white;
          background-color: #a8a8a8;
        }
      }

      .icon {
        font-size: 16px;
        padding: 0px 0px 0px 0px;
      }
    }
  }

  .app-icon {
    margin-left: 10px;
    margin-right: 8px;

    img {
      // width: 100%;
      height: 16px;
    }
  }
  .title {
    font-size: 0.9em;
    padding: 0 0 0 0;
    margin-top: -2px;
    color: $dark-grey;

    .icon {
      color: rgb(124, 124, 124);
      padding-right: 7px;
    }
  }

  // Themes
  &.theme-dark {
    background-color: $dark !important;
  }
}
</style>
