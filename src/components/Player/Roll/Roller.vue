<template>
  <div class="roller">
    <div class="swith" :class="isPlaying?(isMoving?'songpause':''):'songpause'">
    </div>
    <div class="img-con">
      <img :src="musicPlayedNow.songImg" class="img" :style="{'animationPlayState':isPlaying?(isMoving?'paused':'running'):'paused'}" @click="goLryicer" @touchmove.stop="touchMove" @touchstart.stop="touchStart" @touchend.stop="touchEnd" ref="rollimg"></img>
      <img src="/static/1989.jpg" class="img img-hide" :style="{'animationPlayState':isPlaying?(isMoving?'paused':'running'):'paused'}" @click="goLryicer" @touchmove.stop="touchMove" @touchstart.stop="touchStart" @touchend.stop="touchEnd" ref="rollimgn" v-if="isShowAnImg"></img>
    </div>
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
    return {
      isMoving: false,
      isShowAnImg: false
    }
  },
  methods: {
    goLryicer() {
      this.$router.push({ path: '/Player/Lryicer' });
    },
    touchStart(e) {
      this.touchStartLeft = e.touches[0].clientX;
    },
    touchMove(e) {
      this.isMoving = true;
      this.$refs.rollimg.style.left = 5 + e.touches[0].clientX - this.touchStartLeft + "px";
      let dis = Number.parseFloat(this.$refs.rollimg.style.left);
      if (dis >= 55) {
        this.isShowAnImg = true;
        this.$refs.rollimgn.style.left = dis - 260 - 45 + "px";
      } else if (dis <= -45) {
        this.isShowAnImg = true;
        this.$refs.rollimgn.style.left = dis + 315 + "px";
      } else {
        this.isShowAnImg = false;
      }
    },
    touchEnd(e) {
      this.isMoving = false;
      let dis = Number.parseFloat(this.$refs.rollimg.style.left);
      if (dis > -175 && dis < 185) {
        this.$refs.rollimg.style.left = "5px";
      }
    }
  }
}

</script>

<style lang="scss">
@keyframes roll {
  0% {transform-origin: center;transform: rotate3d(0, 0, 1, 0deg);}
  100% {transform: rotate3d(0, 0, 1, 360deg);}
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
    .img-con {
      width: 270px;
      height: 270px;
      border-radius: 50%;
      position: relative;
      top: 65px;
      left: 45px;
      background-color: rgb(99,99,99);

      .img {
        width: 260px;
        height: 260px;
        position: relative;
        top: 5px;
        left: 5px;
        border: 40px solid black;
        border-radius: 50%;
        animation: roll 10s linear infinite;
      }
      .img-hide {
        top: -260px;
      }
    }
  }

</style>
