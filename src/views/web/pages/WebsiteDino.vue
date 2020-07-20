<template>
  <div class="site">
    <img src="@/appdata/Web/Dino/dino.png" />
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
    onClose() {}
  },
  mounted() {
    console.log('dino');
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.site {
  flex-grow: 1;
  color: $grey;
  justify-content: center;
  align-items: center;

  img {
    height: 60%;
  }
}
</style>
