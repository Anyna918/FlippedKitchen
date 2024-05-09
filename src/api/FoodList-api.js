import request from '@/utils/request.js'

export const FoodList  = {
	getFoodList(params){
		return request({
			url:"/foodList/getListFoodName",
			method:"GET",
			data: params
		});
	},
	
	getListBySearch(params){
		return request({
			url:"/foodList/getListBySearch",
			method:"GET",
			data: params
		});
	},
	
		
	getCardInfo(params) {
		return request({
			url:"/foodList/getCardInfo",
			method:"GET",
			data: params
		});
	}
	

}