TickTackToeZombieBot.prototype=new TickTackToeZombie();
function TickTackToeZombieBot(){
	var self=this;
	self.handler = function () {
		if (!self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]) {

			self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)] = 1;
			this.style.background = "url('images/zombie/x.png') 50% 50%";
			self.check(this.className.substr(10, 1), this.className.substr(12, 1));
			var min= 0, max=self.config.size-1;
			if(!self.fillAll()){
				do{
					var x=Math.round(min - 0.5 + Math.random()*(max-min+1));
					var y=Math.round(min - 0.5 + Math.random()*(max-min+1));
				}while(self.stats[y][x]!=0);
				self.stats[y][x] = 2;
				self.check(y, x);
				document.getElementsByClassName('y'+y+'x'+x)[0].style.background = "url('images/zombie/o.png') 50% 50%";
				document.getElementsByClassName('y'+y+'x'+x)[0].style.backgroundSize="100%";
			}
		}
		this.style.backgroundSize="100%";
	}
}




