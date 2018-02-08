<template>
  <div class="search-list">
    <MySearchSongList v-show="isShowSearchSongList"></MySearchSongList>
    <div class="classify">
      <div v-for="(value, key) of classifyList" @click="changeClassFy" :id="key" class="classify-container" :class="(pageNowIndex === key)?'classify-selected':''">
        <span class="search-span":id="key + '0'">{{value}}</span>
      </div>
    </div>
    <MySearchResSong></MySearchResSong>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import MySearchSongList from './SearchSongList/SearchSongList.vue'
import MySearchResSong from './SearchResClassify/SearchResSong.vue'

export default {
  name: 'SearchList',
  components: {
    MySearchSongList,
    MySearchResSong
  },
  activated() {
    this.$store.commit('toogleHead', false);
  },
  deactivated() {
    this.$store.commit('toogleHead', true);
  },
  computed: {
    ...mapState([
      'isShowSearchSongList'
    ])
  },
  data() {
    return {
      classifyList: {
        a_song: "单曲",
        b_singer: "歌手",
        c_album: "专辑",
        d_songSheet: "歌单",
        e_video: "视频",
        f_radio: "主播电台",
        g_user: "用户"
      },
      pageNowIndex: "a_song"
    }
  },
  methods: {
    ...mapMutations([
      ]),
    changeClassFy(ev) {
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      switch (target.id[0]) {
        case 'a':
            this.pageNowIndex = "a_song";break;
        case 'b':
            this.pageNowIndex = "b_singer";break;
        case 'c':
            this.pageNowIndex = "c_album";break;
        case 'd':
            this.pageNowIndex = "d_songSheet";break;
        case 'e':
            this.pageNowIndex = "e_video";break;
        case 'f':
            this.pageNowIndex = "f_radio";break;
        case 'g':
            this.pageNowIndex = "g_user";break;
      }
    }
  }
}
</script>


<style lang="scss">
.search-list {
  background-color: #F0F4F3;

  .classify {
    height: 40px;
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #FFFFFF;

    .classify-container {
      width: 75px;
      height: 40px;
      text-align: center;//水平居中
      line-height: 40px;//跟高度一样
      border-bottom-width: 2px;
      border-bottom-color: red;
    }
    .classify-selected {
      border-bottom: 2px solid #D43C31;
      color: #D43C31;
    }
  }
}
</style>
