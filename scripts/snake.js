(function(){
	var position='absolute';
	var elements=[];
	function Snake(options){
		var options=options||{};
		var elements=[];
		this.width=options.width||20;
		this.height=options.height||20;
		this.direction=options.direction||'right';
		this.body=[
			{x:3,y:2,color:'red'},
			{x:2,y:2,color:'blue'},
			{x:1,y:2,color:'blue'}
		];
		this.backgroundColor=options.color||'green';
	}
	Snake.prototype.render=function(map){
		remove();
		for(var i=0,len=this.body.length;i<len;i++){
			var object=this.body[i];
			var div=document.createElement('div');
			map.appendChild(div);
			elements.push(div);
			div.style.position=position;
			div.style.width=this.width+'px'
			div.style.height=this.height+'px';
			div.style.left=object.x*this.width+'px';
			div.style.top=object.y*this.height+'px';
			div.style.backgroundColor=object.color;
		}
	}
	Snake.prototype.move=function(food,map){
		//蛇身
		for(var i=this.body.length-1;i>0;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		} 
		//蛇头
		var head=this.body[0];
		switch(this.direction){
			case 'right':head.x+=1;break;
			case 'left':head.x-=1;break;
			case 'top':head.y-=1;break;
			case 'bottom':head.y+=1;break;
		}

    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    if (headX === food.x && headY === food.y) {
      // 吃到食物，往蛇节的最后加一节
      var last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
      // 把现在的食物对象删除，并重新随机渲染一个食物对象
      food.render(map);
    }
  }

	function remove(){
		for(var i=elements.length-1;i>=0;i--){
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i,1);
		}
	}
	window.Snake=Snake;
})()
// snake=new window.Snake();
// var map=document.getElementById('map');
// snake.render(map);











