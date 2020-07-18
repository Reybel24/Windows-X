<template>
  <div
    class="lockscreen"
    :style="lockStyle"
    :class="{ fadeOut : passwordMatched }"
    @click="showSignIn"
  >
    <div class="lockImg" :style="lockImgStyle">
      <div class="dateTime" v-if="!showingSignIn">
        <div class="clock">12:23</div>
        <div class="date">Saturday, July 18</div>
      </div>
    </div>
    <div class="sign-in" :class="{ fadeIn: showingSignIn }">
      <div class="avatar" :style="{ backgroundImage: avatar }"></div>
      <div class="name">Tony Stark</div>
      <input type="password" ref="pass" placeholder="Password" @input="checkPassword($event.target.value)" />
      <div class="hint">Try 'spider'</div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: 'Lockscreen',
  components: {},
  data() {
    return {
      showingSignIn: false,
      password: 'spider',
      passwordMatched: false
    };
  },
  methods: {
    unlock() {
      store.dispatch({
        type: 'unlockPC'
      });
    },
    showSignIn() {
      this.showingSignIn = true;

      // Focus password box
      this.$refs.pass.focus();
    },
    checkPassword(input) {
      if (input == this.password) {
        // Success
        this.passwordMatched = true;

        // Allow animation to play
        let _this = this;
        setTimeout(function() {
          _this.unlock();
        }, 1000);
      }
    }
  },
  computed: {
    lockScreenWallpaper: function() {
      return `url(${require('@/assets/wallpapers/earth.jpg')})`;
    },
    avatar: function() {
      return `url(${require('@/assets/avatars/spiderman.jpg')})`;
    },
    lockStyle: function() {
      return {
        // backgroundImage: this.lockScreenWallpaper,
        display: this.$store.getters.getIsLocked ? '' : 'none'
      };
    },
    lockImgStyle: function() {
      return {
        backgroundImage: this.lockScreenWallpaper,
        filter: this.showingSignIn ? 'blur(12px)' : 0
      };
    }
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.lockscreen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  background-color: rgb(59, 59, 59);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;

  .lockImg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    transition: 2s;

    .dateTime {
      margin-top: auto;
      flex-direction: column;
      padding: 0 0 60px 60px;
      user-select: none;

      .clock {
        font-size: 4em;
        color: white;
      }

      .date {
        font-size: 2em;
        color: white;
      }
    }
  }

  .sign-in {
    flex-direction: column;
    margin: 0 auto;
    z-index: 200;
    align-items: center;
    justify-content: center;
    margin-bottom: 220px;
    opacity: 0;

    .avatar {
      width: 150px;
      height: 150px;
      background-color: grey;
      border-radius: 50px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    .name {
      color: white;
      font-size: 2em;
      margin-top: 30px;
      margin-bottom: 30px;
    }

    .hint {
      color: white;
      font-size: .8;
      margin-top: 16px;
    }

    input {
      width: 300px;
      height: 30px;
      border: none;
      padding: 0 0 0 7px;
    }
  }
}

.fadeIn {
  animation: fadeAnimIn 1s ease-in forwards;
}
@keyframes fadeAnimIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeOut {
  animation: fadeAnimOut .7s ease-in forwards;
}
@keyframes fadeAnimOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
