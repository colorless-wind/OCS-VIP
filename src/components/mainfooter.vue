<style lang="less" scoped>
  @import "../assets/less/config";
  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    height: 49px;
    text-align: center;
    background: #fff;
    border-top: 1px solid #ddd;
  ul {
    padding: 5px 0;
    margin: 0;
  li {
    list-style: none;
  a {
    position: relative;
    display: block;
    text-decoration: none;
    color: @text;
  i {
    display: block;
    line-height: 24px;
  }
  em {
    line-height: 16px;
    font-size: 13px;
    font-style: normal;
  }
  .count {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    padding: 1px 4px;
    line-height: 12px;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    opacity: 0.9;
    color: #fff;
    background: red;
  }
  }
  }
  .active {
  i,
  em {
    color: @main;
  }
  }
  }
  }
</style>
<template>
  <footer class="footer">
    <ul flex="box:mean">
      <li :class="{ active: item.path == $route.path }"  v-for="item in list">
        <router-link :to="item.path">
          <i class="iconfont" :class="[ item.icon ]"></i>
          <em>{{ item.title }}</em>
          <!-- <div class="count" v-if="item.path == '/my/messages' && count > 0">{{ count }}</div> -->
        </router-link>
      </li>
    </ul>
  </footer>
</template>
<script>
  import util from 'util'
  import { mapState } from 'vuex'
  export default {
    computed: mapState({ user: (state) => state.user }),
    data () {
      return {
        count: 0,
        list: [
          {
            title: '新手帮助',
            path: '/Help',
            icon: 'icon-helper'
          },
          {
            title: '我的信息',
            path: '/Blank',
            icon: 'icon-denglu'
          },
          {
            title: '我的订单',
            path: '/order/list',
            icon: 'icon-order'
          },
    /*      {
            title: '测试页面',
            path: '/my/home/',
            icon: 'icon-edit'
          },*/
         

        ]
      }
    },
    created () {
    
    },
    methods: {
    
    }
  }

</script>
