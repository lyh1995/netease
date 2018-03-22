<template>
  <div :style="backColor" class="header" @click.stop="iconFun">
    <!--<span :style="{background: item.imgUrl,left: item.leftStyle}" class="head-icon" :id="index"></span>!-->
    <div v-for="(item, index) of iconName" :key="item.id" :id="item.id" class="head-icon con-center">
      <icon :name="item.iconName" :width="pxToVwStr(25)" :height="pxToVwStr(25)" :color="iconColor"></icon>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState([
      'skinColor',
      'headIcon',
      'testData',
      'iconColor'
    ]),
    backColor() {
      return {
        'background-color': this.skinColor
      }
    }
  },
  data() {
    return {
      iconName: [{
        iconName: "asideList",
        id: "asideList-id"
      }, {
        iconName: "music",
        id: "music-id"
      }, {
        iconName: "wangyiyun",
        id: "wangyiyun-id"
      }, {
        iconName: "found",
        id: "found-id"
      }, {
        iconName: "search",
        id: "search-id"
      }]
    }
  },
  methods: {
    ...mapMutations([
      ]),
    iconFun(ev) {
      //事件委托
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      console.log(target);
      switch (target.id) {
        case 'asideList-id':
          console.log(0);
          console.log(document.documentElement.clientWidth + "+" + document.documentElement.clientHeight + "+" + window.innerWidth + "+" + window.innerHeight);
          this.$store.commit('toogleAsideList');
          break;
        case 'music-id':
          console.log(1);window.open("http://localhost:8080/#/","","width=360,height=640");break;
        case 'wangyiyun-id':
          console.log(2);document.documentElement.webkitRequestFullScreen();break;
        case 'found-id':
          console.log(3);document.webkitCancelFullScreen();break;
        case 'search-id':
          //this.$router.push({path:'/Search'}); 
          this.$router.push({ path: '/Search' });
          break;
      }
    }
  }
}
</script>


<style lang="scss">
.header {
  $icon-data: (1, 12.5px),(2, 107.5px),(3, 165px),(4, 222.5px),(5, 317.5px);
  @each $index, $data in $icon-data {
    & :nth-child(#{$index}) {
      left: $data;
    }
  }
  .head-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 27.5px;
    cursor: pointer;

    & > svg {
      pointer-events: none;
    }
  }
}

</style>