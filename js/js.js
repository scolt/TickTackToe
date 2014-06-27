var conf={};
conf.sizeWidth=3;
conf.sizeHeight=4;
conf.width=300;
conf.height=300;
conf.winCombination=3;
conf.reset=true;
conf.path='TickTackToe';
var mods=[{
		Controller: ControllerClassic,
		Model: TickTackToe,
		name: 'Classic Mode'
	},
	{
		Controller: ControllerZombie,
		Model: TickTackToeZombie,
		name: 'Zombie Mode'
	},
	{
		Controller: ControllerZombie,
		Model: TickTackToe,
		name: 'Zombie Classic Mode'
	},
	{
		Controller: ControllerClassic,
		Model: TickTackToeZombie,
		name: 'Classic Zombie Mode'
	}
];

addEventListener("DOMContentLoaded", function(){
	var input=document.getElementsByClassName(conf.path)[0];
	var menu = document.createElement('div');
	menu.className = 'changeType';
	input.appendChild(menu);
	/* Create buttons of type*/
	for (var i = 0; i < mods.length; i++) {
		var button = document.createElement('div');
		button.innerHTML = mods[i].name;
		menu.appendChild(button);
	}
	var change=document.getElementsByClassName('changeType')[0];
	change.addEventListener('click', function(e){
		for(var i=0; i<change.childNodes.length; i++){
			if(change.childNodes[i]==e.target) {
				var c = new mods[i].Controller(conf, mods[i].Model);
				c.clearField();
				c.init();
			}
		}
	});
	var i = 1, j = 1;
	var c = new mods[i].Controller(conf, mods[j].Model);
	c.init();
});