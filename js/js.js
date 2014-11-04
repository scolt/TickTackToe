var conf={};
conf.sizeWidth=3;
conf.sizeHeight=4;
conf.width=300;
conf.height=300;
conf.winCombination=3;
conf.reset=true;
conf.path='TickTackToe';
var mods=[{
		controller: ControllerClassic,
		service: TickTackToeService,
		name: 'Classic Mode',
		model: TickTacToe
	},
	{
		controller: ControllerZombie,
		service: TickTackToeZombieService,
		name: 'Zombie Mode',
		model: TickTacToeZombie
	},
	{
		controller: ControllerZombie,
		service: TickTackToeService,
		name: 'Zombie Classic Mode',
		model: TickTacToeBrands
	}
];

addEventListener("DOMContentLoaded", function(){
//	var input=document.getElementsByClassName(conf.path)[0];
//	var menu = document.createElement('div');
//	menu.className = 'changeType';
//	input.appendChild(menu);
//
//	/* Create buttons of type*/
//	for (var i = 0; i < mods.length; i++) {
//		var button = document.createElement('div');
//		if (i == j) {
//			button.className='active';
//		}
//		button.innerHTML = mods[i].name;
//		menu.appendChild(button);
//	}
//	var change=document.getElementsByClassName('changeType')[0];
//	change.addEventListener('click', function(e){
//		for(var i=0; i<change.childNodes.length; i++){
//			change.childNodes[i].className='';
//			if(change.childNodes[i]==e.target) {
//				console.log(1);
//				var controller = new mods[i].controller(new mods[i].service(new mods[i].model(), conf));
//				change.childNodes[i].className='active';
//			}
//		}
//	});

	var j = 1;
	var controller = new mods[j].controller(new mods[j].service(new mods[j].model(), conf));
	controller.init();
});