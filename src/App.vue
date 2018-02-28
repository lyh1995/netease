<template>
  <div id="app">
    <transition name="app" mode="in-out">
      <router-view></router-view>
    </transition>
    <audio ref="player" :src="musicPlayedNow.song" @ended="isLoop" @timeupdate="timeChange()" id="myAudio"></audio>
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
      //'isPlaying',
      'songCurrentTime',
      'songPlayingId'
    ])
  },
  data() {
    return {
    }
  },
  watch: {
    /*isPlaying: {
      handler (now, old) {
        console.log(this.isPlaying);
        alert(this.isPlaying);
        if(now) {
          this.$refs.player.play();
        } else {
          this.$refs.player.pause();
        }
      }
    },*/
    songCurrentTime: {
      handler (now, old) {
        this.$refs.player.currentTime = now;
      }
    },
    songPlayingId: {
      handler (now, old) {
        this.$refs.player.pause();
        setTimeout(() => this.$store.commit('tooglePlayState'), 100);
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

.app-enter-active {
  transition: all .3s;
  position: absolute;
  z-index: 2;
}
.app-leave-active {
  position: absolute;
  transition: all .1s;
}
.app-enter,{
  position: absolute;
  transform: translateY(700px);
  opacity: 1;
}
.app-leave-to {
  opacity: 0;
  position: absolute;
}
#app{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>