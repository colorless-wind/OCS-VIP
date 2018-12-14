<style lang="less" scoped>
    @import "../../assets/less/config";

    #transactionDetailPage .transaction-detail {}

    #transactionDetailPage .transaction-detail .form {
        margin: 10px;
    }

    #transactionDetailPage .transaction-detail .form .title {
        padding: 5px;
        font-size: 18px;
        text-align: center;
    }

    #transactionDetailPage .transaction-detail .form .money {
        color: #ff6600;
        padding: 5px;
        font-size: 28px;
        text-align: center;
    }

    #transactionDetailPage .transaction-detail .form .status {
        color: #999;
        padding: 5px;
        font-size: 14px;
        text-align: center;
        margin-bottom: 10%;
    }

    #transactionDetailPage .transaction-detail .form .item {
        padding: 2px 15px;
    }

    #transactionDetailPage .transaction-detail .form hr {
        margin: 10px 20px;
    }

    #transactionDetailPage .transaction-detail .form .item .description-label {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionDetailPage .transaction-detail .form .item .description-value {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        display: inline-block;
        text-align: right;
    }

    #transactionDetailPage .transaction-detail .form .item .type-label {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionDetailPage .transaction-detail .form .item .type-value {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        display: inline-block;
        text-align: right;
    }

    #transactionDetailPage .transaction-detail .form .item .saler-name-label {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionDetailPage .transaction-detail .form .item .saler-name-value {
        padding: 5px;
        width: 45%;
        font-size: 14px;
        display: inline-block;
        text-align: right;
    }

    #transactionDetailPage .transaction-detail .form .item .order-number-label {
        padding: 5px;
        width: 22%;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionDetailPage .transaction-detail .form .item .order-number-value {
        padding: 5px;
        width: 68%;
        font-size: 14px;
        display: inline-block;
        text-align: right;
    }

    #transactionDetailPage .transaction-detail .form .item .order-time-label {
        padding: 5px;
        width: 22%;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionDetailPage .transaction-detail .form .item .order-time-value {
        padding: 5px;
        width: 68%;
        font-size: 14px;
        display: inline-block;
        text-align: right;
    }

</style>
<template>
<div>
    <v-header title=""></v-header>
    <v-content id="transactionDetailPage">
        <div class="transaction-detail">
            <div class="form" @click="goDetail">
                <p class="title">会员卡支付</p>
                <p class="money">-200.00</p>
                <p class="status">交易成功</p>
                <div class="item">
                    <p class="description-label">交易说明</p>
                    <p class="description-value">会员卡支付</p>
                </div>
                <div class="item">
                    <p class="type-label">交易分类</p>
                    <p class="type-value">消费</p>
                </div>
                <div class="item">
                    <p class="saler-name-label">商户名称</p>
                    <p class="saler-name-value">711便利店</p>
                </div>
                <hr>
                <div class="item">
                    <p class="order-number-label">订单号</p>
                    <p class="order-number-value">20180821133400122411</p>
                </div>
                <div class="item">
                    <p class="order-time-label">下单时间</p>
                    <p class="order-time-value">2018-10-17 14:45:23</p>
                </div>
            </div>
        </div>
    </v-content>
</div>
</template>
<script>

    //* 引用工具函数包并以混入的形式加载
    import util from '../../assets/js/util'
    //* 引用获取发送数据组件
    import {
        getSendData
    } from '../../assets/js/proto'
    import $ from 'jquery'
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
                list: [], //后台API传入的商品数据
                complete: false, //是否完成请求发送，标志位，防止重复提交
                isShowTopMenu: false, //* 是否显示顶部导航菜单
                isShowShareMenu: false, //* 是否显示分享菜单
                topMenus: {
                    menu1: '我的信息',
                    menu2: '投诉商家'
                }, //* 顶部导航菜单选项
                shareMenus: {
                    menu1: '',
                    menu2: ''
                }, //* 顶部导航菜单选项
            }
        },
        mounted() {
            //保存微信端发送过来的code
            this.code = this.$route.query.code;
            //组件加载时候执行后台商品API，获得商品价格/是否下架等信息
            this.request();
            //微信自动登陆，会记录用户的openid
            this.wxlogin();
            this.shareMenus.menu1 = $('.shareMenuBox1').html();
            this.shareMenus.menu2 = $('.shareMenuBox2').html();

        },
        methods: {
            /* 跳转至交易详情页 */
            goDetail() {
                this.$router.push({
                    path: '/transaction/detail'
                })
            },
            reloadPage() {
                console.log('reloadPage')
                location.reload();
            },
            showTopMenu() {
                this.isShowTopMenu = true;
            },
            showShareMenu() {
                //* 支付宝
                $('.zhifubao').off('click');
                $('.zhifubao').on('click', function() {
                    this.toast('支付宝');
                })
                //* 微博
                $('.weibo').off('click');
                $('.weibo').on('click', function() {
                    this.toast('微博');
                })
                //* 朋友圈
                $('.pengyouquan').off('click');
                $('.pengyouquan').on('click', function() {
                    this.toast('朋友圈');
                })
                //* 微信
                $('.wechat').off('click');
                $('.wechat').on('click', function() {
                    this.toast('微信');

                })
                //* 刷新
                $('.reloadPage').off('click');
                $('.reloadPage').on('click', function() {
                    location.reload();
                })
                //* 复制链接
                $('.copylink').off('click');
                $('.copylink').on('click', function() {
                    this.toast('复制链接');
                })
                //* 显示菜单
                this.isShowShareMenu = true;
            },
            topMenuItem(item) {
                if (item == 'menu1') {
                    //do something
                } else if (item == 'menu2') {
                    //do something
                } else {
                    console.warn(item);
                }
            },
            shareMenuItem(item) {
                if (item == 'menu1') {
                    //do something
                } else if (item == 'menu2') {
                    //do something
                } else {
                    console.warn(item);
                }
            },
            wxlogin() {
                //微信自动登陆，保存code到用户的sessionstorage          

                var search = window.location.search;
                if (search != undefined && search.length > 1) {
                    this.code = search.substring(search.indexOf('=') + 1, search.indexOf('&'));
                    console.log("code:" + this.code);
                    sessionStorage.setItem('code', this.code);
                }

                if (!sessionStorage.getItem('member')) {

                    //调用后台API/getcode， 传入微信code，会得到该用户的openid 信息   
                    util.get('getcode', {
                        code: this.code
                    }, (response) => {

                        this.complete = true;

                        if (response.code == "0") {

                            var user = {
                                openid: "",
                                phone: "",
                                token: ""
                            };
                            user.phone = response.phone;
                            user.openid = JSON.parse(response.data).openid;
                            user.token = JSON.parse(response.data).access_token;
                            //把用户的openid 信息 存在sessionStorage里
                            sessionStorage.setItem('member', JSON.stringify(user));
                            sessionStorage.setItem('openid', user.openid);

                            //调用后台API/updatecode,把用户openid/token 信息保存到后台数据库中 

                            util.post('updatecode', {
                                openid: user.openid,
                                token: user.token
                            }, (response) => {
                                this.complete = true;
                            });
                        } else {
                            this.complete = true;
                        }
                    });
                } else {
                    this.complete = true;
                }
            },

            //该方法调用后台API/goodsPrice,是用于获取商品价格/是否下架等信息
            request() {
                util.get('goodsPrice', {}, (response) => {
                    console.log(response.code);
                    console.log(response.list);
                    console.log(response.list[1].goodsPrice);
                    if (response.code == "0") {
                        this.list = response.list;
                        //如果成功返回，设置商品信息在sessionstorage里
                        sessionStorage.setItem('goods', JSON.stringify(response.list));
                        this.price1 = response.list[0].goodsPrice;
                        this.price2 = response.list[1].goodsPrice;
                        this.state1 = response.list[0].state;
                        this.state2 = response.list[1].state;
                        //  this.state3=response.list[2].state;
                    } else {}
                });
            },

            //该方法是用于提示该功能尚未开放，当商品下架的时候
            expect() {
                this.toast('该功能尚未开放，敬请期待');
            }

        }
    }

</script>
