import request from '@/utils/request.js'

// 接口示例
export const testApi = {
	getTestInfo(){
		return request({
			url:"",
			method:"GET",
			data:{},
			header:{}
		});
	}
}