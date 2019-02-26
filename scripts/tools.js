
(function(){
	//获得食物的随机位置
	var tools={
		getRandom:function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	}
	window.tools=tools;
})();
