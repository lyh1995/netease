<template>
  <div :style="{backgroundColor: skinColor}" class="header">
    <span class="head-icon" @click="goback" :style="{background: backicon}"></span>
    <input type="text" class="searchtext" v-model="songname" :style="{backgroundColor: skinColor}" placeholder="search" @keyup.enter="search" @focus="getfocus" @blur="losefocus">
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
      this.$store.commit('toogleHead', true);
    },
    search() {
      /*console.log(this.songname);
      let req = Object.assign({
        keywords:this.songname
      });
      console.log(req);
      */
      let reqStr = `/netApi/search?keywords=${this.songname}`;
      this.$axios.get(reqStr).then(res => {
        console.log(res);
      });
      let reqStrs = `/netApi/album?id=35150843`;
      this.$axios.get(reqStrs).then(res => {
        console.log(res);
      });
      let reqStrt = `/netApi/testapi?keywords=${this.songname}`;
      this.$axios.get(reqStrt).then(res => {
        console.log(res);
      });
      /*this.$axios.get('/netApi/music/url?id=460043703').then(res => {
        console.log(res);
      });*/
    },
    getfocus() {
      let body = document.body.clientHeight;
      console.log(body);
      document.getElementsByTagName('body')[0].style.height = body + "px";
    },
    losefocus() {
      document.getElementsByTagName('body')[0].style.height = "100%";
      console.log(document.getElementsByTagName('body')[0].style.height);
    }
  }
}
</script>


<style lang="scss">
.header {
  flex: .7;
  width: 100%;

  .head-icon {
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
  .header {
  flex: 1;
  width: 100%;

    .head-icon {
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