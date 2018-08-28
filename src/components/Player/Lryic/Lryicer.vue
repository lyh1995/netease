<template>
  <div class="lryicer" @click="goRoller" @mousewheel="scrolling">
    <div class="volume">
    </div>
    <div class="lrcbox" ref="lrcbox" @touchmove.stop="touchMove" @touchstart.stop.prevent="touchStart" @touchend.stop.prevent="touchEnd">
      <div v-for="(item, index) of newLrc" class="lrc" :style="{'opacity':(strix === index - 4)?'1':'.6'}">
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
      try {
        if (this.$refs.lrcbox) {
          this.$refs.lrcbox.scrollTop = this.$refs.lrcbox.children[this.strix + 4].offsetTop - this.$refs.lrcbox.children[4].offsetTop;//需要用js加个scroll动画
          this.$store.commit('scroll', false);
        } else {
          console.log("lrcbox dont exist");
        }
      } catch(error) {
        console.log("oh... an error happen");
      }
    },
    scrollTimeFun(step, scrollLength, time) {
      if (this.$refs.lrcbox) {
        this.$refs.lrcbox.scrollTop += step;
        this.scrollStrix++;
        if (this.scrollStrix !== this.freq) {
          setTimeout(() => this.scrollTimeFun(step, scrollLength, time), time);
        } else {
          this.scrollStrix = 0;
          this.$refs.lrcbox.scrollTop = scrollLength;
        }
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
    },
    touchStart(e) {
      console.log(e);
      this.startY = e.touches[0].clientY;
      this.startScrollTop = this.$refs.lrcbox.scrollTop;
      this.isTouchMoving = false;
    },
    touchMove(e) {
      clearTimeout(this.timer);
      this.$store.commit('scroll', true);
      this.timer = setTimeout(this.timeFun, 3000);
      let moveDis = this.startY - e.touches[0].clientY;
      console.log(`startX:${this.startY}---clientX${e.touches[0].clientY}`);
      console.log(moveDis);
      this.$refs.lrcbox.scrollTop = this.startScrollTop + moveDis;
      this.isTouchMoving = true;
    },
    touchEnd(e) {
      if (!this.isTouchMoving) {
        this.goRoller();
      }
    }
  }
}

</script>

<style lang="scss">
.lryicer {
  width: 100%;
  height: 100%;
  position: relative;

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
      color: white;
    }
  }
}

</style>
