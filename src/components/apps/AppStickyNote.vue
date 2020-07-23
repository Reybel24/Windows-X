<template>
  <WinApp
    :title="(this.title != null) ? this.title : 'Untitled'"
    :style="coreStyle"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="wrapper">
      <div class="file-content">
        <textarea :value="content" />
      </div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

export default {
  name: 'StickyNote',
  mixins: [WinAppCore],
  components: {
    WinApp
  },
  data() {
    return {
      title: null,
      content: null
    };
  },
  methods: {},
  mounted() {
    // Set initial window position
    // this.setInitialPos(400, 180);

    // Set text
    if (this.payload != null) {
      this.title = this.payload.title;
      this.content = this.payload.content;
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 400px !important;
  height: 240px !important;
  right: 1%;
  bottom: 6%;

  .wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
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
      padding: 6px 7px 7px 9px;
      line-height: 24px;
      font-family: $segoe;
    }
  }
}
</style>
