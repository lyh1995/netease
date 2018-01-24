<template>
  <div class="tab-index">
    <!-- 顶部 -->
    <MyHeader v-show="isShowHead"></MyHeader>
    <MySearcher v-show="!isShowHead"></MySearcher>
    <!-- tab页 -->
    <router-view v-show="isShowHead"></router-view>
    <div class="searchblank" v-show="!isShowHead"></div>
    <!-- 播放器 -->
    <MyFooter v-show="isShowFooter"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './Head/Header.vue'
import MyFooter from './Footer/Footer.vue'
import MySearcher from './Searcher/Searcher.vue'
import { mapState } from 'vuex'

export default {
  name: 'front',
  components: {
    MyHeader,
    MyFooter,
    MySearcher
  },
  computed: {
    ...mapState([
      'isShowHead',
      'isShowFooter'
    ])
  },
  data() {
    return {
    }
  }
}
</script>


<style lang="scss">
.tab-index {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .searchblank {
    padding-top: 4px;
    padding-left: 4px;
    padding-right:4px;
    flex:8;
    overflow: auto;
    background-color: #F0F4F3;
  }
}
</style>