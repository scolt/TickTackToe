function TickTacToe() {
	this.stats = [];
	this.items = {
		type: 'text',
		items: ['X', 'O']
	};
}

TickTacToeZombie.prototype = new TickTacToe();
function TickTacToeZombie() {
	this.items = {
		type: 'images',
		items: ['images/zombie/o.png', 'images/zombie/x.png']
	};
}

TickTacToeBrands.prototype = new TickTacToe();
function TickTacToeBrands() {
	this.items = {
		type: 'images',
		items: ['images/brands/apple.png', 'images/zombie/windows.png']
	};
}