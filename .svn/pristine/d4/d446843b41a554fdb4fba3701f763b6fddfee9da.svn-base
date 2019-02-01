import HelloWorld from '@/components/HelloWorld'

import App from '../App'

import Login from '../pages/login/login'
import Reset from '../pages/login/reset'
import ChangePwd from '../pages/login/changePwd'
import Register from '../pages/login/register'
import AD from '../pages/login/ad'
import Index from '../pages/index/index'
import QrCode from '../pages/index/qrCode'
import PersonalCenter from '../pages/personal/personalCenter'
import PersonalInfo from '../pages/personal/personalInfo'
import ActivityList from '../pages/activity/list'
import ActivityDetail from '../pages/activity/detail'
import TransactionList from '../pages/transaction/list'
import TransactionDetail from '../pages/transaction/detail'
import Charge from '../pages/charge/index'
import VipCardDetail from '../pages/vipCard/detail'

/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login/login/', // 登录
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: Login
      },
            {
                path: '/login/reset/', // 重置密码
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: Reset
      },{
                path: '/login/changePwd/', // 重置密码
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: ChangePwd
      },
            {
                path: '/login/register/', // 注册
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: Register
      },
            {
                path: '/login/advertisement/', // 广告
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: AD
      },
            {
                path: '/index/index/', // 首页
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: Index
      },{
                path: '/index/qrcode/', // 二维码支付
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: QrCode
      },{
                path: '/personal/personalcenter/', // 个人中心（我的）
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: PersonalCenter
      },{
                path: '/personal/personalinfo/', // 个人信息
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: PersonalInfo
      },
            {
                path: '/activity/list/', // 活动信息列表
                meta: {
                    auth: false,
                    keepAlive: true, //此组件不需要被缓存 
                },
                component: ActivityList
      },
            {
                path: '/activity/detail/', // 活动信息详情
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: ActivityDetail
      },
            {
                path: '/transaction/list/', // 交易信息列表
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: TransactionList
      },
            {
                path: '/transaction/detail/', // 交易信息详情
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: TransactionDetail
      },
            {
                path: '/charge/index/', // 充值首页
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: Charge
      },
            {
                path: '/vipCard/detail/', // 会员卡详情
                meta: {
                    auth: false,
                    keepAlive: false, //此组件不需要被缓存 
                },
                component: VipCardDetail
      },
            {
                path: '/', // 首页
                meta: {
                    auth: false
                },
                component: Index
      },
            {
                path: '*', // 其他页面
                redirect: '/index/index/'
      }

    ]
  }
]
