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
    }
  },
  data() {
    return {
      winPos: {
        x: 200,
        y: 400,
      },
      winSize: {
        width: 1100,
        height: 640
      }
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
      console.log("minimizing")
      this.winSize.width = 800;
      this.winSize.height = 500; // taskbar height
      this.winPos.x = 400;
      this.winPos.y = 300;
    }
  },
  computed: {
    coreStyle: function() {
      return {
        width: this.winSize.width + 'px',
        height: this.winSize.height + 'px',
        marginTop: this.winPos.x + 'px',
        marginLeft: this.winPos.y + 'px',
      };
    }
  }
};
</script>