<style lang="less" scoped>
    @import "../../assets/less/config";

    .indexButton {
        line-height: 38px;
        border-radius: 5px;
        border: 1px solid darken(@main, 3%);
        font-size: 14px;
        color: #fff;
        background: @main;
        text-align: center;

    }
    img {
        width: 100%;
    }
    .img_p1{
        position:absolute;
        z-index:2;
        left:1%;
        top:20%;
        font-size: 65px;
        color: #FFFFFF
        //color: #FF300D
    }
    .img_p2{
       position: absolute;
    z-index: 2;
    left:1%;
        top:20%;
    font-size: 65px;
    /* color: #FF300D; */
    color: #FFFFFF;
    }
    .op{
        opacity:0.5;
        color: #DCDCDC;
        z-index: -1;
    }
    .op1{
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .content1{
        top: 0px !important;
    }


</style>
<template>
    <div>
    <div>
        <div :class="{op1:this.complete == false}">
    </div>
        </div>
        <v-content class="content1" style="bottom:50px;">
    <div :class="{op:this.complete == false}">

    <div>
        <v-swiper :imgs="imgs"></v-swiper>
    </div>
        <div style="width: 100%;height: 3px;background-color:gainsboro "></div>
        <v-loading :complete="complete" ></v-loading>
        <div>
        <div flex=" box:mean main:center">
           <!--  <a  v-for="card in list">
                <!--{{card.goodsPrice}}-->
             <!--      <img src="../../assets/images/biaozhun.jpg" class="img"/>
            </a> -->
          <!--  <a class="indexButton">
                迷你卡定制
                &lt;!&ndash;<img src="../assets/images/mini.jpg" class="img" />&ndash;&gt;
            </a>-->

            <router-link to="/standardCard/statement/statement" style="position: relative;order: 1" v-if="this.state1 == 1">
                <img src="../../assets/images/biaozhun_half.png" class="img" v-if="this.state1 == 1&&this.state2 == 1"/>
                 <img src="../../assets/images/biaozhun_full.png" class="img" v-if="this.state1 == 1&&this.state2 != 1"/>
                <div class="img_p1" v-if="this.state1 == 1&&this.state2 != 1">
                     <span><i class="iconfont icon-renminbi"style="font-size: 50px"></i>{{price1}}</span>
                </div>
                <div class="img_p1" style="left: -3%;font-size:25px;" v-if="this.state1 == 1&&this.state2 == 1">
                     <!-- <span><i class="iconfont icon-renminbi"style="font-size: 45px"></i>{{price1}}</span> -->
                </div>
            </router-link>
         <!--    <a  style="position: relative;order: 1" @click="expect" v-else>
                <img src="../../assets/images/biaozhun.png" class="img"/>

            </a> -->


            <router-link to="/miniCard/statement/statement" style="position: relative;order: 2" v-if="this.state2 == 1">
                <img src="../../assets/images/mini_half.png" class="img" v-if="this.state1 == 1&&this.state2 == 1"/>
                <img src="../../assets/images/mini_full.png" class="img" v-if="this.state1 != 1&&this.state2 == 1"/>
                <div class="img_p2" v-if="this.state1 != 1&&this.state2 == 1">
                   <span> <i class="iconfont icon-renminbi"style="font-size: 50px"></i>{{price2}}</span>
                </div>

                 <div class="img_p2"  style="left: -3%;font-size:25px;" v-if="this.state1 == 1&&this.state2 == 1">
                   <!-- <span> <i class="iconfont icon-renminbi"style="font-size: 45px"></i>{{price2}}</span> -->
                </div>
            </router-link>
          <!--   <a  style="position: relative;order: 2" @click="expect" v-else>
                <img src="../../assets/images/mini.png" class="img"/>

            </a> -->

            <!--<router-link to="/Bracelet" style="order: 3" v-if="this.state3 == 1">-->
                    <!--<img src="../../assets/images/shouhuan.png" class="img"/>-->
            <!--</router-link>-->
          <!--   <a  style="position: relative;order: 3" @click="expect" v-else>
                <img src="../../assets/images/shouhuan.png" class="img"/>

            </a> -->


        </div>
        </div>




    </div>
        </v-content>
        <v-mainfooter></v-mainfooter>
    </div>
</template>
<script>
    import util from 'util'
    export default {
        data () {
            return {
                list:[],//后台API传入的商品数据
                code:'',//微信验证的code
                price1:'',//普通卡定制价格，后台传入
                complete:false,//是否完成请求发送，标志位，防止重复提交
                price2:'',//迷你卡定制价格，后台传入
                state1:'',//普通卡是否上架，1为上架/2为下架
                state2:'',//迷你卡是否上架，1为上架/2为下架
                state3:''//手环是否上架，1为上架/2为下架
            }
        },
        mounted(){
            //保存微信端发送过来的code
            this.code=this.$route.query.code;
            //组件加载时候执行后台商品API，获得商品价格/是否下架等信息
            this.request();
            //微信自动登陆，会记录用户的openid
            this.wxlogin();
          
        },
        methods: {
            wxlogin(){
    //微信自动登陆，保存code到用户的sessionstorage          

var search=window.location.search;
if(search!=undefined && search.length>1)
{
    this.code=search.substring(search.indexOf('=')+1,search.indexOf('&'));
      console.log("code:"+this.code);
       sessionStorage .setItem('code', this.code);
}
              
                if (!sessionStorage .getItem('member')) {

            //调用后台API/getcode， 传入微信code，会得到该用户的openid 信息   
                 util.get('getcode',{code:this.code}, (response) => {
                
              this.complete=true;
           
                if (response.code == "0") {
                   
                    var user={openid:"",phone:"",token:""};
                    user.phone=response.phone;
                   user.openid=JSON.parse(response.data).openid;
                   user.token=JSON.parse(response.data).access_token;
                  //把用户的openid 信息 存在sessionStorage里
                    sessionStorage .setItem('member', JSON.stringify(user));
                    sessionStorage .setItem('openid', user.openid);

                  //调用后台API/updatecode,把用户openid/token 信息保存到后台数据库中 

                  util.post('updatecode',{openid:user.openid,token:user.token}, (response) => {
                     this.complete=true;
                      });
                }
                else{
                     this.complete=true;
                }
            });
}else{
    this.complete=true;
}
            },

             //该方法调用后台API/goodsPrice,是用于获取商品价格/是否下架等信息
            request () {
                util.get('goodsPrice',{}, (response) => {
                console.log(response.code);
                console.log(response.list);
                console.log(response.list[1].goodsPrice);
                if (response.code == "0") {
                this.list=response.list;
                 //如果成功返回，设置商品信息在sessionstorage里
                sessionStorage .setItem('goods', JSON.stringify(response.list));
                this.price1=response.list[0].goodsPrice;
                this.price2=response.list[1].goodsPrice;
                this.state1=response.list[0].state;
                this.state2=response.list[1].state;
              //  this.state3=response.list[2].state;
                }
                else{
                }
            });
            },

            //该方法是用于提示该功能尚未开放，当商品下架的时候
            expect(){
                this.toast('该功能尚未开放，敬请期待');
            }

        }
    }

</script>
