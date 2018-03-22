<template>
  <div :style="{backgroundColor: playerBack}" class="player">
    <div class="head">
      <div v-for="(item, index) of playerHeadIcon">
        <span :style="{background: item.imgUrl, left: item.leftStyle}" class="head-icon" @click.stop="headIconfun(index)"></span>
      </div>
      <span class="name">{{musicPlayedNow.songName}}</span>
      <span class="singer">{{musicPlayedNow.singer}}</span>
    </div>
    <div class="mid" id="getw">
      <transition name="router">
        <router-view></router-view>
      </transition>
    </div>
    <div class="foot">
      <div class="tempo" :style="{backgroundColor: playerBack}" @touchmove.stop="touchMove" @touchend.stop="touchEnd" @touchstart.stop="touchStart">
        <div class="time">
          <span>{{timeNowStr}}</span>
        </div
        ><div class="wrapper" id="hi" ref="wrapper" @touchstart.stop="touchStart">
          <div class="fill" ref="fill">
          </div
          ><div class="slider" ref="slider">
            <icon name="slider" :width="pxToVwStr(15)" :height="pxToVwStr(15)"></icon>
          </div>
        </div
        ><div class="endtime">
          <span>{{timeFormate(musicPlayedNow.songTime)}}</span>
        </div>
      </div>
      <div class="footicon">
        <div v-for="(item, index) of footIconName" class="con-center" :key="item.id" @click.stop="footIconFun(index)">
          <icon :name="item.iconName" :width="item.dim" :height="item.dim"></icon>
        </div>
        <div class="icon-con con-center" @click.stop="clickPlayIcon">
          <icon name="playerPlay" :width="pxToVwStr(45)" :height="pxToVwStr(45)" :linestyle="{'visibility': isPlaying?'visible':'hidden'}" :pathstyle="{'visibility': isPlaying?'hidden':'visible'}"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Player',
  mounted() {
    this.wrapperLength = Number.parseFloat(window.getComputedStyle(this.$refs.wrapper).width);
    this.sliderLength = Number.parseFloat(window.getComputedStyle(this.$refs.slider).width);
    this.sliderChange(this.songTimeNow);
    this.myAudio = document.getElementById("myAudio");
  },
  computed: {
    ...mapState([
      'playerBack',
      'playerHeadIcon',
      'musicPlayedNow',
      'songTimeNow',
      'currentPath',
      'isPlaying',
      'timeChangedBySliderUsedOutside'
    ])
  },
  data() {
    return {
      timeNow: 0,
      timeNowStr: "00:00",
      dragable: false,
      footIconName: [{
        iconName: "preSong",
        id: "presong-id-1",
        dim: this.pxToVwStr(20)
      }, {
        iconName: "preSong",
        id: "preSong-id-2",
        dim: this.pxToVwStr(25)
      }, {
        iconName: "nextSong",
        id: "nextSong-id-1",
        dim: this.pxToVwStr(25)
      }, {
        iconName: "nextSong",
        id: "nextSong-id-2",
        dim: this.pxToVwStr(20)
      }]
    }
  },
  methods: {
    ...mapMutations([
    ]),
    headIconfun(index) {
      switch (index) {
        case 0:
          //this.$router.push({ path: '/' });
          this.$router.push({path: this.currentPath});
          break;
        case 1:
          this.$store.commit('tooglePlayState');
          if (this.isPlaying) {
            this.myAudio.play();
          } else {
            this.myAudio.pause();
          }
          break;
      }
    },
    timeFormate(time) {
      let [min, sec] = [Math.floor(time / 60), time % 60];
      let minstr = (min > 9) ? (min + ":") : ("0" + min + ":");
      let secstr = (sec > 9) ? (sec) : ("0" + sec);
      return minstr + secstr;
    },
    mouseDown() {
      this.dragable = true;
    },
    changeTime() {
      let e = event || window.event;
      let songWidth = e.pageX - this.$refs.wrapper.offsetLeft;
      if(songWidth <= 0) {
        songWidth = 0;
      } else if (songWidth > this.$refs.wrapper.offsetWidth) {
        songWidth = this.$refs.wrapper.offsetWidth;
      }
      this.$refs.fill.style.width = songWidth + "px";
      this.$refs.slider.style.left = songWidth - this.sliderLength / 2 + "px";
      this.$store.commit('sliderChangeTime', true);
      this.$store.commit('sliderChangeTimeOut', true);
      this.$stroe.commit('songPercentChange', {nume: songWidth, deno: this.wrapperLength});
    },
    mouseUp() {
      this.dragable = false;
    },
    sliderChange(timeNow) {
      let fillLength = timeNow / this.musicPlayedNow.songTime * this.wrapperLength;
      this.$refs.fill.style.width = fillLength + "px";
      this.$refs.slider.style.left = fillLength - 7.5 + "px";
    },
    touchStart(e) {
      let [fillWidth, sliderLeftDis] = this.getSongWidth(e.touches[0].clientX, this.$refs.wrapper.offsetLeft, this.$refs.wrapper.offsetWidth, this.sliderLength);
      this.$refs.fill.style.width = fillWidth + "px";
      this.$refs.slider.style.left = sliderLeftDis + "px";
      this.$store.commit('sliderChangeTime', true);
      this.$store.commit('sliderChangeTimeOut', true);
      this.$store.commit('songPercentChange', {nume: fillWidth, deno: this.wrapperLength});
    },
    touchMove(e) {
      let [fillWidth, sliderLeftDis] = this.getSongWidth(e.touches[0].clientX, this.$refs.wrapper.offsetLeft, this.$refs.wrapper.offsetWidth, this.sliderLength);
      this.$refs.fill.style.width = fillWidth + "px";
      this.$refs.slider.style.left = sliderLeftDis + "px";
      this.$store.commit('sliderChangeTime', true);
      this.$store.commit('sliderChangeTimeOut', true);
      this.$store.commit('songPercentChange', {nume: fillWidth, deno: this.wrapperLength});
    },
    touchEnd(e) {
    },
    getSongWidth(eClientX, leftDis, wrapperWidth, sliderLength) {
      let songWidthRes = eClientX - leftDis;
      if (songWidthRes <= 0) {
        songWidthRes = 0;
      } else if (songWidthRes > wrapperWidth) {
        songWidthRes = wrapperWidth;
      }
      let sliderLeft = songWidthRes - sliderLength / 2;
      return [songWidthRes, sliderLeft];
    },
    clickPlayIcon() {
      this.$store.commit('tooglePlayState');
      if (this.isPlaying) {
        this.myAudio.play();
      } else {
        this.myAudio.pause();
      }
    },
    footIconFun(index) {
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }    
  },
  watch: {
    songTimeNow: {
      handler(now, old) {
        this.sliderChange(now);
        /*let nowCeil = Math.ceil(now);
        let oldCeil = Math.ceil(old);
        if (nowCeil !== oldCeil) {
        	if(now - oldCeil > oldCeil - old)
        }*/
        let oldTime = this.timeNow;
        let num = Math.ceil(now);
        if (this.timeChangedBySliderUsedOutside) {
          this.$store.commit('sliderChangeTimeOut', false);
          if (num - now <= 0.5) {
            this.timeNow = num;
          } else {
            this.timeNow = num - 1;
          }
        } else {
          if (num - now < 0.2) {
            if (oldTime !== num) {
              this.timeNow = num;
            }
          } else if (num - now > 0.5) {
            if (oldTime !== num - 1) {
              this.timeNow = num - 1;
            }
          }
        }
        if (oldTime !== this.timeNow) {
          this.timeNowStr = this.timeFormate(this.timeNow);
        }
      }
    }
  }
}

</script>

<style lang="scss">
.router-enter-active {
  transition: all .1s ease-out;
}

.router-leave-active {
  transition: all 0 ease;
}

.router-enter,
.router-leave-active {
  opacity: 0;
}

.player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  user-select:none;

  .head {
    height: 70px;
    width: 100%;
    position: relative;

    * {
      position: absolute;
    }
    .head-icon {
      width: 20px;
      height: 20px;
      top: 35px;
      cursor: pointer;
    }
    .name {
      display: inline-block;
      width: 210px;
      vertical-align: top;
      left: 59px;
      bottom: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0;
      font-size: 15px;
      color: #FFF;
    }
    .singer {
      display: inline-block;
      width: 210px;
      vertical-align: top;
      left: 60px;
      bottom: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-szie: 12px;
      color: #FFF;
      opacity: .4;
      -webkit-transform-origin-x: 0;
      -webkit-transform: scale(0.75);
    }
  }
  .mid {
    width: 100%;
    height: 70.3125%
  }
  .foot {
    height: 120px;
    width: 100%;
    position: relative;

    .tempo {
      position: absolute;
      width: 100%;
      height: 30px;

      .time {
        vertical-align: top;
        font-size: 15px;
        width: 48px;
        display: inline-block;
        position: absolute;
        left: 20px;
        bottom: 0px;
        color: white;
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.5);
      }
      .endtime {
        vertical-align: top;
        font-size: 15px;
        width: 48px;
        display: inline-block;
        position: absolute;
        left: 320px;
        bottom: 0;
        color: silver;
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.5);
      }
      .wrapper {
        margin: 0 0 0 0;
        display: inline-block;
        width: 260px;
        height: 2px;
        position: absolute;
        left: 50px;
        top: 19px;
        background-color: silver;

        .slider {
          width: 15px;
          height: 15px;
          display: inline-block;
          position: absolute;
          top: -6.5px;
        }
        .fill {
          width: 0%;
          height: 2px;
          background-color: red;
          display: inline-block;
          position: absolute;
        }
      }
    }
    .footicon {
      position: absolute;
      width: 100%;
      height: 90px;
      top: 30px;

      $foot-icon-data: (1, 27.5px, 15px, 5px),(2, 27.5px, 90px, 2.5px),(3, 27.5px, 242.5px, 2.5px),(4, 27.5px, 315px, 5px);
      @each $index, $top, $left, $icondis in $foot-icon-data {
        & div:nth-child(#{$index}) {
          position: absolute;
          top: $top;
          left: $left;
          height: 30px;
          width: 30px;
        }
      }
      .icon-con {
        position: absolute;
        height: 60px;
        width: 60px;
        top: 12.5px;
        left: 150px;
      }
    }
  }
}

</style>
