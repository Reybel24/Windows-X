import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { randomNumberBetween } from "@/util/common.js";

export default new Vuex.Store({
  state: {
    apps: [],
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
    taskbarShortcuts: [
      { appId: 'b0', pos: 0 },
      { appId: 'b2', pos: 0 },
      { appId: 'b3', pos: 0 },
      { appId: 'a5', pos: 0 },
      { appId: 'b4', pos: 0 },
      { appId: 'a6', pos: 0 },
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
      return null
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
    },
    addToApps(state, appMeta) {
      state.apps.push(appMeta)
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
    },
    hookApp({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('addToApps', payload.appMeta)
        resolve(0)
      });
    }
  },
  modules: {
  },
  computed: {
  }
})
