function TickTackToe(){
	var self=this;
	self.config = {
		size: 3,
		width: 300,
		path: 'TickTackToe',
		winCombination: 3,
		reset: true
	}

	self.stats= new Array();
	self.player='player1';
	self.create=self.createClassic;
	self.check;
	self.games={
		count: 2,
		0: {activeMenu: true},
		1: {activeMenu: false}
	}
	self.items=new Array();
	/* Draw fields and buttons */
	self.drawField=function(){
		var input=document.getElementsByClassName(self.config.path)[0];
		var table=document.createElement('div');
		table.className='table';
		table.style.height=table.style.width=self.config.width+'px';
		var menu=document.createElement('div');
		menu.className='changeType';
		input.appendChild(menu);
		/* Create buttons of type*/
		for(var i=0; i<2; i++){
			var button=document.createElement('div');
			if(self.games[i].activeMenu) button.className='active';
			switch (i){
				case 0: button.innerHTML='Classic Game'; button.addEventListener('click', self.createClassic); break;
				case 1: button.innerHTML='Modern Game';button.addEventListener('click', self.createModern); break;
			}
			menu.appendChild(button);
		}
		/* Create matrix for game*/
		input.appendChild(table);
		for(var i=0; i<self.config.size; i++){
			self.stats[i]=new Array();
			for(var j=0; j<self.config.size; j++){
				var block=document.createElement('div');
				var tmp='y'+i+'x'+j;
				block.className='position '+tmp;
				block.style.height=block.style.width=block.style.lineHeight=self.config.width/self.config.size+'px';
				block.style.fontSize=self.config.width/self.config.size/2+'px'
				table.appendChild(block);
				self.stats[i][j]=0;
				block.addEventListener('click', self.handler);
			}
		}
		/* Create restart button or not*/
		if(self.config.reset){
			var button=document.createElement('div');
			button.className='reboot';
			button.innerHTML='restart';
			input.appendChild(button);
			button.addEventListener('click', self.restart);
		}
		/* Set property for main block*/
		input.style.width=self.config.width+'px';
		input.style.margin=-self.config.width/2+'px'+' 0 '+' 0 '+-self.config.width/2+'px';
	}
	self.handler=function(){
		if(!self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]){
			switch (self.player){
				case 'player1':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]=1;
					this.style.backgroundColor="#e0e0e0";
					this.innerHTML=self.items[0];
					self.check(this.className.substr(10, 1),this.className.substr(12, 1));
					self.player='player2';
					break;
				case 'player2':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]=2;
					this.style.backgroundColor="#e0e0e0";
					this.innerHTML=self.items[1];
					self.check(this.className.substr(10, 1),this.className.substr(12, 1));
					self.player='player1';
					break;
			}

		}
	}
	self.clearField=function(){
		var tictak=document.getElementsByClassName(self.config.path)[0];
		while (tictak.firstChild) {
			tictak.removeChild(tictak.firstChild);
		}
	}
	self.restart=function(){
		self.clearField();
		self.create();
	}
	/*Types of game*/
	self.createClassic=function(){
		for(var i=0; i<self.games.count; i++){
			self.games[i].activeMenu=false;
		}
		self.games[0].activeMenu=true;
		self.create=self.createClassic;
		self.check=self.checkClassic;
		self.items=['X', 'O'];
		self.clearField();
		self.drawField();
	}
	self.createModern=function(){
		for(var i=0; i<self.games.count; i++){
			self.games[i].activeMenu=false;
		}
		self.games[1].activeMenu=true;
		self.create=self.createModern;
		self.check=self.checkModern;
		self.items=['Z', 'H'];
		self.clearField();
		self.drawField();
	}
	/* Check win */
	self.checkModern=function(i,j){
		var r=0, p= 0, q=0;
		var count=0;
		var fl=true;
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
	self.checkClassic=function(i,j){
		var k=+j+1;
		var g=+j+1;
		var count=0;
		var fl=true;
		var win=new Array();
		/*Check horizontal*/
		if(fl){
			win.push([i,j]);
			while(self.stats[i][j]==self.stats[i][k]){
				win.push([i,k]);
				count++;
				k++;
			}
			k=+j-1;
			while(self.stats[i][j]==self.stats[i][k]){
				win.push([i,k]);
				count++;
				k--;
			}
			if(count>=self.config.winCombination-1)
				fl=false;
			else
				win=[];
		}
		/* Check vertical */
		if(fl){
			k=+i+1;
			count=0;
			win.push([i,j]);
			while(k<=self.config.size-1 && self.stats[i][j]==self.stats[k][j]){
				win.push([k,j]);
				count++;
				k++;
			}
			k=+i-1;
			while(k>=0 && self.stats[i][j]==self.stats[k][j]){
				win.push([k,j]);
				count++;
				k--;
			}
			if(count>=self.config.winCombination-1)
				fl=false;
			else
				win=[];
		}
		/* Check diagonal */
		if(fl){
			k=+i+1;
			g=+j+1;
			count=0;
			win.push([i,j]);
			while(k<=self.config.size-1 && g<=self.config.size-1 && self.stats[i][j]==self.stats[k][g]){
				win.push([k,g]);
				count++;
				k++;
				g++;
			}
			k=+i-1;
			g=+j-1;
			while(k>=0 && self.stats[i][j]==self.stats[k][g]){
				win.push([k,g]);
				count++;
				k--;
				g--;
			}
			if(count>=self.config.winCombination-1)
				fl=false;
			else
				win=[];
		}
		/* Check another diagonal*/
		if(fl){
			k=+i+1;
			g=+j-1;
			count=0;
			win.push([i,j]);
			while(k<=self.config.size-1 && g<=self.config.size-1 && self.stats[i][j]==self.stats[k][g]){
				win.push([k,g]);
				count++;
				k++;
				g--;
			}
			k=+i-1;
			g=+j+1;
			while(k>=0 && self.stats[i][j]==self.stats[k][g]){
				win.push([k,g]);
				count++;
				k--;
				g++;
			}
			if(count>=self.config.winCombination-1)
				fl=false;
			else
				win=[];
		}
		if(count>=self.config.winCombination-1) {
			self.win(win);
		}
	}
	/*Action win*/
	self.win=function(arr){
		for(var i=0; i<arr.length; i++){
			var el=document.getElementsByClassName('y'+arr[i][0]+'x'+arr[i][1])[0];
			el.style.backgroundColor="#dcffd1";
		}
		for(var i=0; i<self.config.size; i++){
			for(var j=0; j<self.config.size; j++){
				var el=document.getElementsByClassName('y'+i+'x'+j)[0];
				el.removeEventListener('click', self.handler)
			}
		}
		alert(self.player);
	}
}