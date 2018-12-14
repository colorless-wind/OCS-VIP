<style lang="less" scoped>
    @import "../../assets/less/config";
    
    #indexPage .card {
        background-image: url(../../assets/images/index/card.png);
        background-size: 100%;
        background-repeat: no-repeat;
        padding: 40px;
        color: white;
        position: relative;
    }

    @media (max-width:320px) {
        #indexPage .card {
            height: 25%;
        }
    }

    @media (min-width:321px) and (max-width:375px) {
        #indexPage .card {
            height: 26%;
        }
    }

    @media (min-width:376px) and (max-width:414px) {
        #indexPage .card {
            height: 26.5%;
        }
    }

    @media only screen and (width: 375px) and (height: 812px) {
        #indexPage .card {
            height: 21%;
        }
    }

    #indexPage .card .left {
        display: inline-block;
        width: 49%;
    }

    #indexPage .card .right {
        display: inline-block;
        width: 49%;
        text-align: right;
        vertical-align: top;
    }

    #indexPage .card .left .avatar {
        display: inline-block;
        width: 30%;
    }

    #indexPage .card .left .name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
    }

    #indexPage .card .left .name .type {
        font-size: 10px;
    }

    #indexPage .card .left .avatar img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    #indexPage .card .card-number {
        position: absolute;
        bottom: 25px;
    }

    #indexPage .subinfo {
        padding: 20px 0;
        text-align: center;
    }

    #indexPage .subinfo .left {
        display: inline-block;
        width: 49%;
    }

    #indexPage .subinfo .right {
        display: inline-block;
        width: 49%;
    }

    #indexPage .subinfo .label {
        line-height: 2;
        font-size: 10px;
    }

    #indexPage .subinfo .check {
        line-height: 2;
        font-size: 14px;
    }

    #indexPage .subinfo .check a {
        color: #62a8ea;
    }

    #indexPage .subinfo .pay {
        line-height: 3;
        display: flex;
        justify-content: space-around;
    }

    #indexPage .subinfo .pay .pay-btn {
        padding: 7px 50px;
        color: #62a8ea;
        border: 1px solid #62a8ea;
        border-radius: 5px;
        background: none;
    }

    #indexPage .shareMenu {}

    #indexPage .shareMenu .item {
        display: inline-block;
        width: 23%;
    }

    #indexPage .shareMenu .title {
        font-size: 12px;
        color: #999;
    }

    #indexPage .shareMenu .item img {
        height: 30px;
        width: auto;
    }

</style>
<style type="text/css">
    p {
        margin: 0px;
    }
</style>
<template>
	<div>
		<v-header title="">
<!--
            <div slot="left" class="item left-item" v-on:click="goLogin">
        <i class="iconfont icon-fanhui"></i>
      </div>
-->
        </v-header>
		<v-content id="indexPage">
             <!--* 公交卡信息 *-->
			<div class="card">
				<div class="left">
                    <!--* 头像、用户名 *-->
					<div class="avatar"><img src="../../assets/images/index/avatar.png" /></div>
					<div class="name">{{indexInfo.name}}<br><span class="type">{{indexInfo.cardtype}}</span></div>
				</div>
				<div class="right">
                    <!--* 余额 *-->
					余额 <span class="money">{{indexInfo.restmoney}}</span>元
				</div>
				<div class="card-number">
					{{indexInfo.cardno?indexInfo.cardno.substring(0,4)+' '+indexInfo.cardno.substring(4,8)+' '+ indexInfo.cardno.substring(8,12)+' '+ indexInfo.cardno.substring(12,13):''}}
				</div>
			</div>
            <!--* 积分、优惠券等 *-->
			<div class="subinfo">
				<div class="left">
					<div class="label">积分</div>
					<div class="check">
						<a @click="showPoints=true" v-show="!showPoints">查看</a>
						<span v-show="showPoints">{{indexInfo.points}}</span>
					</div>
				</div>
				<div class="right">
					<div class="label">优惠券</div>
					<div class="check">
						<a @click="showCoupon=true" v-show="!showCoupon">查看</a>
						<span v-show="showCoupon">{{indexInfo.coupon}}</span>
					</div>
				</div>
				<div class="pay">
					<button type="button" class="pay-btn" >扫一扫</button>
					<button type="button" class="pay-btn" @click="goQrcodePage">付款码</button>
				</div>
			</div>
            <!--* 功能菜单条目 *-->
			<group>
				<cell title="我的信息" link="/personal/personalcenter/"></cell>
				<cell title="充值" link="/charge/index/"></cell>
				<cell title="活动信息" link="/activity/list"></cell>
				<cell title="会员卡详情" link="/vipCard/detail/"></cell>
				<cell title="推荐给朋友" is-link @click.native="showShareMenu"></cell>
<!--				<cell title="交易信息" link="/transaction/list/"></cell>-->
<!--				<cell title="预约信息" is-link></cell>-->
			</group>
			<div class="shareMenuBox1" v-show="false">
				<div class="shareMenu">
					<div class="item zhifubao">
						<img src="../../assets/images/index/zhifubao.png" />
						<div class="title">支付宝</div>
					</div>
					<div class="item weibo">
						<img src="../../assets/images/index/weibo.png" />
						<div class="title">新浪微博</div>
					</div>
					<div class="item pengyouquan">
						<img src="../../assets/images/index/pengyouquan.png" />
						<div class="title">朋友圈</div>
					</div>
					<div class="item wechat">
						<img src="../../assets/images/index/wechat.png" />
						<div class="title">发送朋友</div>
					</div>
				</div>
			</div>
			<div class="shareMenuBox2" v-show="false">
				<div class="shareMenu">
					<div class="item reloadPage">
						<img src="../../assets/images/index/refresh.png" />
						<div class="title">刷新</div>
					</div>
					<div class="item copylink">
						<img src="../../assets/images/index/link.png" />
						<div class="title">复制链接</div>
					</div>
				</div>
			</div>
			<!--* 分享选项菜单 *-->
			<actionsheet v-model="isShowShareMenu" :menus="shareMenus" show-cancel></actionsheet>
		</v-content>
	</div>
</template>
<script>
    //* 引用工具函数包并以混入的形式加载
    import util from '../../assets/js/util'
    //* 引用jQuery库
    import $ from 'jquery'
    //* 引用vux组件
    import {
        Cell,
        Group,
        Actionsheet
    } from 'vux'

    export default {
        components: {
            Cell,
            Group,
            Actionsheet
        },
        data() {
            return {
                //* 首页信息
                indexInfo: {
                    id: '',
                    name: '',
                    cardtype: '会员卡',
                    restmoney: '',
                    cardno: '',
                    points: '0',
                    coupon: '暂无',
                },
                //* 查看积分
                showPoints: false,
                //* 查看优惠券
                showCoupon: false,
                //* 是否显示分享菜单
                isShowShareMenu: false,
                //* 分享菜单内容
                shareMenus: {
                    menu1: '',
                    menu2: ''
                },
                //* 是否启用加载动画
                enableLoading: true,
                //* 加载动画显示状态
                loading: false,
                //* 加载动画提示文字
                loadingMsg: '',
                //* 商户信息
                merchant: {
                    merchantId: '',
                    merchantName: ''
                },
                //* mqtt实例
                client: new Paho.MQTT.Client("10.165.60.223", Number(8083), "clientid-john"), // 第三个参数是clientID可以为空
                //* mqtt订阅的主题
                topic: localStorage.getItem('tokenmd5') || '',
                //* 向mqtt发送的消息
                message: '',
            }
        },
        mounted() {
            //* 未登录重定向至登录页面
            if (!localStorage.getItem('token')) {
                this.goLogin();
                return false;
            }
            //* 注册mqtt实例并创建连接
            this.MqttConnectReady();
            //* 查询用户积分
            this.selectPoint();
            //* 设定分享菜单
            this.shareMenus.menu1 = $('.shareMenuBox1').html();
            this.shareMenus.menu2 = $('.shareMenuBox2').html();
            //* 设置当前使用的语言 zh中文、en英文
            //this.setLanguage('zh')
        },
        methods: {
            /** mqtt related start **/
            /**
             * 功能 注册mqtt实例并创建连接
             * 参数 无
             * 返回 无
             **/
            MqttConnectReady() {
                //* 注册连接断开处理事件
                this.client.onConnectionLost = this.onConnectionLost;
                //* 注册消息接收处理事件
                this.client.onMessageArrived = this.onMessageArrived;
                //* 建立连接
                this.MqttConnect();
                //* 断开连接
                // this.client.disconnect(); 
            },
            /**
             * 功能 创建mqtt连接方法
             * 参数 无
             * 返回 无
             **/
            MqttConnect() {
                this.client.connect({
                    onSuccess: this.onConnect
                }); // 连接服务器并注册连接成功处理事件
            },
            /**
             * 功能 创建mqtt连接方法
             * 参数 无
             * 返回 无
             **/
            onConnectionLost: function(responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log('onConnectionLost:' + responseObject.errorMessage);
                    console.log('连接已断开');
                }
            },
            /**
             * 功能 mqtt接收消息
             * 参数1 message 为mqtt返回的消息信息 类型 JSON字符串
             * 返回 无
             **/
            onMessageArrived: function(message) {
                console.log("收到消息:" + message.payloadString);
                console.log(message.payloadString);
                var global = this;
                //alert("收到消息:" + message.payloadString);
                //type 1为充值，0为消费
                //{"data":{"detail":"","type":1},"subErrorMsg":"","subStatus":"0"}
                var result = JSON.parse(message.payloadString);
                if ('0' === result.subStatus) {
                    if (result.data.type === 1) {
                        this.toast(this.CONST.MSG.chargeSuccess);
                    }
                    if (result.data.type === 0) {
                        this.toast(this.CONST.MSG.consumeSuccess);
                    }
                    setTimeout(function() {
                        global.goIndex();
                    }, 1500)
                } else {
                    this.toast("系统异常， 异常信息为：" + message.payloadString.subErrorMsg);
                }

            },
            /**
             * 功能 mqtt连接
             * 参数 无
             * 返回 无
             **/
            onConnect: function() {
                console.log(this.$t("tips.phoneCheck"));
                this.setLanguage('jp');
                console.log(this.$t("tips.phoneCheck"));
                this.setLanguage('en');
                console.log(this.$t("tips.phoneCheck"));
                console.log('onConnected');
                this.client.subscribe(this.topic); // 订阅主题
            },
            /**
             * 功能 向mqtt发送消息
             * 参数 无
             * 返回 无
             **/
            sendMsg() {
                //* 发送消息  
                this.message = new Paho.MQTT.Message("vanishment this world");
                this.message.destinationName = "saya";
                this.client.send(this.message);
            },
            /** mqtt related end **/
            
            /**
             * 功能 查询卡片信息（卡号、余额等）
             * 参数 无
             * 返回 无
             **/
            selectCardInfo() {
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                    merchantId: this.merchant.merchantId,
                    merchantName: this.merchant.merchantName
                }, this.CONST.APP_ID, this.CONST.METHOD.selectCardInfo, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        this.indexInfo.cardno = response.data.cardNumber;
                        this.indexInfo.restmoney = response.data.cardBalance;
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
            /**
             * 功能 查询用户积分信息
             * 参数 无
             * 返回 无
             **/
            selectPoint() {
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                    page: 1,
                    row: 10
                }, this.CONST.APP_ID, this.CONST.METHOD.selectPoint, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        this.merchant.merchantId = response.data.commonPointInfoMerchantId;
                        this.merchant.merchantName = response.data.commonPointInfoMerchantName;
                        sessionStorage.setItem('merchantId', this.merchant.merchantId);
                        sessionStorage.setItem('merchantName', this.merchant.merchantName);
                        this.indexInfo.points = response.data.commonPointInfoScore;

                        this.indexInfo.id = response.data.commonPointInfoMerchantId;
                        this.indexInfo.name = response.data.commonPointInfoMerchantName;
                        //* 查询会员卡信息
                        this.selectCardInfo();
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
            /**
             * 功能 刷新当前页面
             * 参数 无
             * 返回 无
             **/
            reloadPage() {
                console.log('reloadPage')
                location.reload();
            },
            /**
             * 功能 跳转付款二维码页面
             * 参数 无
             * 返回 无
             **/
            goQrcodePage() {
                this.$router.push({
                    path: this.CONST.ROUTER.qrcodePage
                })
            },
            /**
             * 功能 跳转个人中心页面（我的）
             * 参数 无
             * 返回 无
             **/
            goPersonalCenter() {
                this.$router.push({
                    path: this.CONST.ROUTER.personalCenterPage
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
             * 功能 显示分享菜单弹窗
             * 参数 无
             * 返回 无
             **/
            showShareMenu() {
                var global = this;
                //* 支付宝
                $('.zhifubao').off('click');
                $('.zhifubao').on('click', function() {
                    global.toast('支付宝');
                    var url = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https://qr.alipay.com/c1x063287crpdxrhcynhd49';
                    location.href = url;
                })
                //* 微博
                $('.weibo').off('click');
                $('.weibo').on('click', function() {
                    global.toast('微博');
                    var url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent('一些内容' + '「' + '一个标题' + '」' + ' 点这里' + window.location.href) + '&pic=' + 'http://img.t.sinajs.cn/t4/appstyle/widget/images/library/base/wb_logo.png?id=1395901125982';     
                    window.open(url); 
                })
                //* 朋友圈
                $('.pengyouquan').off('click');
                $('.pengyouquan').on('click', function() {
                    global.toast('朋友圈');
                })
                //* 微信
                $('.wechat').off('click');
                $('.wechat').on('click', function() {
                    global.toast('微信');

                })
                //* 刷新
                $('.reloadPage').off('click');
                $('.reloadPage').on('click', function() {
                    location.reload();
                })
                //* 复制链接
                $('.copylink').off('click');
                $('.copylink').on('click', function() {
                    var input = document.createElement('input');
                    input.setAttribute('readonly', 'readonly');
                    input.setAttribute('value', location.href);
                    document.body.appendChild(input);
                    input.setSelectionRange(0, 9999);
                    input.select();
                    if (document.execCommand('copy')) {
                        document.execCommand('copy');
                        global.toast('复制成功');
                    }
                    document.body.removeChild(input);
                })
                //* 显示菜单
                this.isShowShareMenu = true;
            },
            testUpdateUserDetail() {
                var testparam = {
                    "scene": "MemberService",
                    "channel": "OCS",
                    "merchantId": "8374f2833044427a8d96afa5779c904c",
                    "merchantName": "测试账户002",
                    "userid": "b22c848a928b40eb83fd7b75076a6ab0",
                    "permissionId": "1e62096e84144829ac8700ceafa4ad98",

                    "username": "1234567890000111111",
                    "country": "中国",
                    "alias": "小拉拉",
                    "Sex": 0,
                    "city": "北京",
                    //"uuid": "b22c848a928b40eb83fd7b75076a6ab0",
                    "province": "北京",
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userid: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: '我是用户名',
                    country: '中国',
                    "province": "北京",
                    "city": "北京",
                    alias: '我是昵称',
                    Sex: 1,
                }, this.CONST.APP_ID, this.CONST.METHOD.updateUserDetail, this.CONST.PWD)).then((response) => {
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
            testgetActivity() {
                var testparam = {
                    "userId": "9d3278dc97894f7098de8288b8776e68",
                    "permissionId": "ef0ed71b070c41ed93decdc2424c5d09",
                    "userName": "15611740510",
                    "scene": "MemberService",
                    "channel": "OCS",

                    "merchantId": "8374f2833044427a8d96afa5779c904c",
                    "merchantName": "测试账户002",

                    "goods": [{
                        "goodId": "12345",
                        "goodName": "ewfqr",
                        "num": 1,
                        "price": 30
                    }]
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    userName: localStorage.getItem('username') || 'not login',
                    merchantId: this.merchant.merchantId,
                    merchantName: this.merchant.merchantName,
                    goods: [{
                        goodId: '1',
                        goodName: 'time river',
                        num: 1,
                        price: 55
                    }]


                }, this.CONST.APP_ID, this.CONST.METHOD.getActivity, this.CONST.PWD), this).then((response) => {
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
            }
        },
        mixins: [util]
    }

</script>
