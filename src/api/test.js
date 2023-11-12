import request from '@/utils/request.js'

// 接口示例（具体业务逻辑可以写在里面）
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