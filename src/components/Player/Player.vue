<template>
  <div :style="{backgroundColor: playerBack}" class="player">
    <div class="head">
      <div v-for="(item, index) of playerHeadIcon">
        <span :style="{background: item.imgUrl,left: item.leftStyle}" class="head-icon" @click="clickIcon(index)"></span>
      </div>
      <span class="song">{{musicPlayedNow.songName}}</span>
      <span class="singer">{{musicPlayedNow.singer}}</span>
    </div>
    <div class="mid" id="mid">
      <router-view></router-view>
    </div>
    <div class="foot">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapState([
      'playerBack',
      'playerHeadIcon',
      'musicPlayedNow'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      ]),
    clickIcon(index) {
      switch(index) {
        case 0:
          this.$router.push({path:'/'});break;
        case 1:
          console.log('share');
      }
    }
  }
}
</script>

<style lang="scss">
.player {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  user-select:none;

  .head {
    flex: .5;
    width: 100%;

    .head-icon {
      position: absolute;
      flex: 1;
      width: 35px;
      height: 35px;
      margin: 18px 15px 15px 15px;
      cursor: pointer;
    }
    .song {
      display: inline-block;
      width: 35%;
      vertical-align: top;
      margin-top: 18px;
      margin-left: 70px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 20px;
      color: #FFF;
    }
    .singer {
      display: inline-block;
      width: 55%;
      vertical-align: top;
      margin-top: -1px;
      margin-left: 73px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 10px;
      color: #FFF;
      opacity: .4;
    }
  }
  .mid {
    width: 100%;
    flex: 5;
  }
  .foot {
    width: 100%;
    flex: .7;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
.player {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  user-select:none;

  .head {
    flex: .5;
    width: 100%;

    .head-icon {
      position: absolute;
      flex: 1;
      width: 35px;
      height: 35px;
      margin: 18px 15px 15px 15px;
      cursor: pointer;
    }
    .song {
      display: inline-block;
      width: 35%;
      vertical-align: top;
      margin-top: 18px;
      margin-left: 70px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 20px;
      color: #FFF;
    }
    .singer {
      display: inline-block;
      width: 55%;
      vertical-align: top;
      margin-top: -1px;
      margin-left: 73px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 10px;
      color: #FFF;
    }
  }
  .mid {
    width: 100%;
    flex: 4;
  }
  .foot {
    width: 100%;
    flex: .9;
  }
}
}
</style>
