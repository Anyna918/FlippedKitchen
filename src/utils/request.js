// 基础url（测试接口)
// const baseUrl = "http://jsonplaceholder.typicode.com/posts";
const baseUrl = "http://localhost:7217";

// 请求拦截器
const beforeRequest =() =>{
	console.log('Before request sent');
	// 这里可以添加请求前的逻辑，例如显示加载动画
}

// 响应拦截器
const afterRequest =() =>{
	console.log('After request complete');
	// 这里可以添加请求后的逻辑，例如隐藏加载动画
}

const request = (obj) => {

	beforeRequest(); // 调用请求拦截器

	// const url = obj.url || '' + baseUrl;
	const url = baseUrl + obj.url || '';
	const method = obj.method || 'GET';
	const data = obj.data || {};
	const header = obj.header || {};
	

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			header,

			success: (response) => {
				afterRequest(); // 调用响应拦截器
				const res = response;
				console.log(res.statusCode);

				if (res.statusCode == 200) {
					// 统一返回异步Promise对象
					resolve(response.data);
				} else {
					uni.clearStorageSync();
					switch (res.statusCode) {
						case 401:
							uni.showModal({
								title: "提示",
								content: "用户未验证",
								showCancel: false,
								success(res) {
									setTimeout(() => {
										// 1s后回退至首页
										uni.navigateTo({
											url: "/pages/index/index",
										})
									}, 1000);
								},
							});
							break;
						case 404:
							uni.showToast({
								title: "该地址不存在",
								duration: 2000,
							})
							break;
						default:
							uni.showToast({
								title: "请重试",
								duration: 2000,
							})
							break;
					}
				}
			},

			fail: (error) => {
				this.afterRequest(); // 调用响应拦截器
				console.log(err);
				// 网络异常问题
				if (err.errMsg.indexOf('request:fail') !== -1) {
					uni.showToast({
						title: "网络异常",
						icon: "error",
						duration: 2000
					})
				} else {
					uni.showToast({
						title: "未知异常",
						duration: 2000
					})
				}
				reject(error);
			},
			// 无论成功失败都会执行
			complete() {
				uni.hideLoading();
				uni.hideToast();
			}
		});
	});
};

export default request;