<template>
  <div class="roller">
    <div class="swith" :class="isPlaying?(isMoving?'songpause':''):'songpause'">
    </div>
    <div class="img-back">
    </div>
    <div class="img-con" ref="imgContainer">
      <div v-for="(item, index) in songSliderList" :key="item" class="img-div" @click="goLryicer" @touchmove.stop="touchMove" @touchstart.stop="touchStart" @touchend.stop="touchEnd" :ref="'rollimgFir'+index">
        <img :src="item" class="img" :style="{'animationPlayState':isPlaying?(isMoving?'paused':'running'):'paused'}"></img>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Roller',
  computed: {
    ...mapState([
      'musicPlayedNow',
      'isPlaying',
      'songImgList'
    ]),
    ...mapGetters([
      'songSliderList'
    ])
  },
  data() {
    return {
      isMoving: false,
      isShowAnImg: false,
      transDis: 0,
      isFastMove: true
    }
  },
  methods: {
    goLryicer() {
      this.$router.push({ path: '/Player/Lryicer' });
    },
    touchStart(e) {
      this.touchStartLeft = e.touches[0].clientX;
      setTimeout(() => this.isFastMove = false, 150);
    },
    touchMove(e) {
      this.isMoving = true;
      this.transDis = e.touches[0].clientX - this.touchStartLeft;
      this.setAnimation("imgContainer", `translate3d(${this.pxToVwStr(this.transDis)},0,0)`, "");
    },
    touchEnd(e) {
      if (!this.isMoving) {
        return;
      } else {
        if (this.isFastMove) {
          let dire = this.transDis > 0?"right":"left",
              dis = this.transDis > 0?this.pxToVwStr(360):this.pxToVwStr(-360);
          this.setAnimation("imgContainer", `translate3d(${dis}),0,0 )`, "1s");
          setTimeout(() => {
            this.setAnimation("imgContainer", `translate3d(0,0,0)`, "");
            this.$store.commit('changeSong', dire);
            this.isMoving = false;
          },500);
        } else {
          if (this.transDis >= 180) {
            this.setAnimation("imgContainer", `translate3d(${this.pxToVwStr(360)},0,0)`, "1s");
            setTimeout(() => {
              this.setAnimation("imgContainer", "translate3d(0,0,0)","");
              this.$store.commit('changeSong', "right");
              this.isMoving = false;
            },500);
          } else if (this.transDis <= -180) {
            this.setAnimation("imgContainer", `translate3d(${this.pxToVwStr(-360)},0,0)`, "1s");
            setTimeout(() => {
              this.setAnimation("imgContainer", `translate3d(0,0,0)`, "");
              this.$store.commit('changeSong', 'left');
              this.isMoving = false;
            },500);
          } else {
            this.setAnimation("imgContainer", `translate3d(0,0,0)`, ".5s");
            setTimeout(() => this.isMoving = false, 250);
          }
        }
      }
      setTimeout(() => this.isFastMove = true, 200);
    },
    setAnimation(target, trans, time, timeFun = "ease") {
      this.$refs[target].style.transform = trans;
      this.$refs[target].style.transitionDuration = time;
      this.$refs[target].style.transitionTimingFunction = timeFun;
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
    .img-back {
      width: 270px;
      height: 270px;
      border-radius: 50%;
      position: absolute;
      top: 65px;
      left: 45px;
      background-color: rgb(99,99,99);
    }
    .img-con {
      width: 1080px;
      height: 260px;
      position: absolute;
      top: 70px;
      left: -360px;

      .img-div {
        width: 360px;
        height: 260px;
        position: relative;
        display: inline-block;

        .img {
          width: 260px;
          height: 260px;
          position: relative;
          left: 50px;
          border: 40px solid black;
          border-radius: 50%;
          display: inline-block;
          animation: roll 10s linear infinite;
        }
      }
    }
  }

</style>
