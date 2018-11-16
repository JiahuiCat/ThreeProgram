function cs(){
		if($(this).prev().prop('checked')){
			$(this).parent().parent().remove()
		}
	}
$(function () {

	$('#nickname').text(decodeURIComponent(localStorage.nickname));
	//用户名
	var username = strCrypto.removeCrypto(localStorage.username);
	console.log(username)

	var num = 1;

	function getData(status) {
		//status: 订单状态
		$('#orderData').html('');
		$.ajax({
			type: 'GET',
			url: './data/orderData.json',
			dataType: 'json',
			success: function (data) {
				//显示用户的全部订单
				for (var i = 0; i < data.orders.length; i++) {

					if (username == data.orders[i].username && (data.orders[i].status == status || !status)) {
						console.log('data ==> ', data);
						var $tr = $('<tr>' +
									'<td class="strong">' + num++ + '</td>' +
									'<td class="short">' + data.orders[i].name + '</td>' +
									'<td>' + data.orders[i].orderNo + '</td>' +
									'<td style="width: 120px;"><img class="auto-img" src="' +  data.orders[i].img + '" /></td>' +
									'<td>' + data.orders[i].price + '</td>' +
									'<td>' + data.orders[i].count + '</td>' +
									'<td>' + data.orders[i].date + '</td>' +
									'<td><input type="checkbox" name=""><button onclick="cs.call(this)" class="scc">删除</button></td>'+
								'</tr>');
						$('#orderData').append($tr);
					}

				}
				num = 1;
			}
		})
	}

	getData();

	$('.nav>li').on('click', function () {
		
		var $span = $(this).find('span');

		if ($span.hasClass('active')) {
			return;
		}

		//添加'active'属性,他的父级,匹配他的父级中每个元素的同胞,find('span便签'),再移除active
		$span.addClass('active').parent().siblings().find('span').removeClass('active');
		var orderStatus = $(this).attr('name'); //order订单的status状态: -1, 0, 1, 2, 3
		if (orderStatus == -1) {
			getData();
		} else {
			getData(orderStatus);
		}

	})
	//退出到login页面
	$('#logout').click(function () {
		delete localStorage.nickname;
		//进行删除username并链接登录页面
		delete localStorage.username;
		location.href = './loginA.html';

	})
	//首页到home
	$('#home').on('click',function(){
		//指向id
		var id = $(this).attr('id');
		location.href = './' + id + '.html';
	})

})