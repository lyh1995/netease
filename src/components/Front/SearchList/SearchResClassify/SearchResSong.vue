<template>
  <div class="search-res-song">
    <div class="best-match" v-show="isSearchNameRight">
      <div class="best-match-span">
        <span>最佳匹配</span>
      </div>
      <div class="best-match-video">
        <img :src="bestMatchSinger"></img>
      </div>
      <div class="best-match-singer">
        <img :src="searchResArtist.pic"></img>
        <span>歌手: {{searchResArtist.name}}</span>
      </div>
      <div v-for="(item, index) of searchSongList" @click="playSong(index)" class="search-res-songitem">
        <span class="search-res-songname">{{item.name}}</span>
        <span class="search-res-artist">{{item.artistName}} - {{item.albumName}}</span>
      </div>
    </div>
    <div class="search-res-loading" v-if="isSearching">
      <vue-loading type="spin" color="#d9544e" :size="{ width: '50px', height: '50px' }" class="search-loading-pos"></vue-loading> 
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'SearchResSong',
  computed: {
    ...mapState([
      'isSearchNameRight',
      'searchSongList',
      'searchResArtist',
      'isSearching'
    ])
  },
  components: {
    VueLoading
  },
  data() {
    return {
      bestMatchSinger: '/static/reputation.jpg'
    }
  },
  methods: {
    ...mapMutations([
      ]),
    playSong(index) {
      this.$store.dispatch('getPlayingSongDetail', this.searchSongList[index]);
      this.$store.commit('searchHistoryDataChange', {add: true, name: this.searchSongList[index].name});
      this.$store.commit('playingSongChangeBySearch', index);
      this.$store.commit('initCacheHis');
    }
  }
}
</script>


<style lang="scss">
.search-res-song {
  position: relative;
  overflow: auto;

  .search-res-loading {
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);

    .search-loading-pos {
      margin-top: 50%;
    }
  }
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
      position: relative;
      left: 5px;
      top: 2px;
      width: 64px;
      height: 52px;
    }
    & > span {
      position: relative;
      left: 10px;
      top: -20px;
      font-size: 16px;
    }
  }
  .best-match-video {
    height: 55px;
    fonsize: 12px;
    position: relative;
    border-bottom: .5px inset;
    display: none;

    & > img {
      position: absolute;
      left: 5px;
      top: 2px;
      width: 90px;
      height: 50px;
    }
  }
  .search-res-songitem {
    height: 60px;
    position: relative;
    border-bottom: 1px solid rgba(128,138,135,0.1);

    .search-res-songname {
      position: absolute;
      font-size: 16px;
      top: 5px;
      left: 10px;
      color: #597bb0;
      pointer-events: none;
    }
    .search-res-artist {
      position: absolute;
      font-size: 12px;
      max-width: 250px;
      top: 35px;
      left: 10px;
      color: gray;
      pointer-events: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
