<template>
  <div
    class="win-app"
    ref="winapp"
    @mousedown="focusApp"
    :class="{ 'focused': focused }"
    v-on-clickaway="away"
  >
    <!-- Border -->
    <AppBorder
      @drag-window="dragMouseDown"
      @click-close="closeApp"
      @click-maximize="$emit('click-maximize')"
      @click-minimize="$emit('click-minimize')"
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
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      focused: true
    };
  },
  methods: {
    closeApp() {
      this.$emit('close');
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
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
.focused {
  z-index: 5 !important;
}
</style>
