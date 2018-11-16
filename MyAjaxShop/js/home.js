function fn() {
	var id = $(this).attr('id');
	var type = $(this).data('id');
	
	location.href = './detail.html?id=' + id + '&type=' + type;
}

$(function () {

	function getUserNickName() {
		var nickname = decodeURIComponent(localStorage.nickname);
		$('#nickname').text(nickname);
	}

	getUserNickName();
	
$.ajax({
		type: 'GET',
		url: './data/productData.json',
		dataType: 'json',
		success: function (data) {
			
			//截取前面两种类型
			var types = data.types.slice(0, 2);

			$.each(types, function (i, v) {
				//获取字符串的值 this.valueOf()
				//获取字符串的值 v
				//获取字符串的值 types[i]
				var products = data[v];
				generateData(products, v);
				
			})
			//设置定时器
			setCountDwonTime();

		}
	})


	function generateData(products, v) {

		//products: 产品数据
		//v: 数据类型
		var tem = $('<div id="' + v + '">' +
											'<div class="tab mt-3">' +
												'<div class="float-left ' + products.theme + '">' + products.type + '<span data-time="' + products.hotEndTime + '" data-ishot="' + products.isHot + '" class="ml-3 time ' + (products.isHot ? '' : 'hide') + '">00 : 00 : 00</span></div>' +
											'</div>' +
											'<div class="row ' + v + '"></div>' +
										'</div>');

				for (var k = 0; k < products.products.length; k++) {
					var rowData = $('<div class="col-lg-2 mb-3 col-md-4 col-6">' +
						'<div onclick="fn.call(this)" id="' + products.products[k].id + '" class="card" data-id="' + v + '">' +
							'<img class="card-img-top" src="' + products.products[k].img + '" />' +
							'<div class="card-body">' + 
								'<div class="card-title t W">' + products.products[k].name + '</div>' +
								'<div class="text-danger">￥' + products.products[k].price + '</div>' +
								'<p class="t">' + products.products[k].mainDescribe + '</p>' +
							'</div>' +
						'</div>' +
					'</div>');

					tem.find('.' + v).append(rowData);
				}

				$('#content').append(tem);

	}

	//定时器序号
	var timer = null;
	//设置抢购倒计时
	function setCountDwonTime() {

		timer = setInterval(function () {

			$('.time').each(function () {

				var isHot = Boolean($(this).data('ishot'));

				if (isHot) {

					//获取截至日期, 毫秒
					var t = $(this).data('time').split(' ');
					var t1 = t[0].split('-');
					var t2 = t[1].split(':');
					var endTime = new Date(t1[0], t1[1] - 1, t1[2], t2[0], t2[1], t2[2]).getTime();

					//当前日期, 毫秒:时间戳
					var currentTime = new Date().getTime();
					var time = endTime - currentTime;

					//天,向下取整
					var days = Math.floor(time / 1000 / 60 / 60 / 24 % 24);
					//判断 
					days = days >= 10 ? days : '0' + days;
					var hours = Math.floor(time / 1000 / 60 / 60 % 24);
					hours = hours >= 10 ? hours : '0' + hours;
					var minutes = Math.floor(time / 1000 / 60 % 60);
					minutes = minutes >= 10 ? minutes : '0' + minutes;
					var seconds = Math.floor(time / 1000 % 60);
					seconds = seconds >= 10 ? seconds : '0' + seconds;

					$(this).text(days + '天' + hours + ' : ' + minutes + ' : ' + seconds + ' 秒 ');

				}


			})

		}, 1000);

	}

	var isHasMoreData = true;
	$(window).on('scroll', function () {

		if (!isHasMoreData) {
			return;
		}

		var top = $('.card').last().offset().top;
		var screenHeight = $(window).height();
		var documentScroll = $(document).scrollTop();
		if (screenHeight + documentScroll >= top) {
			$.ajax({
				type: 'GET',
				url: './data/productData.json',
				dataType: 'json',
				success: function (data) {
					var typeEle = $('#content>div');
					var type = []; //nvzhuang, meizhuang
					typeEle.each(function () {
						type.push($(this).attr('id'));
					})

					if (type.length == data.types.length) {
						isHasMoreData = false;
					} else {
						//排除已存在的类型
						for (var j = 0; j < type.length; j++) {
							var index = data.types.indexOf(type[j]); //找到返回下标, 找不到返回-1
							if (index > -1) {
								data.types.splice(index, 1);
							}
						}

						// 取一种类型
						var getType = data.types[0];

						//获取类型数据
						var typeData = data[getType];

						generateData(typeData, getType);

						isHasMoreData = true;

					}

				}
			})
		}
	})

	$('.list').on('click', function () {

		if ($(this).hasClass('nav-active')) {
			return;
		}

		var currentName = $(this).attr('name');

		if (currentName == 'home') {
			
			location.href = './home.html';

		} else if (currentName == 'order') {

			location.href = './order.html?';

		} else if (currentName == 'logout') {

			//删除本地存储的信息
			delete localStorage.nickname;
			delete localStorage.username;
			location.href = './loginA.html';
		}

	})
	//首页, 我的订单
	$('#home,#order').on('click', function () {
		var id = $(this).attr('id');
		location.href = './' + id + '.html';
	})

	//退出页面
	$('#logout').on('click',function(){
		location.href = './loginA.html';
	})

})