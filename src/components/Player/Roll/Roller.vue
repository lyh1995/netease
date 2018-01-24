<template>
  <div class="roller">
    <div class="swith" :class="isPlaying?'':'songpause'">
    </div>
    <img :src="musicPlayedNow.songImg" class="img roll" :style="{'animationPlayState':isPlaying?'running':'paused'}" @click="goLryicer"></img>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Roller',
  computed: {
    ...mapState([
      'musicPlayedNow',
      'isPlaying'
    ])
  },
  data() {
    return {}
  },
  methods: {
    goLryicer() {
      this.$router.push({ path: '/Player/Lryicer' });
    }
  }
}

</script>

<style lang="scss">
@keyframes roll {
  0% {transform-origin: center;transform: rotate3d(0, 0, 1, 0deg);}
  100% {transform: rotate3d(0, 0, 1, 360deg);}
}
.roll {
  animation: roll 10s linear infinite;
}
.roller {
  width: 100%;
  height: 100%;
  border-top: 1px solid;
  border-image: linear-gradient(to left, #6E6E6E, #6E6E6E, #D8D8D8, #FAFAFA, #D8D8D8, #6E6E6E, #6E6E6E) 20 .5;
  position: relative;
  overflow: hidden;

    .songpause {
      transform-origin: 26px 29px;
      transform: rotate(-30deg);
    }
    .swith {
      position: absolute;
      left: 44%;
      top: -4.9%;
      width: 33%;
      height: 32.5%;
      background-image: url('/static/swith.png');
      background-size: contain;
      z-index: 1;
    }
    .img {
      width: 260px;
      height: 260px;
      border-radius: 5px;
      margin-top: calc(65% - 145px);
      margin-left: calc(50% - 130px);
      border: 50px solid black;
      border-radius: 50%;
    }
  }

</style>
