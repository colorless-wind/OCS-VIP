//const BASE_URL = "http://localhost:8018/gateway/api"
//const BASE_URL = "http://10.165.60.222:8018/gateway/api"
//const BASE_URL = "http://10.165.60.101:9008/gateway/api"
const BASE_URL = "http://ocs.goldpacpay.com:9008/gateway/api"
//const BASE_URL = "http://10.165.42.53:9008/gateway/api"
//const BASE_URL = "http://10.165.40.60:8018/gateway/api"
const APP_ID = "201811200036";
const APP_NAME = "啦啦啦咖啡厅";
const PWD = "005b3673f4df4a8085d7a8240bb0c642";

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
    //* 获取当前活动信息
    getCurrentActivity: "ocs.memershipcard.useractivity.getcurrentactivity",
    //* 获取活动信息列表
    getActivities: "ocs.memershipcard.useractivity.getactivities",
    //* 获取充值活动结算金额
    getActivityRechargeMoney: "ocs.memershipcard.useractivity.getactivityrechargemoney",
}

const ROUTER = {
    //* 广告页面
    adPage: '/login/advertisement',
    //* 选择卡片模板页面
    selectCard: '/login/selectCard',
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
    //* 充值首页
    chargeIndexPage: '/charge/index/',
    //* 充值支付页面
    chargePayPage: '/charge/pay/',
}

const REGEX = {
    //* 手机号格式验证
    phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    ////* 密码格式验证（6-11英文数字混合）
    //pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/,
    //* 密码格式验证（6-11英文或数字）
    pwd: /^[0-9A-Za-z]{6,11}$/,
    //* 验证码格式验证（6位纯数字）
    vcode: /^\d{6}$/,
    //* 充值金额格式验证（正整数）
    money: /^[0-9]\d*$/,
}

const MSG = {
    phoneEmptyCheck: '手机号码不能为空',
    phoneCheck: '手机号码格式不正确，请输入正确的手机号码',
    pwdEmptyCheck: '请输入密码',
    pwdCheck: '密码格式不正确，请重新输入6-11位数字或字母',
    pwdLengthCheck: '密码长度不合法，请重新输入6-11位数字或字母',
    oldPwdCheck: '原始密码格式不正确，请重新输入6-11位数字或字母',
    pwdConfirmEmptyCheck: '请输入确认密码',
    pwdConfirmLengthCheck: '确认密码长度不合法，请重新输入6-11位数字或字母',
    pwdConfirmCheck: '确认密码格式不正确，请重新输入6-11位数字或字母',
    pwdConfirmSameCheck: '密码与确认密码不一致，请保持前后一致',
    vcodeEmptyCheck: '验证码不能为空',
    vcodeCheck: '验证码格式不正确',
    chargeMoneyCheck: '充值金额不正确，只能充值整数金额',
    chargeMoneyMin: '充值金额最小1元',
    chargeMoneyMax: '充值金额最大9999元',
    commonLoading: '正在请求中，请耐心等待···',
    regLoading: '正在注册中，请耐心等待···',
    vcodeLoading: '正在获取验证码，请耐心等待···',
    loginLoading: '正在登录中，请耐心等待···',
    resetPwdLoading: '正在请求中，请耐心等待···',
    regSuccess: '注册成功',
    resetPwdSuccess: '重置密码成功',
    changePwdSuccess: '修改密码成功',
    loginSuccess: '登录成功',
    consumeSuccess: '您已成功消费',
    chargeSuccess: '您已成功充值',
    completeAccount: '请完善账户详细信息',
}

const PLACEHOLDER = {
    phone: '请输入手机号',
    pwd: '密码，6-11位数字或字母',
    vcode: '验证码',
    oldPwd: '原始密码，6-11位数字或字母',
    newPwd: '新密码，6-11位数字或字母',
    newPwdConfirm: '确认新密码，6-11位数字或字母',
}

const TRANSCODE = {
    //* 未知错误信息
    '030014990000': '服务器繁忙，请稍后重试',
    //* 未知错误信息
    '010000990000': '服务器繁忙，请稍后重试',
    //* 未知错误信息
    '010025990000': '服务器繁忙，请稍后重试',
    //* 账户未登录
    '030014080010': '您的账户信息已过期或已在别处登录，请重新登录',
    //* 账户不存在
    '010015080003': '用户不存在',
    //* 登录失败
    '030014060000': '账号或密码错误，请重新输入',
    //* 参数为空
    '030014040000': '参数为空',
    //* 参数不合法
    '030014040000': '参数不合法',
    //* 数据库查询失败
    '030014040000': '数据库查询失败',
    //* 数据库添加失败
    '030014000001': '数据库添加失败',
    //* 数据库修改失败
    '030014000002': '数据库修改失败',
    //* 注册失败
    '030014060001': '服务器繁忙，请稍后重试',
    //* 商户未授权
    '030014080002': '商户未授权',
    //* 用户已存在
    '030014080001': '用户已存在',
    //* 验证码失效或不存在
    '030014080012': '验证码失效或不存在',
    //* 参数不合法
    '030014040002': '提交信息不完整，请检查您的提交信息',
    //* 数据库查询失败
    '030014000000': '暂未查询到有效的信息，请稍后重试',
    //* 数据库查询为空
    '030000000004': '暂未查询到有效的信息，请稍后重试',
    //* 活动信息异常
    '030014080015': '活动信息异常，请稍后重试',
}


export default {
    BASE_URL,
    APP_ID,
    APP_NAME,
    PWD,

    METHOD,
    ROUTER,
    REGEX,
    MSG,
    PLACEHOLDER,
    TRANSCODE
}
