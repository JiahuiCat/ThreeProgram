var strCrypto = {

	//加密
	addCrypto: function (val) {
		var code = [];
		for (var i = 0; i < val.length; i++) {
			var c = (val[i].charCodeAt() + 100000).toString().slice(1);
			code.push(c);
		}

		return code.join('');
	},

	//解密
	removeCrypto: function (val) {
		var code = [];
		for (var i = 0; i < val.length; i += 5) {
			var c = String.fromCharCode(val.slice(i, i + 5));
			code.push(c);
		}

		return code.join('');
	}

};