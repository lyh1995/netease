<template>
  <div class="aside-list">
    <div class="aside-list-left">
      <div class="aside-head">
      </div>
      <div class="aside-foot">
        <div class="aside-foot-up">
          <div v-for="(item, index) of iconList" class="aside-foot-up-item">
            <icon name="searchHistory" :width="pxToVwStr(15)" :height="pxToVwStr(15)"></icon>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="aside-foot-down">
        </div>
      </div>
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
      iconList: [{
        name: "我的消息",
        icon: ""
      }, {
        name: "VIP会员",
        icon: ""
      }, {
        name: "商城",
        icon: ""
      }, {
        name: "在线听歌免流量",
        icon: ""
      }, {
        name: "我的好友",
        icon: ""
      }, {
        name: "附近的人",
        icon: ""
      }, {
        name: "个性换肤",
        icon: ""
      }, {
        name: "听歌识曲",
        icon: ""
      }, {
        name: "定时停止播放",
        icon: ""
      }, {
        name: "扫一扫",
        icon: ""
      }]
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
    position: relative;
    height: 100%;
    width: 295px;

    .aside-head {
      position: relative;
      height: 172.5px;
      background-color: rgb(21,20,25);
    }
    .aside-foot {
      position: relative;
      height: 470px;
      background-color: rgb(255,255,255);

      .aside-foot-up {
        position: relative;
        height: 420px;

        @for $index from 1 through 10 {
          & :nth-child(#{$index}) {
            @if $index == 4 {
              height: 46px;
              border-bottom: 5px solid rbg(239,243,242);
            } @else if $index == 6 {
              height: 46px;
              border-bottom: 5px solid rbg(239,243,242);
            } @else {
              height: 41px;
            }
          }
        }
        .aside-foot-up-item {
          position: relative;

          & > svg {
            position: absolute;
            top: 17px;
            left: 12.5px;
            height: 15px;
          }
          & > span {
            top: 13px;
            left: 40px;
            position: relative;
            font-size: 13.8px;
          }
        }
      }
      .aside-foot-down {
        position: relative;
        height: 47.5px;
        border-top: 2.5px solid rgb(239,243,242);
      }
    }
  }
  .aside-list-right {
    position: relative;
    left: 295px;
    top: -100%;
    height: 100%;
    width: 65px;
    opacity: .6;
    background-color: black;
  }
}
</style>
