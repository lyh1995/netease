<template>
  <div class="lryicer" @click="goRoller" @mousewheel="scrolling">
    <div class="volume">
    </div>
    <div class="lrcbox" ref="lrcbox">
      <div v-for="(item, index) of newLrc" class="lrc" :style="{'color':(strix === index - 4)?'white':'black'}">
        <p :style="{'visibility':(item.index === 'x')?'hidden':'visible'}">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Lryicer',
  created() {
    let obj = { text: "a", index: "x" };
    let emptyAr = Array(4).fill(obj);
    this.newLrc = [...emptyAr, ...this.lrcData, ...emptyAr, obj];
  },
  mounted() {
    this.$refs.lrcbox.scrollTop = this.$refs.lrcbox.children[this.strix + 4].offsetTop - this.$refs.lrcbox.children[4].offsetTop;
  },
  computed: {
    ...mapState([
      'lrcData',
      'lrcScrollTop',
      'musicPlayedNow',
      'strix',
      'isScrolling'
    ])
  },
  data() {
    return {
      newLrc: [],
      timer: '',
      scrollTime: 0.3,
      freq: 10,
      scrollStrix: 0
    }
  },
  watch: {
    strix: {
      handler(now, old) {
        if (now === 0) {
          this.$refs.lrcbox.scrollTop = 0;
        } else if (!this.isScrolling) {
          let scrollLength = this.$refs.lrcbox.children[this.strix + 4].offsetTop - this.$refs.lrcbox.children[4].offsetTop;
          let length = Math.abs(this.$refs.lrcbox.scrollTop - scrollLength);
          let step = length / this.freq;
          let time = 1000 * this.scrollTime / this.freq;
          setTimeout(() => this.scrollTimeFun(step, scrollLength, time), time);
          //this.$refs.lrcbox.scrollTop = scrollLength;
        }
      }
    }
  },
  methods: {
    goRoller() {
      this.$store.commit('lrcScrollTopChange', this.$refs.lrcbox.scrollTop);
      this.$router.push({ path: '/Player' });
    },
    timeFun() {
      this.$refs.lrcbox.scrollTop = this.$refs.lrcbox.children[this.strix + 4].offsetTop - this.$refs.lrcbox.children[4].offsetTop;
      this.$store.commit('scroll', false);
    },
    scrollTimeFun(step, scrollLength, time) {
      this.$refs.lrcbox.scrollTop += step;
      this.scrollStrix++;
      if (this.scrollStrix !== this.freq) {
        setTimeout(() => this.scrollTimeFun(step, scrollLength, time), time);
      } else {
        this.scrollStrix = 0;
        this.$refs.lrcbox.scrollTop = scrollLength;
      }
    },
    scrolling(e) {
      clearTimeout(this.timer);
      this.$store.commit('scroll', true);
      this.timer = setTimeout(this.timeFun, 3000);
      if (e.wheelDelta > 0) {
        this.$refs.lrcbox.scrollTop -= 40;
      } else {
        this.$refs.lrcbox.scrollTop += 40;
      }
    }
  }
}

</script>

<style lang="scss">
.lryicer {
  width: 100%;
  height: 100%;
  background-color: #6E6E6E;

  .volume {
    width: 80%;
    height: 7%;
  }
  .lrcbox {
    margin: 0 auto 0 auto;
    width: 80%;
    height: 89%;
    overflow: hidden;

    .lrc {
      margin: 25px auto 25px auto;
      font-size: 18px;
      text-align: center;
      color: black;
    }
  }
}

</style>
