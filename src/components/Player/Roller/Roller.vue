<template>
  <div class="style">
    <img :src="musicPlayedNow.songImg" class="img"></img>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Roller',
  computed: {
    ...mapState([
      'musicPlayedNow'
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
.style {
  width: 100%;
  height: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-image: linear-gradient( to left, #6E6E6E, #6E6E6E, #D8D8D8, #FAFAFA, #D8D8D8, #6E6E6E, #6E6E6E) 1 30;

  .img {
    width: 360px;
    height: 360px;
    border-radius: 5px;
    margin: 100px 0 0 50px;
    border-radius: 50%;
    border: 50px solid #000;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
  .style {
  width: 100%;
  height: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-image: linear-gradient( to left, #6E6E6E, #6E6E6E, #D8D8D8, #FAFAFA, #D8D8D8, #6E6E6E, #6E6E6E) 1 30;

  .img {
    width: 240px;
    height: 240px;
    border-radius: 5px;
    margin: 50px 0 0 60px;
    border-radius: 50%;
    border: 35px solid #000;
  }
}
}
</style>