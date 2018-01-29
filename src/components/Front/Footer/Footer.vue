<template>
  <div :style="{backgroundColor: footerColor}" class="footer">
    <div @click="goToPlayer">
      <img :src="musicPlayedNow.songImg" class="song-img"></img>
      <span class="song-name">{{musicPlayedNow.songName}}</span>
      <span class="song-lyric">{{musicPlayedNow.lyric}}</span>
    </div>
    <span :style="{background: playState}" style="right: 46px" class="footer-icon" @click="tooglePlayState"></span>
    <span style="background: url('/static/footerList.svg');right: 6px" class="footer-icon"></span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapState([
      'footerColor',
      'musicPlayedNow',
      'playState',
      'lrcData'
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
    goToPlayer() {
      console.log('go player');
      this.$router.push({path:'/Player'});
    }
  }
}
</script>

<style lang="scss">
.footer {
  flex: .6;
  width: 100%;
  cursor: pointer;
  user-select:none;

  .song-img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin: 4px;
    margin-bottom: -20px;
  }
  .song-name {
    display: inline-block;
    width: 35%;
    vertical-align: top;
    margin-top: 6px;
    margin-left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0px;
    font-size: 20px;
  }
  .song-lyric {
    display: inline-block;
    width: 55%;
    vertical-align: top;
    margin-top: -8px;
    margin-left: 73px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0px;
    font-size: 10px;
    color: #787878;
  }
  .footer-icon {
    bottom: 10px;
    flex: 1;
    position: absolute;
    width: 40px;
    height: 40px;
    margin: 4px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
  .footer {
    flex: .6;
    width: 100%;
    cursor: pointer;

  .song-img {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin: 4px;
    margin-bottom: -25px;
  }
  .song-name {
    display: inline-block;
    width: 35%;
    vertical-align: top;
    margin-top: 6px;
    margin-left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0px;
    font-size: 14px;
  }
  .song-lyric {
    display: inline-block;
    width: 46%;
    vertical-align: top;
    margin-top: 0px;
    margin-left: 50px;
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
    bottom: 1%;
    flex: 1;
    position: absolute;
    width: 25px;
    height: 25px;
    margin: 4px;
  }
}
}
</style>
