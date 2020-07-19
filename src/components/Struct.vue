<template>
  <div class="struct" @click="onClick">
    <img :src="this.iconSrc" />
    <div class="name">{{ struct.name }}</div>
  </div>
</template>

<script>
// import { EventBus } from '@/util/event-bus.js';

// Drag n drop
// import Draggable from '@/util/Draggable';

export default {
  name: 'Struct',
  // mixins: [Draggable],
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
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      clicks: 0
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
        // Try opening file
        console.log('opening file');
        if ('real_path' in this.struct) {
          // Get file
          try {
            var fileName = this.struct.name + '.' + this.struct.ext;
            var file = require('@/appdata/Windows/files/' + fileName);
            var fileContent = file.default
            console.log(fileContent);
          } catch (error) {
            console.log('error opening file');
            console.log(error);
          }
        }
      }
    }
  },
  computed: {
    iconSrc: function() {
      if (this.struct.type == 'folder') {
        return `${require('@/assets/icons/icon_folder.png')}`;
      } else {
        return `${require('@/assets/icons/icon_picture.png')}`;
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
  height: 115px;
  padding: 5px 5px 5px 5px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  flex-direction: column;

  &:hover {
    background-color: rgb(229, 243, 255);
  }

  &:hover:active {
    background-color: rgb(190, 225, 255);
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
    height: 57%;
    margin-top: 9px;
  }
}
</style>
