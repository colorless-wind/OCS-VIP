<style lang="less" scoped>
    @import "../../assets/less/config";

    #transactionListPage .transaction-list {
        padding: 5px;
    }

    #transactionListPage .transaction-list .item {
        margin: 10px;
        border-bottom: 1px solid #ddd;
    }

    #transactionListPage .transaction-list .item .title {
        padding: 5px;
        font-size: 17px;
        width: 45%;
        display: inline-block;
    }

    #transactionListPage .transaction-list .item .money {
        padding: 5px;
        font-size: 17px;
        color: #ff6600;
        width: 45%;
        display: inline-block;
        text-align: right;
    }

    #transactionListPage .transaction-list .item .info {
        padding: 5px;
        white-space: nowrap;
        overflow: hidden;
        width: 45%;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #999;
        display: inline-block;
    }

    #transactionListPage .transaction-list .item .time {
        padding: 5px;
        font-size: 14px;
        color: #999;
        text-align: right;
        width: 45%;
        display: inline-block;
        vertical-align: top;
    }

    #transactionListPage .tab-ctrl {
        width: 90%;
        margin: 15px auto;
    }

    #transactionListPage .tab-content {}

</style>
<style>
    #transactionListPage .vux-button-group>a.vux-button-tab-item-first:after {
        border: 1px solid #62a8ea;
    }

    #transactionListPage .vux-button-group>a.vux-button-group-current {
        background-color: #62a8ea;
    }

    #transactionListPage .vux-button-group>a.vux-button-tab-item-last:after {
        border-right: 1px solid #62a8ea;
        border-top: 1px solid #62a8ea;
        border-bottom: 1px solid #62a8ea;
    }

</style>
<template>
<div>
    <v-header title=""></v-header>
    <v-content id="transactionListPage">
        <button-tab class="tab-ctrl" v-model="tabCtrlIndex">
        <button-tab-item>充值</button-tab-item>
        <button-tab-item>消费</button-tab-item>
      </button-tab>
        <div class="transaction-list">
            <div class="tab-content" v-show="tabCtrlIndex == 0">
            <div class="item" @click="goDetail" v-for="item in chargeList">
                <p class="title">会员卡充值</p>
                <p class="money">+{{(item.commonRechargeRealtotal).toFixed(2)}}</p>
                <p class="info">充值</p>
                <p class="time">{{getFormatDate(item.commonRechargeAddtime)}}</p>
            </div>
            <!--<div class="item" @click="goDetail">
                <p class="title">会员卡充值</p>
                <p class="money">+99.00</p>
                <p class="info">充值</p>
                <p class="time">2018-10-17 14:53:16</p>
            </div>
            <div class="item" @click="goDetail">
                <p class="title">会员卡充值</p>
                <p class="money">+20.00</p>
                <p class="info">充值</p>
                <p class="time">2018-10-17 15:18:59</p>
            </div>
            <div class="item" @click="goDetail">
                <p class="title">会员卡充值</p>
                <p class="money">+1050.00</p>
                <p class="info">充值</p>
                <p class="time">2018-10-17 18:33:09</p>
            </div>-->
            </div>
            <div class="tab-content" v-show="tabCtrlIndex == 1">
            <div class="item" @click="goDetail" v-for="item in consumeList">
                <p class="title">会员卡消费</p>
                <p class="money">-{{(item.commonConsumeRealtotal).toFixed(2)}}</p>
                <p class="info">消费</p>
                <p class="time">{{getFormatDate(item.commonConsumeAddtime)}}</p>
            </div>
<!--
            <div class="item" @click="goDetail">
                <p class="title">会员卡消费</p>
                <p class="money">-599.00</p>
                <p class="info">消费</p>
                <p class="time">2018-10-18 18:33:06</p>
            </div>
            <div class="item" @click="goDetail">
                <p class="title">会员卡消费</p>
                <p class="money">-120.00</p>
                <p class="info">消费</p>
                <p class="time">2018-10-18 19:19:14</p>
            </div>
            <div class="item" @click="goDetail">
                <p class="title">会员卡消费</p>
                <p class="money">-150.00</p>
                <p class="info">消费</p>
                <p class="time">2018-10-19 12:53:55</p>
            </div>
-->
            </div>
        </div>
    </v-content>
</div>
</template>
<script>
    //* 引用工具函数包并以混入的形式加载
    import util from '../../assets/js/util'

    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    import $ from 'jquery'
    import {
        Cell,
        Group,
        ButtonTab,
        ButtonTabItem
    } from 'vux'
    export default {
        components: {
            Cell,
            Group,
            ButtonTab,
            ButtonTabItem
        },
        data() {
            return {
                list: [], //后台API传入的商品数据
                tabCtrlIndex: 0, //是否完成请求发送，标志位，防止重复提交
                chargeList: [],
                consumeList: [],
                //* 是否启用加载动画
                enableLoading:true,
                //* 加载动画显示状态
                loading: false,
                //* 加载动画提示文字
                loadingMsg: '',

            }
        },
        mounted() {
            this.getRechargeRecords();
            this.getConsumeRecords();

           console.log(this.getFormatDate(1544209056000))
            var test1 = {
                "status": "0",
                "errorMsg": "",
                "subStatus": "0",
                "subErrorMsg": "",
                "data": null,
                "datas": [{
                    "commonRechargeId": "790487c77636472b82fa470824f5e5ac",
                    "commonRechargeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonRechargeMerchantName": "测试账户002",
                    "commonRechargeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonRechargeMemberName": "15611740510",
                    "commonRechargeAccountId": null,
                    "commonRechargeStoreId": null,
                    "commonRechargeStoreName": null,
                    "commonRechargeOrderId": null,
                    "commonRechargeOrderno": "MB-20181207181548893000",
                    "commonRechargeCardType": 1,
                    "commonRechargeCardno": "20181126123456180020",
                    "commonRechargeCurrencyCode": 0,
                    "commonRechargeTotal": 0.0,
                    "commonRechargeRealtotal": 1.0,
                    "commonRechargeDiscount": 0.0,
                    "commonRechargeDiscountType": null,
                    "commonRechargeDiscountId": null,
                    "commonRechargeDiscountName": null,
                    "commonRechargeDiscountInfo": null,
                    "commonRechargeAddtime": 1544179288000,
                    "commonRechargeDiscountTypeDesc": null,
                    "commonRechargeModtime": 1544207051000,
                    "commonRechargeInstitution": "201811200001",
                    "commonRechargeScene": "MemberService",
                    "commonRechargeChannel": "OCS",
                    "commonRechargeNote": null,
                    "commonChargeReserve1": null,
                    "commonChargeReserve2": null,
                    "commonChargeReserve3": null,
                    "commonChargeReserve4": null
                }, {
                    "commonRechargeId": "a5e9c7de43534d63b498c8eed418bd98",
                    "commonRechargeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonRechargeMerchantName": "测试账户002",
                    "commonRechargeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonRechargeMemberName": "15611740510",
                    "commonRechargeAccountId": null,
                    "commonRechargeStoreId": null,
                    "commonRechargeStoreName": null,
                    "commonRechargeOrderId": null,
                    "commonRechargeOrderno": "MB-20181207181548893000",
                    "commonRechargeCardType": 1,
                    "commonRechargeCardno": "20181126123456180020",
                    "commonRechargeCurrencyCode": 0,
                    "commonRechargeTotal": 0.0,
                    "commonRechargeRealtotal": 1.0,
                    "commonRechargeDiscount": 0.0,
                    "commonRechargeDiscountType": null,
                    "commonRechargeDiscountId": null,
                    "commonRechargeDiscountName": null,
                    "commonRechargeDiscountInfo": null,
                    "commonRechargeAddtime": 1544179141000,
                    "commonRechargeDiscountTypeDesc": null,
                    "commonRechargeModtime": 1544206905000,
                    "commonRechargeInstitution": "201811200001",
                    "commonRechargeScene": "MemberService",
                    "commonRechargeChannel": "OCS",
                    "commonRechargeNote": null,
                    "commonChargeReserve1": null,
                    "commonChargeReserve2": null,
                    "commonChargeReserve3": null,
                    "commonChargeReserve4": null
                }, {
                    "commonRechargeId": "afab744f92434af4a5085121f0713ebb",
                    "commonRechargeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonRechargeMerchantName": "测试账户002",
                    "commonRechargeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonRechargeMemberName": "15611740510",
                    "commonRechargeAccountId": null,
                    "commonRechargeStoreId": null,
                    "commonRechargeStoreName": null,
                    "commonRechargeOrderId": null,
                    "commonRechargeOrderno": "MB-20181207181548893000",
                    "commonRechargeCardType": 1,
                    "commonRechargeCardno": "20181126123456180020",
                    "commonRechargeCurrencyCode": 0,
                    "commonRechargeTotal": 0.0,
                    "commonRechargeRealtotal": 1.0,
                    "commonRechargeDiscount": 0.0,
                    "commonRechargeDiscountType": null,
                    "commonRechargeDiscountId": null,
                    "commonRechargeDiscountName": null,
                    "commonRechargeDiscountInfo": null,
                    "commonRechargeAddtime": 1544179141000,
                    "commonRechargeDiscountTypeDesc": null,
                    "commonRechargeModtime": 1544206905000,
                    "commonRechargeInstitution": "201811200001",
                    "commonRechargeScene": "MemberService",
                    "commonRechargeChannel": "OCS",
                    "commonRechargeNote": null,
                    "commonChargeReserve1": null,
                    "commonChargeReserve2": null,
                    "commonChargeReserve3": null,
                    "commonChargeReserve4": null
                }, {
                    "commonRechargeId": "bf6c6c0b19684c728497905a2b9d16ae",
                    "commonRechargeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonRechargeMerchantName": "测试账户002",
                    "commonRechargeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonRechargeMemberName": "15611740510",
                    "commonRechargeAccountId": null,
                    "commonRechargeStoreId": null,
                    "commonRechargeStoreName": null,
                    "commonRechargeOrderId": null,
                    "commonRechargeOrderno": "MB-20181207181548893000",
                    "commonRechargeCardType": 1,
                    "commonRechargeCardno": "20181126123456180020",
                    "commonRechargeCurrencyCode": 0,
                    "commonRechargeTotal": 0.0,
                    "commonRechargeRealtotal": 1.0,
                    "commonRechargeDiscount": 0.0,
                    "commonRechargeDiscountType": null,
                    "commonRechargeDiscountId": null,
                    "commonRechargeDiscountName": null,
                    "commonRechargeDiscountInfo": null,
                    "commonRechargeAddtime": 1544179141000,
                    "commonRechargeDiscountTypeDesc": null,
                    "commonRechargeModtime": 1544206904000,
                    "commonRechargeInstitution": "201811200001",
                    "commonRechargeScene": "MemberService",
                    "commonRechargeChannel": "OCS",
                    "commonRechargeNote": null,
                    "commonChargeReserve1": null,
                    "commonChargeReserve2": null,
                    "commonChargeReserve3": null,
                    "commonChargeReserve4": null
                }, {
                    "commonRechargeId": "f8db33a3990946649f4ebcefd7095dbb",
                    "commonRechargeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonRechargeMerchantName": "测试账户002",
                    "commonRechargeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonRechargeMemberName": "15611740510",
                    "commonRechargeAccountId": null,
                    "commonRechargeStoreId": null,
                    "commonRechargeStoreName": null,
                    "commonRechargeOrderId": null,
                    "commonRechargeOrderno": "MB-20181207181548893000",
                    "commonRechargeCardType": 1,
                    "commonRechargeCardno": "20181126123456180020",
                    "commonRechargeCurrencyCode": 0,
                    "commonRechargeTotal": 0.0,
                    "commonRechargeRealtotal": 1.0,
                    "commonRechargeDiscount": 0.0,
                    "commonRechargeDiscountType": null,
                    "commonRechargeDiscountId": null,
                    "commonRechargeDiscountName": null,
                    "commonRechargeDiscountInfo": null,
                    "commonRechargeAddtime": 1544179141000,
                    "commonRechargeDiscountTypeDesc": null,
                    "commonRechargeModtime": 1544206904000,
                    "commonRechargeInstitution": "201811200001",
                    "commonRechargeScene": "MemberService",
                    "commonRechargeChannel": "OCS",
                    "commonRechargeNote": null,
                    "commonChargeReserve1": null,
                    "commonChargeReserve2": null,
                    "commonChargeReserve3": null,
                    "commonChargeReserve4": null
                }],
                "subOk": true,
                "ok": true
            }

            var test2 = {
                "status": "0",
                "errorMsg": "",
                "subStatus": "0",
                "subErrorMsg": "",
                "data": null,
                "datas": [{
                    "commonConsumeId": "e0edbaefec154212abb6232ca8e895d2",
                    "commonConsumeMerchantId": "8374f2833044427a8d96afa5779c904c",
                    "commonConsumeAccountId": null,
                    "commonConsumeMemberId": "9d3278dc97894f7098de8288b8776e68",
                    "commonConsumeMemberName": "15611740510",
                    "commonConsumeStoreId": null,
                    "commonConsumeStoreName": null,
                    "commonConsumeCardno": "20181126123456180032",
                    "commonConsumeCardType": 1,
                    "commonConsumeOrderId": null,
                    "commonConsumeOrderno": "20181126123456180032",
                    "commonConsumeMerchantName": "测试账户002",
                    "commonConsumeCurrencyCode": 0,
                    "commonConsumeTotal": 1.0,
                    "commonConsumeRealtotal": 1.0,
                    "commonConsumeDiscount": 0.0,
                    "commonConsumeAddtime": 1544209056000,
                    "commonConsumeModtime": 1544207542000,
                    "commonConsumeDiscountType": null,
                    "commonConsumeDiscountTypeDesc": null,
                    "commonConsumeDiscountId": null,
                    "commonConsumeDiscountName": null,
                    "commonConsumeDiscountInfo": null,
                    "commonConsumeInstitution": null,
                    "commonConsumeScene": "MemberService",
                    "commonConsumeChannel": "OCS",
                    "commonConsumeNote": null,
                    "commonConsumeReserve1": null,
                    "commonConsumeReserve2": null,
                    "commonConsumeReserve3": null,
                    "commonConsumeReserve4": null
                }],
                "subOk": true,
                "ok": true
            }
        },
        methods: {
            getRechargeRecords() {
                var testParam = {
                    "userId": "493f915223fd477f8e4b11e419feb3ed",
                    "permissionId": "3e93be255a144e3bafc49988bb2bf059",
                    "scene": "MemberService",
                    "channel": "OCS",
                    "merchantId": "8374f2833044427a8d96afa5779c904c",
                    "merchantName": "测试账户002"
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                    merchantId: sessionStorage.getItem('merchantId') || 'no merchantId',
                    merchantName: sessionStorage.getItem('merchantName') || 'no merchantName'
                }, this.CONST.APP_ID, this.CONST.METHOD.getRechargeRecords, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        this.chargeList = response.datas;
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
            getConsumeRecords() {
                var testParam = {
                    "userId": "493f915223fd477f8e4b11e419feb3ed",
                    "permissionId": "3e93be255a144e3bafc49988bb2bf059",
                    "scene": "MemberService",
                    "channel": "OCS",
                    "merchantId": "8374f2833044427a8d96afa5779c904c",
                    "merchantName": "测试账户002"
                }
                //* 设定加载提示信息
                this.loadingMsg = this.CONST.MSG.commonLoading;
                //* 发送请求
                this.post(this.CONST.BASE_URL, this.getSendData({
                    userId: localStorage.getItem('id') || 'not login',
                    permissionId: localStorage.getItem('token') || 'not login',
                    username: localStorage.getItem('username') || 'not login',
                    merchantId: sessionStorage.getItem('merchantId') || 'no merchantId',
                    merchantName: sessionStorage.getItem('merchantName') || 'no merchantName'
                }, this.CONST.APP_ID, this.CONST.METHOD.getConsumeRecords, this.CONST.PWD), this).then((response) => {
                    console.log('访问成功');
                    console.log(response);
                    if (0 == response.subStatus && 0 == response.status) {
                        this.consumeList = response.datas;
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
            /* 跳转至交易详情页 */
            goDetail() {
                this.$router.push({
                    path: '/transaction/detail'
                })
            },
        },
        mixins: [util]
    }

</script>
