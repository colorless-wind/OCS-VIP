<style lang="less" scoped>
    @import "../assets/less/config";
    .header {
        position: absolute;
        right: 0;
        left: 0;
        z-index: 10500;
        height: 0;
        line-height: 0;
        background: #fff;
/*        border-bottom: 1px solid #ddd;*/
        text-align: center;
        .item {
            width: 50px;
        }
        .title {
            overflow: hidden;
            padding: 0;
            margin: 0;
            text-align: center;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: calc(100% - 100px);
        }
    }

    .header .left-item {
        float: left;
    }

    .header .right-item {
        float: right;
    }

</style>
<style>
    #headerPage .weui-actionsheet__cell {
        line-height: 20px;
    }

</style>
<template>
  <header class="header" id="headerPage">
      <!--* 返回按钮 *-->
<!--
    <slot name="left">
      <div class="item left-item">
        <i class="iconfont icon-fanhui" @click="leftFn"></i>
      </div>
    </slot>
-->
      <!--* 标题 *-->
<!--    <h2 class="title">{{ title }}</h2>-->
      <!--* 功能菜单 *-->
<!--
    <slot name="right">
      <div class="item right-item" @click="rightFn">
        <i class="iconfont icon-menu"></i>
      </div>
    </slot>
-->
    <!--* 顶部导航栏选项菜单 *-->
<!--    <actionsheet v-model="isShowTopMenu" :menus="topMenus" show-cancel @on-click-menu="topMenuItem"></actionsheet>-->
  </header>
</template>
<script>
    //* 引用工具函数包并以混入的形式加载
    import util from '../assets/js/util'

    import {
        Cell,
        Group,
        Actionsheet
    } from 'vux'
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            onClickMenu: {
                type: Function,
                default: function() {
                    console.log('this is onClickMenu function');
                }
            }
        },
        components: {
            Cell,
            Group,
            Actionsheet
        },
        data() {
            return {
                //* 是否显示顶部导航菜单
                isShowTopMenu: false,
                //* 顶部导航菜单选项
                topMenus: {
                    menu1: '我的信息',
                    menu2: '投诉商家'
                },
            }
        },
        methods: {
            /** 左侧插槽逻辑 **/
            leftFn() {
                this.$router.go(-1);
            },
            /** 右侧插槽逻辑 **/
            rightFn() {
                this.isShowTopMenu = true;
            },
            /** 菜单选项点击逻辑 **/
            topMenuItem(item) {
                if (item == 'menu1') {
                    //do something
                    this.goPersonalInfoPage();
                } else if (item == 'menu2') {
                    //do something
                } else {
                    console.warn(item);
                }
            },
            goPersonalInfoPage() {
                this.$router.push({
                    path: this.CONST.ROUTER.personalInfoPage
                })
            },
        },
        mixins: [util]
    }

</script>
