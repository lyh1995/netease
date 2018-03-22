<template>
  <div class="search-history">
    <MySearchSongList v-show="isShowSearchSongList"></MySearchSongList>
    <div class="singer-classify">
      <span>歌手分类</span>
    </div>
    <div class="hot-search">
      <span>热门搜索</span>
      <transition-group name="hotsearch" tag="div">
        <div v-for="(item, index) in hotSearchData" :key="item" class="hot-search-con">
          <span>{{item}}</span>
        </div>
      </transition-group>
    </div>
    <div class="searched-song-history">
      <transition-group name="songhistory" tag="div">
        <div v-for="(item, index) in searchHistoryData" :key="item" class="search-history-con" @click.stop="searchHisFun(index)">
          <icon name="searchHistory" :width="pxToVwStr(15)" :height="pxToVwStr(15)" class="search-his-icon" ref="songhistoryItem"></icon>
          <div>
            <span>{{item}}</span>
            <div class="search-his-delete" :id="'search-his-item-'+index">
              <icon name="delete" :width="pxToVwStr(15)" :height="pxToVwStr(15)"></icon>
            </div>
          </div>
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
      ]),
    searchHisFun(index) {
      let e = window.event || arguments.calle.caller.arguments[0];
      let target = e.target;
      console.log(index);
      if (target.id) {
        console.log(target.id);
        this.$store.commit('searchHistoryDataChange', {add: false, index: index});
      } else {
        console.log("default");
      }
    }
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
  transform: translate3d(-100%, 0, 0);
}
.hotsearch-leave-active {
  position: absolute;
}
.hotsearch-move {
  transition: transform 10s;
}
.songhistory-enter {
  opacity: 0;
  transform: translate3d(20px, -277px, 0);
}
.songhistory-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.songhistory-leave-active {
  position: absolute;
  z-index: 5;
}
.search-history {
  background-color: #F0F4F3;

  .singer-classify {
    position: relative;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid rgba(128,138,135,0.1);

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
        border: 1px solid rgba(128,138,135,0.3);
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
        transition: all 1s;
        height: 45px;

        & > div {
          position: relative;
          top: -20px;
          left: 30px;
          width: 329px;
          height: 45px;
          border-bottom: 1px solid rgba(128,138,135,0.1);

          .search-his-delete {
            position: absolute;
            top: 10px;
            left: 295px;
            width: 25px;
            height: 25px;

            & > svg {
              position: relative;
              margin: 5px;
              pointer-events: none;
            }
          }
          & > span {
            font-size: 12px;
            position: absolute;
            top: 15px;
            left: 5px;
          }
        }
        .search-his-icon {
          position: relative;
          left: 10px;
          top: 15px;
        }
      }
    }
  }
}
</style>
