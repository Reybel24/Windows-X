<template>
  <div class="app-email" ref="draggableContainer">
    <AppBorder @drag-window="dragMouseDown" />
  </div>
</template>

<script>
/* eslint-disable */
import Draggable from './Draggable'
import AppBorder from '@/components/common/AppBorder.vue'

export default {
  name: 'Email',
  mixins: [Draggable],
  components: {
    AppBorder,
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
    // dragMouseDown: SharedBehaviors.dragMouseDown
  },
  mounted () {
    // do nothing
  },
}
</script>

<style scoped lang='scss'>
.app-email {
  position: absolute;
  width: 50%;
  height: 60%;
  background-color: rgb(49, 49, 49);
  opacity: .98;
  padding: 0 0px 0 0px;
  margin-top: 230px;
  margin-left: 100px;
  box-shadow: 0px 9px 21px -4px rgba(0,0,0,0.12);
  border-radius: 3px;
  overflow: hidden;
}
</style>
