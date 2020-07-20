<template>
  <div class="site" :style="{ backgroundImage: wallpaper }">
    <div class="search">
      <img :src="logo" />
      <input type="text" value ref="searchBox" />
      <i class="fas fa-search" :class="'icon'"></i>
    </div>
  </div>
</template>

<script>
// Required
import WebCore from '@/views/web/core/WebCore';

export default {
  name: 'Bing',
  mixins: [WebCore],
  components: {},
  data() {
    return {};
  },
  methods: {
    onClose() {}
  },
  mounted() {
    // Focus search box after page load
    let _this = this;
    setTimeout(function() {
      _this.$refs.searchBox.focus();
    }, 100);
  },
  computed: {
    wallpaper: function() {
      return `url(${require('@/appdata/Web/Bing/images/moth.jpg')})`;
    },
    logo: function() {
      return require('@/appdata/Web/Bing/images/logo_light.png');
    }
  }
};
</script>

<style scoped lang='scss'>
.site {
  flex-grow: 1;
  color: $grey;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .search {
    width: 40%;
    height: 50px;
    margin-top: 15%;
    margin-left: 12%;
    justify-content: center;
    align-items: center;

    img {
      height: 40px;
    }

    input {
      width: 95%;
      height: 100%;
      border-radius: 10px;
      margin-left: 16px;
      padding: 0 0 0 14px;
      font-size: 1em;
      color: rgb(48, 48, 48);
    }

    .icon {
      font-size: 1.2em;
      color: rgb(0, 125, 170);
      margin-left: -40px;
    }
  }
}
</style>
