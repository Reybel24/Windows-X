<template>
  <WinApp
    :style="coreStyle"
    @close="onClose"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
  >
    <div class="nav-sidebar"></div>
    <div class="main">
      <div class="address-bar">
        <div
          class="node"
          v-for="(node, index) in this.nodesFromActiveDir()"
          :key="index"
          @click="openFolder(node.path + '/'  + node.name)"
        >
          <div class="name">{{ node.name }}</div>
          <i class="fas fa-chevron-right" :class="'icon'"></i>
        </div>
      </div>
      <div class="files-view">
        <Struct
          v-for="(struct, index) in getActiveDir"
          :key="index"
          :struct="struct"
          @nav-to="openFolder"
        />
      </div>
    </div>
  </WinApp>
</template>

<script>
// App functionality
import WinApp from '@/components/apps/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

// C:/ "hard drive"
import fileSystem from '@/appdata/Windows/fileSystem.json';

// File / folder item
import Struct from '@/components/Struct';

export default {
  name: 'FileExplorer',
  mixins: [WinAppCore],
  components: {
    WinApp,
    Struct
  },
  data() {
    return {
      drive_c: fileSystem.C,
      activeDir: '~/Desktop/notes' // Default open dir
    };
  },
  methods: {
    onClose() {},
    // Will navigate to the given path and return a folder or file
    getStructByAbsPath(path) {
      // Example path: '~/Desktop/notes/shopping-list.txt

      // First split the path into a list of folders
      var nodes = path.split('/');
      // console.log(nodes);

      // Traverse file system from top to bottom into given path
      // Start at root
      var nodeIndex = 0;
      var currentDir = this.fileSystem;
      var currentNode = nodes[nodeIndex]; // Desktop
      for (const node of nodes) {
        // console.log(currentDir)
        // Go into 'Desktop' dir
        // Match all entries with this path, discard all others
        var dir = [];
        for (const struct of currentDir) {
          var structNodes = struct.path.split('/');

          // Add file or path name at end of node list to complete full path
          var structFullName =
            struct.type == 'file' && 'ext' in struct
              ? struct.name + '.' + struct.ext
              : struct.name;
          structNodes.push(structFullName);
          // console.log(structNodes)

          // Match paths
          if (structNodes[nodeIndex] == node) {
            // Don't add self to narrowed dir list
            if (struct.name == node) continue;

            // console.log("Matched: " + structNodes[nodeIndex] + ' with ' + node)
            // Matched, go "into" directory and narrow search
            dir.push(struct);
          }
        }

        if (dir.length < 1) {
          // Folder or file not found
          return -1;
        }

        currentDir = dir;
        nodeIndex++;
      }
      return currentDir;
    },
    getStructSimple(path) {
      var files = [];
      for (var struct of this.drive_c) {
        if (struct.path == path) {
          files.push(struct);
        }
      }
      if (files.length > 0) {
        return files;
      } else {
        return -1;
      }
    },
    openFolder(path) {
      var folder = this.getStructSimple(path);
      if (folder == -1) return;

      this.activeDir = path;
    },
    // Given a full path, splits it up and return each node as its own path. Useful for navigating from address bar
    nodesFromActiveDir() {
      // Return individual dirs from full path
      var nodes = this.activeDir.split('/');
      // return nodes;

      var structs = [];
      var nodeIndex = 0;
      for (var node of nodes) {
        var nodePath = '';
        for (let i = 0; i < nodeIndex; i++) {
          if (i > 0) {
            nodePath = nodePath + '/' + nodes[i];
          } else {
            nodePath = nodes[i];
          }
        }
        structs.push({ name: node, path: nodePath });
        nodeIndex++;
      }
      return structs;
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(550, 250)
  },
  computed: {
    getActiveDir: function() {
      return this.getStructSimple(this.activeDir);
    }
  }
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 1000px !important;
  height: 540px !important;
  cursor: default;
  user-select: none;

  .nav-sidebar {
    background-color: rgb(90, 90, 90);
    width: 25%;
    height: 100%;
  }

  .main {
    background-color: rgb(255, 255, 255);
    width: 100%;
    flex-direction: column;

    .address-bar {
      width: 100%;
      background-color: white;
      border: 1px solid rgb(179, 179, 179);
      flex-direction: row;
      align-items: center;

      .node {
        color: grey;
        font-size: 1em;
        padding: 5px 8px 5px 8px;
        transition: 0.2s;
        align-items: center;

        .name {
          align-items: center;
        }
        .icon {
          font-size: 0.6em;
          padding-left: 8px;
          padding-top: 3px;
        }

        &:hover {
          background-color: rgb(229, 243, 255);
        }

        &:hover:active {
          background-color: rgb(197, 228, 255);
        }
      }
    }

    .files-view {
      padding: 10px 0 7px 15px;
      flex-direction: row;
    }
  }
}
</style>
