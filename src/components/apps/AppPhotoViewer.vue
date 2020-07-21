<template>
  <WinApp
    :style="coreStyle"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
    :title="fullImgName"
  >
    <div class="wrapper">
      <div class="action-bar">
        <div class="item">File</div>
        <div class="item">Edit</div>
        <div class="item">Format</div>
        <div class="item">View</div>
        <div class="item">Help</div>
      </div>
      <div class="media" v-if="this.mediaPath != null" :style="{ backgroundImage: img }"></div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

export default {
  name: 'PhotoViewer',
  mixins: [WinAppCore],
  components: {
    WinApp
  },
  data() {
    return {
      mediaPath: null
    };
  },
  methods: {
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(400, 180);

    // Open media
    if (this.payload != null) {
      try {
        // Attempt to open
        var fileMeta = this.payload.file;
        var fileName = fileMeta.name + '.' + fileMeta.ext;
        this.mediaPath = fileMeta.real_path;
        // var file = require('@/appdata/Windows/files/' + fileName);
        // this.fileText = file.default;
      } catch (error) {
        console.log('error opening file');
        console.log(error);
      }
    }
  },
  computed: {
    img: function() {
      if (this.mediaPath != null) {
        try {
          var pathNodes = this.payload.file.real_path.split('/');
          return `url(${require('@/appdata/Windows/files/' +
            pathNodes[pathNodes.length - 1])})`;
        } catch (error) {
          console.log(
            'Something went wrong loading image file (does it exist?)'
          );
          console.log(error);
        }
      }
    },
    fullImgName: function() {
      return this.payload.file.name + '.' + this.payload.file.ext
    }
  }
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 700px !important;
  height: 540px !important;

  .wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .action-bar {
    flex-direction: row;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid rgb(226, 226, 226);
    user-select: none;

    .item {
      font-size: 0.79em;
      color: rgb(59, 59, 59);
      padding: 4px 6px 4px 6px;
      cursor: default;

      &:hover {
        background-color: $aqua-blue;
      }
    }
  }

  .media {
    width: 100%;
    flex: 1;
    background-color: white;
    pointer-events: none;
    user-select: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    img {
      width: auto;
      height: 100%;
    }
  }
}
</style>
