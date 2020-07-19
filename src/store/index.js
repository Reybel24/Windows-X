import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { randomNumberBetween } from "@/util/common.js";

export default new Vuex.Store({
  state: {
    apps: [
      { appId: 'a0', name: 'Recycle Bin', component: 'Recycle', icon: 'icon_recycle-bin', installed: 1, pinned: 0, isOpen: false, stackable: true },
      { appId: 'b0', name: 'Firefox', component: 'FireFox', icon: 'icon_firefox', installed: 1, pinned: 1, isOpen: true, stackable: true },
      { appId: 'a1', name: 'File Explorer', component: 'FileExplorer', icon: 'icon_file-explorer', installed: 1, pinned: 1, isOpen: false, stackable: true },
      { appId: 'b2', name: 'Spotify', component: 'Spotify', icon: 'icon_spotify', installed: 1, pinned: 1, isOpen: true, stackable: false },
      { appId: 'b3', name: 'Steam', component: 'Steam', icon: 'icon_steam', installed: 1, pinned: 1, isOpen: false, stackable: false },
      { appId: 'b4', name: 'Microsoft Word', component: 'MicrosoftWord', icon: 'icon_word', installed: 1, pinned: 1, isOpen: false, stackable: true },
      { appId: 'a5', name: 'Email', component: 'Outlook', icon: 'icon_outlook', installed: 1, pinned: 1, isOpen: false, stackable: false },
      { appId: 'a6', name: 'Terminal', component: 'Terminal', icon: 'icon_terminal', installed: 1, pinned: 1, isOpen: false, stackable: true },
      { appId: 'g1', name: 'Wizard101', component: 'Wizard101', icon: 'icon_wizard101', installed: 1, pinned: 0, isOpen: false, stackable: false },
      { appId: 'a7', name: 'Notepad', component: 'Notepad', icon: 'icon_notepad', installed: 1, pinned: 0, isOpen: false, stackable: true }
    ],
    desktopShortcuts: [
      { appId: 'a0', pos: { x: 10, y: 15 } },
      { appId: 'b0', pos: { x: 90, y: 15 } },
      { appId: 'b2', pos: { x: 170, y: 15 } },
      { appId: 'b3', pos: { x: 250, y: 15 } },
      { appId: 'b4', pos: { x: 10, y: 120 } },
      { appId: 'a5', pos: { x: 90, y: 120 } },
      { appId: 'g1', pos: { x: 170, y: 120 } },
      { appId: 'a7', pos: { x: 250, y: 120 } },
    ],
    processes: [
    ],
    locked: false,

    // These apps are pinned to the taskbar
    taskbarShortcuts: [
      'Firefox',
      'File Explorer',
      'Spotify',
      'Steam',
      'Email',
      'Microsoft Word',
      'Terminal'
    ]
  },
  getters: {
    getAppsInTaskbar: state => {
      // Return all apps pinned to taskbar
      var _taskbar = []
      for (const taskbarApp of state.taskbarShortcuts) {
        // Get app details
        for (const app of state.apps) {
          if (taskbarApp === app.name) {
            _taskbar.push(app)
          }
        }
      }
      return _taskbar
    },
    getProcessCount: state => (name = null) => {
      if (name != null) {
        // Specific process
        var _count = 0
        for (var proccess of state.processes) {
          if (name == proccess.name) {
            _count++
          }
        }
        return _count
      } else {
        // Count all
        return state.processes.length
      }
    },
    getIsLocked: state => {
      return state.locked
    },
    getDesktopShortcuts: state => (app = null) => {
      if (app == null) {
        // Return all apps that have desktop shortcuts
        var _shortcuts = []
        for (const shortcut of state.desktopShortcuts) {
          // Get app details
          for (const app of state.apps) {
            if (shortcut.appId === app.appId) {
              _shortcuts.push(app)
            }
          }
        }
        return _shortcuts
      } else {
        // Single shortcut details (given an app)
        // Get app shortcut details
        for (const shortcut of state.desktopShortcuts) {
          if (app.appId == shortcut.appId) {
            return shortcut;
          }
        }
      }

    },
    getAppByName: state => (name) => {
      for (var app of state.apps) {
        if (app.name == name) {
          return app
        }
      }
      return -1
    }
  },
  mutations: {
    addProcess(state, payload) {
      state.processes.push({ pid: payload.procId, name: payload.app })
    },
    removeProcess(state, processId) {
      for (var process of state.processes) {
        if (processId == process.pid) {
          // Get its index
          const _index = state.processes.indexOf(process)

          // Remove it
          state.processes.splice(_index, 1)
        }
      }
      return -1;
    }
  },
  actions: {
    createProccess({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        // Generate random process id
        const _randomId = randomNumberBetween(0, 10000);

        commit('addProcess', { app: payload.app.name, procId: _randomId })

        // Return the process id
        resolve(_randomId)
      });
    },
    destroyProccess({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('removeProcess', payload.processId)
        resolve(0)
      });
    },
    unlockPC({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        state.locked = false
        resolve(0)
      });
    },
    lockPC({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        state.locked = true
        resolve(0)
      });
    }
  },
  modules: {
  },
  computed: {
  }
})
