TickTackToeModern.prototype=new TickTackToe;
function TickTackToeModern(){
	var self=this;
	self.items=['Z', 'W'];
	self.create=function(){
		for(var i=0; i<self.games.count; i++){
			self.games[i].activeMenu=false;
		}
		self.games[1].activeMenu=true;
		var elems=document.getElementsByClassName('position');
		for(var item=0; item<elems.length; item++){
			elems[item].addEventListener('click', self.handler);
		}

	};
	self.check=function(i,j){
		var r=0, p= 0, q=0;
		var count=0;
		var win=new Array();

			/* Check left */
			for(var n=0; n<self.config.size-1; n++){
				for(var m=0; m<self.config.size-1; m++){
					count=0;
					win=[];
					try{
						if(self.stats[i][j]==self.stats[n][m]){
							p=n;
							q=m;
							r=p+self.config.winCombination-1;
							while(self.stats[i][j]==self.stats[p][q] && self.stats[i][j]==self.stats[r][q]){
								if(r==p){
									win.push([r,q]);
									if(count>=self.config.winCombination-1) {
										self.win(win);
										return true;
									}
								}
								win.push([p,q]);
								win.push([r,q]);
								count=count+2;
								q++;
								p++;
								r--;
							}
						}
					}
					catch(e){}
					count=0;
					win=[];
					try{
						if(self.stats[i][j]==self.stats[n][m]){
							p=n;
							q=m;
							r=p;
							win.push([i,j]);
							while(self.stats[i][j]==self.stats[p][q] && self.stats[i][j]==self.stats[r][q]){
								if(r!=p){
									count++;
								}
								count++;
								win.push([p,q]);
								win.push([r,q]);
								q++;
								p++;
								r--;
								if(count>=self.config.winCombination) {
									self.win(win);
									return true;
								}
							}
						}
					}
					catch(e){}
					count=0;
					win=[];
					try{
						if(self.stats[i][j]==self.stats[n][m]){
							p=n;
							q=m;
							r=q;
							win.push([i,j]);
							while(self.stats[i][j]==self.stats[p][q] && self.stats[i][j]==self.stats[p][r]){
								if(r!=p){
									count++;
								}
								count++;
								win.push([p,q]);
								win.push([p,r]);
								q++;
								p++;
								r--;
								if(count>=self.config.winCombination) {
									self.win(win);
									return true;
								}
							}
						}
					}
					catch(e){}
					count=0;
					win=[];
					try{
						if(self.stats[i][j]==self.stats[n][m]){
							p=n;
							q=m;
							r=q+self.config.winCombination-1;
							win.push([i,j]);
							while(self.stats[i][j]==self.stats[p][q] && self.stats[i][j]==self.stats[p][r]){
								if(r!=p){
									count++;
								}
								count++;
								win.push([p,q]);
								win.push([p,r]);
								q++;
								p++;
								r--;
								if(count>=self.config.winCombination) {
									self.win(win);
									return true;
								}
							}
						}
					}
					catch(e){}
				}
			}
	}
	self.handler = function () {
		if (!self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]) {
			switch (self.player) {
				case 'player1':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)] = 1;
					this.style.backgroundColor = "#e0e0e0";
					this.innerHTML = self.items[0];
					self.check(this.className.substr(10, 1), this.className.substr(12, 1));
					self.player = 'player2';
					break;
				case 'player2':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)] = 2;
					this.style.backgroundColor = "#e0e0e0";
					this.innerHTML = self.items[1];
					self.check(this.className.substr(10, 1), this.className.substr(12, 1));
					self.player = 'player1';
					break;
			}

		}
	}
}




