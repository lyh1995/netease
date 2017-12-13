<template>
  <div class="tab-index">
    <!-- 顶部 -->
    <MyHeader v-show="isShowHead"></MyHeader>
    <!-- tab页 -->
    <router-view></router-view>
    <!-- 播放器 -->
    <MyFooter v-show="isShowFooter"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './Head/Header.vue'
import MyFooter from './Footer/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'front',
  components: {
    MyHeader,
    MyFooter
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
}
</style>