(function (){
	//自调用函数，避免命名冲突
	var position='absolute';
	//记录上一次创建的食物，为食物删除做准备
	var elements=[]; 
	function Food(options){
		options=options||{};
		this.x=options.x||0;
		this.y=options.y||0;
		this.width=options.width||20;
		this.height=options.height||20;
		this.color=options.color||'green';
	}
	Food.prototype.render=function(map){
		remove();
		//随机设置x和y的值
		this.x=tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
		this.y=tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
		//动态设置div，显示食物
		var div=document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		div.style.position=position;
		div.style.left=this.x+'px';
		div.style.top=this.y+'px';
		div.style.width=this.width+'px';
		div.style.height=this.height+'px';
		div.style.backgroundColor=this.color;
	}
	function remove(){
		for(var i=elements.length-1;i>=0;i--){
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i,1);
		}
	}
	window.Food=Food;
})()

// var map=document.getElementById('map');
// var food=new Food();
// food.render(map);

