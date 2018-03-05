<template>
  <div :style="{backgroundColor: skinColor}" class="header" @click.stop="iconFun">
    <!--<span :style="{background: item.imgUrl,left: item.leftStyle}" class="head-icon" :id="index"></span>!-->
    <icon v-for="(item, index) of iconName" :name="item.iconName" class="head-icon" :key="item.id" :id="item.id" width="25px" height="25px" :color="iconColor"></icon>
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
    ])
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
          console.log(0);alert(document.documentElement.clientWidth + "+" + document.documentElement.clientHeight + "+" + window.innerWidth + "+" + window.innerHeight);break;
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
  $icon-data: (1, 15px),(2, 110px),(3, 167.5px),(4, 225px),(5, 320px);
  @each $index, $data in $icon-data {
    & :nth-child(#{$index}) {
      left: $data;
    }
  }
  .head-icon {
    position: absolute;
    top: 30px;
    cursor: pointer;

    & > path {
      pointer-events: none;
    }
  }
}

</style>