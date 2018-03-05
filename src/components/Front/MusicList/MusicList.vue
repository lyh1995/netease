<template>
  <div class="music-list" :style="{backgroundColor: tabColor}">
    <div v-for="(item, index) of listData" class="list-item">
      <icon :name="item.iconName" class="list-icon" width="20px" height="20px" color="#D43C31"></icon>
      <span class="list-name">{{item.listName}}</span>
    </div>
    <div class="list-created">
      <div class="icon-con" @click="toogleTab">
        <icon :name="initialTabData" class="list-tab" width="11px" height="11px" color="black"></icon>
      </div>
      <span class="mylist-created" @click="toogleTab">创建的歌单({{musicListCreated.length}})</span>
      <icon name="settings" class="list-setting" @click="toogleSettings" width="15px" height="15px" color="#8c8c8c"></icon>
    </div>
    <div v-for="(item, index) of musicListCreated" class="my-list" v-show="isMyListShow">
      <img :src="item.imgUrl" class="mylist-img"></img>
      <span class="mylist-name">{{item.name}}</span>
      <span class="mylist-songnum">{{item.songNum}}首</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Musiclist',
  computed: {
    ...mapState([
      'initialTabData',
      'musicListCreated',
      'isMyListShow',
      'tabColor'
    ])
  },
  data() {
    return {
      listData: [{
        iconName: "localMusic",
        listName: "本地音乐"
      }, {
        iconName: "recentPlayed",
        listName: "最近播放"
      }, {
        iconName: "download",
        listName: "下载管理"
      }, {
        iconName: "myRadio",
        listName: "我的电台"
      }, {
        iconName: "myCollection",
        listName: "我的收藏"
      }]
    }
  },
  methods: {
    ...mapMutations([
      'toogleTab',
      'toogleSettings'
      ])
  }
}
</script>


<style lang="scss">
.music-list {
  padding: 0 4px 0 4px;
  
  .list-item {
    height: 50px;
    position: relative;
    margin-bottom: 0;
    border-radius: 5px;
    cursor: pointer;

    .list-icon {
      display: inline-block;
      position: absolute;
      left: 11px;
      top: 14px;
    }

    span.list-name {
      position: absolute;
      display: inline-block;
      width: 85%;
      vertical-align: top;
      left: 46px;
      top: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      padding-bottom: 15px;
      border-bottom: .5px inset;
      font-size: 15px;
    }
  }
  .list-created {
    background-color: #E5E9E8;
    padding: 6px 0 6px 0;
    margin: 0 -4px 0 -4px;
    height: 30px;
    position: relative;
    cursor: pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    user-select:none;
    font-size: 12px;

    .icon-con {
      width: 34px;
      height: 100%;
      display: inline-block;

      .list-tab {
        display: inline-block;
        position: absolute;
        left: 12.5px;
        top: 8.5px;
        background-size: contain;
      }
    }
    .mylist-created {
      display: inline-block;
      vertical-align: top;
      position: absolute;
      left: 34px;
      width: 77%;
      color: #646464;
    }
    .list-setting {
      position: absolute;
      right: 16.5px;
      top: 7.5px;
      background-size: contain;
      display: inline-block;
    }
  }
  .my-list {
    padding: 4px 0 0 0;
    position: relative;
    height: 60px;
    margin-bottom: 0;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    * {
      position: absolute;
    }
    .mylist-img {
      width: 55px;
      height: 55px;
      left: 2px;
    }
    .mylist-name {
      display: inline-block;
      width: 230px;
      vertical-align: top;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0;
      font-size: 15px;
      top: 9px;
      left: 70px;
    }
    .mylist-songnum {
      display: inline-block;
      width: 230px;
      vertical-align: top;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      -webkit-transform-origin-x: 0;
      -webkit-transform: scale(0.95);
      top: 30px;
      left: 70px;
    }
  }
}
</style>