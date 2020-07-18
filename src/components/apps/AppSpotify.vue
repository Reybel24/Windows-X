<template>
  <WinApp>
    <div class="header">
      Listen to some great tunes
    </div>
  </WinApp>
</template>

<script>
// App functionality
import WinApp from '@/components/apps/WinApp'

export default {
  name: 'Email',
  components: {
    WinApp
  },
  props: {
    app: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
}
</script>

<style scoped lang='scss'>
.win-app {
  .header {

  }
}
</style>
