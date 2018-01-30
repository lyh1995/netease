<template>
  <div :style="{backgroundColor: skinColor}" class="header">
    <div v-for="(item, index) of headIcon" @click="iconFun">
      <span :style="{background: item.imgUrl,left: item.leftStyle}" class="head-icon" :id="index"></span>
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
      'testData'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      ]),
    iconFun(ev) {
      //事件委托
      let eve = ev || window.event;
      let target = eve.target || eve.srcElement;
      if (target.nodeName.toLocaleLowerCase() === "span") {
        switch (target.id) {
          case '0':
            console.log(0);break;
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
  flex: .7;
  width: 100%;

  .head-icon {
    position: absolute;
    flex: 1;
    width: 35px;
    height: 35px;
    top: 1.5%;
    cursor: pointer;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
  .header {
  flex: 1;
  width: 100%;

  .head-icon {
    position: absolute;
    flex: 1;
    width: 25px;
    height: 25px;
    top: 3.7%;
    cursor: pointer;
  }
}
}
</style>