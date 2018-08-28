<template>
  <div :style="{backgroundColor: footerColor}" class="footer" @click="footIconFun">
    <img :src="musicPlayedNow.songImg" id="song-img"></img>
    <span id="song-name">{{musicPlayedNow.songName}}</span>
    <span id="song-lyric">{{musicPlayedNow.lyric}}</span>
    <!--<span :style="{background: playState}" style="right: 46px" class="footer-icon" id="footer-icon-play"></span>!-->
    <div id="footer-icon-play" class="con-center">
      <icon name="play" style="transform: rotate(-90deg);" :width="pxToVwStr(25)" :height="pxToVwStr(25)" :linestyle="{'visibility': isPlaying?'visible':'hidden'}" :pathstyle="{'visibility': isPlaying?'hidden':'visible'}" :circlestyle="isPlaying?circledataplaying:circledatapause"></icon>
    </div>
    <icon name="footerList" class="footer-icon" id="footer-icon-list"></icon>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  mounted() {
    this.myAudio = document.getElementById("myAudio");
    this.playIconCircle = document.getElementById("play-circle");
    this.circleLength = (this.playIconCircle.getTotalLength === undefined) ? 552.027099609375 : this.playIconCircle.getTotalLength();
    console.log(`circleLength: ${this.circleLength}`)
    let circlePrc = this.circleLength * this.songTimeNow / this.musicPlayedNow.songTime;
    this.playIconCircle.setAttribute("stroke-dasharray", circlePrc + ",10000");
    //this.playIconCircle.setAttribute("stroke-dasharray", this.songPlayedPrecent + ",10000");
  },
  computed: {
    ...mapState([
      'footerColor',
      'musicPlayedNow',
      'playState',
      'lrcData',
      'isPlaying',
      'songTimeNow',
      'songPlayedPrecent'
    ])
  },
  data() {
    return {
      start:0.2,
      circledataplaying: [{"cx": "93","cy": "93","r": "88","stroke-width": "10","stroke": "#d9d9d9","fill": "none","iconindex": 0}],
      circledatapause: [{"cx": "93","cy": "93","r": "88","stroke-width": "10","stroke": "#211915","fill": "none", "iconindex": 0}]
    }
  },
  methods: {
    ...mapMutations([
      'tooglePlayState'
      ]),
    footIconFun(ev) {
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      console.log(target);
      switch (target.id) {
        case 'footer-icon-play':
          this.$store.commit('hotSearchDataChange', {add: false});
          this.$store.commit('tooglePlayState');
          if (this.isPlaying) {
            this.myAudio.play();
          } else {
            this.myAudio.pause();
          }
          break;
        case 'footer-icon-list':
          console.log("list");this.$store.commit('hotSearchDataChange', {add: true, name:"Attention"});break;
        default:
          console.log('go player');
          this.$store.commit('getCurrentPath', this.$router.history.current.fullPath);
          this.$router.push({path:'/Player'});
          break;
      }
    }
  },
  watch: {
    songTimeNow: {
      handler(now, old) {
        console.log("circle" + now);
        let circlePrc = this.circleLength * now / this.musicPlayedNow.songTime;
        this.playIconCircle.setAttribute("stroke-dasharray", circlePrc + ",10000");
        //this.playIconCircle.setAttribute("stroke-dasharray", this.songPlayedPrecent + ",10000");
      }
    }
  }
}
</script>

<style lang="scss">
.footer {
  height: 100%;
  z-index: 3;
  position: absolute;

  #song-img {
    width: 37.5px;
    height: 37.5px;
    left: 6px;
    top: 6px;
    position: absolute;
  }
  #song-name {
    display: inline-block;
    width: 35%;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0;
    font-size: 13px;
    top: 8px;
    left: 50px;
    position: absolute;
  }
  #song-lyric {
    display: inline-block;
    width: 46%;
    vertical-align: top;
    top: 25px;
    left: 51px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0;
    font-size: 12px;
    color: #787878;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.85);
    position: absolute;
  }
  .footer-icon {
    bottom: 8px;
    width: 25px;
    height: 25px;
    margin: 4px;
    position: absolute;
  }
  #footer-icon-list {
    right: 6px;
    pointer-events: none;
  }
  #footer-icon-play {
    right: 40px;
    width: 40px;
    height: 50px;
    position: absolute;

    & > svg {
      pointer-events: none;
    }
  }
}
</style>
