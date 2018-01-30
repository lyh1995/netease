<template>
  <div id="app">
    <transition name="router">
      <router-view></router-view>
    </transition>
    <audio ref="player" :src="musicPlayedNow.song" @ended="isLoop" @timeupdate="timeChange()"></audio>
  </div>
</template>

<script>
import MyFront from './components/Front/Front.vue'
import MyPlayer from './components/Player/Player.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    MyFront,
    MyPlayer
  },
  beforeCreate() {
    this.$store.dispatch('getLrc');
  },
  computed: {
    ...mapState([
      'musicPlayedNow',
      'playMode',
      'isPlaying',
      'songCurrentTime',
      'songPlayingId'
    ])
  },
  data() {
    return {
    }
  },
  watch: {
    isPlaying: {
      handler (now, old) {
        console.log(this.isPlaying);
        if(now) {
          this.$refs.player.play();
        } else {
          this.$refs.player.pause();
        }
      }
    },
    songCurrentTime: {
      handler (now, old) {
        this.$refs.player.currentTime = now;
      }
    },
    songPlayingId: {
      handler (now, old) {
        this.$refs.player.pause();
        setTimeout(() => this.$refs.player.play(), 100);
      }
    }
  },
  methods: {
    isLoop() {
      if(this.playMode == "loop") {
        this.$refs.player.play();
      } else {
        this.$store.commit('tooglePlayState');
      }
    },
    timeChange() {
      this.$store.commit('songTimeChange', this.$refs.player.currentTime);
    }
  }
}
</script>


<style lang="scss">
@import "./css/base.scss";

.router-enter-active {
  transition: all .5s ease-out;
}
.router-leave-active {
  transition: all 0 ease;
}
.router-enter, .router-leave-active {
  opacity: 0;
}
#app{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>