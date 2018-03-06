<template>
  <div class="search-history">
    <MySearchSongList v-show="isShowSearchSongList"></MySearchSongList>
    <div class="singer-classify">
      <span>歌手分类</span>
    </div>
    <div class="hot-search">
      <span>热门搜索</span>
      <transition-group name="hotsearch" tag="div">
        <div v-for="(item, index) in hotSearchData" :key="index" class="hot-search-con">
          <span>{{item}}</span>
        </div>
      </transition-group>
    </div>
    <div class="searched-song-history">
      <transition-group name="songhistory" tag="div">
        <div v-for="(item, index) in searchHistoryData" :key="index" class="search-history-con">
          <span>{{item}}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import MySearchSongList from './SearchSongList/SearchSongList.vue'

export default {
  name: 'SearchHistory',
  components: {
    MySearchSongList
  },
  computed: {
    ...mapState([
      'isShowSearchSongList',
      'hotSearchData',
      'searchHistoryData'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      ])
  }
}
</script>


<style lang="scss">
.hotsearch-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
.hotsearch-leave-to {
  opacity: 0;
}
.search-history {
  background-color: #F0F4F3;

  .singer-classify {
    position: relative;
    width: 100%;
    height: 45px;
    border-bottom: .5px inset;

    & > span {
      position: absolute;
      left: 155px;
      top: 15px;
      font-size: 13px;
    }
  }
  .hot-search {
    position: relative;
    width: 100%;
    height: 210px;
    
    & > span {
      position: absolute;
      top: 22px;
      left: 10px;
      font-size: 12.5px;
      color: gray;
    }
    & > div {
      position: absolute;
      left: 5px;
      top: 45px;
      width: 350px;
      height: 155px;
      overflow: hidden;

      .hot-search-con {
        margin: 5px;
        display: inline-block;
        white-space: nowrap;
        height: 28.75px;
        border-radius: 15px;
        border: 1px solid;
        border-color: gray;
        transition: all 1s;

        & > span {
          margin: 0 10px 0 10px;
          display: inline-block;
          text-align: center;
          line-height: 28.75px;
        }
      }
    }
  }
  .searched-song-history {
    position: relative;
    height: 250px;

    & > div {
      position: relative;
      top: 3px;

      .search-history-con {
        position: relative;
        height: 45px;

        & > span {
          position: absolute;
          left: 30px;
          top: 18px;
        }
      }
    }
  }
}
</style>
