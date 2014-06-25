function ControllerClassic (config, service){
	this.config = config;
	this.service = service;
	this.currentUser = 1;
	var types;
	this.clearField = function () {
		var tictak = document.getElementsByClassName(this.config.path)[0];
		while (tictak.firstChild) {
			tictak.removeChild(tictak.firstChild);
		}
	};
	this.drawField = function () {
		var input = document.getElementsByClassName(this.config.path)[0];
		var table = document.createElement('div');
			table.className = 'table';
			table.style.height = this.config.height + 'px';
			table.style.width = this.config.width + 'px';
		var menu = document.createElement('div');
			menu.className = 'changeType';
		input.appendChild(menu);

		/* Create matrix for game*/
		input.appendChild(table);
		var self = this;
		for (var i = 0; i < this.config.sizeHeight; i++) {
			for (var j = 0; j < this.config.sizeWidth; j++) {
				var block = document.createElement('div');
				var tmp = 'y' + i + 'x' + j;
				block.className = 'position ' + tmp;
				block.style.height = block.style.lineHeight = this.config.height / this.config.sizeHeight + 'px';
				block.style.width = this.config.width / this.config.sizeWidth + 'px';
				block.style.fontSize = this.config.width / this.config.sizeWidth / 2 + 'px';
				block.addEventListener('click', function(){
					self.handler(this);
				});
				table.appendChild(block);

			}
		}
		if (this.config.reset) {
			var restartButton = document.createElement('div');
			restartButton.className = 'reboot';
			restartButton.innerHTML = 'restart';
			restartButton.addEventListener('click', function(){
				self.restart();
			});
			input.appendChild(restartButton);
		}
		/* Set property for main block*/
		input.style.height = this.config.height + 'px';
		input.style.margin = -this.config.width / 2 + 'px' + ' 0 ' + ' 0 ' + -this.config.width / 2 + 'px';
	};
	this.check = function(i,j) {
		var k = +j + 1;
		var g = +j + 1;
		var count = 0;
		var fl = true;
		var win = [];
		/*Check horizontal*/
		if (fl) {
			win.push([i, j]);
			while (this.game.getPosition(i, j)  ==  this.game.getPosition(i, k)) {
				win.push([i, k]);
				count++;
				k++;
			}
			k = +j - 1;
			while (this.game.getPosition(i, j)  ==  this.game.getPosition(i, k)) {
				win.push([i, k]);
				count++;
				k--;
			}
			if (count >=  this.config.winCombination - 1)
				fl = false;
			else
				win = [];
		}
		/* Check vertical */
		if (fl) {
			k = +i + 1;
			count = 0;
			win.push([i, j]);
			while (k <=  this.config.sizeHeight - 1 && this.game.getPosition(i, j)  ==  this.game.getPosition(k, j)) {
				win.push([k, j]);
				count++;
				k++;
			}
			k = +i - 1;
			while (k >=  0 && this.game.getPosition(i, j)  ==  this.game.getPosition(k, j)) {
				win.push([k, j]);
				count++;
				k--;
			}
			if (count >=  this.config.winCombination - 1)
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
			while (k < this.config.sizeHeight && g <=  this.config.sizeWidth && this.game.getPosition(i, j)  ==  this.game.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k++;
				g++;
			}
			k = +i - 1;
			g = +j - 1;
			while (k >=  0 && this.game.getPosition(i, j)  ==  this.game.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k--;
				g--;
			}
			if (count >=  this.config.winCombination-1)
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
			while (k <=  this.config.sizeHeight - 1 && g <=  this.config.sizeWidth - 1 && this.game.getPosition(i, j)  ==  this.game.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k++;
				g--;
			}
			k = +i - 1;
			g = +j + 1;
			while (k >=  0 && this.game.getPosition(i, j)  ==  this.game.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k--;
				g++;
			}
		}
		if (count >=  this.config.winCombination - 1) {
			this.win(win);
		}
	};
	this.handler = function(obj) {
		var y = obj.className.substr(10, 1);
		var x = obj.className.substr(12, 1);
		if(!this.game.getPosition(y,x)){
			switch (this.currentUser) {
				case 1:
					this.game.setPosition(this.currentUser, y, x);
					switch (types.type){
						case 'text':
							obj.innerHTML = types.items[0];
							break;
						case 'images':
							obj.style.background = 'url("'+types.items[0]+'") 50% 50%';
							obj.style.backgroundSize = "100% 100%";
							break;
					}
					this.check(y,x);
					this.currentUser = 2;
					break;
				case 2:
					this.game.setPosition(this.currentUser, y, x);
					switch (types.type){
						case 'text':
							obj.innerHTML = types.items[1];
							break;
						case 'images':
							obj.style.background = 'url("'+types.items[1]+'") 50% 50%';
							obj.style.backgroundSize = "100% 100%";
							break;
					}
					this.check(y,x);
					this.currentUser = 1;
					break;
			}
		}

	};
	this.win = function(arr){
		for(var i = 0; i<arr.length; i++){
			var el = document.getElementsByClassName('y'+arr[i][0]+'x'+arr[i][1])[0];
			el.style.backgroundColor = "#dcffd1";
		}
		var win = document.createElement('div');
		win.className = 'winWindow';
		win.innerHTML = 'Player ' + this.currentUser + ' WIN';
		var input = document.getElementsByClassName('table')[0];
		input.appendChild(win);
	};
	this.init = function() {
		this.drawField();
		this.game = new this.service(this.config);
		this.game.init();
		types = this.game.getItems();
	};
	this.restart = function(){
		this.currentUser = 1;
		this.clearField();
		this.init();
	};
}

ControllerZombie.prototype = new ControllerClassic('', '');
function ControllerZombie (config, service){
	this.config = config;
	this.service = service;
	this.check = function(i,j) {
		var r = 0, p =  0, q = 0;
		var count = 0;
		var win = [];

		/* Check left */
		for(var n = 0; n<this.config.sizeWidth-1; n++){
			for(var m = 0; m<this.config.sizeHeight-1; m++){
				count = 0;
				win = [];
				try{
					if(this.game.stats[i][j] == this.game.stats[n][m]){
						p = n;
						q = m;
						r = p+this.config.winCombination-1;
						while(this.game.getPosition(i, j) == this.game.getPosition(p, q) && this.game.getPosition(i, j) == this.game.getPosition(r,q)){
							if(r == p){
								win.push([r,q]);
								if(count >= this.config.winCombination-1) {
									this.win(win);
									return true;
								}
							}
							win.push([p,q]);
							win.push([r,q]);
							count = count+2;
							q++;
							p++;
							r--;
						}
					}
				}
				catch(e){
					console.log(e);
				}
				count = 0;
				win = [];
				try{
					if(this.game.getPosition(i,j) == this.game.getPosition(n, m)){
						p = n;
						q = m;
						r = p;
						win.push([i,j]);
						while(r > 0 && this.game.getPosition(i, j) == this.game.getPosition(p, q) && this.game.getPosition(i, j) == this.game.getPosition(r, q)){
							if(r != p){
								count++;
							}
							count++;
							win.push([p,q]);
							win.push([r,q]);
							q++;
							p++;
							r--;
							if(count >= this.config.winCombination) {
								this.win(win);
								return true;
							}
						}
					}
				}
				catch(e){
					console.log(e);
				}
			}
		}
		return false;
	};
	this.win = function(arr){
		for(var i = 0; i<arr.length; i++){
			var el = document.getElementsByClassName('y'+arr[i][0]+'x'+arr[i][1])[0];
			el.style.backgroundColor = "#dcffd1";
		}
		var win = document.createElement('div');
		win.className = 'winWindow zombie';
		win.innerHTML = this.currentUser + ' WIN!<br>ARGGRH!';
		var input = document.getElementsByClassName('table')[0];
		input.appendChild(win);
	};
}