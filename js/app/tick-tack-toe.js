function TickTackToe(config) {
	this.config=config;
	this.stats = [];
	this.items = {
		type: 'text',
		items: ['X', 'O']
	};
	this.getItems = function() {
		return this.items;
	}
	this.getPosition = function(y,x) {
		return this.stats[y][x];
	}
	this.setPosition = function(value, y, x) {
		this.stats[y][x]=value;
	}
	this.areAllFilled = function() {
		for (var i = 0; i < config.sizeHeight; i++) {
			for (var j = 0; j < config.sizeWidth; j++) {
				if(this.stats[i][j]==0) return false;
			}
		}
		return true;
	}
	this.init = function(){
		for (var i = 0; i < this.config.sizeHeight; i++){
			this.stats[i]=[];
			for (var j=0; j < this.config.sizeWidth; j++){
				this.stats[i][j]=0;
			}
		}
	}
}
TickTackToeZombie.prototype=new TickTackToe();
function TickTackToeZombie(config) {
	this.config=config;
	this.stats = [];
	this.items = {
		type: 'images',
		items: ['images/zombie/o.png', 'images/zombie/x.png']
	};
}
