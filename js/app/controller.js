function ControllerClassic (service){
	this.service = service;
	this.currentUser = 1;
	var types;
	this.clearField = function () {
		var tictak = document.getElementsByClassName('field')[0];
		tictak.remove();
	};
	this.drawField = function () {
		console.dir(this.service);
		types = this.service.getItems();
		var main = document.getElementsByClassName(this.config.path)[0];
		var input = document.createElement('div');
		input.className = 'field';
		main.appendChild(input);
		var table = document.createElement('div');
			table.className = 'table';
			table.style.height = this.config.height + 'px';
			table.style.width = this.config.width + 'px';
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
		main.style.margin = -this.config.width / 2 + 'px' + ' 0 ' + ' 0 ' + -this.config.width / 2 + 'px';
	};
	this.handler = function(obj) {
		var y = obj.className.substr(10, 1);
		var x = obj.className.substr(12, 1);
		var check;
		if(!this.service.getPosition(y,x)){
			switch (this.currentUser) {
				case 1:
					this.service.setPosition(this.currentUser, y, x);
					switch (types.type){
						case 'text':
							obj.innerHTML = types.items[0];
							break;
						case 'images':
							obj.style.background = 'url("'+types.items[0]+'") 50% 50%';
							obj.style.backgroundSize = "100% 100%";
							break;
					}
					check = this.service.check(y,x);
					if(check.status) {
						this.win(check.winArr);
					}
					this.currentUser = 2;
					break;
				case 2:
					this.service.setPosition(this.currentUser, y, x);
					switch (types.type){
						case 'text':
							obj.innerHTML = types.items[1];
							break;
						case 'images':
							obj.style.background = 'url("'+types.items[1]+'") 50% 50%';
							obj.style.backgroundSize = "100% 100%";
							break;
					}
					this.service.check(y,x);
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
	this.restart = function(){
		this.currentUser = 1;
		this.clearField();
		this.drawField();
		this.service.reload();
	};
	this.init = function(){
		this.config = this.service.getConfig();
		this.drawField();
		this.service.reload();
	};
}

ControllerZombie.prototype = new ControllerClassic();
function ControllerZombie (service){
	this.service = service;
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
	this.init = function(){
		this.config = this.service.getConfig();
		this.drawField();
		this.service.reload();
	}
}