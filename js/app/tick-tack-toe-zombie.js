TickTackToeZombie.prototype=new TickTackToe;
function TickTackToeZombie(){
	var self=this;
	self.create=function(){
		for(var i=0; i<self.games.count; i++){
			self.games[i].activeMenu=false;
		}
		self.games[2].activeMenu=true;
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
		var k = +j + 1;
		var g = +j + 1;
		var count = 0;
		var fl = true;
		var win = new Array();
		/*Check horizontal*/
		if (fl) {
			win.push([i, j]);
			while (self.stats[i][j] == self.stats[i][k]) {
				win.push([i, k]);
				count++;
				k++;
			}
			k = +j - 1;
			while (self.stats[i][j] == self.stats[i][k]) {
				win.push([i, k]);
				count++;
				k--;
			}
			if (count >= self.config.winCombination - 1)
				fl = false;
			else
				win = [];
		}
		/* Check vertical */
		if (fl) {
			k = +i + 1;
			count = 0;
			win.push([i, j]);
			while (k <= self.config.size - 1 && self.stats[i][j] == self.stats[k][j]) {
				win.push([k, j]);
				count++;
				k++;
			}
			k = +i - 1;
			while (k >= 0 && self.stats[i][j] == self.stats[k][j]) {
				win.push([k, j]);
				count++;
				k--;
			}
			if (count >= self.config.winCombination - 1)
				fl = false;
			else
				win = [];
		}
		/* Check diagonal */
		if (fl) {
			k = +i + 1;
			g = +j + 1;
			count = 0;
			win.push([i, j]);
			while (k <= self.config.size - 1 && g <= self.config.size - 1 && self.stats[i][j] == self.stats[k][g]) {
				win.push([k, g]);
				count++;
				k++;
				g++;
			}
			k = +i - 1;
			g = +j - 1;
			while (k >= 0 && self.stats[i][j] == self.stats[k][g]) {
				win.push([k, g]);
				count++;
				k--;
				g--;
			}
			if (count >= self.config.winCombination - 1)
				fl = false;
			else
				win = [];
		}
		/* Check another diagonal*/
		if (fl) {
			k = +i + 1;
			g = +j - 1;
			count = 0;
			win.push([i, j]);
			while (k <= self.config.size - 1 && g <= self.config.size - 1 && self.stats[i][j] == self.stats[k][g]) {
				win.push([k, g]);
				count++;
				k++;
				g--;
			}
			k = +i - 1;
			g = +j + 1;
			while (k >= 0 && self.stats[i][j] == self.stats[k][g]) {
				win.push([k, g]);
				count++;
				k--;
				g++;
			}
			if (count >= self.config.winCombination - 1)
				fl = false;
			else
				win = [];
		}
		if (count >= self.config.winCombination - 1) {
			self.win(win);
		}
	}
	self.win=function(arr){
		for(var i=0; i<arr.length; i++){
			var el=document.getElementsByClassName('y'+arr[i][0]+'x'+arr[i][1])[0];
			el.style.backgroundColor="#dcffd1";
		}
		var win=document.createElement('div');
		win.className='winWindow zombie';
		win.innerHTML=self.player + ' WIN!<br>ARGGRH!';
		var input=document.getElementsByClassName('table')[0];
		input.appendChild(win);
	}
	self.handler = function () {
		if (!self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]) {
			switch (self.player) {
				case 'player1':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)] = 1;
					this.style.background = "url('images/zombie/x.png') 50% 50%";
					self.check(this.className.substr(10, 1), this.className.substr(12, 1));
					self.player = 'player2';
					break;
				case 'player2':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)] = 2;
					this.style.background = "url('images/zombie/o.png') 50% 50%";
					self.check(this.className.substr(10, 1), this.className.substr(12, 1));
					self.player = 'player1';
					break;
			}
		}
		this.style.backgroundSize="100%";
	}
}



