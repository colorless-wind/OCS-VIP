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
		<v-header title=""></v-header>
		<v-content id="indexPage">
			<div class="card">
				<div class="left">
					<div class="avatar"><img src="../../assets/images/index/avatar.png" /></div>
					<div class="name">{{indexInfo.name}}<br><span class="type">{{indexInfo.cardtype}}</span></div>
				</div>
				<div class="right">
					余额 <span class="money">{{indexInfo.restmoney}}</span>元
				</div>
				<div class="card-number">
					{{indexInfo.cardno?indexInfo.cardno.substring(0,4)+' '+indexInfo.cardno.substring(4,8)+' '+ indexInfo.cardno.substring(8,12)+' '+ indexInfo.cardno.substring(12,13):''}}
				</div>
			</div>
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
					<button type="button" class="pay-btn">支付</button>
				</div>
			</div>
			<group>
				<div @click="showShareMenu">
					<cell title="推荐给朋友" is-link></cell>
				</div>
				<cell title="活动信息" link="/activity/list"></cell>
				<cell title="交易信息" link="/transaction/list/"></cell>
				<cell title="预约信息" is-link></cell>
				<cell title="充值" link="/charge/index/"></cell>
				<cell title="会员卡详情" link="/vipCard/detail/"></cell>
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
			<!--* 顶部导航栏选项菜单 *-->
			<actionsheet v-model="isShowTopMenu" :menus="topMenus" show-cancel @on-click-menu="topMenuItem"></actionsheet>
			<!--* 分享选项菜单 *-->
			<actionsheet v-model="isShowShareMenu" :menus="shareMenus" show-cancel @on-click-menu="shareMenuItem"></actionsheet>
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
				indexInfo: {},
				showPoints: false,
				showCoupon: false,
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
			//this.code = this.$route.query.code;
			//组件加载时候执行后台商品API，获得商品价格/是否下架等信息
			//this.request();
			//微信自动登陆，会记录用户的openid
			//this.wxlogin();
			this.getData();
			this.shareMenus.menu1 = $('.shareMenuBox1').html();
			this.shareMenus.menu2 = $('.shareMenuBox2').html();

		},
		methods: {
			getData() {
				util.post('index/indexinfo', {}, (response) => {
					console.log(response);
					if(response.substatus == 0) {
						this.indexInfo = response.data;
					} else {
						this.toast(response.submsg);
					}
				});
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
					var url = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https://qr.alipay.com/c1x063287crpdxrhcynhd49';
					location.href = url;
				})
				//* 微博
				$('.weibo').off('click');
				$('.weibo').on('click', function() {
					this.toast('微博');
					var url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent('一些内容' + '「' + '一个标题' + '」' + ' 点这里' + window.location.href) + '&pic=' + 'http://img.t.sinajs.cn/t4/appstyle/widget/images/library/base/wb_logo.png?id=1395901125982';     
					window.open(url); 
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
					var input = document.createElement('input');
					input.setAttribute('readonly', 'readonly');
					input.setAttribute('value', location.href);
					document.body.appendChild(input);
					input.setSelectionRange(0, 9999);
					input.select();
					if(document.execCommand('copy')) {
						document.execCommand('copy');
						this.toast('复制成功');
					}
					document.body.removeChild(input);
				})
				//* 显示菜单
				this.isShowShareMenu = true;
			},
			topMenuItem(item) {
				if(item == 'menu1') {
					//do something
				} else if(item == 'menu2') {
					//do something
				} else {
					console.warn(item);
				}
			},
			shareMenuItem(item) {
				if(item == 'menu1') {
					//do something
				} else if(item == 'menu2') {
					//do something
				} else {
					console.warn(item);
				}
			},
			wxlogin() {
				//微信自动登陆，保存code到用户的sessionstorage          

				var search = window.location.search;
				if(search != undefined && search.length > 1) {
					this.code = search.substring(search.indexOf('=') + 1, search.indexOf('&'));
					console.log("code:" + this.code);
					sessionStorage.setItem('code', this.code);
				}

				if(!sessionStorage.getItem('member')) {

					//调用后台API/getcode， 传入微信code，会得到该用户的openid 信息   
					util.get('getcode', {
						code: this.code
					}, (response) => {

						this.complete = true;

						if(response.code == "0") {

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
					if(response.code == "0") {
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