<template>
  <WinApp
    :style="coreStyle"
    @close="onClose"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
    :title="'Explorer'"
    :theme="'dark'"
  >
    <div class="nav-sidebar">
      <div class="group" v-for="(group, index) in pinnedDirs" :key="index">
        <div
          class="header"
          @click="openFolder(group.groupPath)"
        >{{ getDirNameFromPath(group.groupPath) }}</div>
        <div class="pins">
          <div
            class="pin"
            v-for="(pin, index) in group.pins"
            :key="index"
            @click="openFolder(pin)"
          >{{ getDirNameFromPath(pin) }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="nav">
          <div class="prev" @click="navigateBreadcrumb(dir.BACK)">
            <i class="fas fa-arrow-left icon"></i>
          </div>
          <div class="forward" @click="navigateBreadcrumb(dir.FORWARD)">
            <i class="fas fa-arrow-right icon"></i>
          </div>
          <div class="up" @click="goUp" :style="{ opacity: (atRoot) ? .5 : 1}">
            <i class="fas fa-arrow-up icon"></i>
          </div>
        </div>
        <div class="address-bar">
          <div
            class="node"
            v-for="(node, index) in this.nodesFromActiveDir()"
            :key="index"
            @click="openFolder((node.path != '') ? node.path + '/'  + node.name : node.name)"
          >
            <div class="name">{{ node.name }}</div>
            <i class="fas fa-chevron-right" :class="'icon'"></i>
          </div>
        </div>
      </div>
      <div class="files-view">
        <Struct
          v-for="(struct, index) in getActiveDir"
          :key="index"
          :struct="struct"
          @nav-to="openFolder"
        />
        <div class="empty" v-if="dirIsEmpty">
          <i class="fas fa-ghost icon"></i>These are not the files you're looking for
        </div>
      </div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

// C:/ "hard drive"
import fileSystem from '@/appdata/Windows/fileSystem.json';

// File / folder item
import Struct from '@/components/layout/Struct';

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
      rootPath: '~', // root
      activeDir: '~', // Default open dir
      pinnedDirs: [
        {
          groupPath: '~/Windows X/User/Libraries',
          pins: [
            '~/Windows X/User/Libraries/Documents',
            '~/Windows X/User/Libraries/Pictures',
            '~/Windows X/User/Libraries/Documents/notes/misc'
          ]
        }
      ],
      dir: {
        FORWARD: 'next',
        BACK: 'prev'
      },
      breadcrumb: [],
      breadcrumbIndex: 0
    };
  },
  methods: {
    onClose() {},
    // Will navigate to the given path and return a folder or file
    getStructByAbsPath(path) {
      // Example path: '~/Desktop/notes/shopping-list.txt
      console.log(path);

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
      return files;
    },
    openFolder(path) {
      // Check if user navigated to same directory
      if (path != this.activeDir) {
        // Add to breadcrumb
        this.addPathToBreadcrumb(path);
      }

      if (path == '/~') this.activeDir = this.rootPath;

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
    },
    // Given a directory path, return its name (last node in path)
    getDirNameFromPath(dir) {
      var nodes = dir.split('/');
      return nodes[nodes.length - 1];
    },
    goUp(levels) {
      // Navigates x levels "up" from current directory
      var levels = this.nodesFromActiveDir();
      var up = levels[levels.length - 1];

      if (up.path != '') {
        this.activeDir = up.path;
      }
    },
    navigateBreadcrumb(dir) {
      // Kind of broken because navigating backwards through breadcrumb will not add
      // that path to the end. So it will take you to incorrect previous location (last folder opened not through breadcrumb)
      // console.log(this.breadcrumb);
      // console.log(this.breadcrumbIndex);
      if (dir == this.dir.FORWARD) {
        console.log('next');
        this.breadcrumbIndex++;
        this.activeDir = this.breadcrumb[this.breadcrumbIndex];
      } else if (dir == this.dir.BACK) {
        console.log('prev');
        if (this.breadcrumb.length >= 1) {
          this.breadcrumbIndex--;
          this.activeDir = this.breadcrumb[this.breadcrumbIndex];
        }
      }
    },
    addPathToBreadcrumb(path) {
      this.breadcrumb.push(path);
      this.breadcrumbIndex = this.breadcrumb.length - 1;
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(550, 250);
  },
  computed: {
    getActiveDir: function() {
      return this.getStructSimple(this.activeDir);
    },
    dirIsEmpty: function() {
      return this.getStructSimple(this.activeDir).length < 1 ? true : false;
    },
    atRoot: function() {
      // Checks if current directory is root
      return this.activeDir == this.rootPath;
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
    background-color: $dark-grey;
    width: 25%;
    height: 100%;
    flex-direction: column;

    .group {
      flex-direction: column;

      .header {
        font-size: 1em;
        cursor: pointer;
        padding: 6px 0 6px 15px;

        &:hover {
          background-color: rgb(46, 46, 46);
        }
      }

      .pins {
        flex-direction: column;

        .pin {
          color: white;
          font-size: 1em;
          cursor: pointer;
          padding: 7px 5px 7px 37px;

          &:hover {
            background-color: rgb(46, 46, 46);
          }
        }
      }
    }
  }

  .main {
    background-color: rgb(255, 255, 255);
    width: 100%;
    flex-direction: column;

    .top {
      width: 100%;
      height: 40px;
      background-color: rgb(52, 52, 52);;
      align-items: center;
      padding: 6px 10px 6px 10px;

      .nav {
        padding: 0 20px 0 0;
        color: white;
        transition: 0.2s;
        font-size: 0.9em;

        div {
          padding: 6px 6px 6px 6px;

          &:hover {
            background-color: rgb(85, 85, 85);
            border-radius: 20px;
          }

          &:hover:active {
            // background-color: rgb(71, 71, 71);
            @include anim-press(0.9);
          }
        }

        .icon {
          padding: 1px 4px 1px 4px;
        }
      }

      .address-bar {
        width: 60%;
        height: 70%;
        background-color: rgb(78, 78, 78);
        // border: 1px solid rgb(179, 179, 179);
        flex-direction: row;
        align-items: center;
        border-radius: 4px;

        .node {
          color: rgb(224, 224, 224);
          font-size: 0.9em;
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
            background-color: rgb(104, 104, 104);
          }

          &:hover:active {
            background-color: rgb(85, 85, 85);
            @include anim-press(0.96);
          }
        }
      }
    }

    .files-view {
      padding: 10px 0 7px 15px;
      flex-direction: row;
      flex-grow: 1;

      .empty {
        flex-grow: 1;
        color: $light-grey;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        flex-direction: column;
        font-weight: $font-bold;

        .icon {
          font-size: 4em;
          color: $light-grey;
          margin-bottom: 20px;
          margin-top: -70px;
        }
      }
    }
  }
}
</style>
