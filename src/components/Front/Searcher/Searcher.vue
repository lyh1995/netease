<template>
  <div :style="{backgroundColor: skinColor}" class="search-header">
    <span class="search-head-icon" @click="goback" :style="{background: backicon}"></span>
    <input type="text" class="searchtext" v-model="songname" :style="{backgroundColor: skinColor}" placeholder="search" @keyup="search" @focus="getfocus" @blur="losefocus" ref="inputext">
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Search',
  computed: {
    ...mapState([
      'skinColor',
      'isShowHead',
      'keycode'
    ])
  },
  data() {
    return {
      songname:'',
      backicon:`url('/static/goback.svg')`,
      searchicon:`url('/static/search.svg')`
    }
  },
  methods: {
    ...mapMutations([
      ]),
    goback() {
      this.$router.push({ path: '/' });
    },
    search(e) {
      if (this.keycode.indexOf(e.keyCode) !== -1) {
        if (!this.isStrAllBlank(this.songname)) {
          this.$store.commit('isShowSearchList', true);
          /*console.log(this.songname);
          let req = Object.assign({
            keywords:this.songname
          });
          console.log(req);
          */
          let codeSongName = escape(this.songname);
          let reqStr = `/netApi/search?keywords=${codeSongName}`;
          this.$axios.get(reqStr).then(res => {
            console.log(res);
            if (res.data.result.songs) {
              console.log(res.data.result.songs[0].id);
              let songName = [];
              for (let i = 0;i <= res.data.result.songs.length - 1;i++) {
                songName.push(res.data.result.songs[i].name);
              }
              console.log(songName);
              let songNameRes = this.getNoRepeatName(songName);
              console.log(songNameRes);
              this.$store.commit('getSongSearchList', songNameRes);
              this.$store.commit('musicIdChange', res.data.result.songs[0].id);
            } else {
              let str = [];
              this.$store.commit('getSongSearchList', str);
            }
          });
          let reqStrSuggest = `/netApi/search/suggest?keywords=${codeSongName}`;
          this.$axios.get(reqStrSuggest).then(res => {
            console.log(res);
            if (res.data.result.songs) {
              console.log("suggest" + res.data.result.songs[0].id);
              this.$store.commit('musicIdChange', res.data.result.songs[0].id);
            }
          });
          let reqStrs = `/netApi/album?id=35150843`;
          this.$axios.get(reqStrs).then(res => {
            console.log(res);
          });
          let reqStrt = `/netApi/testapi?keywords=${codeSongName}`;
          this.$axios.get(reqStrt).then(res => {
            console.log(res);
          });
          let reqStrtNoLimit = `/netApi/music/url?id=504425722`;
          this.$axios.get(reqStrtNoLimit).then(res => {
            console.log(res);
          });
          /*this.$axios.get('/netApi/music/url?id=460043703').then(res => {
            console.log(res);
          });*/
        }
        if (this.songname.length === 0) {
          this.$store.commit('isShowSearchList', false);
        }
      }
    },
    getfocus() {
      let body = document.body.clientHeight;
      console.log(body);
      document.getElementsByTagName('body')[0].style.height = body + "px";
      this.$store.commit('isShowSearchList', !this.isStrAllBlank(this.songname));
    },
    losefocus() {
      document.getElementsByTagName('body')[0].style.height = "100%";
      this.$store.commit('isShowSearchList', false);
    },
    getNoRepeatName(arr) {
      let low = [];
      let res = [];
      res.push(arr[0]);
      low.push(arr[0].toLowerCase());
      if (arr.length > 1) {
        for (let i = 1;i <= arr.length - 1;i++) {
          if (low.indexOf(arr[i].toLowerCase()) === -1) {
            res.push(arr[i]);
            low.push(arr[i].toLowerCase());
          }
        }
      }
      return res;
    },
    isStrAllBlank(str) {
      let bool = true;
      for (let i of str) {
        if(i !== " ") {
          bool = false;
        }
      }
      if (bool) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    isShowHead: {
      handler(now, old) {
        if (now === false) {
          this.$refs.inputext.focus();
        }
      }
    }
  }
}
</script>


<style lang="scss">
.search-header {
  flex: .7;
  width: 100%;

  .search-head-icon {
    position: absolute;
    flex: 1;
    width: 35px;
    height: 35px;
    top: 1.5%;
    cursor: pointer;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
  ::-webkit-input-placeholder{color: silver;}
  .search-header {
  flex: 1;
  width: 100%;

    .search-head-icon {
      position: absolute;
      flex: 1;
      width: 25px;
      height: 25px;
      top: 3%;
      left: 2%;
      cursor: pointer;
      display: inline-block;
    }
    .searchtext {
      outline: none;
      position: absolute;
      width: 80%;
      left: 14%;
      top: 3.8%;
      padding-bottom: 3px;
      font-size: 20px;
      color: white;
      placeholder: {color:#deacac;};
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-color: white;
      display: inline-block;
    }
}
}
</style>