(function(){
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
})();








