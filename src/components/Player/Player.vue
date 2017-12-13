<template>
  <div :style="{backgroundColor: playerBack}" class="player">
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapState([
      'playerBack'
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
.player {
  width: 100%;
  height: 100%;
}
</style>
