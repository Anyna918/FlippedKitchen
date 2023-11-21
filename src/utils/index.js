// 节流函数
export function throttle(func, delay){
	let flag = true;
	return function(){
		if (!flag)return;
		flag = false;
		func.apply(this, arguments);
		setTimeout(()=>flag = true, delay)
	}
}

// 防抖函数
export function debounce(func, delay){
	let timer = null;
	return function(){
		clearTimeout(timer);
		timer = setTimeout(()=>{
			func.apply(this, arguments);
		}, delay)
	}
}