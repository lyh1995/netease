<template>
  <div class="search-list">
    <MySearchSongList v-show="isShowSearchSongList"></MySearchSongList>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import MySearchSongList from './SearchSongList/SearchSongList.vue'

export default {
  name: 'SearchList',
  components: {
    MySearchSongList
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
    }
  },
  methods: {
    ...mapMutations([
      ])
  }
}
</script>


<style lang="scss">
.search-list {
  padding-top: 4px;
  padding-left: 4px;
  padding-right:4px;
  flex:8;
  overflow: auto;
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;
  background-color: #F0F4F3;
}
@media screen and (min-width: 320px) and (max-width: 480px){
  .search-list {
    position: relative;
    padding-top: 4px;
    padding-left: 4px;
    padding-right:4px;
    flex: 8;
    overflow: auto;
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    user-select:none;
    background-color: #F0F4F3;
   }
}
</style>
