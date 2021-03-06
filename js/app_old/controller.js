function controller(params){
	var self=this;
	var game;
	self.types=['classic', 'modern', 'zombie', 'zombieB'];
	self.clearField = function () {
		var tictak = document.getElementsByClassName(game.config.path)[0];
		while (tictak.firstChild) {
			tictak.removeChild(tictak.firstChild);
		}
	};
	self.drawField = function (active) {
		var input = document.getElementsByClassName(game.config.path)[0];
		var table = document.createElement('div');
		table.className = 'table';
		table.style.height = table.style.width = game.config.width + 'px';
		var menu = document.createElement('div');
		menu.className = 'changeType';
		input.appendChild(menu);
		/* Create buttons of type*/
		for (var i = 0; i < 4; i++) {
			var button = document.createElement('div');
			if (i==active) button.className = 'active';
			switch(i){
				case 0:
					button.innerHTML='Classic Game';
					break;
				case 1:
					button.innerHTML='Modern Game';
					break;
				case 2:
					button.innerHTML='Zombie Game';
					break;
				case 3:
					button.innerHTML='Zombie Bot Game';
					break;
			}
			menu.appendChild(button);
		}
		/* Create matrix for game*/
		input.appendChild(table);
		for (var i = 0; i < game.config.size; i++) {
			game.stats[i] = new Array();
			for (var j = 0; j < game.config.size; j++) {
				var block = document.createElement('div');
				var tmp = 'y' + i + 'x' + j;
				block.className = 'position ' + tmp;
				block.style.height = block.style.width = block.style.lineHeight = game.config.width / game.config.size + 'px';
				block.style.fontSize = game.config.width / game.config.size / 2 + 'px'
				table.appendChild(block);
				game.stats[i][j] = 0;
			}
		}

		/* Set property for main block*/
		input.style.width = game.config.width + 'px';
		input.style.margin = -game.config.width / 2 + 'px' + ' 0 ' + ' 0 ' + -game.config.width / 2 + 'px';
	}
	self.create=function(type){
		var service;
		self.type=type;
		switch(self.types[type]){
			case 'classic':
				service=TickTackToe;
				break;
			case 'modern':
				service=TickTackToeModern;
				break;
			case 'zombie':
				service=TickTackToeZombie;
				break;
			case 'zombieB':
				service=TickTackToeZombieBot;
				break;
		}
		game=new service;
		game.config=params;
		self.clearField();
		self.drawField(type);
		var elems = document.getElementsByClassName('position');
		for(var item = 0; item < elems.length; item++){
			elems[item].addEventListener('click', game.handler);
		}
		if (game.config.reset) {
			var input = document.getElementsByClassName(game.config.path)[0];
			var restartButton = document.createElement('div');
			restartButton.className = 'reboot';
			restartButton.innerHTML = 'restart';
			restartButton.addEventListener('click', self.restart);
			input.appendChild(restartButton);
		}
		var change=document.getElementsByClassName('changeType')[0];
		change.addEventListener('click', function(e){
			for(var i=0; i<change.childNodes.length; i++){
				if(change.childNodes[i]==e.target) {self.create(i);}

			}
		});
	};
	self.restart=function(){
		self.create(self.type);
	};
	self.create(0);
}