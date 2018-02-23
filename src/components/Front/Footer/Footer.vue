<template>
  <div :style="{backgroundColor: footerColor}" class="footer" @click="footIconFun">
    <img :src="musicPlayedNow.songImg" id="song-img"></img>
    <span id="song-name">{{musicPlayedNow.songName}}</span>
    <span id="song-lyric">{{musicPlayedNow.lyric}}</span>
    <span :style="{background: playState}" style="right: 46px" class="footer-icon" id="footer-icon-play"></span>
    <span style="background: url('/static/footerList.svg');right: 6px" class="footer-icon" id="footer-icon-list"></span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  mounted() {
    this.myAudio = document.getElementById("myAudio");
  },
  computed: {
    ...mapState([
      'footerColor',
      'musicPlayedNow',
      'playState',
      'lrcData',
      'isPlaying'
    ])
  },
  data() {
    return {
      start:0.2
    }
  },
  methods: {
    ...mapMutations([
      'tooglePlayState'
      ]),
    footIconFun(ev) {
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      switch (target.id) {
        case 'footer-icon-play':
          this.$store.commit('tooglePlayState');
          if (this.isPlaying) {
            this.myAudio.play();
          } else {
            this.myAudio.pause();
          }
          break;
        case 'footer-icon-list':
          console.log("list");break;
        default:
          console.log('go player');
          this.$store.commit('getCurrentPath', this.$router.history.current.fullPath);
          this.$router.push({path:'/Player'});
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.footer {
  height: 100%;
  
  *{
    position: absolute;
  }

  #song-img {
    width: 37.5px;
    height: 37.5px;
    left: 6px;
    top: 6px;
  }
  #song-name {
    display: inline-block;
    width: 35%;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0px;
    font-size: 13px;
    top: 8px;
    left: 50px;
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
    padding-bottom: 0px;
    font-size: 12px;
    color: #787878;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.85);
  }
  .footer-icon {
    bottom: 8px;
    width: 25px;
    height: 25px;
    margin: 4px;
  }
}
</style>
