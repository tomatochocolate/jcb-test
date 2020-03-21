$(function () {
	var selectGoodId = 0;// 当前选择的产品套餐
	var token = getToken();

	if (token.length <= 0) {
		$('.slowGoods').html('请先&nbsp;&nbsp;<a href="login.html">登录</a>')
		$('#con').html('');
	} else {
		$.ajax({
			url: (apiUrl + '/api/qt/goods'),
			cache: false,
			type: 'post',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', token);
			},
			success: function (json) {
				if (json.code == 0) {
					
					setGoodsList(typeof json.normal == 'string' ? eval('(' + json.normal + ')') : json.normal);
					highGoodsList(typeof json.high == 'string' ? eval('(' + json.high + ')') : json.high);
					return;
				}
				$('.slowGoods').html(json.msg);
				$('#con').html('');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$('.slowGoods').html('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
				$('#con').html('');
			},
			complete: function () {//无论成功还是失败，都会调用此函数
			}
		});
	}
	function setGoodsList(list) {
		
		var str = '';
		for (var i = 0; i < list.length; i++) {
			var _id = list[i].id;
			var _price = list[i].price;
			var _priceDay = list[i].priceDay;

			var _isHot = '';
			if( list[i].isHot == true){
				var _isHot = 'hot';
			}
			
			var _title = list[i].title;
			var _priceShow = list[i].priceShow;
			var _priceSave = list[i].priceSave;
			str += '<li  goodId="' + _id + '" class="payBtn '+ _isHot + '">';
			str += '<div class="main">';
			str += '<span class="days">' + _title + '</span><span class="price">￥' + _price  +'</span>';
			str += '</div>';
			str += '<div class="info">';
			str += '<span >会员时长:'+_priceShow/60+'个月'+'('+_priceShow/2+'天)'+'</span>'
			str += '<span class="average">￥' + ((_priceDay + '').substring(0, 8)) + '/天</span>';
			str += '</div>';
			str += '</li>';
		}
		// str += '<li><div class="main"><div class="card">卡序列号兑换:<span class="buy"><a href="card.html" goodid="104" class="tocard"><span>兑换</span></a></span></div></div><div class="info"></div></li>'
		$('.slowGoods').html(str);
		// showMessage('加载成功', "success");
		$(".product .payBtn").click(function () {
			selectGoodId = $(this).attr('goodId');//设置当前选择的产品套餐
			$(".buylist").addClass("show");//显示选择支付方式

			$(".buylist .close").click(function () {//关闭 不支持
				selectGoodId = 0; //清空当前选择的产品套餐
				$(".buylist").removeClass("show");//隐藏选择支付方式
			});

			// $(".buylist .alipay").click(function () {//选择 支付宝
			// 	goAlipay('alipay');
			// });

			// $(".buylist .wechat").one('click',function () {//选择 微信
			// 	goPay('wechat');
			// });

		});
	}

	// if (token.length <= 0) {
	// 	$('.highGoods').html('请先&nbsp;&nbsp;<a href="login.html">登录</a>')
	// 	$('#con').html('');
	// } else {
	// 	$.ajax({
	// 		url: (apiUrl + '/api/qt/highspeedsgoods'),
	// 		cache: false,
	// 		type: 'post',
	// 		beforeSend: function (xhr) {
	// 			xhr.setRequestHeader('token', token);
	// 		},
	// 		success: function (json) {
	// 			if (json.code == 0) {
	// 				highGoodsList(typeof json.high == 'string' ? eval('(' + json.high + ')') : json.high);
	// 				return;
	// 			}
	// 			$('.highGoods').html(json.msg);
	// 			$('#con').html('');
	// 		},
	// 		error: function (jqXHR, textStatus, errorThrown) {
	// 			$('.highGoods').html('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
	// 			$('#con').html('');
	// 		},
	// 		complete: function () {//无论成功还是失败，都会调用此函数
	// 		}
	// 	});
	// }
	function highGoodsList(list) {
		console.log(list);
		
		var str = '';
		for (var i = 0; i < list.length; i++) {
			var _id = list[i].id;
			var _price = list[i].price;
			var _priceDay = list[i].priceDay;
			
			var _isHot = '';
			if( list[i].isHot == true){
				var _isHot = 'hot';
			}
			
			var _title = list[i].title;
			var _priceShow = list[i].priceShow;
			var _priceSave = list[i].priceSave;
			str += '<li  goodId="' + _id + '" class="payBtn '+ _isHot + '">';
			str += '<div class="main">';
			str += '<span class="days">' + _title + '</span><span class="price">￥' + _price +'</span>';
			str += '</div>';
			str += '<div class="info">';
			str += '<span >会员时长:'+_priceShow/90+'个月'+'('+_priceShow/3+'天)'+'</span>'
			str += '<span class="average">￥' + ((_priceDay + '').substring(0, 8)) + '/天</span>';
			str += '</div>';
			str += '</li>';
		}
		// str += '<li><div class="main"><div class="card">卡序列号兑换:<span class="buy"><a href="card.html" goodid="104" class="tocard"><span>兑换</span></a></span></div></div><div class="info"></div></li>'
		$('.highGoods').html(str);
		console.log(str);
		
		$(".product .payBtn").click(function () {
			selectGoodId = $(this).attr('goodId');//设置当前选择的产品套餐
			$(".buylist").addClass("show");//显示选择支付方式

			$(".buylist .close").click(function () {//关闭 不支持
				selectGoodId = 0; //清空当前选择的产品套餐
				$(".buylist").removeClass("show");//隐藏选择支付方式
			});

			// $(".buylist .alipay").click(function () {//选择 支付宝
			// 	goAlipay('alipay');
			// });

			// $(".buylist .wechat").one('click',function () {//选择 微信
			// 	goPay('wechat');
			// });

		});
	}
	$(".buylist .alipay").click(function () {//选择 支付宝
		goAlipay('alipay');
	});
	$(".buylist .wechat").one('click',function () {//选择 微信
		goPay('wechat');
	});
	function goPay(payChannel) {
		//showMessage('selectGoodId='+selectGoodId+'\npayChannel='+payChannel+'\ntoken='+token);
		$('#payload').show();
		$.ajax({
			url: (apiUrl + '/api/qt/pay/wechartpay'),
			cache: false,
			type: 'post',
			data: { goodsId: selectGoodId, payChannel: payChannel },
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', token);
				xhr.setRequestHeader("Access-Control-Allow-Origin","*");
				xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
			},
			success: function (json) {
				

				if (json.code == 0) {
					// showMessage(json.data.payUrl);
					var _json = (typeof json.data == 'string' ? eval('(' + json.data + ')') : json.data);
					var orderNo = _json.orderNo;
					var payUrl = _json.payUrl;


					if (orderNo.length > 0 && payUrl.length > 0) {

						var isAnd = IsAd()
						if (isAnd == true) {
							$(".wechat").attr("href","javascript:;");
							setCookie('orderNo', orderNo, 5 * 60 * 1000);//5分钟有效
							$('#payloadText').html('请在新窗口完成支付后，回到订单页面刷新查看');
							// window.open(apiUrl+"/pay.html?payUrl=" + payUrl, '_blank');
							window.location.href = apiUrl + "/pay.html?payUrl=" + payUrl
						} else {
							$(".wechat").attr("href", payUrl);
							document.getElementById("wechatpay").click();

						}

					} else {
						$('#payload').hide();
						showMessage('请求返回不存在有效的订单编号或支付URL', "error");
					}
					return;
				}
				if (json.code == -1) {
					showMessage(json.msg, "error")
				}
				$('#payload').hide();
				showMessage(json.msg, "error");
			},
			error: function (jqXHR, textStatus, errorThrown) {
				showMessage('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知', "error"));
			},
			complete: function () {//无论成功还是失败，都会调用此函数
			}
		});
	}

	// 支付宝支付
	function goAlipay(payChannel) {
		//showMessage('selectGoodId='+selectGoodId+'\npayChannel='+payChannel+'\ntoken='+token);
		//$('#payload').show();
		$.ajax({
			url: (apiUrl + '/api/qt/pay/alipay'),
			cache: false,
			type: 'post',
			data: { goodsId: selectGoodId, payChannel: payChannel },
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', token);
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			},
			success: function (data) {
				showMessage(data, "error")
				// window.console.log("$appcmdex_vpn:vpnmessageupdate");
			},
			complete: function () {//无论成功还是失败，都会调用此函数
			}
		});
	}

	// 适配移动端
	function isHide(flag) {
		if (flag == false) {
			$(".product").attr("style", "margin-top:0px")
			// $(".buylist .wechat").attr("style","display:none")
			$("input").focus(function () {
				var wHeight = window.innerHeight;   //获取初始可视窗口高度  
				window.addEventListener('resize', function () {       //监测窗口大小的变化事件  
					var hh = window.innerHeight;     //当前可视窗口高度  
					var viewTop = $(window).scrollTop();   //可视窗口高度顶部距离网页顶部的距离  
					if (wHeight > hh) {           //可以作为虚拟键盘弹出事件  
						$(".content").animate({ scrollTop: viewTop + 200 });    //调整可视页面的位置  
					} else {         //可以作为虚拟键盘关闭事件  
						$("content").animate({ scrollTop: viewTop - 200 });
					}
					wHeight = hh;
				});
			})

			// $('input').on('focus',function(){
			// 	var winHeight = $(window).height();
			// 		$(window).resize(function(){
			// 			var thisHeight = $(this).height();
			// 			if(winHeight - thisHeight > 50){
			// 				$('.product').css('height',thisHeight + 'px');
			// 			} else {
			// 				$('.product').css('height',$(window).height() + 'px');
			// 			}
			// 		})
			// })

			// $('input').focus(function () {
			// 	// let wheight = $(window).height();
			// 	window.addEventListener('resize',function () {
			// 				if (document.activeElement.tagName ==='INPUT'|| document.activeElement.tagName === "TEXTAREA"){
			// 					window.setTimeout(function () {
			// 						// console.log(document.activeElement.scrollIntoViewIfNeeded)
			// 						document.activeElement.scrollIntoViewIfNeeded()
			// 					})
			// 				}
			// 			})
		
			// })

		}
	}

	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = [
			"Android",
			"iPhone",
			"SymbianOS",
			"Windows Phone",
			"iPad",
			"iPod"
		];
		var flag = true;

		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}

		return isHide(flag);
	}
	IsPC();

	function IsAd() {
		var userAgentInfo = navigator.userAgent;
		var Agents = [
			"Android",
			"iPhone",
			"SymbianOS",
			"Windows Phone",
			"iPad",
			"iPod"
		];
		var flag = true;

		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag


	}


	$('.tabA').click(function(){
		$('.slowGoods').css('display','block');
		$('.highGoods').css('display','none');
		$('.tabA').addClass('tabActive');
		$('.tabB').removeClass('tabActive')
	})
	$('.tabB').click(function(){
		$('.slowGoods').css('display','none');
		$('.highGoods').css('display','block');
		$('.tabB').addClass('tabActive');
		$('.tabA').removeClass('tabActive')
	})
	
})