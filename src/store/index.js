import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { randomNumberBetween } from "@/util/common.js";

export default new Vuex.Store({
  state: {
    apps: [
      { name: 'Firefox', component: 'FireFox', icon: 'icon_firefox', installed: 1, pinned: 1, isOpen: true, stackable: true },
      { name: 'File Explorer', compontent: 'FileExplorer', icon: 'icon_file-explorer', installed: 1, pinned: 1, isOpen: false, stackable: true },
      { name: 'Spotify', compontent: 'FileExplorer', icon: 'icon_spotify', installed: 1, pinned: 1, isOpen: true, stackable: false },
      { name: 'Steam', compontent: 'Steam', icon: 'icon_steam', installed: 1, pinned: 1, isOpen: false, stackable: false },
      { name: 'Microsoft Word', compontent: 'MicrosoftWord', icon: 'icon_word', installed: 1, pinned: 1, isOpen: false, stackable: true },
      { name: 'Email', compontent: 'Outlook', icon: 'icon_outlook', installed: 1, pinned: 1, isOpen: false, stackable: false },
      { name: 'Terminal', compontent: 'Terminal', icon: 'icon_terminal', installed: 1, pinned: 1, isOpen: false, stackable: true }
    ],
    processes: [
    ],
    locked: true,

    // These apps are pinned to the taskbar
    apps_taskbar: [
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
      for (const taskbarApp of state.apps_taskbar) {
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
