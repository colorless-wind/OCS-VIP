const apiMethods = {
    data() {
        return {
            //* 测试变量
            //client: new Paho.Client("10.165.60.101", Number(8083), localStorage.getItem('tokenmd5') || ''), // 第三个参数是clientID可以为空
            //client: '', // 第三个参数是clientID可以为空
            //client: new Paho.Client("ocs.goldpacpay.com", Number(8083), localStorage.getItem('tokenmd5') || ''), // 第三个参数是clientID可以为空
            //* mqtt订阅的主题
            topic: this.$wsCache.get('tokenmd5') || '',
            //* 向mqtt发送的消息
            message: '',
            lockChargeBtn: false
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

            var sign = this.$md5(str);
            proto["sign"] = sign;

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
        getFormatDate(time, split) {
            var oDate = new Date(time),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen); //最后拼接时间
            if (split == 'zh') {
                oTime = oYear + '年' + this.getzf(oMonth) + '月' + this.getzf(oDay) + '日 ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen);
            }
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
        cleanToken(returnCode) {
            if ('030014080010' === returnCode) {
                let global = this;
                this.$wsCache.delete('id');
                this.$wsCache.delete('token');
                this.$wsCache.delete('tokenmd5');
                this.$wsCache.delete('username');
                sessionStorage.removeItem('merchantId');
                sessionStorage.removeItem('merchantName');
                setTimeout(function () {
                    global.$router.push({
                        path: global.CONST.ROUTER.loginPage
                    })
                }, 2000)
            }
        },

        /** i18n related start **/
        /**
         * 功能 语言国际化，根据浏览器的语言标识自动设置当前语言
         * 参数 无
         * 返回 获得当前选择语言的标识 类型 String
         **/
        autoLanguage() {
            //* 浏览器环境配置 语言相关设置
            //* navigator.language 获得当前选择的语言 例： "zh-CN"
            //* navigator.languages 获得备选语言的语言列表 例： ["zh-CN", "zh", "ja", "en", "zh-TW"]
            this.setLanguage('zh');
            console.log('中文语言：' + this.$t("tips.phoneCheck"));
            this.setLanguage('jp');
            console.log('日文语言：' + this.$t("tips.phoneCheck"));
            this.setLanguage('en');
            console.log('英文语言：' + this.$t("tips.phoneCheck"));
            this.setLanguage('zh');
            let currentLanguage = navigator.language || 'not support navigator.language';
            console.log('当前语言：' + currentLanguage);
            switch (currentLanguage) {
                case "zh-CN":
                    this.setLanguage('zh');
                    break;
                case "en":
                    this.setLanguage('en');
                    break;
                case "ja":
                    this.setLanguage('jp');
                    break;
                default:
                    this.setLanguage('zh');
            }
            return currentLanguage;
        },
        /**
         * 功能 语言国际化，设定当前使用的语言类型 例：en英文，zh中文
         * 参数1 langType 语言类型 例：en英文，zh中文 类型 String
         * 返回 设置完成后的语言类型 类型 String
         **/
        setLanguage(langType) {
            this.$i18n.locale = langType;
            return this.$i18n.locale;
        },
        /** i18n related end **/

        /** mqtt related start **/
        /**
         * 功能 注册mqtt实例并创建连接
         * 参数 无
         * 返回 无
         **/
        MqttConnectReady() {
            //* 注册连接断开处理事件
            this.$mqttClient.onConnectionLost = this.onConnectionLost;
            //* 注册消息接收处理事件
            this.$mqttClient.onMessageArrived = this.onMessageArrived;
            //* 建立连接
            this.MqttConnect();
            //* 断开连接
            // this.$mqttClient.disconnect(); 
        },
        /**
         * 功能 创建mqtt连接方法
         * 参数 无
         * 返回 无
         **/
        MqttConnect() {
            this.$mqttClient.connect({
                keepAliveInterval: 10,
                reconnect: true,
                timeout: 5,
                cleanSession: false,
                onSuccess: this.onConnect
            }); // 连接服务器并注册连接成功处理事件
        },
        /**
         * 功能 创建mqtt连接方法
         * 参数 无
         * 返回 无
         **/
        onConnectionLost: function (responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
                console.log('连接已断开');
            }
        },
        /**
         * 功能 跳转主页面
         * 参数 无
         * 返回 无
         **/
        goIndex() {
            this.$router.push({
                path: this.CONST.ROUTER.indexPage
            })
        },
        /**
         * 功能 mqtt接收消息
         * 参数1 message 为mqtt返回的消息信息 类型 JSON字符串
         * 返回 无
         **/
        onMessageArrived: function (message) {
            console.log("收到消息:" + message.payloadString);
            console.log(message.payloadString);
            var global = this;
            //alert("收到消息:" + message.payloadString);
            //type 1为充值，0为消费
            //{"data":{"detail":"","type":1},"subErrorMsg":"","subStatus":"0"}
            var result = JSON.parse(message.payloadString);
            this.lockChargeBtn = false;
            if ('0' === result.subStatus) {
                if (result.data.type === 1) {
                    this.toast(this.CONST.MSG.chargeSuccess + sessionStorage.getItem('chargeMoney') + '元');
                }
                if (result.data.type === 0) {
                    this.toast(this.CONST.MSG.consumeSuccess + parseFloat((result.data.detail / 100).toFixed(2)) + '元');
                }
                setTimeout(function () {
                    global.goIndex();
                }, 1500)
            } else {
                this.toast(message.payloadString.subErrorMsg);
            }

        },
        /**
         * 功能 mqtt连接
         * 参数 无
         * 返回 无
         **/
        onConnect: function () {
            console.log('onConnected');
            this.$mqttClient.subscribe(this.topic); // 订阅主题
        },
        /**
         * 功能 向mqtt发送消息
         * 参数 无
         * 返回 无
         **/
        sendMsg() {
            //* 发送消息  
            this.message = new Paho.MQTT.Message("vanishment this world");
            this.message.destinationName = "saya";
            this.$mqttClient.send(this.message);
        },
        /** mqtt related end **/
        getHttpHeaderInfo() {
            let xmlhttp;
            // 获取response header信息
            if (window.XMLHttpRequest) {
                // code for Firefox, Mozilla, IE7, etc.
                xmlhttp = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (xmlhttp != null) {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        // 4 = "loaded"
                        if (xmlhttp.status == 200) {
                            // 200 = "OK
                            console.log(xmlhttp)
                            console.log(xmlhttp.getAllResponseHeaders())
                        } else {
                            alert("Problem retrieving data:" + xmlhttp.statusText);
                        }
                    }
                };
                xmlhttp.open("GET", document.location.href, true);
                xmlhttp.send(null);
            } else {
                alert("Your browser does not support XMLHTTP.");
            }
        }
    }
}
export default apiMethods
