import md5 from 'js-md5';

function getSendData(data, appId, method, pwd) {
    var proto = {
        appId:appId,
        method:method,
        format:"JSON",
        charset:"UTF-8",
        signType:"MD5",
        timestamp:"",
        version:"1.0.1",
        channel:"OCS",
        scene:"MemberService",
        data:data
    };
    var str = JSON.stringify(data) + "&pwd=" + pwd;
    console.log('md5加密对象'+ str);
    
    var sign = md5(str);
    proto["sign"] = sign;
    
    console.log('完整参数为' + JSON.stringify(proto));
    return proto;
}

export {
    getSendData
}
