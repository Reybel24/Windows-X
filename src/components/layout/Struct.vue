<template>
  <div
    class="struct"
    @click="onClick"
    @mousedown="select"
    :class="{ selected : this.isSelected }"
    v-on-clickaway="away"
  >
    <img :src="this.iconSrc" />
    <div class="name">{{ struct.name }}</div>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';
import { mixin as clickaway } from 'vue-clickaway';

// Drag n drop
// import Draggable from '@/util/Draggable';

export default {
  name: 'Struct',
  mixins: [clickaway],
  components: {},
  props: {
    struct: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      clicks: 0,
      isSelected: false
    };
  },
  methods: {
    onClick() {
      // Custom double-click implementation bc draggable interferes with dblclick directive
      this.clicks++;

      if (this.clicks >= 2) {
        this.clicks = 0;
        this.open();
      } else {
        // do nothing
      }

      let _this = this;
      setTimeout(function() {
        _this.clicks = 0;
      }, 300);
    },
    open() {
      if (this.struct.type == 'folder') {
        this.$emit('nav-to', this.fullPath);
      } else {
        if ('real_path' in this.struct) {
          // Open file
          EventBus.$emit('OPEN_FILE', this.struct);
        }
      }
    },
    select() {
      this.isSelected = true;
    },
    away() {
      this.isSelected = false;
    }
  },
  computed: {
    iconSrc: function() {
      if (this.struct.type == 'folder') {
        return `${require('@/assets/icons/icon_folder.png')}`;
      } else {
        // Get appropriate icon depending on ext
        switch (this.struct.ext) {
          case 'txt':
            return `${require('@/assets/icons/icon_notepad.png')}`;
          case 'png':
          case 'jpg':
            return `${require('@/assets/icons/icon_picture.png')}`;
        }
      }
    },
    fullPath: function() {
      return this.struct.path + '/' + this.struct.name;
    }
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.struct {
  color: rgb(49, 49, 49);
  width: 100px;
  max-height: 150px;
  padding: 5px 5px 5px 5px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  flex-direction: column;
  overflow: hidden;
  margin: 5px;

  &:hover {
    background-color: rgb(229, 243, 255);
  }

  &:hover:active {
    // background-color: rgb(190, 225, 255);
    @include anim-scale(.98)
  }

  &.selected {
    // background-color: rgb(204, 232, 255);
    // border: 1px solid rgb (153, 209, 255);
  }

  .name {
    margin-top: 6px;
  }

  .label {
    color: white;
    margin-top: 8px;
    font-size: 0.9em;
  }

  img {
    width: auto;
    height: 70px;
    margin-top: 9px;
  }
}
</style>
