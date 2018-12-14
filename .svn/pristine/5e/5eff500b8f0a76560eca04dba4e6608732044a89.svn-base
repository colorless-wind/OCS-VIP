<style lang="less" scoped>
    @import "../../assets/less/config";

    #activityDetailPage .activity-detail {}

    #activityDetailPage .activity-detail h2 {
        padding: 15px 25px 0 25px;
        line-height: 1.4;
    }

    #activityDetailPage .activity-detail hr {
        border: none;
        border-bottom: 1px solid #ccc;
        margin: 0 10px 15px 10px;
    }

    #activityDetailPage .activity-detail .date {
        font-size: 12px;
        color: #bbb;
        padding: 10px 25px;
    }

    #activityDetailPage .activity-detail .info {
        padding: 10px 25px;
    }

    #activityDetailPage .activity-detail .info .message {
        font-size: 17px;
        text-align: justify;
        line-height: 1.5;
    }

    #activityDetailPage .activity-detail .info .pictures {}

</style>
<template>
<div>
    <v-header title=""></v-header>
    <v-content id="activityDetailPage">
        <div class="activity-detail">
            <h2>{{data.title}}</h2>
            <div class="date">{{data.date}}</div>
            <hr>
            <div class="info">
                <p class="message">{{data.content}}</p>
                <p class="pictures"></p>
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
    export default {
        data() {
            return {
                activityid: '',
                data: {},
            }
        },
        mounted() {
            this.activityid = this.$route.query.activityId ? this.$route.query.activityId : '';
            this.getData();
        },
        methods: {
            getData() {
                util.post('activity/detail', {
                    activityid: this.activityid,
                }, (response) => {
                    console.log(response);
                    this.data = response.data;
                });
            },
            //该方法是用于提示该功能尚未开放，当商品下架的时候
            test() {
                this.toast('该功能尚未开放，敬请期待');
            }
        }
    }

</script>
