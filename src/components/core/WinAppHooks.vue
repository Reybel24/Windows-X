<script>
// Import windows apps and make them available to system
import Email from '@/components/apps/AppEmail.vue';
import Spotify from '@/components/apps/AppSpotify.vue';
import FileExplorer from '@/components/apps/AppFileExplorer.vue';
import Terminal from '@/components/apps/AppTerminal.vue';
import Notepad from '@/components/apps/AppNotepad.vue';
import PhotoViewer from '@/components/apps/AppPhotoViewer.vue';
import Firefox from '@/components/apps/AppFirefox.vue';
import TaskManager from '@/components/apps/AppTaskManager.vue';

// Need access to store
import store from '@/store';

export default {
  components: {
    Email,
    Spotify,
    Terminal,
    FileExplorer,
    Notepad,
    PhotoViewer,
    Firefox,
    TaskManager
  },
  methods: {
    getAppForFileExt(ext) {
      switch (ext) {
        // Text files
        case 'txt':
          var app = this.$store.getters.getAppByName('Notepad');
          return app;

        // Images
        case 'png':
        case 'jpg':
          var app = this.$store.getters.getAppByName('PhotoViewer');
          return app;

        // Unsuported type
        default:
          return null;
      }
    }
  },
  mounted() {
    // Define app metadata
    const _apps = [
      {
        appId: 'a0',
        name: 'Recycle Bin',
        component: 'Recycle',
        icon: 'icon_recycle-bin',
        installed: 1,
        pinned: 0,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'b0',
        name: 'Firefox',
        component: 'Firefox',
        icon: 'icon_firefox',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'a1',
        name: 'File Explorer',
        component: 'FileExplorer',
        icon: 'icon_file-explorer',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'b2',
        name: 'Spotify',
        component: 'Spotify',
        icon: 'icon_spotify',
        installed: 1,
        pinned: 1,
        isOpen: true,
        stackable: false
      },
      {
        appId: 'b3',
        name: 'Steam',
        component: 'Steam',
        icon: 'icon_steam',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: false
      },
      {
        appId: 'b4',
        name: 'Microsoft Word',
        component: 'MicrosoftWord',
        icon: 'icon_word',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'a5',
        name: 'Email',
        component: 'Outlook',
        icon: 'icon_outlook',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: false
      },
      {
        appId: 'a6',
        name: 'Terminal',
        component: 'Terminal',
        icon: 'icon_terminal',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'g1',
        name: 'Wizard101',
        component: 'Wizard101',
        icon: 'icon_wizard101',
        installed: 1,
        pinned: 0,
        isOpen: false,
        stackable: false
      },
      {
        appId: 'a7',
        name: 'Notepad',
        component: 'Notepad',
        icon: 'icon_notepad',
        installed: 1,
        pinned: 0,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'a8',
        name: 'PhotoViewer',
        component: 'PhotoViewer',
        icon: 'icon_picture',
        installed: 1,
        pinned: 0,
        isOpen: false,
        stackable: true
      },
      {
        appId: 'a9',
        name: 'Task Manager',
        component: 'TaskManager',
        icon: 'icon_taskManager',
        installed: 1,
        pinned: 1,
        isOpen: false,
        stackable: true
      }
    ];

    // Register 'installed' apps
    const _this = this;
    _apps.forEach(appMeta => {
      _this.$store.dispatch({
        type: 'hookApp',
        appMeta: appMeta
      });
    });
  }
};
</script>