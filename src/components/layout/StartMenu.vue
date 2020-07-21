<template>
  <div
    class="start-menu"
    :class="[ { 'anim-open' : isOpen }, { 'anim-close' : !isOpen } ]"
    v-on-clickaway="closeMenu"
  >
    <section class="actions-group">
      <div class="action">
        <i class="fas fa-power-off icon"></i>
      </div>
      <div class="action">
        <i class="fas fa-lock icon"></i>
      </div>
      <div class="action">
        <i class="fas fa-sliders-h icon"></i>
      </div>
    </section>
    <section class="tiles" id="tiles">
      <StartMenuTile
        v-for="(tile, index) in this.tiles"
        :key="index"
        :tile="tile"
        :isOpen="isOpen"
      />
    </section>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';
import { mixin as clickaway } from 'vue-clickaway';

// Layout
import StartMenuTile from '@/components/layout/StartMenuTile.vue';

import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'TaskbarApp',
  mixins: [clickaway],
  components: {
    StartMenuTile,
    PerfectScrollbar
  },
  props: {},
  data() {
    return {
      isOpen: false,
      tiles: [
        { name: 'Weather', icon: 'fas fa-cloud-showers-heavy' },
        { name: 'Mail', icon: 'fas fa-envelope-open' },
        { name: 'Photos', icon: 'fas fa-image' },
        { name: 'Music', icon: 'fas fa-music' },
        { name: 'Movies & TV', icon: 'fas fa-film' },
        { name: 'Firefox', icon: 'fab fa-firefox-browser' }
      ],
      ps: null
    };
  },
  methods: {
    openMenu() {
      if (this.isOpen) return;
      let _this = this;
      setTimeout(function() {
        _this.isOpen = true;
      }, 100);
    },
    closeMenu() {
      if (this.isOpen) {
        console.log('closing');
        this.isOpen = false;
        this.ps.scrollTop = 0;
      }
    }
  },
  computed: {
    iconSrc: function() {
      return `${require('@/assets/icons/' + this.icon + '.png')}`;
    }
  },
  mounted() {
    // Subscribe to open menu event
    EventBus.$on('OPEN_START_MENU', () => {
      this.openMenu();
    });
    EventBus.$on('CLOSE_START_MENU', () => {
      this.closeMenu();
    });

    this.ps = new PerfectScrollbar('#tiles', {
      wheelSpeed: 0.5,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  },
  destroyed() {
    // Stop listening
    EventBus.$off('OPEN_START_MENU');
    EventBus.$off('CLOSE_START_MENU');
  }
};
</script>

<style scoped lang='scss'>
.start-menu {
  width: 600px;
  height: 400px;
  background-color: rgb(21, 33, 47);
  flex-direction: row;
  user-select: none;
  position: absolute;
  bottom: 45px;
  opacity: 0;
  box-shadow: 0px 9px 21px -4px rgba(0, 0, 0, 0.12);
  z-index: 10;
  visibility: hidden;

  .actions-group {
    width: 110px;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;

    .action {
      width: 100%;
      font-size: 1.1em;
      color: white;
      align-items: center;
      justify-content: center;
      padding: 14px 0 14px 0;
      transition: .15s;

      &:hover {
        background-color: rgb(108, 107, 107);
      }

      &:hover:active {
        background-color: rgb(134, 134, 134);
        
        .icon {
          transform: scale(0.97, 0.97);
        }
      }
    }
  }

  .tiles {
    padding: 18px 10px 0 0;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
    align-content: flex-start;
  }
}

// Animations
.anim-open {
  animation: fadeAnimIn 0.26s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes fadeAnimIn {
  from {
    opacity: 0;
    bottom: 0px;
  }
  to {
    opacity: 1;
    bottom: 40px;
    visibility: visible;
  }
}
</style>
