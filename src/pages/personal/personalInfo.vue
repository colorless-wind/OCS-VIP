<style lang="less" scoped>
    @import "../../assets/less/config";

    #personalInfoPage.content {
        background-color: #f0eff5;
    }

    @media (max-width:320px) {
        #personalInfoPage .line {
            padding: 10px 0;
            text-align: center;
            position: relative;
        }
    }

    #personalInfoPage .user-info {
        margin: 5% 0;
        padding-top: 0;
    }

    #personalInfoPage .user-info .title {
        color: #888888;
        padding: 15px;
        padding-left: 15px;
        font-size: 16px;
        text-align: left;
    }

    #personalInfoPage .line {
        padding: 20px 0;
        text-align: center;
        position: relative;
        background-color: white;
        padding-left: 15px;
        text-align: left;
        font-size: 15px;
    }

    #personalInfoPage .line .left {
        width: 13%;
        display: inline-block;
        color: black;
    }

    #personalInfoPage .line .right {
        width: 70%;
        display: inline-block;
        color: #777;
    }

    #personalInfoPage .line-hr {
        height: 1px;
        background-color: white;
        margin-right: 92%;
    }

</style>
<template>
<div>
    <v-header title=""></v-header>
    <v-content id="personalInfoPage">
        <div class="user-info">
            <!--* 标题 *-->
            <div class="title">会员信息</div>
            <!--* 姓名 *-->
            <div class="line">
                <div class="left">姓名</div>
                <div class="right">王宪霖</div>
            </div>
            <div class="line-hr"></div>
            <!--* 手机号 *-->
            <div class="line">
                <div class="left">手机</div>
                <div class="right">15611740510</div>
            </div>
            <div class="line-hr"></div>
            <!--* 性别 *-->
            <div class="line">
                <div class="left">性别</div>
                <div class="right">男</div>
            </div>
            <div class="line-hr"></div>
            <!--* 所在地 *-->
            <div class="line">
                <div class="left">城市</div>
                <div class="right">北京</div>
            </div>
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
                //* 是否启用加载动画
                enableLoading: true,
                //* 加载动画显示状态
                loading: false,
                //* 加载动画提示文字
                loadingMsg: '',
            }
        },
        mounted() {
            
            this.selectUserDetail();
        },
        methods: {
            selectUserDetail() {
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                    merchantId: sessionStorage.getItem('merchantId') || 'no merchantId',
                    merchantName: sessionStorage.getItem('merchantName') || 'no merchantName'
                }, this.CONST.APP_ID, this.CONST.METHOD.selectUserDetail, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {

                    } else {
                        if (0 != response.status) {
                            this.toast("操作异常， 异常信息为：" + response.errorMsg);
                        }
                        if (0 != response.subStatus) {
                            this.toast("系统异常， 异常信息为：" + response.subErrorMsg);
                        }
                    }
                }).catch((err) => {
                    console.warn(err);
                })

            },
        },
        mixins: [util]
    }

</script>
