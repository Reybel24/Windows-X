<template>
  <div
    class="win-app anim-fade-in"
    ref="winapp"
    @mousedown="focusApp"
    :class="[ {'focused': focused }, { 'anim-fade-out' : isDestroyed } ]"
    v-on-clickaway="away"
  >
    <!-- Border -->
    <AppBorder
      @drag-window="dragMouseDown"
      @click-close="closeApp"
      @click-maximize="$emit('click-maximize')"
      @click-minimize="$emit('click-minimize')"
      :title="(this.title != null) ? this.title : ''"
      :theme="this.theme"
    />

    <!-- Custom app content -->
    <div class="content">
      <slot>Custom app content</slot>
    </div>
  </div>
</template>

<script>
// Basic app UI
import AppBorder from '@/components/layout/AppBorderWindows.vue';

// Functionality
import Draggable from '@/util/Draggable';
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'WinApp',
  mixins: [Draggable, clickaway],
  components: {
    AppBorder
  },
  props: {
    title: {
      type: String,
      default: null,
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
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      focused: true,
      isDestroyed: false
    };
  },
  methods: {
    closeApp() {
      // Allow exit animation to play
      this.isDestroyed = true;
      let _this = this;
      setTimeout(function() {
        _this.$emit('close');
        _this.$destroy();
        _this.$el.parentNode.removeChild(_this.$el);
      }, 100);
    },
    focusApp() {
      this.focused = true;
    },
    away: function() {
      if (this.focused) {
        this.focused = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.win-app {
}
.focused {
  z-index: 5 !important;
}

// Animations
.anim-fade-in {
  animation: fadeAnimIn 0.1s ease-out forwards;
}
@keyframes fadeAnimIn {
  from {
    opacity: 0.5;
    transform: scale(0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.anim-fade-out {
  animation: fadeAnimOut 0.1s ease-out forwards;
}
@keyframes fadeAnimOut {
  from {
    opacity: 1;
    transform: scale(1, 1);
  }
  to {
    opacity: 0.5;
    transform: scale(0.97, 0.97);
  }
}
</style>
