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
	}
];
addEventListener("DOMContentLoaded", function(){
	var i = 0, j = 0;
	var c = new mods[i].Controller(conf, mods[j].Model);
	c.init();
});