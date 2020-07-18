<template>
  <div class="win-app email" ref="winapp">
    <!-- Border -->
    <AppBorder @drag-window="dragMouseDown" @click-close="closeApp" />

    <!-- Custom app content -->
    <div class="content">
      listen to great music
    </div>
  </div>
</template>

<script>
/* eslint-disable */

// App functionality
import WinApp from '@/util/WinApp'
import Draggable from '@/util/Draggable'

// App ui
import AppBorder from '@/components/common/AppBorderWindows.vue'

export default {
  name: 'Spotify',
  mixins: [WinApp, Draggable],
  components: {
    AppBorder,
  },
  props: {
    app: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  methods: {
  },
  mounted () {
    // do nothing
  },
}
</script>

<style scoped lang='scss'>
.content {
}
</style>
