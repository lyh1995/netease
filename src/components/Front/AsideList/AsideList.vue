<template>
  <div class="aside-list">
    <div class="aside-list-left">
    </div>
    <div class="aside-list-right" @click.stop="unShowAside">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'AsideList',
  computed: {
    ...mapState([
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      ]),
    unShowAside() {
      this.$store.commit('toogleAsideList');
    }
  }
}
</script>


<style lang="scss">
.aside-list {
  width: 100%;
  height: 100%;

  .aside-list-left {
    position: absolute;
    left: 0;
    height: 100%;
    width: 295px;
    background-color: gray;
  }
  .aside-list-right {
    position: absolute;
    left: 295px;
    height: 100%;
    width: 65px;
    opacity: .3;
    background-color: gray;
  }
}
</style>
