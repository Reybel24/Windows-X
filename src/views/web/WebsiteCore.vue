<script>
// Common functionality for websites
import store from '@/store';
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
    },
    payload: {
      type: Object,
      default: null,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    exitApp() {},
    maximizeApp() {},
    minimizeApp() {},
    setInitialPos(x, y) {}
  },
  computed: {
    coreStyle: function() {
      return {};
    }
  }
};
</script>