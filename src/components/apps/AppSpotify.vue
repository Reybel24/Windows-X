<template>
  <WinApp
    :style="coreStyle"
    @exit="onExit"
    @click-maximize="maximizeApp"
    @click-minimize="minimizeApp"
    :title="'Spotify'"
    :icon="app.icon"
    :theme="'dark'"
  >
    <div class="wrapper">
      <div class="main">
        <div class="sidebar">
          <div class="currently-playing">
            <img
              :src="require('@/appdata/Spotify/images/rick-astley_whenever-you-need-me.png')"
              v-if="nowPlaying != null"
            />
          </div>
        </div>
        <section class="music">
          <div class="playlist">
            <img src="@/appdata/Spotify/images/playlist-0.png" />
            <div class="details">
              <div class="label">PLAYLIST</div>
              <div class="name">Groovin'</div>
              <div
                class="created"
              >Created by reybel • {{ this.songs.length }} songs • {{ Math.trunc(songsTotalDuration/60) }} hr {{ Math.trunc(songsTotalDuration%60) }} min</div>
              <div class="btn" @click="(nowPlaying == null) ? playRandomSong() : pressPlayPause()">{{ (isPlaying) ? "PAUSE" : "PLAY" }}</div>
            </div>
          </div>
          <div class="songs">
            <div class="header">
              <div class="column like"></div>
              <div class="column title">TITLE</div>
              <div class="column">ARTIST</div>
              <div class="column">ALBUM</div>
              <div class="column">DURATION</div>
            </div>
            <div
              class="song"
              v-for="(song, index) in this.songs"
              :key="index"
              @dblclick="playSong(song)"
              :class="{ playing : (nowPlaying != null && song.id == nowPlaying.id) }"
            >
              <div class="cell like">
                <i class="fas fa-heart" :class="'icon'"></i>
              </div>
              <div class="cell title">{{ song.name }}</div>
              <div class="cell artist">{{ song.artist }}</div>
              <div class="cell album">{{ song.album }}</div>
              <div class="cell duration">{{ song.duration }}</div>
            </div>
          </div>
        </section>
      </div>
      <div class="player">
        <div class="media">
          <div class="title">{{ (nowPlaying != null) ? nowPlaying.name : "" }}</div>
          <div class="artist">{{ (nowPlaying != null) ? nowPlaying.artist : "" }}</div>
        </div>
        <div class="controls">
          <div class="group">
            <div class="item rewind">
              <i class="fas fa-step-backward" :class="'icon'"></i>
            </div>
            <div class="item play-pause" @click="(nowPlaying == null) ? playRandomSong() : pressPlayPause()">
              <div v-show="(isPlaying == false)"><i class="fas fa-play-circle"></i></div>
              <div v-show="isPlaying"><i class="fas fa-pause-circle"></i></div>
            </div>
            <div class="item forward">
              <i class="fas fa-step-forward" :class="'icon'"></i>
            </div>
          </div>
          <div class="scrubber">
            <div class="fill"></div>
          </div>
        </div>
        <div class="more"></div>
      </div>
    </div>
  </WinApp>
</template>

<script>
// Required
import WinApp from '@/components/core/WinApp';
import WinAppCore from '@/components/core/WinAppCore';

// Appdata
import songs from '@/appdata/Spotify/songs.json';

// Audio player
import { Howl, Howler } from 'howler';

export default {
  name: 'Email',
  mixins: [WinAppCore],
  components: {
    WinApp
  },
  data() {
    return {
      songs: songs.data,
      nowPlaying: null,
      sound: null,
      isPlaying: false
    };
  },
  methods: {
    playSong(song) {
      this.nowPlaying = song;

      // Stop any currenly playing songs
      if (this.sound != null) this.sound.unload();
      
      try {
        var src = require('@/appdata/Spotify/media/' + song.name + ' - ' + song.artist + '.mp3') 
      } catch (error) {
        // Error importing song file
        // Play some rick astley instead
        var src = require('@/appdata/Spotify/media/Never Gonna Give You Up - Rick Astley.mp3')
      }

      this.sound = new Howl({
        src: [src],
        autoplay: true,
        loop: true,
        volume: 2,
        onend: function() {
          // console.log('Finished!');
        }
      });
      this.isPlaying = true;
    },
    pressPlayPause() {
      if (this.sound == null) return;
      if (this.sound.playing()) {
        // Pause it
        this.sound.pause();
        this.isPlaying = false;
      } else {
        // Play it
        this.sound.play();
        this.isPlaying = true;
      }
    },
    onExit() {
      // App-specific clean-up
      if (this.sound != null) this.sound.unload();
    },
    playRandomSong() {
      const _randSong = this.songs[0];
      this.playSong(_randSong)
    }
  },
  mounted() {
    // Set initial window position
    this.setInitialPos(400, 140);
  },
  computed: {
    songIsPlaying: function() {
      return this.isPlaying;
    },
    songsTotalDuration: function() {
      var totalDuration = this.songs.reduce(function(accumulator, song) {
        return accumulator + song.duration;
      }, 0);
      return totalDuration;
    }
  }
};
</script>

<style scoped lang='scss'>
.win-app {
  width: 1100px;
  height: 640px;
  cursor: default;
  user-select: none;

  .wrapper {
    flex-direction: column;
    width: 100%;
  }

  .main {
    overflow: hidden;

    .sidebar {
      background-color: #121212;
      width: 17%;

      .currently-playing {
        margin-top: auto;
        width: 100%;
        height: 230px;
        background-color: rgb(31, 31, 31);

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .music {
      background-color: #181818;
      flex-grow: 1;
      flex-direction: column;
      overflow-y: auto;

      .playlist {
        width: 100%;
        height: 220px;
        font-size: 1em;
        margin-bottom: 20px;

        img {
          width: 20%;
          height: 180px;
          object-fit: cover;
          margin-top: 5%;
          margin-left: 28px;
        }

        .details {
          margin-top: auto;
          padding: 0 0 0 17px;
          flex-direction: column;

          .btn {
            width: 110px;
            height: 30px;
            border-radius: 20px;
            color: white;
            font-size: 0.7em;
            background-color: #1db954;
            align-items: center;
            justify-content: center;
            margin-top: 17px;

            &:hover {
              background-color: rgb(30, 215, 96);
              transform: scale(1.04, 1.04);
            }
          }

          .label {
            font-size: 0.6em;
          }

          .name {
            font-size: 1.7em;
            padding: 6px 0 6px 0;
          }

          .created {
            font-size: 0.8em;
          }
        }
      }

      .songs {
        padding: 20px 20px 12px 20px;
        flex-direction: column;
        font-size: 0.9em;

        .header {
          margin-bottom: 20px;
          font-size: 0.78em;
          color: rgb(207, 207, 207);

          .column {
            width: 30%;
            padding: 0 0 0 10px;

            &:hover {
              color: white;
            }

            &.like {
              width: 25px;
            }

            &.title {
              width: 40%;
            }

            &.duration {
              width: 10%;
            }
          }
        }

        .song {
          height: 30px;
          border-top: 1px solid #272727;
          border-bottom: 1px solid #272727;
          align-items: center;
          padding: 14px 0 10px 0px;
          white-space: nowrap;

          &:hover {
            background-color: #282828;
          }

          &.playing {
            color: rgb(28, 200, 89);
          }

          .cell {
            width: 30%;
            padding: 0 0 0 10px;
            text-align: left;
            overflow: hidden;

            &.like {
              width: 25px;
            }

            &.title {
              width: 40%;
            }

            &.duration {
              width: 10%;
            }
          }
        }
      }
    }
  }

  .player {
    width: 100%;
    height: 70px;
    background-color: #282828;

    .media {
      width: 20%;
      padding: 12px 0 0 20px;
      flex-direction: column;
      color: white;
      font-size: 0.9em;
      overflow: hidden;
      white-space: nowrap;

      .title {
        margin-bottom: 5px;
      }
    }

    .controls {
      color: white;
      font-size: 1em;
      flex-grow: 2;
      flex-direction: column;
      justify-content: center;

      .group {
        font-size: 1.4em;
        margin-top: 5px;
        align-items: center;
        justify-content: center;

        .item {
          &.forward,
          &.rewind {
            font-size: 0.7em;
          }

          &.play-pause {
            margin: 0 10px 0 10px;
          }

          &:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }

      .scrubber {
        width: 100%;
        height: 4px;
        background-color: #404040;
        margin-top: 15px;
        overflow: hidden;
        border-radius: 20px;

        .fill {
          width: 39%;
          background-color: #b3b3b3;
          border-radius: 20px;
        }
      }
    }

    .more {
      flex-grow: 1;
    }
  }
}
</style>
