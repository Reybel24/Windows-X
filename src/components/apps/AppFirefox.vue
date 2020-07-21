<template>
  <WinApp
    :style="coreStyle"
    @close="onClose"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
    :title="'Firefox'"
    :theme="'dark'"
  >
    <div class="main">
      <div class="top">
        <div class="nav">
          <div class="prev" @click="navigateBreadcrumb(dir.BACK)">
            <i class="fas fa-arrow-left icon"></i>
          </div>
          <div class="forward" @click="navigateBreadcrumb(dir.FORWARD)">
            <i class="fas fa-arrow-right icon"></i>
          </div>
          <div class="refresh" @click="refreshSite()">
            <i class="fas fa-redo-alt icon"></i>
          </div>
          <div class="home">
            <i class="fas fa-home icon"></i>
          </div>
        </div>
        <div class="address-bar" ref="addressBar">
          <input
            type="text"
            class="address"
            :value="(currentSite != null) ? currentSite.address : ''"
            @keydown.enter="navigateToAddress($event.target.value)"
            @click="$event.target.select();"
          />
        </div>
      </div>
      <div class="bookmarks-bar">
        <div
          class="bookmark"
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          @click="navigateToAddress(bookmark.address)"
        >{{ bookmark.name }}</div>
      </div>
      <div class="webview">
        <component v-if="currentSite != null" :is="this.currentSite.component" :key="refreshKey" />
      </div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

// Websites
import WebsiteBing from '@/views/web/pages/WebsiteBing';
import WebsiteTrace from '@/views/web/pages/WebsiteTrace';
import WebsiteDino from '@/views/web/pages/WebsiteDino';

export default {
  name: 'Firefox',
  mixins: [WinAppCore],
  components: {
    WinApp,
    WebsiteBing,
    WebsiteTrace,
    WebsiteDino
  },
  data() {
    return {
      sites: [
        { name: 'Bing', component: 'WebsiteBing', address: 'bing.com' },
        { name: 'Trace', component: 'WebsiteTrace', address: 'trace.com' },
        { name: 'Dino', component: 'WebsiteDino', address: 'dino.com' }
      ],
      currentSite: null,
      dir: {
        FORWARD: 'next',
        BACK: 'prev'
      },
      breadcrumb: [],
      breadcrumbIndex: 0,
      bookmarks: [],
      refreshKey: 0
    };
  },
  methods: {
    onClose() {},
    navigateBreadcrumb(dir) {
      if (dir == this.dir.FORWARD) {
        // this.breadcrumbIndex++;
        // this.activeDir = this.breadcrumb[this.breadcrumbIndex];
      } else if (dir == this.dir.BACK) {
        if (this.breadcrumbIndex >= 1) {
          // this.breadcrumbIndex--;
          // this.activeDir = this.breadcrumb[this.breadcrumbIndex];
        }
      }
    },
    navigateToAddress(address) {
      // Navigate to website
      console.log('going to ' + address);

      var _site = this.getSiteByAddress(address);
      if (_site != null) {
        this.currentSite = _site;
        this.currentAddress = address;
      } else {
        // Site not found, nav to dino game
        var dino = this.getSiteByAddress('dino.com');
        this.currentSite = dino;
        this.currentAddress = dino.address;
      }
    },
    loadBookmarks() {
      this.bookmarks.push(this.sites[0]);
      this.bookmarks.push(this.sites[1]);
      this.bookmarks.push(this.sites[2]);
    },
    navigateToHome() {
      this.currentSite = this.sites[0];
    },
    getSiteByAddress(address) {
      // Match address and set new site
      for (var site of this.sites) {
        if (address == site.address) {
          return site;
        }
      }
      return null;
    },
    refreshSite() {
      this.refreshKey++;
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(350, 100);

    // Open home page
    this.navigateToHome();

    // Bookmarks
    this.loadBookmarks();
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 1400px !important;
  height: 790px !important;
  cursor: default;
  user-select: none;

  .main {
    background-color: rgb(255, 255, 255);
    width: 100%;
    flex-direction: column;

    .top {
      height: 40px;
      background-color: rgb(52, 52, 52);
      align-items: center;
      padding: 6px 10px 6px 10px;

      .nav {
        padding: 0 20px 0 0;
        color: white;
        transition: 0.2s;
        font-size: 0.9em;

        div {
          padding: 6px 6px 6px 6px;

          &:hover {
            background-color: rgb(85, 85, 85);
            border-radius: 20px;
          }

          &:hover:active {
            // background-color: rgb(71, 71, 71);
            @include anim-scale(0.9);
          }
        }

        .icon {
          padding: 1px 4px 1px 4px;
        }
      }

      .address-bar {
        width: 70%;
        height: 70%;
        background-color: rgb(78, 78, 78);
        // border: 1px solid rgb(179, 179, 179);
        flex-direction: row;
        align-items: center;
        border-radius: 4px;
        overflow-x: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        transition: 0.3s;

        &::-webkit-scrollbar {
          display: none;
        }

        .address {
          padding: 0 0 0 10px;
          background-color: transparent;
          box-shadow: none;
          border: none;
          outline: none;
          color: white;
          flex-grow: 1;
        }
      }
    }

    .bookmarks-bar {
      width: 100%;
      background-color: rgb(52, 52, 52);
      flex-direction: row;
      padding: 0 10px 7px 10px;

      .bookmark {
        color: white;
        font-size: 0.9em;
        padding: 3px 12px 6px 12px;

        &:hover {
          background-color: rgb(85, 85, 85);
          border-radius: 20px;
        }

        &:hover:active {
          @include anim-scale(0.9);
        }
      }
    }

    .webview {
      // padding: 10px 0 7px 15px;
      flex-direction: row;
      flex-grow: 1;

      .empty {
        flex-grow: 1;
        color: $light-grey;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        flex-direction: column;
        font-weight: $font-bold;

        .icon {
          font-size: 4em;
          color: $light-grey;
          margin-bottom: 20px;
          margin-top: -70px;
        }
      }
    }
  }
}
</style>
