<style lang="less" scoped>
    @import "../../assets/less/config";

    #registerPage .form {
        width: 80%;
        margin: 0 auto;
    }


    #registerPage .icon {
        width: 20px;
        position: absolute;
        top: 18px;
        left: 10px;
    }

    #registerPage .text {
        box-sizing: border-box;
        width: 100%;
        padding: 5px 5px 5px 45px;
        line-height: 28px;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 14px;
        background-color: aliceblue;
    }

    #registerPage .btn {
        width: 50%;
        line-height: 38px;
        border-radius: 5px;
        /*border: 1px solid darken(@main, 3%);*/
        border: none;
        font-size: 14px;
        color: #fff;
        background-color: #62a8ea;
    }

    #registerPage .banner {
        width: 100%;
        margin-bottom: 30px;
    }

    #registerPage .go-login {
        float: left;
        padding-left: 20px;
        color: #999;
    }

    #registerPage .verify-input {
        width: 50%;
    }

    #registerPage .verify-btn {
        width: 45%;
        background-color: lightcoral;
        margin-left: 3%;
    }

    #registerPage .lock {
        background-color: lightgray;
    }

    #registerPage .err-msg {
        font-size: 12px;
        color: red;
    }



    #registerPage .line {
        text-align: center;
        position: relative;
        padding-top: 20px;
    }

    #registerPage .line-border {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    #registerPage .line-padding {
        padding-top: 60px;
    }

    #registerPage .text {
        box-sizing: border-box;
        width: 80%;
        padding: 5px 15px;
        line-height: 28px;
        font-size: 14px;
        background: none;
        border: none;
        color: white;
    }

    #registerPage .btn {
        width: 50%;
        line-height: 38px;
        border-radius: 5px;
        border: none;
        font-size: 14px;
        color: #fff;
        background: #1082b1;
    }

    #registerPage.content {
        background-image: url(../../assets/images/login/bg.png);
        background-repeat: no-repeat;
        background-size: cover;
    }

    #registerPage .logo-box {
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

    #registerPage .logo-box img {
        width: 60px;
    }

    #registerPage .logo-box h2 {
        font-weight: 400;
        letter-spacing: 2px;
    }

    #registerPage .line span {
        color: white;
    }

    #registerPage .line label {
        color: white;
        float: left;
        line-height: 38px;

    }

    #registerPage .btn-sm {
        width: 30%;
        line-height: 30px;
        border-radius: 3px;
    }

    #registerPage .text-sm {
        width: 52%;
    }


    @media (max-width:320px) {
        #registerPage .line {
            text-align: center;
            position: relative;
            padding-top: 20px;
        }
        #registerPage .icon {
            width: 20px;
            position: absolute;
            top: 18px;
            left: 10px;
        }
        #registerPage .text-sm {
            width: 50%;
        }
    }

</style>
<template>
	<div>
		<v-header title=""></v-header>
		<v-content id="registerPage">
            <!--* banner *-->
			<div class="logo-box">
                <img src="../../assets/images/login/logo.png">
                <h2>{{CONST.APP_NAME}}</h2>
            </div>
			<form class="form" @submit.prevent="submit">
                <!--* 用户名 *-->
				<div class="line line-border">
					<label>手机号</label>
					<input class="text" type="tel" maxlength="11" v-model="form.username" @blur="checkUserName">
				</div>
                    <p class="err-msg" v-show="check.username.show">{{check.username.msg}}</p>
                <!--* 密码 *-->
				<div class="line line-border">
					<label>密&nbsp;&nbsp;码</label>
					<input class="text" type="password" maxlength="11" v-model="form.password" @blur="checkPwd">
				</div>
                    <p class="err-msg" v-show="check.password.show">{{check.password.msg}}</p>
                <!--* 验证码 *-->
				<div class="line line-border" style="text-align: left;">
					<label>验证码</label>
					<input class="text text-sm verify-input" type="tel" maxlength="6" v-model="form.verifycode" @blur="checkVerifyCode">
					<button type="button" class="btn btn-sm verify-btn" v-bind:class="{ lock: form.username=='' }" @click="createVerifyCode" :disabled="vTimer != 60">{{vTimer == 60 ?'获取验证码':vTimer + ' s'}}</button>
				</div>
                    <p class="err-msg" v-show="check.verifycode.show">{{check.verifycode.msg}}</p>
                <!--* 注册按钮 *-->
				<div class="line line-padding">
					<button class="btn" v-bind:class="{ lock: !(check.username.status && check.password.status && check.verifycode.status) }" type="button" @click="checkInfo">注册</button>
				</div>
                <!--* 其它链接按钮 *-->
				<div class="line">
					<span class="go-login">已有账号？<span style="color: red" @click="goLogin">去登录</span></span>
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
                    verifycode: ''
                },
                //* 验证
                check: {
                    username: {
                        show: null,
                        msg: '',
                        status: false
                    },
                    password: {
                        show: null,
                        msg: '',
                        status: false
                    },
                    verifycode: {
                        show: null,
                        msg: '',
                        status: false
                    },
                },
                //* 
                enableReg: false,
                //* 验证码计时
                vTimer: 60,
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
             * 功能 校验用户名
             * 参数 无
             * 返回 无
             **/
            checkUserName(e, hideMessage) {
                //* 校验手机号为空
                if (!this.form.username) {
                    if (!hideMessage) {
                        this.check.username.show = true;
                        this.check.username.msg = this.CONST.MSG.phoneEmptyCheck;
                        return false;
                    }
                }
                //* 校验手机号格式
                if (!this.CONST.REGEX.phone.test(this.form.username)) {
                    if (!hideMessage) {
                        this.check.username.show = true;
                        this.check.username.msg = this.CONST.MSG.phoneCheck;
                        return false;
                    }
                }

                this.check.username.show = false;
                return true;
            },
            /**
             * 功能 校验密码
             * 参数 无
             * 返回 无
             **/
            checkPwd(e, hideMessage) {
                //* 校验密码为空
                if (!this.form.password) {
                    if (!hideMessage) {
                        this.check.password.show = true;
                        this.check.password.msg = this.CONST.MSG.pwdEmptyCheck;
                    }
                    return false;
                }
                //* 校验密码长度不足6位
                if (this.form.password.length < 6) {
                    if (!hideMessage) {
                        this.check.password.show = true;
                        this.check.password.msg = this.CONST.MSG.pwdLengthCheck;
                    }
                    return false;
                }
                //* 校验密码格式
                if (!this.CONST.REGEX.pwd.test(this.form.password)) {
                    if (!hideMessage) {
                        this.check.password.show = true;
                        this.check.password.msg = this.CONST.MSG.pwdCheck;
                    }
                    return false;
                }

                this.check.password.show = false;
                return true;
            },
            /**
             * 功能 校验验证码
             * 参数 无
             * 返回 无
             **/
            checkVerifyCode(e, hideMessage) {
                //* 校验验证码为空
                if (!this.form.verifycode) {
                    if (!hideMessage) {
                        this.check.verifycode.show = true;
                        this.check.verifycode.msg = this.CONST.MSG.vcodeEmptyCheck;
                    }
                    return false;
                }
                //* 校验验证码格式
                if (!this.CONST.REGEX.vcode.test(this.form.verifycode)) {
                    if (!hideMessage) {
                        this.check.verifycode.show = true;
                        this.check.verifycode.msg = this.CONST.MSG.vcodeCheck;
                    }
                    return false;
                }

                this.check.verifycode.show = false;
                return true;
            },
            /**
             * 功能 校验验证码
             * 参数 无
             * 返回 无
             **/
            checkInfo() {

                this.checkUserName();
                this.checkPwd();
                this.checkVerifyCode();
                //* 校验参数信息是否正确
                if (!(this.check.username.status && this.check.password.status && this.check.verifycode.status)) {
                    return false;
                }
                this.register();
            },
            /**
             * 功能 注册会员
             * 参数 无
             * 返回 无
             **/
            register() {
                //* 获取全局Vue对象
                var global = this;
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.regLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    username: this.form.username,
                    password: this.$md5(this.form.password),
                    smsCode: this.form.verifycode
                }, this.CONST.APP_ID, this.CONST.METHOD.register, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        //* 提示注册成功
                        this.toast(this.CONST.MSG.regSuccess);
                        setTimeout(function() {
                            //* 自动登录
                            global.login();
                        }, 1000)
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
             * 功能 验证码1分钟计时器
             * 参数 无
             * 返回 无
             **/
            verifyCodeTimer() {
                //* 获取全局Vue对象
                var global = this;
                var timerEvent = setInterval(function() {
                    global.vTimer--;
                    if (global.vTimer < 1) {
                        global.vTimer = 60;
                        clearInterval(timerEvent);
                    }
                }, 1000)
            },
            /**
             * 功能 获取验证码
             * 参数 无
             * 返回 无
             **/
            createVerifyCode() {
                
                //* 校验参数信息是否正确
                if (!this.checkUserName()) {
                    return false;
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.vcodeLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    phone: this.form.username,
                    type: 0,
                }, this.CONST.APP_ID, this.CONST.METHOD.vcode, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        //* 开始计时，1分钟可再次获取验证码
                        this.verifyCodeTimer();
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
             * 功能 校验注册信息
             * 参数 无
             * 返回 无
             **/
            checkRegInfo() {
                //* 发送注册请求
                this.register();
            },
            /**
             * 功能 登录会员卡中心
             * 参数 无
             * 返回 无
             **/
            login() {
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
                        //* 保持7天
                        this.$wsCache.set('token', response.data.token, {
                            exp: 604800
                        })
                        this.$wsCache.set('id', response.data.id, {
                            exp: 604800
                        })
                        this.$wsCache.set('username', response.data.username, {
                            exp: 604800
                        })
                        //* 跳转选择卡片模板页面
                        this.goSelectCard();
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
             * 功能 跳转登录页面
             * 参数 无
             * 返回 无
             **/
            goLogin() {
                this.$router.push({
                    path: this.CONST.ROUTER.loginPage
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
             * 功能 跳转选择卡片模板页面
             * 参数 无
             * 返回 无
             **/
            goSelectCard() {
                this.$router.push({
                    path: this.CONST.ROUTER.selectCard
                })
            }
        },
        watch: {
            'form.username' (newVal, oldVal) {
                this.check.username.status = this.checkUserName('', true);
            },
            'form.password' (newVal, oldVal) {
                this.check.password.status = this.checkPwd('', true);
            },
            'form.verifycode' (newVal, oldVal) {
                this.check.verifycode.status = this.checkVerifyCode('', true);
            },
        },
        mixins: [util]
    }

</script>
