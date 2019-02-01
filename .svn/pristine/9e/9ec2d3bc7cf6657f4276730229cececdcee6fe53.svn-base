<style lang="less" scoped>
    @import "../../assets/less/config";

    #adPage .form {
        width: 80%;
        padding: 0 10%;
    }

    #adPage .line {
        padding: 20px 0;
        text-align: center;
        position: relative;
    }

    #adPage .icon {
        width: 20px;
        position: absolute;
        top: 28px;
        left: 10px;
    }

    @media (max-width:320px) {
        #adPage .line {
            padding: 10px 0;
            text-align: center;
            position: relative;
        }

        #adPage .icon {
            width: 20px;
            position: absolute;
            top: 18px;
            left: 10px;
        }
    }


    #adPage .text {
        box-sizing: border-box;
        width: 100%;
        padding: 5px 45px;
        line-height: 28px;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 14px;
        background-color: aliceblue;
    }

    #adPage .btn {
        width: 50%;
        line-height: 38px;
        border-radius: 5px;
        /*border: 1px solid darken(@main, 3%);*/
        border: none;
        font-size: 14px;
        color: #fff;
        background: #62a8ea;
    }

    #adPage .banner {
        width: 100%;
        margin-bottom: 30px;
    }

    #adPage .forgotPwd {
        float: left;
        padding-left: 20px;
        color: #999;
    }

    #adPage .ad-pic {
        width: 100%;
        height: 100%;
        opacity: 0.8;
    }

    #adPage .skip-btn {
        width: 40px;
        line-height: 25px;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 12px;
        position: absolute;
        bottom: 10%;
        right: 10%;
        text-align: center;
    }

    .vux-circle-demo {
        position: absolute;
        top: 1%;
        right: 5%;
    }

    .circle-style {
        width: 30px;
    }

    .vux-circle-demo>div {
        margin: 0 auto;
    }

</style>
<template>
  <div>
    <v-header title="">
      <div slot="left" class="item left-item" v-on:click="goLogin">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </v-header>
    <v-content id="adPage">
      <img src="../../assets/images/login/ad.jpg" class="ad-pic" />
      <div class="skip-btn" @click="goIndex">跳过</div>
        <div class="vux-circle-demo">
    <div class="circle-style">
      <x-circle
        :percent="percent"
        :stroke-width="12"
        :trail-width="12"
        :stroke-color="['#36D1DC', '#5B86E5']"
        trail-color="#ececec">
        <span style="color:#36D1DC"></span>
      </x-circle>
    </div>
  </div>
    </v-content>
  </div>
</template>
<script>
    import {
        XCircle
    } from 'vux'

    export default {
        components: {
            XCircle
        },
        data() {
            return {
                //* 计时器百分比最小0，最大100
                percent: 0, 
                //* 广告计时器
                adTimer: null, 
            }
        },
        mounted() {
            //* 不是第一次浏览则返回上级路由
            if (sessionStorage.getItem('skipAd')) {
                this.$router.go(-1);
                return false;
            }

            //* 广告计时器
            var global = this;
            // 3000 / 150 = 20; 100 / 20 = 5;
            this.adTimer = setInterval(function() {
                if (global.percent < 100) {
                    global.percent += 5;
                } else {
                    global.goIndex();
                    this.percent = 0
                }
            }, 150)

            //* 第一次浏览改变状态
            sessionStorage.setItem('skipAd', true);
        },
        methods: {
            goIndex() {
                this.$router.push({
                    path: this.CONST.ROUTER.indexPage
                })
                this.clearTimer();
            },
            goLogin() {
                this.$router.go(-1);
                this.clearTimer();
            },
            clearTimer() {
                clearInterval(this.adTimer);
            }
        }
    }

</script>
