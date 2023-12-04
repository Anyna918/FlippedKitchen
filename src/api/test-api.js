import request from '@/utils/request.js'

// 接口示例
export const testApi = {
	getTestInfo(){
		return request({
			url:"/api",
			method:"GET",
			data:{},
			header:{}
		});
	}
}