<template>
  <div class="music-list" :style="{backgroundColor: tabColor}">
    <div v-for="(item, index) of listData" class="list-item">
      <span :style="{background: item.icon}" class="list-icon"></span>
      <span class="list-name">{{item.listName}}</span>
    </div>
    <div class="list-created">
      <span :style="{background: initialTabData}" class="list-tab" @click="toogleTab"></span>
      <span class="mylist-created" @click="toogleTab">创建的歌单({{musicListCreated.length}})</span>
      <span class="list-setting" @click="toogleSettings"></span>
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
      'listData',
      'musicListCreated',
      'isMyListShow',
      'tabColor'
    ])
  },
  data() {
    return {
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
  padding-top: 4px;
  padding-left: 4px;
  padding-right:4px;
  flex:8;
  overflow: auto;
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;

  .list-item {
    padding: 4px 6px 0 6px;
    position: relative;
    margin-bottom: 4px;
    border-radius: 5px;
    cursor: pointer;

    .list-icon {
      display: inline-block;
      position: absolute;
      left: 15px;
      top: 18px;
      width: 25px;
      height: 25px;
      fill: #F08000;
    }

    span.list-name {
      display: inline-block;
      width: 85%;
      vertical-align: top;
      margin-top: 15px;
      margin-left: 45px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      padding-bottom: 15px;
      border-bottom: .5px inset;
    }
   }
}
.list-created {
  background-color: #E5E9E8;
  padding: 6px 0 6px 0;
  margin: 10px -4px 0 -4px;
  position: relative;
  cursor: pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;

  .list-tab {
    display: inline-block;
    position: absolute;
    left: 20px;
    top: 9px;
    width: 15px;
    height: 15px;
    background-size: contain;
  }
  .mylist-created {
    display: inline-block;
    vertical-align: top;
    margin-left: 45px;
    width: 77%;
  }
  .list-setting {
    background:url('/static/settings.svg');
    position: absolute;
    right: 20px;
    top: 7px;
    width: 20px;
    height: 20px;
    background-size: contain;
    display: inline-block;
  }
}
.my-list {
  padding: 4px 6px 0 6px;
  position: relative;
  margin-bottom: -20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  .mylist-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .mylist-name {
    display: inline-block;
    width: 65%;
    vertical-align: top;
    margin-top:-5px;
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0px;
    font-size: 23px;
  }
  .mylist-songnum {
    display: inline-block;
    width: 65%;
    vertical-align: top;
    margin-top: -25px;
    margin-left: 65px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 20px;
    font-size: 14px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px){
  .music-list {
    padding-top: 4px;
    padding-left: 4px;
    padding-right:4px;
    flex: 8;
    overflow: auto;
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    user-select:none;
    font-size: 14px;

    .list-item {
      padding: 4px 6px 0 6px;
      position: relative;
      margin-bottom: 4px;
      border-radius: 5px;
      cursor: pointer;

      .list-icon {
        display: inline-block;
        position: absolute;
        left: 15px;
        top: 18px;
        width: 20px;
        height: 20px;
        fill: #F08000;
      }

      span.list-name {
        display: inline-block;
        width: 85%;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 45px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        padding-bottom: 15px;
        border-bottom: .5px inset;
      }
     }
  }
  .list-created {
    background-color: #E5E9E8;
    padding: 6px 0 6px 0;
    margin: 0px -4px 0 -4px;
    position: relative;
    cursor: pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    user-select:none;
    font-size: 12px;

    .list-tab {
      display: inline-block;
      position: absolute;
      left: 20px;
      top: 6px;
      width: 15px;
      height: 15px;
      background-size: contain;
    }
    .mylist-created {
      display: inline-block;
      vertical-align: top;
      margin-left: 45px;
      width: 77%;
    }
    .list-setting {
      background:url('/static/settings.svg');
      position: absolute;
      right: 20px;
      top: 4px;
      width: 20px;
      height: 20px;
      background-size: contain;
      display: inline-block;
    }
  }
  .my-list {
    padding: 4px 6px 0 6px;
    position: relative;
    margin-bottom: -20px;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    .mylist-img {
      width: 45px;
      height: 45px;
      border-radius: 5px;
    }
    .mylist-name {
      display: inline-block;
      width: 65%;
      vertical-align: top;
      margin-top: 0px;
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 0px;
      font-size: 15px;
    }
    .mylist-songnum {
      display: inline-block;
      width: 65%;
      vertical-align: top;
      margin-top: -25px;
      margin-left: 60px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 20px;
      font-size: 12px;
      -webkit-transform-origin-x: 0;
      -webkit-transform: scale(0 85);
    }
  }
}
</style>