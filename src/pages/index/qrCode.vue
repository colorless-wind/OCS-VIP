<style lang="less" scoped>
    @import "../../assets/less/config";

    #qrcodePage.content {
        background-color: #439057;
    }

    #qrcodePage .qr-box {
        text-align: center;
        /*        margin: 20% 10%;*/
        margin: 5%;
        /*        padding: 10%;*/
        padding-top: 0;
        background-color: white;
    }

    #qrcodePage .qr-box canvas {}


    #qrcodePage .qr-box .title {
        color: #439057;
        padding: 15px;
        padding-left: 35px;
        background-color: #fbfbfb;
        font-size: 16px;
        text-align: left;
    }

    #qrcodePage .qr-box .pay-way {
        padding: 10px 15px;
        font-size: 15px;
        text-align: left;
    }

</style>
<template>
<div>
    <v-header title=""></v-header>
    <v-content id="qrcodePage">
        <div class="qr-box">
            <!--* 标题 *-->
            <div class="title">
                <i class="iconfont icon-guanyu" aria-hidden="true" style="font-size: 17px;"></i>&nbsp;&nbsp;向商家付款
            </div>
            <!--* 二维码 *-->
            <img id="qrCodeImg" />
            <hr style="border: none;border-bottom: 1px solid #ddd;">
            <!--* 付款方式 *-->
            <div class="pay-way"><i class="iconfont icon-renminbi" aria-hidden="true"></i>账户付款</div>
<!--
            <hr style="border: none;border-bottom: 1px solid #ddd;">
            <div class="pay-way"><i class="iconfont icon-renminbi" aria-hidden="true"></i>账户付款</div>
            <hr style="border: none;border-bottom: 1px solid #ddd;">
            <div class="pay-way"><i class="iconfont icon-renminbi" aria-hidden="true"></i>账户付款</div>
-->
        </div>
    </v-content>
    <!--* 加载动画 load true/false 显示/隐藏；type 1-7 7种样式 *-->
    <v-loading :type="1" :load="loading" :msg="loadingMsg"></v-loading>
</div>
</template>
<script>
    //* 引用工具函数包并以混入的形式加载
    import util from '../../assets/js/util'
    //* 引用二维码库
    import QRCode from 'qrcode'

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
            //* 获取用户付款二维码
            this.getUserQrcode()

            var testParam = {
                "userName": "15611740510", //商户名
                "userId": "6f2847122aac422a90fad51318163310", //商户id
                "permissionId": "b4eda74142d4446094207982d6ae547d", //登录时token
                "merchantId": "8374f2833044427a8d96afa5779c904c",
                "merchantName": "测试账户002",
                //"scene": "MemberService",
                //"channel": "OCS",
                "favMoney": 0, //优惠金额
                "favfare": 0, //运费优惠
                "fare": 0, //运费
                "payMoney": 300, //实际支付金额
                "money": 300, //订单金额
                "goods": [{ //商品信息
                    "goodId": "1", ////商品单号 0为充值 1为消费
                    "goodName": "ewfqr", //商品名称
                    "num": 1, //商品数量
                    "price": 30, //商品价格
                    "realPrice": 300, //实际价格
                    "favmoney": 300, //优惠金额
                    "promotiontype": 1, //优惠类型
                    "promotion": 0 //优惠信息
                }]
            }
            var testMethod = 'ocs.memershipcard.order.addmerchantorder'

            //* 发送请求
            this.post(this.CONST.BASE_URL, this.getSendData({
                userId: localStorage.getItem('id') || '5e2a07aa780c4b3d913b6c7228dd7da7',
                permissionId: localStorage.getItem('token') || '5258fc4de68b45858c0499be279046b3',
                userName: localStorage.getItem('username') || 'not login',
                merchantId: sessionStorage.getItem('merchantId') || '8374f2833044427a8d96afa5779c904c',
                merchantName: sessionStorage.getItem('merchantName') || '测试账户002',
                "favMoney": 0, //优惠金额
                "favfare": 0, //运费优惠
                "fare": 0, //运费
                "payMoney": 300, //实际支付金额
                "money": 300, //订单金额
                "goods": [{ //商品信息
                    "goodId": "1", ////商品单号 0为充值 1为消费
                    "goodName": "ewfqr", //商品名称
                    "num": 1, //商品数量
                    "price": 30, //商品价格
                    "realPrice": 300, //实际价格
                    "favmoney": 300, //优惠金额
                    "promotiontype": 1, //优惠类型
                    "promotion": 0 //优惠信息
                }]
            }, this.CONST.APP_ID, testMethod, this.CONST.PWD), this).then((response) => {
                console.log('访问成功');
                console.log(response);
                if (0 == response.subStatus && 0 == response.status) {
                    //* 将返回的信息生成二维码
                    //this.useqrcode(response.data);
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

            var testMethod2=  'ocs.memershipcard.trade.consume';
            var testparam2 = {
                "userId": "493f915223fd477f8e4b11e419feb3ed", //商户id
                "scene": "MemberService",
                "channel": "OCS",
                "merchantName": "测试账户002",
                "merchantId": "8374f2833044427a8d96afa5779c904c",
                "tradeNo": "MB-20181211153013921000", //下单时订单号
                "realMoney": 300, //实际支付金额
                "money": 300, //应付金额
                "favMoney": 0,
            }
            //            //* 发送请求
                        this.post(this.CONST.BASE_URL, this.getSendData({
                             userId: localStorage.getItem('id') || '5e2a07aa780c4b3d913b6c7228dd7da7',
                permissionId: localStorage.getItem('token') || '5258fc4de68b45858c0499be279046b3',
                userName: localStorage.getItem('username') || 'not login',
                merchantId: sessionStorage.getItem('merchantId') || '8374f2833044427a8d96afa5779c904c',
                merchantName: sessionStorage.getItem('merchantName') || '测试账户002',
                            "tradeNo": "MB-20181211153013921000", //下单时订单号
                "realMoney": 300, //实际支付金额
                "money": 300, //应付金额
                "favMoney": 0,
                        }, this.CONST.APP_ID, testMethod2, this.CONST.PWD), this).then((response) => {
                            console.log('访问成功');
                            console.log(response);
                            if (0 == response.subStatus && 0 == response.status) {
                                //* 将返回的信息生成二维码
                                //this.useqrcode(response.data);
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
        methods: {
            /**
             * 功能 获取需要转换为二维码的信息
             * 参数 无
             * 返回 无
             **/
            getUserQrcode() {
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    memberId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                }, this.CONST.APP_ID, this.CONST.METHOD.getUserQrcode, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        //* 将返回的信息生成二维码
                        this.useqrcode(response.data);
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
             * 功能 动态生成二维码
             * 参数1 获取需要转换为二维码的信息 类型 String
             * 返回 无
             **/
            useqrcode(qrdata) {
                qrdata = qrdata || '未能返回有效的二维码信息';
                QRCode.toDataURL(qrdata).then(url => {
                        console.log(url);
                        document.getElementById('qrCodeImg').src = url;
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },
        mixins: [util]
    }

</script>
