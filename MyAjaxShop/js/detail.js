function fn() {
	var id = $(this).attr('id');
	var type = $(this).data('id');
	
	location.href = './detail.html?id=' + id + '&type=' + type;
}

$(function () {

	$('#nickname').text(decodeURIComponent(localStorage.nickname));

	function generateData(products, v, id) {

		//products: 产品数据
		//v: 数据类型

		var tem = $('<div id="' + v + '">' +
											'<div class="tab mt-3">' +
												'<div class="float-left ' + products.theme + '">' + products.type + '</div>' +
											'</div>' +
											'<div class="row ' + v + '"></div>' +
										'</div>');

				var n = 6;
				for (var k = 0; k < n; k++) {
					if (id == products.products[k].id) {
						n++;
						continue;
					}

					var rowData = $('<div class="col-lg-2 mb-3 col-md-4 col-6">' +
						'<div onclick="fn.call(this)" id="' + products.products[k].id + '" class="card" data-id="' + v + '">' +
							'<img class="card-img-top" src="' + products.products[k].img + '" />' +
							'<div class="card-body">' + 
								'<div class="card-title t">' + products.products[k].name + '</div>' +
								'<div class="text-danger">￥' + products.products[k].price + '</div>' +
								'<p class="t">' + products.products[k].mainDescribe + '</p>' +
							'</div>' +
						'</div>' +
					'</div>');

					tem.find('.' + v).append(rowData);

				}

				$('#content').append(tem);

	}

	var param = params();

	$.ajax({
		type: 'GET',
		url: './data/productData.json',
		dataType: 'json',
		success: function (data) {
			var currentData = data[param.type];
			console.log('currentData===',currentData);

			//商品详情
			for (var i = 0; i < currentData.products.length; i++) {
				if (param.id === currentData.products[i].id) {
					$('.name').text(currentData.products[i].name);
					$('.price').text(currentData.products[i].price);
					$('.product-desc').text(currentData.products[i].detailDescribe);
					

					//初始化放大图片
					//PC端
					if(!(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))){
						$('.detail-box').css({'background-image': 'url("' + currentData.products[i].img + '")'});
						$('#pc').css({display: 'block'});
						$('#ipadmobile').remove();
						//只有PC端才启动放大
						$('.detail-box').scale();

					} else {
						$('#detailBox').find('img').attr('src', currentData.products[i].img);
						$('#ipadmobile').css({display: 'block'});
						$('#pc').remove();
					}
					
					break;
				}
			}

			//猜你喜欢
			generateData(currentData, param.type, param.id);
		}
	})



	//绑定修改数量的点击事件
	$('.decrease,.increase').on('click', function () {

		var currentName = $(this).attr('name');

		var $count = $('.count');

		var count = $count.val();

		if (currentName == 'decrease') {

			if (count <= 1) {
				$count.val(1);
			} else {
				$count.val(--count);
			}

		} else if (currentName == 'increase') {
			$count.val(++count);
		}

	})

	//数量框绑定input事件
	$('.count').on('input', function () {
		var val = parseInt($(this).val());
		
		if (isNaN(val) || val <= 0) {
			$(this).val(1);
		} else {
			$(this).val(val);
		}
	})

	//首页, 我的订单
	$('#home,#order').on('click', function () {
		var id = $(this).attr('id');

		location.href = './' + id + '.html';
	})
	//退出
	$('#logout').click(function () {
		delete localStorage.nickname;
		delete localStorage.username;
		location.href = './login.html';
	})

})