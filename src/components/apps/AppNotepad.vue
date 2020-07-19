<template>
  <WinApp
    :style="coreStyle"
    @close="onClose"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="file-content">
      <textarea :value="fileText" />
    </div>
  </WinApp>
</template>

<script>
// App functionality
import WinApp from '@/components/apps/WinApp';
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
    onClose() {}
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

  .file-content {
    width: 100%;
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
