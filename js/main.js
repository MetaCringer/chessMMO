let app;
let ChunkContainers = new Map();
//let container = PIXI.Container();
//let gr = new PIXI.Graphics();
let chunks =[];
chunks[0]=[];
chunks[1]=[];
chunks[2]=[];
let coords = {x: 0, y: 0}
let keys =[];
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
			x: ((this.screen.width/2)-this.stage.transform.position.x),
			y: (this.screen.height/2)-this.stage.transform.position.y
		}
	}
	app.getChunk = function(cord){
		return {
			chx: Math.floor(cord.x/1024),
			chy: Math.floor(cord.y/1024)
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
			chunks[i][j] = new PIXI.Container();

			let pxcenter = app.getCenter();

			app.stage.addChild(chunks[i][j]);
			let cord = app.getChunk(pxcenter);
			chunks[i][j].cords = {
				chx: (cord.chx+i-1),
				chy: (cord.chy+j-1)
			}
			ChunkContainers.set(chunks[i][j].cords.chx+":"+chunks[i][j].cords.chy,chunks[i][j]);
			for(let x = 0; x < 32;++x){
				for(let y = 0; y < 32;++y){
					let c = new PIXI.Container();
					c.addChild((((x%2) ^ (y%2))>0)?Wcell.clone():Bcell.clone());
					c.transform.position.x=(chunks[i][j].cords.chx*1024)+x*32;
					c.transform.position.y=(chunks[i][j].cords.chy*1024)+y*32;
					chunks[i][j].addChild(c);
				}
			}

		}
		
	}

	app.ticker.add(loop);
	window.addEventListener("keydown",kdown);
	window.addEventListener("keyup",kup);
	window.addEventListener('wheel', zoom);
}
function loop(){
	if(keys["w"]){
		dy=speed;
	}else if(keys["s"]){
		dy= -speed
	}
	if(keys["a"]){
		dx = speed
	}else if(keys["d"]){
		dx = -speed
	}
	if(keys["t"]){
		console.log(app.getCenter());
	}
	app.stage.transform.position.y+=dy
	app.stage.transform.position.x+=dx
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
	keys[e.key] = true;

	// trigers of extend map
	console.log(e);
}
function kup(e){
	keys[e.key] = false;
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