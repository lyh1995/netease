<template>
  <div id="app">
    <transition :name="(toPath === '/Player')?'playerin':'playerout'" mode="in-out">
      <router-view></router-view>
    </transition>
    <audio ref="player" :src="musicPlayedNow.song" @ended="isLoop" @timeupdate="timeChange()" id="myAudio" @progress="getSongDuration"></audio>
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
      'songPlayingId',
      'toPath'
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
        this.$refs.player.volume = 0.1;
        this.$store.commit('tooglePlayState');
        setTimeout(() => {
          this.$store.commit('tooglePlayState');
          this.$refs.player.play();
        }, 100);
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
      if(this.$refs.player.currentTime !== 0) {
        this.$store.commit('songTimeChange', this.$refs.player.currentTime);
        //this.$store.commit('getSongPlayedPrecent', this.$refs.player.played.end(0));
      }
    },
    getSongDuration() {
      console.log(`Duration${this.$refs.player.duration}`)
      this.$store.commit('getSongDuration', this.$refs.player.duration);
    }
  }
}
</script>


<style lang="scss">
@import "./css/base.scss";

.playerin-enter, .playerout-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.playerin-enter-active, .playerout-leave-active {
  transition: all .3s ease;
  z-index: 4;
}
.playerin-leave-active, .playerout-enter-active {
  transition: all .1s ease;
  z-index: -1;
}
.player-leave-to {
  opacity: 0;
}
.playerout-enter {
  z-index: -1;
}
.playerout-leave {
  opacity: 1;
  z-index: 4;
}

#app{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.con-center {//ʹ?????tem??ֱ????????
  justify-content: center;//ˮƽ???
  display: flex;
  align-items: center;//??ֱ???
}
</style>