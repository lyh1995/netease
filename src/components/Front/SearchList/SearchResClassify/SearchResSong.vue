<template>
  <div class="search-res-song">
    <div class="best-match" v-show="isSearchNameRight">
      <div class="best-match-span">
        <span>最佳匹配</span>
      </div>
      <div class="best-match-singer">
        <img :src="bestMatchSinger"></img>
      </div>
      <div class="best-match-video">
        <img :src="bestMatchSinger"></img>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'SearchResSong',
  computed: {
    ...mapState([
      'isSearchNameRight'
    ])
  },
  data() {
    return {
      bestMatchSinger: '/static/reputation.jpg'
    }
  },
  methods: {
    ...mapMutations([
      ])
  }
}
</script>


<style lang="scss">
.search-res-song {
  position: relative;
  overflow: auto;

  .best-match-span {
    height: 35px;
    fonsize: 12px;
    position: relative;

    & > span {
      position: absolute;
      left: 5px;
      top: 12px;
    }
  }
  .best-match-singer {
    height: 60px;
    fonsize: 12px;
    position: relative;
    border-bottom: .5px inset;

    & > img {
      position: absolute;
      left: 5px;
      top: 2px;
      width: 55px;
      height: 55px;
    }
  }
  .best-match-video {
    height: 55px;
    fonsize: 12px;
    position: relative;
    border-bottom: .5px inset;

    & > img {
      position: absolute;
      left: 5px;
      top: 2px;
      width: 90px;
      height: 50px;
    }
  }
}
</style>
