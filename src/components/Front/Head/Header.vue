<template>
  <div :style="{backgroundColor: skinColor}" class="header">
    <div v-for="(item, index) of iconName" @click="iconFun">
      <!--<span :style="{background: item.imgUrl,left: item.leftStyle}" class="head-icon" :id="index"></span>!-->
      <icon :name="item.iconName" class="head-icon" :id="index" width="25px" height="25px" :color="iconColor"></icon>
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
    ])
  },
  data() {
    return {
      iconName: [{
        iconName: "asideList"
      }, {
        iconName: "music"
      }, {
        iconName: "wangyiyun"
      }, {
        iconName: "found"
      }, {
        iconName: "search"
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
      if (target.nodeName.toLocaleLowerCase() === "svg") {
        switch (target.id) {
          case '0':
            console.log(0);alert(document.documentElement.clientWidth + "+" + document.documentElement.clientHeight + "+" + window.innerWidth + "+" + window.innerHeight);break;
          case '1':
            console.log(1);window.open("http://localhost:8080/#/","","width=360,height=640");break;
          case '2':
            console.log(2);document.documentElement.webkitRequestFullScreen();break;
          case '3':
            console.log(3);document.webkitCancelFullScreen();break;
          case '4':
            //this.$router.push({path:'/Search'}); 
            this.$router.push({ path: '/Search' });
            break;
        }
      }
    }
  }
}
</script>


<style lang="scss">
.header {
  $icon-data: (1, 15px),(2, 110px),(3, 167.5px),(4, 225px),(5, 320px);
  @each $index, $data in $icon-data {
    & div:nth-child(#{$index}) > svg {
      left: $data;
    }
  }
  .head-icon {
    position: absolute;
    top: 30px;
    cursor: pointer;
  }
}

</style>