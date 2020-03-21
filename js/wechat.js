$(function(){
    
    $(".w-pay").click(function(){
        // window.location.href = apiUrl+"/user_center_order.html"
        window.console.log('$appcmdex_vpn_vpnMessageUpdate:{"code": 0,"msg": "请求成功","data": "{needBuy":false,"token":"006e88f6L11pQCHSZShPgywBftGfifhj"}"}');
        window.console.log("$appcmdex_vpn:vpnmessageupdate");
    })

    $(".w-nopay").click(function(){
        window.location.href = apiUrl+"/buy.html"
    })
})