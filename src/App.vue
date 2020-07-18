<template>
  <div id="app">
    <Lockscreen />
    <Desktop />
  </div>
</template>

<script>
import Lockscreen from '@/views/Lockscreen.vue';
import Desktop from '@/views/Desktop.vue'

export default {
  name: 'app',
  components: {
    Lockscreen,
    Desktop
  },
  methods: {
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
div {
  display: flex;
}
#app {
  text-align: center;
  color: #2c3e50;
  ;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
