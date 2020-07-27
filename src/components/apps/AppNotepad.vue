<template>
  <WinApp
    :title="'Untitled - Notepad'"
    :icon="app.icon"
    :style="coreStyle"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="wrapper">
      <div class="action-bar">
        <div class="item">File</div>
        <div class="item">Edit</div>
        <div class="item">Format</div>
        <div class="item">View</div>
        <div class="item">Help</div>
      </div>
      <div class="file-content">
        <textarea :value="fileText" />
      </div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

export default {
  name: 'Notepad',
  mixins: [WinAppCore],
  components: {
    WinApp
  },
  data() {
    return {
      fileText: 'this is some sample text'
    };
  },
  methods: {
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(400, 180);

    // Set text
    if (this.payload != null) {
      try {
        // Attempt to open its
        var fileMeta = this.payload.file;
        var fileName = fileMeta.name + '.' + fileMeta.ext;
        var file = require('@/appdata/Windows/files/' + fileName);
        this.fileText = file.default;
      } catch (error) {
        console.log('error opening file');
        console.log(error);
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 400px !important;
  height: 340px !important;

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

    .item {
      font-size: .79em;
      color: rgb(59, 59, 59);
      padding: 4px 6px 4px 6px;
      cursor: default;

      &:hover {
        background-color: $aqua-blue;
      }
    }
  }

  .file-content {
    width: 100%;
    flex: 1;
    background-color: white;

    textarea {
      width: 100%;
      height: 100%;
      border-style: none;
      outline: none;
      border-color: Transparent;
      overflow: auto;
      vertical-align: top;
      padding: 6px 0 0 9px;
    }
  }
}
</style>
