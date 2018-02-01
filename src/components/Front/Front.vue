<template>
  <div class="tab-index">
    <!-- 顶部 -->
    <!--<MyHeader v-show="isShowHead"></MyHeader>-->
    <!--<MySearcher v-show="!isShowHead"></MySearcher>-->
    <!-- tab页 -->
    <keep-alive>
      <router-view name="head" front-head></router-view>
    </keep-alive>
    <keep-alive>
      <router-view name="search" front-head></router-view>
    </keep-alive>
    <keep-alive>
      <router-view front-mid></router-view>
    </keep-alive>
    <!-- 播放器 -->
    <MyFooter v-show="isShowFooter" front-foot></MyFooter>
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
  width: 100%;
  height: 100%;

  [front-head] {
    height: 70px;
    width: 100%;
  }
  [front-mid] {
    padding: 0 4px 0 4px;
    height: 81.25%;
    overflow: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    font-size: 14px;
  }
  [front-foot] {
    position: absolute;
    height: 50px;
    width: 100%;
    cursor: pointer;
    bottom: 0px;
  }
}
</style>