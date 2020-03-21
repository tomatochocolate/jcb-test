$(function () {

    //获取url中的参数方法
    function getUrlParam(name) {
        //构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //匹配目标参数
        var r = window.location.search.substr(1).match(reg);
        //返回参数
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }

    var aurl = getUrlParam('payUrl');

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 100,
        height: 100,
        text: aurl
    });

    
    // function makeCode() {
    //     var elText = document.getElementById("text");

    //     if (!elText.value) {
    //         alert("Input a text");
    //         elText.focus();
    //         return;
    //     }

    //     qrcode.makeCode(elText.value);
    // }

    // makeCode();

    // $("#text").
    //     on("blur", function () {
    //         makeCode();
    //     }).
    //     on("keydown", function (e) {
    //         if (e.keyCode == 13) {
    //             makeCode();
    //         }
    //     });

    function checkWechat() {
        
        var out_trade_no = getCookie('orderNo');
        if (!out_trade_no || out_trade_no.length <= 0) {
            clearCheckWechat();
            return;
        }
        $.ajax({
            url: apiUrl + '/api/qt/pcWeChart/synchronize/' + out_trade_no,
            cache: false,
            type: 'post',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('token', getToken());
            },
            success: function (json) {
                if (json.code == 0) {

                    
                    clearCheckWechat();
                    delCookie('orderNo');
                    window.location.href = apiUrl+"/user_center_order.html"

                    var _ua = navigator.userAgent;
                    if (_ua.indexOf('Android') > -1 || _ua.indexOf('Adr') > -1) { //安卓终端
                        window.console.log('$appcmdex_vpn_vpnMessageUpdate:{"code": 0,"msg": "请求成功","data": ""}');
                    } else {
                        // external.AppCmd(external.GetSID(window), 'vpn', 'vpnMessageUpdate', '{"code": 0,"msg": "请求成功","data": ""}', '', function (code, data) {
                        // });
                    }
                    return;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //showMessage('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
            },
            complete: function () {//无论成功还是失败，都会调用此函数
            }
        });
    }
    var _checkWechat = window.setInterval(checkWechat, 5000);
    function clearCheckWechat() {
        if (_checkWechat) window.clearInterval(_checkWechat);
    }


})