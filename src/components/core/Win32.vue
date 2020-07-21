<script>
// Backbone of "Windows X"
import Vue from 'vue';
import { EventBus } from '@/util/event-bus.js';
import store from '@/store';

export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    async launchApp(app, payload = null) {
      // Create instance
      var _comp = this.$options.__proto__.components[app.component];

      // Check that a matching component was found
      if (_comp == undefined) {
        console.log('App not installed (' + app.component + ')');
        return;
      }

      if (!app.stackable && this.$store.getters.getProcessCount(app.name) >= 1)
        return;

      // Add to processes
      var _procId = await this.$store.dispatch({
        type: 'createProccess',
        app: app
      });

      var ComponentClass = Vue.extend(_comp);
      var instance = new ComponentClass({
        propsData: { app: app, procId: _procId, payload: payload }
      });
      instance.$mount(); // pass nothing
      this.$refs.apps.appendChild(instance.$el);

      this.addAppToTaskbar();
    },
    lockPC() {
      store.dispatch({
        type: 'lockPC'
      });
    },
    openFile(file) {
      // Open app depending on type
      var app = this.getAppForFileExt(file.ext);
      if (app != null) {
        EventBus.$emit('LAUNCH_APP', app, { file: file });
      } else {
        console.log('unsupported file type: ' + file.ext);
      }
    },
    addAppToTaskbar() {
      // console.log('adding to taskbar');
    },
    getRunningProcessById(procId) {
      // Search through refs.apps for an id
      // Wincore should have a 'getProcId' method
      // Returns matched procId winapp component instance
    },
    countRunningProcesses(appId = null) {
      // If no appId given, return number of all running processes
      // If appId given, return number of all processes of that app running
    }
  },
  computed: {},
  mounted() {
    // Subscribe to relevant events
    EventBus.$on('LAUNCH_APP', (app, payload = null) => {
      this.launchApp(app, payload);
    });

    EventBus.$on('OPEN_FILE', file => {
      this.openFile(file);
    });
  },
  destroyed() {
    // Stop listening.
    EventBus.$off('LAUNCH_APP');
    EventBus.$off('OPEN_FILE');
  }
};
</script>