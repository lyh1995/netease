<template>
  <div class="search-song-list">
    <div class="container" @click="searchName('empty')">
      <span class="search-span">搜索"{{songSearched}}"</span>
    </div>
    <div v-for="(item, index) of suggestSearchList" @click="searchName(index)">
      <div class="container">
        <span class="search-span">{{item.name}}</span>
      </div>
    </div>
    <div class="song-list">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'SearchSongList',
  computed: {
    ...mapState([
      'suggestSearchList',
      'testSearchData',
      'songSearched'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      ]),
    searchName(index) {
      //shi jian wei tuo
      //let eve = ev || window.event,
      //target = eve.target || eve.srcElement,
      //eveId = parseInt(target.id[0]);
      console.log(index);
      let songName = (index === "empty") ? this.songSearched : this.suggestSearchList[index].name;
      this.$store.dispatch('getSearchSong', songName);
      this.$store.commit('searchHistoryDataChange', {add: true, name: songName});
      this.$router.push({ path: '/SearchRes' });
    }
  }
}
</script>


<style lang="scss">
.search-song-list {
  position: fixed;
  width: 340px;
  left: 10px;
  top: 75px;
  box-shadow: 0 3px 20px 3px gray;
  z-index: 1;

  .container {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: white;
    border-bottom: 1px inset;

    .search-span {
      position: absolute;
      width: 80%;
      left: 5%;
      top: 23%;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;
    }
  }
}
</style>
