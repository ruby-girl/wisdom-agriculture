export const throttle = (func, wait) => {
	let previous = 0;
	return function() {
	    let now = Date.now();
	    let context = this;
	    let args = arguments;
	    if (now - previous > wait) {
	        func.apply(context, args);
	        previous = now;
	    }
	}
}
export const formatDate = (timestamp) => {
	var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
	     var year=d.getFullYear()
		var month=d.getMonth()+1
		var day=d.getDate()
		var hour=d.getHours()
		var minute=d.getMinutes()
		var second=d.getSeconds()
	    if(month<10){
			month='0'+month
		}
		if(day<10){
			day='0'+day
		}
		let date=year + "/" + month + "/" +day;
	    return date
}