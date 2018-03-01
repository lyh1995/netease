<template>
  <div class="tab-index">
    <!-- 顶部 -->
    <!--<MyHeader v-show="isShowHead"></MyHeader>-->
    <!--<MySearcher v-show="!isShowHead"></MySearcher>-->
    <!-- tab页 -->
    <keep-alive>
      <transition :name="(toPath === '/Search')?'searcheadin':'searcheadout'" mode="in-out">
        <router-view name="head" front-head></router-view>
        <router-view name="search" front-head></router-view>
      </transition>
    </keep-alive>
    <keep-alive>
      <transition :name="(toPath === '/Search')?'searcherin':'searcherout'" mode="in-out">
        <router-view front-mid></router-view>
      </transition>
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
      'isShowFooter',
      'toPath'
    ])
  },
  data() {
    return {
    }
  }
}
</script>


<style lang="scss">
.searcherin-enter, .searcherout-leave-to {
  opacity: 0;
  transform: translateY(710px);
}
.searcherin-enter-active, .searcherout-leave-active, .searcheadin-enter-active, .searcheadout-leave-activr {
  transition: all .5s ease;
  z-index: 2;
}
.searcherout-leave, .searcheadout-leave {
  z-index: 2;
}

.searcheadin-enter, .searcheadout-leave-to {
  opacity: 0;
  transform: translateY(640px);
}

.tab-index {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  [front-head] {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 70px;
    width: 100%;
  }
  [front-mid] {
    height: 81.25%;
    width: 100%;
    overflow: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    font-size: 14px;
    position: absolute;
    top: 70px;
    left: 0px;
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