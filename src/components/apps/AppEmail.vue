<template>
  <WinApp>
    <div class="header">
      You have no new emails.
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
    provide () {
      return this
    }
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
