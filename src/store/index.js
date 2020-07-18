import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apps: [
      { name: 'Firefox', component: 'FireFox', icon: 'icon_firefox', installed: 1, pinned: 1, isOpen: true },
      { name: 'File Explorer', compontent: 'FileExplorer', icon: 'icon_file-explorer', installed: 1, pinned: 1, isOpen: false },
      { name: 'Spotify', compontent: 'FileExplorer', icon: 'icon_spotify', installed: 1, pinned: 1, isOpen: true },
      { name: 'Steam', compontent: 'Steam', icon: 'icon_steam', installed: 1, pinned: 1, isOpen: false },
      { name: 'Microsoft Word', compontent: 'MicrosoftWord', icon: 'icon_word', installed: 1, pinned: 1, isOpen: false },
      { name: 'Email', compontent: 'Outlook', icon: 'icon_outlook', installed: 1, pinned: 1, isOpen: false }
    ],
    // These apps are pinned to the taskbar
    apps_taskbar: [
      'Firefox',
      'File Explorer',
      'Spotify',
      'Steam',
      'Email',
      'Microsoft Word'
    ]
  },
  getters: {
    getAppsInTaskbar: state => {
      // Return all apps pinned to taskbar
      var _taskbar = []
      for (const taskbarApp of state.apps_taskbar) {
        // Get app details
        for (const app of state.apps) {
          if (taskbarApp === app.name) {
            _taskbar.push(app)
          }
        }
      }
      return _taskbar
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  computed: {
  }
})
