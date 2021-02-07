let app
let containers = new Map();
let container = PIXI.Container();
let gr = new PIXI.Graphics();
let chunks =[];
chunks[0]=[];
chunks[1]=[];
chunks[2]=[];
let coords = {x: 0, y: 0}
window.onload = function(){
	app = new PIXI.Application(
		{
			width: 800,
			height: 600,
			backgroundColor: 0xbbbbbb			
		}
	);
	app.getCenter = function(){
		return {
			x: (this.screen.width/2)-this.stage.transform.position.x,
			y: (this.screen.height/2)-this.stage.transform.position.y
		}
	}
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
	Bcell.beginFill(0x212121);
	Wcell.beginFill(0x919191);
	Bcell.drawRect(0,0,32,32);
	Wcell.drawRect(0,0,32,32);
	
	for(let i=0;i<3;++i){
		for(let j=0;j<3;++j){

			chunks[i][j]=new PIXI.Container();

			for(let x = 0; x < 16;++x){
				for(let y = 0; y < 16;++y){
					let c = new PIXI.Container();
					c.addChild((((x%2) ^ (y%2))>0)?Wcell.clone():Bcell.clone());
					//containers.set(x+":"+y,c);
					c.transform.position.x=x*32;
					c.transform.position.y=y*32;
					app.stage.addChild(c);
				}
			}

		}
	}

	
	window.addEventListener("keydown",kdown);
	window.addEventListener("keyup",kup);
	window.addEventListener('wheel', zoom);
}
function genField(x,y){

}
function updateChunk(coords){

}
function zoom(e){
	let zoom = e.wheelDeltaY;
	app.stage.scale.x+=zoom*0.0001;
	app.stage.scale.y+=zoom*0.0001;
	console.log(e);
}
let speed = 4;
let dx=0,dy=0;
function kdown(e){
	if(e.key === "w"){
		dy=speed;
	}else if(e.key === "s"){
		dy= -speed
	}else if(e.key === "a"){
		dx = speed
	}else if(e.key === "d"){
		dx = -speed
	}else if(e.key === "t"){
		console.log(app.getCenter());
	}
	app.stage.transform.position.y+=dy
	app.stage.transform.position.x+=dx
	// trigers of extend map
	console.log(e);
}
function kup(e){
	if((e.key === "w") || (e.key === "s")){
		dy=0;
	}else if((e.key === "a") || (e.key === "d")){
		dx=0
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