<template>
  <div
    class="lockscreen show"
    :style="lockStyle"
    :class="{ hidden : !$store.getters.getIsLocked() }"
    @click="showSignIn"
  >
    <div class="lockImg" :style="lockImgStyle">
      <div class="dateTime" v-if="!showingSignIn">
        <div class="clock">{{ time }}</div>
        <div class="date">{{ date }}</div>
      </div>
    </div>
    <div class="dimmer" :style="{ opacity: (showingSignIn) ? .65 : 0 }"></div>
    <div class="sign-in" :class="{ fadeIn: showingSignIn }">
      <div class="avatar" :style="{ backgroundImage: avatar }"></div>
      <div class="name">Peter Parker</div>
      <input
        type="password"
        ref="pass"
        placeholder="Password"
        v-model="input"
        @input="checkPassword($event.target.value)"
      />
      <div class="hint">
        Psstt...Try
        <div class="secret" @click="fillPassword">'spider'</div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/util/event-bus.js';
import store from '@/store';

// Time data
var moment = require('moment');

export default {
  name: 'Lockscreen',
  components: {},
  data() {
    return {
      showingSignIn: false,
      password: 'spider',
      input: '',
      passwordMatched: false,
      time: '',
      date: ''
    };
  },
  methods: {
    showLockscreen() {
      this.input = '';
      this.showingSignIn = false;
    },
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
        this.unlock();
      }
    },
    fillPassword() {
      this.input = this.password;
      this.checkPassword(this.input);
    },
    setTime() {
      this.time = moment().format('h:mm');
    },
    setDate() {
      this.date = moment().format('dddd, MMMM D');
    }
  },
  computed: {
    lockScreenWallpaper: function() {
      return `url(${require('@/assets/wallpapers/sandwaves.jpg')})`;
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
        filter: this.showingSignIn ? 'blur(12px)' : 'blur(0px)',
        transform: this.showingSignIn ? 'scale(1.1)' : 'scale(1)'
      };
    }
  },
  mounted() {
    // Set time
    this.setTime();
    this.setDate();

    // Time update
    setInterval(() => {
      this.setTime();
    }, 1000);
    setInterval(() => {
      this.setDate();
    }, 1000);

    // Subscriptions
    EventBus.$on('LOCK_PC', () => {
      store.dispatch({ type: 'lockPC' });
      this.showLockscreen();
    });
  },
  destroyed() {
    // Stop listening
    EventBus.$off('LOCK_PC');
  }
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
  opacity: 1;
  visibility: visible;
  transition-property: opacity, visibility;
  transition-delay: 200ms, 0ms;
  transition-duration: 700ms, 0ms;

  &.hidden {
    opacity: 0;
    visibility: hidden;

    .lockImg,
    .dimmer {
      // Transition-out time
      transition: 0.5s;
    }
  }

  .lockImg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    transition: 2s;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;

    .dateTime {
      margin-top: auto;
      flex-direction: column;
      padding: 0 0 60px 60px;
      user-select: none;
      font-size: 1.4em;

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
      font-size: 0.8;
      margin-top: 16px;

      .secret {
        padding-left: 6px;
        cursor: pointer;
      }
    }

    input {
      width: 300px;
      height: 30px;
      border: none;
      padding: 0 0 0 7px;
    }
  }
}

.dimmer {
  background-color: rgb(26, 26, 26);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition-duration: 1.5s;
}

// Animations
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
  animation: fadeAnimOut 0.7s ease-in forwards;
}
@keyframes fadeAnimOut {
  from {
    opacity: 1;
  }
  to {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
