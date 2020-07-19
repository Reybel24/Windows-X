<template>
  <WinApp>
    <div class="header">
      You have no new emails.
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

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
