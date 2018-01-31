<template>
  <div :style="{backgroundColor: playerBack}" class="player">
    <div class="head">
      <div v-for="(item, index) of playerHeadIcon">
        <span :style="{background: item.imgUrl, left: item.leftStyle}" class="head-icon" @click.stop="iconfun(index)"></span>
      </div>
      <span class="name">{{musicPlayedNow.songName}}</span>
      <span class="singer">{{musicPlayedNow.singer}}</span>
    </div>
    <div class="mid" id="getw" @mouseup="mouseUp" @mousemove="mouseMove">
      <transition name="router">
        <router-view></router-view>
      </transition>
    </div>
    <div class="foot" @mouseup="mouseUp" @mousemove="mouseMove">
      <div class="tempo" :style="{backgroundColor: playerBack}">
        <div class="time">
          <span>{{timeNowStr}}</span>
        </div
        ><div class="wrapper" id="hi" @click.stop="changeTime" ref="wrapper" @mousedown.stop="mouseDown">
          <div class="fill" ref="fill">
          </div
          ><div class="slider" ref="slider">
          </div>
        </div
        ><div class="endtime">
          <span>{{timeFormate(musicPlayedNow.songTime)}}</span>
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
  },
  computed: {
    ...mapState([
      'playerBack',
      'playerHeadIcon',
      'musicPlayedNow',
      'songTimeNow'
    ])
  },
  data() {
    return {
      timeNow: 0,
      timeNowStr: "00:00",
      dragable: false
    }
  },
  methods: {
    ...mapMutations([
    ]),
    iconfun(index) {
      switch (index) {
        case 0:
          //this.$router.push({ path: '/' });
          this.$router.back(-1);
          break;
        case 1:
          console.log("share");
          this.$store.commit('tooglePlayState');
          break;
      }
    },
    changeTime(e) {
      if (e.target != this.$refs.slider) {
        /*if (e.offsetX > this.wrapperLength - this.sliderLength) {
          this.$refs.fill.style.width = this.wrapperLength - this.sliderLength + "px";
        } else {
          this.$refs.fill.style.width = e.offsetX + "px";
        }*/
	this.$refs.fill.style.width = e.offsetX + "px";
	this.$refs.slider.style.left = e.offsetX - 10 + "px";
	this.$store.commit('songPercentChange', {nume: e.offsetX, deno: this.wrapperLength});
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
    mouseMove() {
      if (this.dragable) {
        let e = event || window.event;
        let songWidth = e.pageX - this.$refs.wrapper.offsetLeft - document.documentElement.clientWidth * 0.235 - 209;
        /*if(songWidth <= 0) {
        	this.$refs.fill.style.width = 0;
        } else if (0 < songwidth < this.$refs.wrapper.offsetWidth) {
        	this.$refs.fill.style.width = songWidth - this.sliderLength + "px";
        } else if (songWidth >= this.$refs.wrapper.offsetWidth) {
        	this.$refs.fill.style.width = this.$refs.wrapper.offsetWidth - this.sliderLength + "px";
        }*/
        this.$refs.fill.style.width = songWidth > this.$refs.wrapper.offsetWidth ? this.$refs.wrapper.offsetWidth - this.sliderLength + "px" : songWidth - this.sliderLength + "px";
      }
    },
    mouseUp() {
      this.dragable = false;
    },
    sliderChange(timeNow) {
	let fillLength = timeNow / this.musicPlayedNow.songTime * this.wrapperLength;
	this.$refs.fill.style.width = fillLength + "px";
	this.$refs.slider.style.left = fillLength - 10 + "px";
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
        if (num - now < 0.2) {
          if (oldTime !== num) {
            this.timeNow = num;
          }
        } else if (num - now > 0.5) {
          if (oldTime !== num - 1) {
            this.timeNow = num - 1;
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
  transition: all .5s ease-out;
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
  position: relative;
  display: flex;
  flex-direction: column;
  user-select:none;

  .head {
    flex: .8;
    width: 100%;

    .head-icon {
      position: absolute;
      flex: 1;
      width: 35px;
      height: 35px;
      margin: 18px 15px 15px 15px;
      cursor: pointer;
    }
    .name {
      display: inline-block;
      width: 35%;
      vertical-align: top;
      margin-top: 14px;
      margin-left: 65px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 16px;
      color: #FFF;
    }
    .singer {
      display: inline-block;
      width: 55%;
      vertical-align: top;
      margin-top: -1px;
      margin-left: 67px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-szie: 12px;
      color: #FFF;
      opacity: .4;
      -webkit-transform-origin-x: 0;
      -webkit-transform: scale(0.75);
    }
  }
  .mid {
    width: 100%;
    height: 76%
  }
  .foot {
    flex: 1.3;
    width: 100%;

    .tempo {
      position: relative;
      width: 92%;
      height: 15%;
      left: 4%;

      .time {
        vertical-align: top;
        margin: 3px 0 1px 0;
        font-size: 5px;
        width: 7.5%;
        display: inline-block;
	position: absolute;
	right: 93%;
	color: white;
      }
      .endtime {
        vertical-align: top;
        margin: 3px 0 1px 0;
        font-size: 5px;
        width: 7.5%;
        display: inline-block;
	position: absolute;
	left: 93%;
	color: silver;
      }
      .wrapper {
        margin: 0 0 0 0;
        display: inline-block;
        width: 80%;
        height: 4px;
	position: absolute;
	left: 11%;
	top: 65%;
	background-color: silver;

        .slider {
	  width: 20px;
	  height: 20px;
	  background: url('/static/slider.svg');
	  display: inline-block;
	  position: absolute;
	  top: -200%;
        }
        .fill {
          width: 0%;
          height: 4px;
          background-color: red;
          display: inline-block;
	  position: absolute;
        }
      }
    }
  }
}

</style>
