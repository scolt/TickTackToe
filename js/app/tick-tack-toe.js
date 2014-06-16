function TickTackToe() {
	var self = this;
	self.config = {
		size: 3,
		width: 300,
		path: 'TickTackToe',
		winCombination: 3,
		reset: true
	};
	self.stats = new Array();
	self.player = 'player1';
	self.games = {
		count: 2,
		0: {activeMenu: true},
		1: {activeMenu: false}
	};
	self.items = ['X', 'O'];
	self.check = function (i, j) {
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
		win.className='winWindow';
		win.innerHTML=self.player + ' WIN';
		var input=document.getElementsByClassName('table')[0];
		input.appendChild(win);
	}
	self.create = function () {
		for (var i = 0; i < self.games.count; i++) {
			self.games[i].activeMenu = false;
		}
		self.games[0].activeMenu = true;
		var elems=document.getElementsByClassName('position');
		for(var item=0; item<elems.length; item++){
			elems[item].addEventListener('click', self.handler);
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
