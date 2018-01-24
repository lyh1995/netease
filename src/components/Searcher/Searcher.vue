<template>
  <div class="searcher">
    <div class="head" :style="{backgroundColor: skinColor}">
      <span class="head-icon" @click="goback" :style="{background: backicon,left: '0%'}"></span>
      <input type="text" class="searchtext" v-model="songname">
      <span class="head-icon" @click="search" :style="{background: searchicon,left: '85.9%'}"></span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Searcher',
  computed: {
    ...mapState([
      'skinColor'
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
      this.$router.push({path:'/'});
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
    }
  }
}
</script>


<style lang="scss">
.searcher {
  width: 100%;
  height: 100%;
  position: relative;
  user-select:none;

  .head {
    width: 100%;
    height: 30%;

    .head-icon {
      position: absolute;
      width: 35px;
      height: 35px;
      margin: 18px 15px 15px 15px;
      cursor: pointer;
    }
    .text {
      width: 50%;
    }
  }
}
</style>