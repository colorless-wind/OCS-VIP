<style lang="less" scoped>
    @import "../../assets/less/config";

    #loginPage .form {
        width: 80%;
        padding: 0 10%;
    }

    #loginPage .line {
        text-align: center;
        position: relative;
        padding-top: 20px;
    }

    #loginPage .line-border {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    #loginPage .line-padding {
        padding-top: 60px;
    }

    #loginPage .icon {
        width: 20px;
        position: absolute;
        top: 28px;
        left: 10px;
    }

    @media (max-width:320px) {
        #loginPage .line {
            text-align: center;
            position: relative;
            padding-top: 20px;
        }
        #loginPage .icon {
            width: 20px;
            position: absolute;
            top: 18px;
            left: 10px;
        }
    }

    #loginPage .text {
        box-sizing: border-box;
        width: 80%;
        padding: 5px 15px;
        line-height: 28px;
        font-size: 14px;
        background: none;
        border: none;
        color: white;
    }

    #loginPage .btn {
        width: 50%;
        line-height: 38px;
        border-radius: 5px;
        /*border: 1px solid darken(@main, 3%);*/
        border: none;
        font-size: 14px;
        color: #fff;
        background: #1082b1;
    }

    #loginPage .banner {
        width: 100%;
        margin-bottom: 30px;
    }

    #loginPage .forgot-pwd {
        float: left;
        padding-left: 20px;
        color: #999;
    }

    #loginPage .reg-new-account {
        float: right;
        padding-right: 20px;
        color: #999;
    }

    #loginPage.content {
        background-image: url(../../assets/images/login/bg.png);
        background-repeat: no-repeat;
        background-size: cover;
    }

    #loginPage .logo-box {
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

    #loginPage .logo-box img {
        width: 60px;
    }

    #loginPage .logo-box h2 {
        font-weight: 400;
        letter-spacing: 2px;
    }

    #loginPage .line label,
    #loginPage .line span {
        color: white;
    }

</style>
<template>
    <div>
        <v-header title=""></v-header>
        <v-content id="loginPage">
            <div class="logo-box">
                <img src="../../assets/images/login/logo.png">
                <h2>{{CONST.APP_NAME}}</h2>
            </div>
            <form class="form" @submit.prevent="submit">
                <!--* 用户名 *-->
                <div class="line line-border">
                    <label>手机号</label>
                    <input class="text" type="tel"  maxlength="11" v-model="form.username">
                </div>
                <!--* 密码 *-->
                <div class="line line-border">
                    <label>密码</label>
                    <input class="text" type="password" maxlength="11" v-model="form.password">
                </div>
                <!--* 登录按钮 *-->
                <div class="line line-padding">
                    <button class="btn" type="button" @click="login">登录</button>
                </div>
                <!--* 其它链接按钮 *-->
                <div class="line">
                    <span class="forgot-pwd" @click="goReset">忘记了密码？</span><span class="reg-new-account" @click="goReg">注册新账号</span>
                </div>
            </form>
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
                //* 是否启用加载动画
                enableLoading: true,
                //* 加载动画显示状态
                loading: false,
                //* 加载动画提示文字
                loadingMsg: '',
            }
        },
        methods: {
            /**
             * 功能 登录会员卡中心
             * 参数 无
             * 返回 无
             **/
            login() {
                //* 校验手机号为空
                if (!this.form.username) {
                    this.toast(this.CONST.MSG.phoneEmptyCheck);
                    return false;
                }
                //* 校验手机号格式
                if (!this.CONST.REGEX.phone.test(this.form.username)) {
                    this.toast(this.CONST.MSG.phoneCheck);
                    return false;
                }
                //* 校验密码为空
                if (!this.form.password) {
                    this.toast(this.CONST.MSG.pwdEmptyCheck);
                    return false;
                }
                //* 校验密码格式
                if (!this.CONST.REGEX.pwd.test(this.form.password)) {
                    this.toast(this.CONST.MSG.pwdCheck);
                    return false;
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.loginLoading;
                //* 发送登录请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    username: this.form.username,
                    password: this.$md5(this.form.password),
                }, this.CONST.APP_ID, this.CONST.METHOD.login, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        this.toast(this.CONST.MSG.loginSuccess);
                        //* 保持7天
                        this.$wsCache.set('token', response.data.token, {
                            exp: 604800
                        })
                        this.$wsCache.set('tokenmd5', this.$md5(response.data.token), {
                            exp: 604800
                        })
                        this.$wsCache.set('id', response.data.id, {
                            exp: 604800
                        })
                        this.$wsCache.set('username', response.data.username, {
                            exp: 604800
                        })
                        //* 登录成功跳转
                        this.goIndex();
                        /*if (sessionStorage.getItem('skipAd')) {
                            //* 已经浏览过广告跳转主页
                            this.goIndex();
                        } else {
                            //* 未浏览过广告跳转广告页
                            this.goAd();
                        }*/
                    } else {
                        if (0 != response.status) {
                            this.toast(response.errorMsg);
                            return false;
                        }
                        if (0 != response.subStatus) {
                            this.toast(this.CONST.TRANSCODE[response.subStatus]);
                            this.cleanToken(response.subStatus);
                            return false;
                        }
                    }
                }).catch((err) => {
                    console.warn(err);
                })
            },
            /**
             * 功能 跳转注册页面
             * 参数 无
             * 返回 无
             **/
            goReg() {
                this.$router.push({
                    path: this.CONST.ROUTER.registerPage
                })
            },
            /**
             * 功能 跳转广告页面
             * 参数 无
             * 返回 无
             **/
            goAd() {
                this.$router.push({
                    path: this.CONST.ROUTER.adPage
                })
            },
            /**
             * 功能 跳转主页面
             * 参数 无
             * 返回 无
             **/
            goIndex() {
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
