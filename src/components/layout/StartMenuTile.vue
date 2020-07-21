<template>
  <div class="tile" :class="[ { 'anim-open' : isOpen } ]" @click="onClickTile">
    <i :class="tile.icon" class="icon"></i>
    <div class="name">{{ tile.name }}</div>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';

export default {
  name: 'TaskbarApp',
  components: {},
  props: {
    tile: {
      type: Object,
      default: () => {},
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    onClickTile() {
      if (this.tile.callback) this.tile.callback();
      EventBus.$emit('CLOSE_START_MENU');
    }
  },
  computed: {
    iconSrc: function() {
      return `${require('@/assets/icons/' + this.icon + '.png')}`;
    },
    tileSize: function() {
      return {
        tall: (this.tile.size = 'tall'),
        wide: (this.tile.size = 'wide'),
        small: (this.tile.size = 'small'),
        small: this.tile.size == null || this.tile.size == undefined
      };
    }
  }
};
</script>

<style scoped lang='scss'>
.tile {
  color: white;
  font-size: 0.9em;
  background-color: rgb(2, 120, 216);
  width: 120px;
  height: 125px;
  border: 2px solid transparent;
  transition: 0.08s;
  font-size: 1em;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2px;

  &:hover {
    border: 2px solid rgb(154, 176, 195);
  }

  &:hover:active {
    border: 2px solid transparent;
    transform: scale(0.97, 0.97);
  }

  .icon {
    font-size: 2.7em;
    margin-top: 31%;
  }

  .name {
    font-size: .85em;
    align-self: flex-start;
    padding: 0 0 5px 9px;
    margin-top: auto;
  }
}

// Animations
.anim-open {
  animation: fadeAnimIn 3s ease-out forwards;
}
@keyframes fadeAnimIn {
  from {
    opacity: 0;
    margin-top: 80px;
  }
  to {
    opacity: 0.3 !important;
    margin-top: 0px;
  }
}

.anim-fade-out {
  animation: fadeAnimOut 0.1s ease-out forwards;
}
</style>
