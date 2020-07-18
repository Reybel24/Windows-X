<script>
// Common functionality for windows apps
import store from '@/store'
export default {
  props: {
    app: {
      type: Object,
      default: () => {},
      required: false
    },
    procId: {
      type: Number,
      default: -1,
      required: false
    }
  },
  data() {
    return {
      bunny: 'yummy'
    };
  },
  methods: {
    exitApp() {
      // Clean up and destroy
      // Remove process
      store.dispatch({
        type: 'destroyProccess',
        processId: this.procId
      });

      // Destroy self
      this.$destroy();
    }
  }
};
</script>