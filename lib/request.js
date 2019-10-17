export const httpRequest = (baseUrl, params) => {
  return new Promise((resolve, reject) => {
		let url = baseUrl + params.url;
		
		// 是否启动原生（uni 自带）loading 默认启动
		let loading = params.hasOwnProperty('loading') ? params.loading : true;

		loading ? uni.showLoading({ title: '处理中', mask: true }) : void 0;

		// 是否是重新刷新token
		let refresh = params.hasOwnProperty('isRefresh') ? params.isRefresh : false;

		// 若有token 则头部带上token
		let token = uni.getStorageSync('Token');
		let header = Object.assign(token && !refresh ? { idToken: `${token}` } : {}, params.header ? params.header : {});

		uni.request({
			url: url,
			method: params.Type,
			header: header,
			data: params.data,
			success: (res) => {
				loading ? uni.hideLoading() : void 0;
				resolve(res.data);
			},
			fail: (res) => {
				loading ? uni.hideLoading() : void 0;
				let data = { code: 500,	msg: '服务异常',	data: '网络异常',	message: '网络异常'	};
				resolve(data);
			}
		});
  });
}

// 上传文件接口
export const uploadFileRequset = (baseUrl, params) => {
	let url = baseUrl + params.url;
	
	let loading = params.hasOwnProperty('loading') ? params.loding : true;
	
	// 是否是重新刷新token
	let refresh = params.hasOwnProperty('isRefresh') ? params.isRefresh : false;

	// 若有token 则头部带上token
	let token = uni.getStorageSync('Token');
	let header = Object.assign(token && !refresh ? { idToken: `${token}` } : {}, params.header ? params.header : {});


	loading ? uni.showLoading({ title: '处理中', mask: true }) : void 0;
	
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url,
			filePath: params.filePath,
			name: params.name,
			header: header,
			formData: params.formData,
			success: uploadFileRes => {
				loading ? uni.hideLoading() : void 0;
				
				try {
					let result = JSON.parse(uploadFileRes.data);
					resolve(result);
				} catch (e) {
					let data = { code: 500, msg: 'Errors', data: '服务异常' };
					resolve(data);
				}
			},
			fail: res => {
				loading ? uni.hideLoading() : void 0;

				let data = { code: 500, msg: 'Error', data: '服务异常' };
				resolve(data);
			}
		});
	});

};

export default {
  httpRequest,
	uploadFileRequset
}
