//放大镜插件
$.fn.extend({scale: function () {
		var self = this; //this ==> $('.detail-box')

		//获取背景图片路径
		var bgImgUrl = self.css('background-image');
		// console.log('bgImgUrl ==> ', bgImgUrl);

		//为layer元素绑定鼠标 mousemove
		var $layer = self.find('.layer');

		//鼠标进入

		//鼠标离开
		$layer.hover(function () {
			$('.large').css({display: 'block'});
			$('.mask').css({display: 'block'});
		}, function () {
			$('.large').css({display: 'none'});
			$('.mask').css({display: 'none'});
		})

		$layer.bind('mousemove', function (e) {

			//获取layer的宽度和高度
			var layerWidth = $(this).width();
			var layerHeight = $(this).height();
			
			//获取相对layer元素鼠标的相对坐标
			var x = e.offsetX;
			var y = e.offsetY;

			//mask随着鼠标移动
			var $mask = self.find('.mask');
			var maskWidth = $mask.width();
			var maskHeight = $mask.height();

			var x0 = x - maskWidth / 2;
			var y0 = y - maskHeight / 2;

			//控制mask移动边界范围
			var maxX = layerWidth - maskWidth;
			var minX = 0;

			var maxY = layerHeight - maskHeight;
			var minY = 0;

			x0 = x0 > maxX ? maxX : x0 < minX ? minX : x0;
			y0 = y0 > maxY ? maxY : y0 < minY ? minY : y0;

			$mask.css({
				left: x0 + 'px',
				top: y0 + 'px'
			})

			//放大图片
			var $scale = self.find('.large');
			var scaleWidth = $scale.width();
			var scaleHeight = $scale.height();

			$scale.css({background: bgImgUrl});

			//放大并且移动
			$scale.css({
				//放大
				backgroundSize: layerWidth / maskWidth * scaleWidth + 'px ' + layerHeight / maskHeight * scaleHeight + 'px',

				//移动
				backgroundPosition: -x0 * scaleWidth / maskWidth + 'px ' + -y0 * scaleHeight / maskHeight + 'px'
			});

		})

}})