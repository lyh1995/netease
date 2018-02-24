<template>
  <div class="search-history">
    <MySearchSongList v-show="isShowSearchSongList"></MySearchSongList>
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
.search-history {
  background-color: #F0F4F3;
}
</style>
