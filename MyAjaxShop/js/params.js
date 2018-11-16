function params() {
	//获取地址的查询参数
	var address = location.search;

	//处理查询参数, 将查询参数转换成一个对象
	var addressData = address.slice(1).split('&');
	var param = {};
	for (var i = 0; i < addressData.length; i++) {
		var arr = addressData[i].split('=');
		param[arr[0]] = arr[1];
	}

	return param;
}