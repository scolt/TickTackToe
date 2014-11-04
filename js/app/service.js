function TickTackToeService(model, config) {
	this.config = config;
	this.model = model;
	this.getConfig = function() {
		return this.config;
	};
	this.getItems = function() {
		return this.model.items;
	};
	this.getPosition = function(y,x) {
		return this.model.stats[y][x];
	};
	this.setPosition = function(value, y, x) {
		this.model.stats[y][x] = value;
	};
	this.reload = function() {
		for (var i = 0; i < this.config.sizeHeight; i++){
			this.model.stats[i] = [];
			for (var j = 0; j < this.config.sizeWidth; j++){
				this.model.stats[i][j] = 0;
			}
		}
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
			while (this.getPosition(i, j)  ==  this.getPosition(i, k)) {
				win.push([i, k]);
				count++;
				k++;
			}
			k = +j - 1;
			while (this.getPosition(i, j)  ==  this.getPosition(i, k)) {
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
			while (k <=  this.config.sizeHeight - 1 && this.getPosition(i, j)  ==  this.getPosition(k, j)) {
				win.push([k, j]);
				count++;
				k++;
			}
			k = +i - 1;
			while (k >=  0 && this.getPosition(i, j)  ==  this.getPosition(k, j)) {
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
			while (k < this.config.sizeHeight && g <=  this.config.sizeWidth && this.getPosition(i, j)  ==  this.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k++;
				g++;
			}
			k = +i - 1;
			g = +j - 1;
			while (k >=  0 && this.getPosition(i, j)  ==  this.getPosition(k, g)) {
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
			while (k <=  this.config.sizeHeight - 1 && g <=  this.config.sizeWidth - 1 && this.getPosition(i, j)  ==  this.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k++;
				g--;
			}
			k = +i - 1;
			g = +j + 1;
			while (k >=  0 && this.getPosition(i, j)  ==  this.getPosition(k, g)) {
				win.push([k, g]);
				count++;
				k--;
				g++;
			}
		}
		if (count >=  this.config.winCombination - 1) {
			return {
				status: true,
				winArr: win
			}
		}else{
			return {
				status: false
			}
		}
	};
}
TickTackToeZombieService.prototype = new TickTackToeService('', '');
function TickTackToeZombieService(model, config) {
	this.config = config;
	this.model = model;
	this.check = function(i,j) {
		var r = 0, p =  0, q = 0;
		var count = 0;
		var win = [];
		var fl = true;
		/* Check left */
		for(var n = 0; n<this.config.sizeWidth-1; n++){
			if(!fl){
				break;
			}
			for(var m = 0; m<this.config.sizeHeight-1; m++){
				if(!fl){
					break;
				}
				try{
					if(fl && this.model.stats[i][j] == this.model.stats[n][m]){
						count = 0;
						win = [];
						p = n;
						q = m;
						r = p+this.config.winCombination-1;
						while(this.getPosition(i, j) == this.getPosition(p, q) && this.getPosition(i, j) == this.getPosition(r,q)){
							if(r == p){
								win.push([r,q]);
								if(count >= this.config.winCombination-1) {
									fl=false;
									break;
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
			}
		}
		if (count >=  this.config.winCombination - 1) {
			return {
				status: true,
				winArr: win
			}
		}else{
			return {
				status: false
			}
		}
	};
}
