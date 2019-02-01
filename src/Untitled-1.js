function order(status, curPage) {
    var url = "/order/getOrderRecord";
    $.ajax({
        type: "POST",
        url: url,
        data: getOrderParam(status, curPage),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        cache: false,
        async: false,
        success: function (data) {
            if ('0' == data.subStatus) {
                console.log("操作成功");
                var orderList = data.data.records;
                $("tbody").empty();
                //* 无数据处理
                if (!orderList) {
                    $("tbody").append(
                        "<tr>" +
                        "<td colspan='8' style='text-align: center;'>" + "暂无数据" + "</td>" +
                        "</tr>"
                    );
                    //* 清空分页容器
                    $('.page_1').html('');
                    $('.page_2').html('');
                    return false;
                }

                //* 填充数据
                for (var index = 0; index < orderList.length; index++) {
                    $("tbody").append(
                        "<tr>" +
                        "<th scope='row'> " + (index + 1) +
                        "</th>" +
                        "<td class='orderNo'>" + orderList[index].commonOrderInfoNo + "</td>" +
                        "<td>" + orderList[index].commonOrderInfoTime + "</td>" +
                        "<td>" + orderList[index].commonOrderInfoNote + "</td>" +
                        "<td>" + orderList[index].commonOrderInfoMoney + "</td>" +
                        "<td>" + payType(orderList[index].commonOrderInfoPay) + "</td>" +
                        "<td>" + payStatus(orderList[index].commonOrderInfoStatus) + "</td>" +
                        "<td><a onclick='viewScene(this)'>查看进度</a></td>" +
                        "<td><a onclick='viewQrcode()'>查看二维码</a></td>" +
                        "</tr>"
                    )
                }


                //设置分页插件显示
                $("#pagination").whjPaging("setPage", {
                    currPage: data.data.curPage,
                    totalPage: data.data.totalPage,
                    totalSize: data.data.amount
                });
                //* 清空分页容器
                $('.page_1').html('');
                $('.page_2').html('');
                //* 分页参数
                var pageParam = {
                    obj_box: '.page_' + status, //翻页容器
                    total_item: data.data.amount, //条目总数
                    per_num: 10, //每页条目数
                    current_page: data.data.curPage, //当前页
                    changeContent: function (curPage) {
                        console.log('当前页码：' + curPage);
                        console.log('订单状态：' + status);
                        order(status, curPage);
                    }
                };
                /*调用分页方法,初始化数据*/
                page_ctrl(pageParam);
            } else {
                console.log("操作失败");
            }
        },
        error: function (data, status, e) {
            console.log("访问失败");
        }
    });
}
param.commonOrderInfoPay = status;
// * 0 已支付 * 1 未支付



function loadData(currPage, pageSize) {
    $.ajax({
        //其它参数选项请自填
        success: function (res) {
            //处理数据
            //设置分页插件显示
            $("#pagination").whjPaging("setPage", {
                currPage: res.currPage,
                totalPage: res.totalPage,
                totalSize: res.totalSize
            });
        }
    });
}

$("#pagination").whjPaging({
    //设为true时，ajax里的success函数必须调用setPage方法，否则分页插件显示保持不变
    isResetPage: true,
    callBack: function (currPage, pageSize) {
        order(status, currPage, pageSize);
    }
});

order(0, 1, 5);
