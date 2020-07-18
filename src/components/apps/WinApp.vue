<template>
  <div class="win-app" ref="winapp">
    <!-- Border -->
    <AppBorder @drag-window="dragMouseDown" @click-close="closeApp" />

    <!-- Custom app content -->
    <div class="content">
      <slot>
        Custom app content
      </slot>
    </div>
  </div>
</template>

<script>
// Basic app UI
import AppBorder from '@/components/common/AppBorderWindows.vue'

// Functionality
import Draggable from '@/util/Draggable'

export default {
  name: 'WinApp',
  mixins: [Draggable],
  components: {
    AppBorder
  },
  data () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    };
  },
  methods: {
    closeApp() {
      this.$emit('close')
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
</script>
