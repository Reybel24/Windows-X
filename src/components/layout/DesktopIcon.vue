<template>
  <div
    class="app"
    ref="winapp"
    :class="{ active: isActive }"
    :style="posStyle"
    @click="onClick"
    @mousedown="dragMouseDown"
  >
    <img :src="this.iconSrc" />
    <div class="label">{{ app.name }}</div>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';

// Drag n drop
import Draggable from '@/util/Draggable';

export default {
  name: 'DesktopIcon',
  mixins: [Draggable],
  components: {},
  props: {
    app: {
      type: Object,
      default: () => {},
      required: false
    },
    shortcutDetails: {
      type: Object,
      default: () => {},
      required: false
    },
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
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      clicks: 0,
      pos: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    onClick() {
      // Custom double-click implementation bc draggable interferes with dblclick directive
      this.clicks++;

      if (this.clicks >= 2) {
        this.clicks = 0;
        EventBus.$emit('LAUNCH_APP', this.app);
      } else {
        // do nothing
      }

      let _this = this;
      setTimeout(function() {
        _this.clicks = 0;
      }, 300);
    },
    setInitialPosition() {
      this.pos.x = this.shortcutDetails.pos.x;
      this.pos.y = this.shortcutDetails.pos.y;
    }
  },
  computed: {
    iconSrc: function() {
      return `${require('@/assets/icons/' + this.icon + '.png')}`;
    },
    posStyle: function() {
      return {
        marginLeft: this.pos.x + 'px',
        marginTop: this.pos.y + 'px'
      };
    }
  },
  mounted() {
    this.setInitialPosition();
  }
};
</script>

<style scoped lang='scss'>
.app {
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  padding: 0 0 8px 0;
  margin-top: 100px;
  margin-left: 300px;
  position: absolute;
  cursor: default;
  z-index: 1;

  &:hover {
    background-color: rgb(99, 99, 99, 0.6) !important;
    border-radius: 6px;
  }

  &.active {
    background-color: rgb(87, 87, 87);
  }

  &:hover:active {
    // background-color: rgb(190, 225, 255);
    @include anim-scale(.98)
  }

  .label {
    color: white;
    margin-top: 8px;
    font-size: 0.9em;
  }

  img {
    width: auto;
    height: 57%;
    margin-top: 9px;
  }
}
</style>
