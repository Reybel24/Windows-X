<template>
  <div class="site">
    <section class="banner" :style="{ backgroundImage: bannerBg }">
      <img :src="logo" />
    </section>
    <section class="nav">
      <div class="links">
        <div class="link">Accounts</div>
        <div class="link">Investments</div>
        <div class="link">Pay & Transfer</div>
      </div>
    </section>
    <div class="inner">
      <section class="main">
        <div class="card">
          <div class="header">Bank acounts</div>
          <div class="account">
            <div class="name">TRACE CHECKING (...0492)</div>
            <div class="balance">$-5.13</div>
            <div class="label">Available balance</div>
          </div>
          <div class="account">
            <div class="name">TRACE SAVINGS (...0492)</div>
            <div class="balance">$7.19</div>
            <div class="label">Available balance</div>
          </div>
        </div>
      </section>
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
    onExit() {}
  },
  mounted() {},
  computed: {
    logo: function() {
      return require('@/appdata/Web/Trace/images/logo.png');
    },
    bannerBg: function() {
      return `url(${require('@/appdata/Web/Trace/images/city.jpg')})`;
    }
  }
};
</script>

<style scoped lang='scss'>
.site {
  flex-grow: 1;
  background-color: rgb(247, 246, 243);
  color: white;
  flex-direction: column;

  .banner {
    width: 100%;
    height: 90px;
    background-color: rgb(10, 107, 204);
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    img {
      height: 40px;
    }
  }

  .nav {
    background-color: rgb(0, 93, 185);
    font-size: 0.9em;
    width: 100%;
    height: 50px;

    .links {
      width: 70%;
      margin: 0 auto;
      color: white;
      font-size: .9em;

      .link {
        margin-right: 20px;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 0 10px 0 10px;
        cursor: pointer;
        font-weight: $font-semibold;

        &:hover {
          background-color: white;
          color: $dark-grey;
        }
      }
    }
  }

  .inner {
    width: 70%;
    margin: 0 auto;

    .main {
      width: 80%;
      flex-direction: column;
      margin-top: 29px;

      .card {
        width: 100%;

        background-color: white;
        border-radius: 6px;
        border: 1px solid rgb(235, 235, 235);
        border-bottom-width: 3px;
        color: $grey;
        flex-direction: column;

        .header {
          font-size: 1.1;
          padding: 12px 6px 12px 17px;
          border-bottom: 1px solid rgb(226, 226, 226);
        }

        .account {
          width: 100%;
          border-top: 1px solid rgb(235, 235, 235);
          flex-direction: column;
          padding: 15px 10px 28px 18px;
          font-size: 1em;

          .name {
            font-size: 1.05em;
            color: rgb(28, 152, 253);
          }

          .balance {
            font-size: 1.45em;
            color: rgb(56, 56, 56);
            margin-top: 10px;
          }

          .label {
            font-size: 0.8em;
            color: rgb(97, 97, 97);
            margin-top: 10px;
            text-decoration-line: underline;
            text-decoration-style: dotted;
          }
        }
      }
    }
  }
}
</style>
