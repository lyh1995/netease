<template>
  <div class="search-song-list">
    <div class="song-list-head">
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
      'songSearchList'
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
.search-song-list {
  position: absolute;
  width: 90%;
  left: 5%;
  height: 50%;
  background-color: red;
}
</style>
