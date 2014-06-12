function TickTackToe(){
	var self=this;
	self.config = {
		size: 3,
		width: 120,
		path: 'TickTackToe',
		winCombination: 3,
		reset: true
	}
	self.stats= new Array();
	self.player='player1';
	self.create=function(){
		var input=document.getElementsByClassName(self.config.path)[0];
		var table=document.createElement('div');
			table.className='table';
			table.style.height=table.style.width=self.config.width+'px';
		input.appendChild(table);
		if(self.config.size>self.config.winCombination){
			self.step=2;
		}
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
		if(self.config.reset){
			var button=document.createElement('div');
			button.className='reboot';
			button.innerHTML='restart';
			input.appendChild(button);
			button.addEventListener('click', self.restart);
		}
		input.style.width=self.config.width+'px';
		input.style.margin=-self.config.width/2+'px'+' 0 '+' 0 '+-self.config.width/2+'px';
	}
	self.handler=function(){
		if(!self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]){
			switch (self.player){
				case 'player1':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]=1;
					this.style.backgroundColor="#ccc";
					this.innerHTML='X';
					self.check(this.className.substr(10, 1),this.className.substr(12, 1));
					self.player='player2';
					break;
				case 'player2':
					self.stats[this.className.substr(10, 1)][this.className.substr(12, 1)]=2;
					this.style.backgroundColor="#e0e0e0";
					this.innerHTML='O';
					self.check(this.className.substr(10, 1),this.className.substr(12, 1));
					self.player='player1';
					break;
			}

		}
	}
	self.restart=function(){
		var tictak=document.getElementsByClassName(self.config.path)[0];
		while (tictak.firstChild) {
			tictak.removeChild(tictak.firstChild);
		}
		self.create();
	}
	self.check=function(i,j){
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