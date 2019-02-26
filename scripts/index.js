//--------tools----------//

;(function(window,undefined){
	//获得食物的随机位置
	var tools={
		getRandom:function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	}
	window.tools=tools;
})(window,undefined)
//---------------parent-----------------------
;(function(window,undefined){
	function Parent(options){
		options=options||{};
		this.width=options.width||20;
		this.height=options.height||20;
	}
	Parent.prototype.test=function(){
		console.log("test");
	}
	window.Parent=Parent;
})(window,undefined)

//----------------food-----------------------//

;(function (window,undefined){
	//自调用函数，避免命名冲突
	var position='absolute';
	//记录上一次创建的食物，为食物删除做准备
	var elements=[]; 
	function Food(options){
		options=options||{};
		this.x=options.x||0;
		this.y=options.y||0;
		Parent.call(this,options);
		this.color=options.color||'green';
	}
	Food.prototype=new Parent();
	Food.prototype.constructor=Food;
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
})(window,undefined)



//----------------snake----------------------//




;(function(window,undefined){
	var position='absolute';
	var elements=[];
	function Snake(options){
		var options=options||{};
		var elements=[];
		Parent.call(this,options);
		this.direction=options.direction||'right';
		this.body=[
			{x:3,y:2,color:'red'},
			{x:2,y:2,color:'blue'},
			{x:1,y:2,color:'blue'}
		];
		this.backgroundColor=options.color||'green';
	}
	Snake.prototype=new Parent;
	Snake.prototype.constructor=Snake;
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
})(window,undefined)











//----------------game-----------------------//



;(function(window,undefined){
	var that=null;//记录当前游戏对象
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map=map;
		that=this;
	}
	Game.prototype.start=function(){
		this.food.render(this.map);
		this.snake.render(this.map); 
		runSnake();
		bindKey();
	}
	function runSnake(){
		var timerId=setInterval(function(){
			this.snake.move(this.food,this.map);
			this.snake.render(this.map);
			var maxX=this.map.offsetWidth/this.snake.width;
			var maxY=this.map.offsetHeight/this.snake.height;
			var headX=this.snake.body[0].x;
			var headY=this.snake.body[0].y;
			if (headX<0||headX>=maxX||headY<0||headY>=maxY) {
				alert('Game over');
				clearInterval(timerId);
			}
		}.bind(that),150);
	}
	function bindKey(){
		document.addEventListener('keydown',function(e){
			//console.log('11');
			//37-left 38-top 39-right 40-bottom
			switch(e.keyCode){
				case 37:
					this.snake.direction='left';
					break;
				case 38:
					this.snake.direction='top';
					break;
				case 39:
					this.snake.direction='right';
					break;
				case 40:
					this.snake.direction='bottom';
					break;
			}
		}.bind(that),false);
	}

	window.Game=Game;
})(window,undefined)



//----------------main-----------------------//
;(function(window,undefined){
var map=document.getElementById('map');
var game=new Game(map);
game.start();
})(window,undefined);
