const apiMethods = {
    data() {
        return {
            //* 测试变量
            testStr: '110'
        }
    },
    methods: {
        /**
         * 功能 获取发送请求的参数
         * 参数1 data 指业务用的个性化参数 例：登录的用户名和密码 类型 JSON对象
         * 参数2 appId 类型 String
         * 参数3 method 类型 String
         * 参数4 pwd 类型 String
         * 返回 参数对象 类型 JSON
         **/
        getSendData(data, appId, method, pwd) {
            var proto = {
                appId: appId,
                method: method,
                format: "JSON",
                charset: "UTF-8",
                signType: "MD5",
                timestamp: "",
                version: "1.0.1",
                channel: "OCS",
                scene: "MemberService",
                data: data
            };
            var str = JSON.stringify(data) + "&pwd=" + pwd;
            console.log('md5加密对象' + str);

            var sign = this.$md5(str);
            proto["sign"] = sign;

            console.log('完整参数为' + JSON.stringify(proto));
            return proto;
        },
        /**
         * 功能 get方式发送请求
         * 参数1 url 请求的地址 类型 String
         * 参数2 data 请求的完整参数 类型 JSON
         * 返回 Promise
         **/
        get(url, data) {
            return new Promise((resolve, reject) => {
                let vueObj = this;
                // Add a request interceptor
                this.$axios.interceptors.request.use(function (config) {
                    // Do something before request is sent
                    if (vueObj.enableLoading === true) {
                        vueObj.loading = true;
                    }

                    return config;
                }, function (error) {
                    // Do something with request error
                    return Promise.reject(error);
                });
                this.$axios.get(url, data).then((response) => {
                    vueObj.loading = false;
                    resolve(response.data);
                }, (response) => {
                    vueObj.loading = false;
                    reject(response);
                    console.log("请求超时，请检查网络")
                })
            })
        },
        /**
         * 功能 post方式发送请求
         * 参数1 url 请求的地址 类型 String
         * 参数2 data 请求的完整参数 类型 JSON
         * 返回 Promise
         **/
        post(url, data) {
            return new Promise((resolve, reject) => {
                let vueObj = this;
                // Add a request interceptor
                this.$axios.interceptors.request.use(function (config) {
                    // Do something before request is sent
                    if (vueObj.enableLoading === true) {
                        vueObj.loading = true;
                    }

                    return config;
                }, function (error) {
                    // Do something with request error
                    return Promise.reject(error);
                });
                this.$axios.post(url, data).then((response) => {
                    vueObj.loading = false;
                    resolve(response.data);
                }).catch((response) => {
                    //console.log('f', response)
                    vueObj.loading = false;
                    reject(response);
                    console.log("请求超时，请检查网络");
                })
            })
        },
        /**
         * 功能 toast类型弹窗
         * 参数1 msg 弹窗显示的文字 类型 String
         * 参数2 time 弹窗维持时间 单位ms 类型 Number
         * 返回 无
         **/
        toast(msg = '', time = 2000) {
            var toast = document.createElement('div')
            toast.className = 'common-toast common-toast-show'
            toast.innerHTML = msg
            document.body.appendChild(toast)
            toast.style.display = 'block'
            //toast.style.margin = `-${toast.offsetHeight / 2}px 0 0 -${toast.offsetWidth / 2}px`
            var timer = setTimeout(() => {
                toast.className = 'common-toast common-toast-hide'
                clearTimeout(timer)
                var timer2 = setTimeout(() => {
                    document.body.removeChild(toast)
                    clearTimeout(timer2)
                }, 200)
            }, time)
        },
        /**
         * 功能 将"当前时间至1970年之间的毫秒数" 转换为 格式化的时间 例：1544209056000 => "2018-12-08 02:57:36"
         * 参数1 time 当前时间至1970年之间的毫秒数 类型 Number
         * 返回 无
         **/
        getFormatDate(time) {
            var oDate = new Date(time),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen); //最后拼接时间
            return oTime;
        },
        /**
         * 功能 时间格式化函数getFormatDate的辅助函数，用于补足个位数字前面缺少的数字0
         * 参数1 num 转换的数字 类型 Number
         * 返回 转换后的数字 类型 Number
         **/
        getzf(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        /**
         * 功能 当返回token失效时，清除本地缓存的token的信息
         * 参数1 returnCode 返回码 类型 String
         * 返回 无
         **/
        cleanToken(returnCode){
            if('030014080010' === returnCode){
                localStorage.removeItem('id');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenmd5');
                localStorage.removeItem('username');
                sessionStorage.removeItem('merchantId');
                sessionStorage.removeItem('merchantName');
            }
        },
        /**
         * 功能 语言国际化，设定当前使用的语言类型 例：en英文，zh中文
         * 参数1 langType 语言类型 例：en英文，zh中文 类型 String
         * 返回 设置完成后的语言类型 类型 String
         **/
        setLanguage(langType) {
            this.$i18n.locale = langType;
            return this.$i18n.locale;
        }
    }
}
export default apiMethods
