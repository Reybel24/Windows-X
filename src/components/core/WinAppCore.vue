<script>
// Common functionality for windows apps
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
    return {
      winPos: {
        x: 200,
        y: 400
      },
      winSize: {
        width: 1400,
        height: 740
      },
      isMinimized: false
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
    },
    maximizeApp() {
      this.winSize.width = window.innerWidth;
      this.winSize.height = window.innerWidth - 43; // taskbar height
      this.winPos.x = 0;
      this.winPos.y = 0;
    },
    minimizeApp() {
      this.winSize.width = 800;
      this.winSize.height = 500; // taskbar height
      this.winPos.x = 400;
      this.winPos.y = 300;
      // this.isMinimized = true;
    },
    setInitialPos(x, y) {
      this.winPos.x = x;
      this.winPos.y = y;
    }
  },
  computed: {
    coreStyle: function() {
      return {
        width: this.winSize.width + 'px',
        height: this.winSize.height + 'px',
        marginTop: this.winPos.y + 'px',
        marginLeft: this.winPos.x + 'px',
        opacity: this.isMinimized ? 0 : 1
      };
    }
  }
};
</script>