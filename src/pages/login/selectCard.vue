<style lang="less" scoped>
    @import "../../assets/less/config";

    #selectCardPage .form {
        width: 80%;
        padding: 0 10%;
    }

    #selectCardPage .line {
        text-align: center;
        position: relative;
        padding-top: 20px;
    }

    #selectCardPage .line-border {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    #selectCardPage .line-padding {
        padding-top: 60px;
    }

    #selectCardPage .icon {
        width: 20px;
        position: absolute;
        top: 28px;
        left: 10px;
    }

    @media (max-width:320px) {
        #selectCardPage .line {
            text-align: center;
            position: relative;
            padding-top: 20px;
        }
        #selectCardPage .icon {
            width: 20px;
            position: absolute;
            top: 18px;
            left: 10px;
        }
    }

    #selectCardPage .text {
        box-sizing: border-box;
        width: 80%;
        padding: 5px 15px;
        line-height: 28px;
        font-size: 14px;
        background: none;
        border: none;
        color: white;
    }

    #selectCardPage .btn {
        width: 50%;
        line-height: 38px;
        border-radius: 5px;
        /*border: 1px solid darken(@main, 3%);*/
        border: none;
        font-size: 14px;
        color: #fff;
        background: #1082b1;
    }

    #selectCardPage .banner {
        width: 100%;
        margin-bottom: 30px;
    }

    #selectCardPage .forgot-pwd {
        float: left;
        padding-left: 20px;
        color: #999;
    }

    #selectCardPage .reg-new-account {
        float: right;
        padding-right: 20px;
        color: #999;
    }

    #selectCardPage.content {
        background-color: #e0dbdb;
    }

    #selectCardPage .logo-box {
        text-align: center;
        color: white;
        padding: 10px;
        height: 210px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    #selectCardPage .logo-box img {
        width: 60px;
    }

    #selectCardPage .logo-box h2 {
        font-weight: 400;
        letter-spacing: 2px;
    }


    #selectCardPage .guide-box .title {
        color: white;
        padding: 15%;
        text-align: center;
    }

    #selectCardPage .guide-box {
        background-color: #00b8ee;
        height: 170px;
        font-size: 20px;
    }

    #selectCardPage .card-box {
        margin: 10px;
        padding: 3px;
        background-color: white;
        border-radius: 5px;
        height: 150px;
        display: flex;
        align-items: center;
    }

    #selectCardPage .card-box .card-cover {
        text-align: center;
    }

    #selectCardPage .card-box .card-cover img {
        max-height: 100%;
        width: 70%;
    }

    #selectCardPage .card-box .select-box {}

    #selectCardPage .card-box .select-box .custom-radio {
        position: relative;
        left: 20px;
    }

    #selectCardPage .card-box .select-box .custom-radio input {
        position: absolute;
        left: 2px;
        top: 2px;
        margin: 0;
    }

    #selectCardPage .card-box .select-box .custom-checkbox label,
    .custom-radio label {
        background: url(../../assets/images/login/radiobutton.gif) no-repeat;
        background-position: -10px -14px;
    }

    #selectCardPage .card-box .select-box .custom-radio label.checked {
        background-position: -10px -214px;
    }

    #selectCardPage .card-box .select-box .custom-radio label {
        display: block;
        position: relative;
        font-size: 1.3em;
        line-height: 1;
        height: 25px;
        width: 25px;
        cursor: pointer;
    }

    #selectCardPage .submit-btn {
        position: fixed;
        opacity: 0.6;
        bottom: 3%;
        right: 4%;
    }

    #selectCardPage .submit-btn button {
        background-color: #00b8ee;
        border: none;
        border-radius: 50%;
        padding: 10px;
        width: 45px;
        height: 45px;
        color: white;
        font-size: 12px;

    }

</style>
<template>
    <div>
        <v-header title=""></v-header>
        <v-content id="selectCardPage">
            <div class="guide-box">
                <p class="title">请选择您喜欢的卡面，定制属于您专属的会员卡</p>
            </div>
            <div class="card-box" @click="selectCardNo = 1">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 1}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card1.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 2">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 2}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card2.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 3">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 3}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card3.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 4">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 4}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card4.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 5">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 5}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card5.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 6">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 6}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card6.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 7">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 7}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card7.png" >
                </div>
            </div>
            <div class="card-box" @click="selectCardNo = 8">
                <div class="select-box">
                    <div class="custom-radio">
                        <input type="radio">
                        <label v-bind:class="{checked:selectCardNo == 8}"></label>
                    </div>
                </div>
                <div class="card-cover">
                <img src="../../assets/images/login/card8.png" >
                </div>
            </div>
            
            <div class="submit-btn">
                <button type="button" @click="goIndex">确定</button>
            </div>
            
        </v-content>
        <!--* 加载动画 load true/false 显示/隐藏；type 1-7 7种样式 *-->
        <v-loading :type="1" :load="loading" :msg="loadingMsg"></v-loading>
    </div>
</template>
<script>
    //* 引用工具函数包并以混入的形式加载
    import util from '../../assets/js/util'

    export default {
        data() {
            return {
                //* 提交表单信息
                form: {
                    username: '',
                    password: '',
                },
                selectCardNo: 1,
                //* 是否启用加载动画
                enableLoading: true,
                //* 加载动画显示状态
                loading: false,
                //* 加载动画提示文字
                loadingMsg: '',
            }
        },
        mounted() {

        },
        methods: {
            /**
             * 功能 跳转主页面
             * 参数 无
             * 返回 无
             **/
            goIndex() {
                //localStorage.setItem('selectCardNo', this.selectCardNo);
                this.$router.push({
                    path: this.CONST.ROUTER.indexPage
                })
            },
            /**
             * 功能 跳转重置密码页面
             * 参数 无
             * 返回 无
             **/
            goReset() {
                this.$router.push({
                    path: this.CONST.ROUTER.resetPage
                })
            }
        },
        mixins: [util]
    }

</script>
