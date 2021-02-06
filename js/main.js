let app
let containers = new Map();
let container = PIXI.Container();
let gr = new PIXI.Graphics();
window.onload = function(){
	app = new PIXI.Application(
		{
			width: 800,
			height: 600,
			backgroundColor: 0xbbbbbb
		}
	);
	document.body.appendChild(app.view);
	app.loader.baseUrl = "images";
	app.loader
		.add("cell_black", "cell_black.png")
		.add("cell_white", "cell_white.png")
		.add("king", "figures/king.png")
		.add("queen", "figures/queen.png")
		.add("pawn", "figures/pawn.png")
		.add("tower", "figures/tower.png")
		.add("horse", "figures/horse.png")
		.add("elephant", "figures/elephant.png")
	app.loader.onProgress.add(showProgress)
	app.loader.onComplete.add(doneLoading)
	app.loader.onError.add(reportError)

	app.loader.load();
	let Bcell = new PIXI.Graphics();
	let Wcell = new PIXI.Graphics();
	Bcell.beginFill(0x000000);
	Wcell.beginFill(0xeeeeee);
	Bcell.drawRect(0,0,32,32);
	Wcell.drawRect(0,0,32,32);

	for(let x = 0; x < 8;++x){
		for(let y = 0; y < 8;++y){
			let c = new PIXI.Container();
			c.addChild((((x%2) ^ (y%2))>0)?Wcell.clone():Bcell.clone());
			containers.set(x+":"+y,c);
			c.transform.position.x=x*32;
			c.transform.position.y=y*32;
			app.stage.addChild(c);
		}
	}


}
function showProgress(e){
	console.log(e.progress);
}
function reportError(e){
	console.log("ERROR OMG ITS: " + e.message);
}
function doneLoading(e){
	console.log("DONE LOADING");
}