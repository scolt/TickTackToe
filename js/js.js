addEventListener("DOMContentLoaded", function(){
//	var a=document.getElementsByClassName('TickTackToe')[0];
//	var config=new Array();
//	config.push('<div class="config">');
//	config.push('<label for="size">Size</label> <input type="number" name="size" id="size" value="3"/>');
//	config.push('<label for="width">Width</label> <input type="number" name="width" id="width" value="420" step="10"/>');
//	config.push('<label for="winCombination">Win Combination</label> <input type="number" name="winCombination" id="winCombination" value="3"/>');
//	config.push('<a href="#" id="submitConfig">Create</a>')
//	config.push('</div>');
//
//	config=config.join('');
//	a.innerHTML=config;
//	document.getElementById('submitConfig').addEventListener('click', function(){
//		var conf={};
//		conf.size=document.getElementById('size').value;
//		conf.width=document.getElementById('width').value;
//		conf.winCombination=document.getElementById('winCombination').value;
//		conf.reset=true;
//		conf.path='TickTackToe';
//		var c =new controller(conf);
//	})
	var conf={};
		conf.sizeWidth=3;
		conf.sizeHeight=4;
		conf.width=300;
		conf.height=300;
		conf.winCombination=3;
		conf.reset=true;
		conf.path='TickTackToe';
	var c = new ControllerClassic(conf, TickTackToeZombie);
	c.init();

});