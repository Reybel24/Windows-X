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

// For requests to api
const axios = require('axios');

// Util
import { randomNumberBetween } from '@/util/common.js';

export default {
  name: 'Bing',
  mixins: [WebCore],
  components: {},
  data() {
    return {
      apiURL:
        'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
      apiImg: null, // https://bing.com/th?id=OHR.EarthriseSequence_EN-US0444696608_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp
      imagesDir: '@/appdata/Web/Bing/images/',
      backgroundImg: null,
      localImages: [
        'happyballoon',
        'meerkat',
        'moth',
        'aquarium',
        'badlands',
        'cubs',
        'kamchatka',
        'nantucketisland',
        'nelderplot',
        'paris'
      ]
    };
  },
  methods: {
    onClose() {},
    async fetchImageOfTheDay() {
      // This is here temporarily since I cannot fetch from the API (cors error)
      reject();

      return new Promise((resolve, reject) => {
        // Fetch from url
        const options = {
          url: this.apiURL,
          methods: 'GET',
          headers: { 'content-type': 'application/json' }
        };

        axios(options)
          .then(response => {
            // console.log(response);
            this.apiImg = 'http://bing.com' + response.images[0].url;
            resolve(true);
          })
          .catch(error => {
            // console.log(error);
            reject();
          });
      });
    },
    setRandomWallpaper() {
      const randIndex = randomNumberBetween(0, this.localImages.length - 1);
      this.backgroundImg = this.localImages[randIndex];
    }
  },
  async mounted() {
    // Focus search box after page load
    let _this = this;
    setTimeout(function() {
      _this.$refs.searchBox.focus();
    }, 100);

    this.fetchImageOfTheDay().catch(error => {
      // Api error, fetch local
      this.setRandomWallpaper();
    });
  },
  computed: {
    wallpaper: function() {
      if (this.apiImg != null) {
        // Api
        // The quotes are there to avoid throwing a warning in the console (the-request-of-a-dependency-is-an-expression)
        return `url(${require('' + this.apiImg)})`;
      } else if (this.backgroundImg != null) {
        // Local
        return `url(${require('@/appdata/Web/Bing/images/' +
          this.backgroundImg +
          '.jpg')})`;
      }
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
