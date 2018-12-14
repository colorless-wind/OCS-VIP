//const BASE_URL = "http://localhost:8018/gateway/api"
const BASE_URL = "http://10.165.60.222:8018/gateway/api"
//const BASE_URL = "http://10.165.40.60:8018/gateway/api"
const APP_ID = "201811200001";
const PWD = "7fa8282ad93047a4d6fe6111c93b308a";

const METHOD = {
    //* 登录
    login: "ocs.memershipcard.user.login",
    //* 退出登录
    exitLogin: "ocs.memershipcard.user.exitlogin",
    //* 注册
    register: "ocs.memershipcard.user.register",
    //* 忘记密码
    resetPwd: "ocs.memershipcard.user.forgetpwd",
    //* 修改密码
    changePwd: "ocs.memershipcard.user.changepwd",
    //* 发送短信验证码
    vcode: "ocs.memershipcard.user.sendsms",
    //* 查询用户详细信息（个人信息）
    selectUserDetail: "ocs.memershipcard.user.selectdetail",
    //* 修改用户详细信息（个人信息）
    updateUserDetail: "ocs.memershipcard.user.updatedetail",
    //* 查询用户积分
    selectPoint: "ocs.memershipcard.point.selectpoint",
    //* 获取用户付款二维码
    getUserQrcode: "ocs.memershipcard.qrcode.getuserqrcode",
    //* 查询会员卡信息（卡片余额）
    selectCardInfo: "ocs.memershipcard.card.selectcardinfo",
    //* 获取活动信息（立即充值）
    getActivity: "ocs.memershipcard.activity.getactivity",
    //* 下订单（立即充值）
    addOrder: "ocs.memershipcard.order.addorder",
    //* 查询充值记录
    getRechargeRecords: "ocs.memershipcard.trade.getrechargerecords",
    //* 查询消费记录
    getConsumeRecords: "ocs.memershipcard.trade.getconsumerecords",
}

const ROUTER = {
    //* 广告页面
    adPage: '/login/advertisement',
    //* 登录页面
    loginPage: '/login/login',
    //* 忘记密码页面
    resetPage: '/login/reset',
    //* 注册页面
    registerPage: '/login/register',
    //* 主页面
    indexPage: '/index/index',
    //* 付款二维码页面
    qrcodePage: '/index/qrcode',
    //* 我的信息页面
    personalCenterPage: '/personal/personalcenter/',
    //* 个人信息页面
    personalInfoPage: '/personal/personalinfo/',
}

const REGEX = {
    //* 手机号格式验证
    phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    //* 密码格式验证（6-11英文数字混合）
    pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/,
    //* 验证码格式验证（6位纯数字）
    vcode: /^\d{6}$/,
    //* 充值金额格式验证（正整数）
    money: /^[1-9]\d*$/,
}

const MSG = {
    phoneCheck: '手机号格式不正确',
    pwdCheck: '密码格式不正确，请输入6-11位数字加字母组合的密码',
    oldPwdCheck: '原始密码格式不正确，请输入6-11位数字加字母组合的密码',
    pwdConfirmCheck: '确认密码格式不正确，请输入6-11位数字加字母组合的密码',
    pwdConfirmSameCheck: '密码与确认密码不一致，请保持前后一致',
    vcodeCheck: '验证码格式不正确',
    chargeMoneyCheck: '充值金额不正确',
    commonLoading: '正在请求中，请耐心等待···',
    regLoading: '正在注册中，请耐心等待···',
    vcodeLoading: '正在获取验证码，请耐心等待···',
    loginLoading: '正在登录中，请耐心等待···',
    resetPwdLoading: '正在请求中，请耐心等待···',
    regSuccess: '注册成功',
    resetPwdSuccess: '重置密码成功',
    changePwdSuccess: '修改密码成功',
    loginSuccess: '登录成功',
    consumeSuccess: '消费成功',
    chargeSuccess: '充值成功'
}

const PLACEHOLDER = {
    phone:'手机号',
    pwd:'密码，6-11位数字字母组合',
    vcode:'验证码',
    oldPwd:'原始密码，6-11位数字字母组合',
    newPwd:'新密码，6-11位数字字母组合',
    newPwdConfirm:'确认新密码，6-11位数字字母组合',
}

export default {
    BASE_URL,
    APP_ID,
    PWD,

    METHOD,
    ROUTER,
    REGEX,
    MSG,
    PLACEHOLDER,
}
