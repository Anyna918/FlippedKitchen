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

// 接口示例
export const testUser = {
	getTestInfo(){
		return request({
			url:"/Test/getUsers",
			method:"GET",
			data:{},
			header:{}
		});
	}
}