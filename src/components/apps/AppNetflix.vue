<template>
  <WinApp
    :title="'Notflix'"
    :style="coreStyle"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="wrapper">
      <section class="hero">
        <div class="details">
          <div class="logo">
            <img src="@/appdata/Netflix/metadata/daredevil_logo.png" />
          </div>
          <div class="general">
            <div class="rating">
              <RatingStars :rating="3" :color="'rgb(184, 1, 24)'" :size="1" />
            </div>
            <div class="year">2016</div>
            <div class="seasons">2 Seasons</div>
            <div class="quality">
              ULTRA
              <span class="bold space">HD 4K</span>
            </div>
            <div class="quality">
              <span class="bold">5.1</span>
            </div>
          </div>

          <div
            class="synopsis"
          >Blinded as a young boy, Matt Murdock fights injustice by day as a lawyer and by night as the Super Hero Daredevil in Hell's Kitchen, New York City.</div>

          <div class="cast">Charlie Cox, Deborah Ann Wolf, Elden Henson</div>
          <div class="tags">TV Shows, Crime TV Shows</div>
        </div>
        <div class="img-container">
          <div class="filter-fade-left"></div>
          <div class="filter-fade-bottom"></div>
          <img src="@/appdata/Netflix/metadata/daredevil_background.jpg" />
        </div>
      </section>

      <section class="catalogue">
        <div class="row" v-for="(row, index) in rows" :key="index">
          <div class="header">{{ row.title }}</div>
          <div class="items-group" v-dragscroll.x="true">
            <div class="item" v-for="(item, index) in row.content" :key="index">
              <div class="filter-fade-bottom-item"></div>
              <div class="background" :style="{ backgroundImage: getBackground(item.background) }"></div>
              <div class="details">
                <img :src="getLogo(item.logo)" class="logo" />
                <div class="title">{{ item.title }}</div>
              </div>
              <div class="play" @click="playTrailer(item)">
                <i class="fas fa-play-circle icon"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

// Drag to scroll
import { dragscroll } from 'vue-dragscroll';

// Rating
import RatingStars from '@/components/common/RatingStars.vue';

// Appdata
import media from '@/appdata/Netflix/content.json';

export default {
  name: 'Netflix',
  mixins: [WinAppCore],
  directives: {
    dragscroll: dragscroll
  },
  components: {
    WinApp,
    RatingStars
  },
  data() {
    return {
      movies: media.movies,
      shows: media.shows,
      watching: media.watching,
      originals: media.originals,
      rows: []
    };
  },
  methods: {
    getBackground(img) {
      return `url(${require('@/appdata/Netflix/metadata/' + img)})`;
    },
    getLogo(logo) {
      return require('@/appdata/Netflix/metadata/' + logo);
    },
    playTrailer(item) {
      console.log('playing trailer for ' + item.title);
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(400, 180);

    // Create rows
    this.rows.push({ title: 'Continue Watching', content: this.watching });
    this.rows.push({ title: 'Movies', content: this.movies });
    this.rows.push({ title: 'Shows', content: this.shows });
    this.rows.push({ title: 'Comedy', content: this.originals });
    this.rows.push({ title: 'Notflix Originals', content: this.originals });
  },
  computed: {
    itemBackground: function() {
      return `url(${require('@/appdata/Netflix/metadata/daredevil_background.jpg')})`;
    }
  }
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 1200px;
  height: 660px;
  background-color: black;

  // To change column direction
  .wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .hero {
    width: 100%;
    height: 400px;
    user-select: none;

    .details {
      flex-direction: column;
      margin-left: 4%;
      margin-top: 40px;
      width: 31%;
      z-index: 10;
      color: #a2a2a2;

      .logo {
        width: 40%;

        img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      }

      .general {
        width: 125%;
        height: 30px;
        // background-color: grey;
        margin-top: 15px;
        border-radius: 6px;
        align-items: center;

        div {
          margin-right: 12px;
        }

        .rating {
          margin-right: 0px !important;
        }

        .quality {
          background-color: rgb(102, 102, 102);
          border-radius: 4px;
          padding: 2px 8px 2px 8px;
          font-size: 0.9em;
          color: rgb(19, 19, 19);

          .space {
            margin-left: 5px;
          }
        }

        .bold {
          font-weight: $font-bold;
        }
      }

      .synopsis {
        width: 110%;
        text-align: left;
        font-size: 1.1em;
        margin-top: 8px;
        line-height: 147%;
      }

      .cast {
        margin-top: 18px;
      }

      .tags {
        margin-top: 2px;
      }
    }

    .img-container {
      margin-left: auto;
      flex-grow: 1;
      height: 100%;
      overflow: hidden;

      img {
        width: auto;
        height: 128%;
        object-fit: contain;
        margin-top: 0;
        margin-left: -100%;
      }
    }
  }

  .catalogue {
    width: 100%;
    padding: 10px 0 10px 0;
    flex-direction: column;

    .row {
      flex-direction: column;
      margin-bottom: 30px;
    }

    .header {
      color: white;
      margin-left: 50px;
      user-select: none;
    }

    .items-group {
      height: 155px;
      // width: 200px;
      flex-direction: row;
      margin-top: 9px;
      z-index: 10;
      overflow-x: scroll;
      overflow-y: hidden;
      align-items: center;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      cursor: pointer;

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        width: 230px;
        height: 83%;
        border-radius: 5px;
        margin: 0 5px 0 5px;
        transition: 2s;
        transition-property: transform, z-index, opacity;
        transition-delay: 0ms, 0ms, 0ms;
        transition-duration: 300ms, 0ms, 500ms;
        flex-shrink: 0;
        user-select: none;
        // flex-direction: column;

        &:hover {
          z-index: 11;
          transform: scale(1.2);

          .play,
          .details > .title {
            opacity: 1;
          }

          .filter-fade-bottom-item {
            opacity: .9;
          }
        }

        .background {
          width: 100%;
          margin-left: -100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          flex-direction: column;
        }

        .details {
          width: 100%;
          overflow: hidden;
          margin-left: -100%;
          flex-direction: column;

          .logo {
            width: 50%;
            height: 36%;
            margin-top: 4%;
            margin-bottom: 5%;
            padding-left: 5%;
          }

          .title {
            color: white;
            font-size: 0.9em;
            margin-left: 7%;
            margin-top: auto;
            margin-bottom: 5%;
            opacity: 0;
            font-weight: $font-bold;
            text-shadow: 0px 1px #1d1d1d;
            transition: 300ms;
            z-index: 10;
          }
        }

        .play {
          font-size: 2.7em;
          color: white;
          text-align: center;
          justify-content: center;
          align-self: center;
          margin-left: 40%;
          opacity: 0;
          transition: 300ms;
          cursor: pointer;
          z-index: 10;
          position: absolute;
        }

        .filter-fade-bottom-item {
          opacity: 0.4;
        }
      }
    }

    .items-group:first-of-type {
      margin-left: 20%;
    }
  }
}

.filter-fade-left {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  z-index: 5;
  background: rgb(255, 171, 0);
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 1) 104%
  );
}

.filter-fade-bottom {
  width: 100%;
  height: 100%;
  margin-left: -100%;
  flex-shrink: 0;
  z-index: 5;
  background: rgb(255, 171, 0);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 1) 99%
  );
}

.filter-fade-bottom-item {
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(255, 171, 0);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(0, 0, 0) 123%
  );
}
</style>
