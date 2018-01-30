<template>
  <div class="search-song-list">
    <div class="container">
      <span class="search-span">搜索"{{songSearched}}"</span>
    </div>
    <div v-for="(item, index) of songSearchList" @click="searchName">
      <div class="container" :id="index">
        <span class="search-span":id="index + 'i'">{{item.name}}</span>
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
      'songSearchList',
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
    searchName(ev) {
      //shi jian wei tuo
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      if (target.nodeName.toLocaleLowerCase() === "span" || target.nodeName.toLocaleLowerCase() === "div") {
        let eveId = parseInt(target.id[0]);
        console.log(eveId);
        console.log(this.songSearchList[eveId].id);
        this.$store.commit('musicIdChange', this.songSearchList[eveId].id);
      }
    }
  }
}
</script>


<style lang="scss">
.search-song-list {
  position: absolute;
  width: 90%;
  left: 5%;
  top: 1%;
  box-shadow: 0px 3px 20px 3px gray;

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
    }
  }
}
</style>
