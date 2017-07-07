const Command = require('command'),
		BossId = [981,2000,781],
		CAGES = [1205142645,1205142643,1205142642,1205142644],
		FIRST = 559,
		SECOND = 556;

module.exports = function vsimpcage(dispatch) {
	const command = Command(dispatch)
	let playerID = null,
		enabled = true,
		boss = null,
		uid = 999999999,
		time = 1900;

	command.add('delay', (str) => {
		time = parseInt(str);
		command.message('Delay set to: '+time);
	});
	
	command.add('impcage', (str) => {
		if(str == 'off'){
			command.message('VS-Imp cage module toggled off');
		}
		else if(str == 'on'){
			command.message('VS-Imp cage module toggled on');
		}
		else{
			command.message('Invalid input');
		}
		
	});
	
	dispatch.hook('S_LOGIN', 2, (event) => {playerID = event.playerId;});
	
	dispatch.hook('S_BOSS_GAGE_INFO', 2, (event) => {
		if(event.huntingZoneId === BossId[0] && event.templateId === BossId[1] || event.huntingZoneId === BossId[2] && event.templateId === BossId[1]){
			boss = event.id;
		}
	});
	
	dispatch.hook('S_ACTION_STAGE', 1, (event) => {
		if (!enabled || !boss) return;
		if(boss - event.source == 0){
			currentLocation = {x: event.x,y: event.y,z: event.z,w: event.w};
			if(event.stage == 0 && event.skill == CAGES[0]){				
				setTimeout(PizzaTwo, 6200,FIRST);
				setTimeout(PizzaOne, 7200,SECOND);
				setTimeout(Inner, 8200,FIRST);
				setTimeout(Donut, 9200,SECOND);
				setTimeout(PizzaLast, 10200,FIRST);
			}
			else if(event.stage == 0 && event.skill == CAGES[1]){				
				setTimeout(PizzaOne, 6200,FIRST);
				setTimeout(PizzaTwo, 7200,SECOND);
				setTimeout(Donut, 8200,FIRST);
				setTimeout(Inner, 9200,SECOND);
				setTimeout(PizzaLast, 10200,FIRST);
			}
			else if(event.stage == 0 && event.skill == CAGES[2]){				
				setTimeout(PizzaTwo, 5200,FIRST);
				setTimeout(Inner, 6200,SECOND);
				setTimeout(Donut, 7200,FIRST);
				setTimeout(PizzaOne, 8200,SECOND);
				setTimeout(PizzaLast, 9200,FIRST);
			}
			else if(event.stage == 0 && event.skill == CAGES[3]){				
				setTimeout(Inner, 5200,FIRST);
				setTimeout(PizzaOne, 6200,SECOND);
				setTimeout(PizzaTwo, 7200,FIRST);
				setTimeout(Donut, 8200,SECOND);
				setTimeout(PizzaLast, 9200,FIRST);
			}
		}
    });
	
	function SpawnLoc(degrees, radius) {
	let r = null, rads = null, finalrad = null, spawnx = null, spawny = null, pos = null;
	r = (currentLocation.w / 0x8000) * Math.PI;
	rads = (degrees * Math.PI/180);
	finalrad = r - rads;
	spawnx = currentLocation.x + radius * Math.cos(finalrad);
    spawny = currentLocation.y + radius * Math.sin(finalrad);
	pos = {x:spawnx,y:spawny};
		return pos;
	}
	
	function PizzaOne(item){
		SpawnThing(SpawnLoc(17,150),item);
		SpawnThing(SpawnLoc(75,150),item);
		SpawnThing(SpawnLoc(133,150),item);
		SpawnThing(SpawnLoc(195,150),item);
		SpawnThing(SpawnLoc(318,150),item);
		SpawnThing(SpawnLoc(253,150),item);
	}
	
	function PizzaTwo(item){
		SpawnThing(SpawnLoc(47,150),item);
		SpawnThing(SpawnLoc(105,150),item);
		SpawnThing(SpawnLoc(163,150),item);
		SpawnThing(SpawnLoc(225,150),item);
		SpawnThing(SpawnLoc(348,150),item);
		SpawnThing(SpawnLoc(283,150),item);
	}
	
	function PizzaLast(item){
		SpawnThing(SpawnLoc(285,150),item);
		SpawnThing(SpawnLoc(105,150),item);
		SpawnThing(SpawnLoc(17,150),item);
		SpawnThing(SpawnLoc(195,150),item);
	}
	
	function Donut(item){ //todo fix this shit, works tho
		SpawnThing(SpawnLoc(160,75),item);
		SpawnThing(SpawnLoc(80,75),item);
		SpawnThing(SpawnLoc(40,75),item);
		SpawnThing(SpawnLoc(0,75),item);
		SpawnThing(SpawnLoc(0,-75),item);
		SpawnThing(SpawnLoc(160,-75),item);
		SpawnThing(SpawnLoc(80,-75),item);
		SpawnThing(SpawnLoc(40,-75),item);
	}
	
	function Inner(item){ //todo fix this shit, works tho
		SpawnThing(SpawnLoc(160,275),item);
		SpawnThing(SpawnLoc(80,275),item);
		SpawnThing(SpawnLoc(40,275),item);
		SpawnThing(SpawnLoc(0,275),item);
		SpawnThing(SpawnLoc(0,-275),item);
		SpawnThing(SpawnLoc(160,-275),item);
		SpawnThing(SpawnLoc(80,-275),item);
		SpawnThing(SpawnLoc(40,-275),item);
	}
	// To use item instead uncomment next line
	// Just in case, uncommenting means: remove the //
	// /*
	function SpawnThing(position,item){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
			uid : uid,
			item : item,
			amount : 1,
			x : position.x,
			y : position.y,
			z : currentLocation.z,
			unk1 : 0,
			unk2 : 0
		});
		setTimeout(Despawn, time,uid)
		uid--;
	}
	
	function Despawn(uid){
	dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
			uid : uid,
			unk : 0
		});
	}
	// Uncomment this one too */
	
	/* To use item instead of collection just delete this line
	// and comment the other one
	function SpawnThing(position){
	dispatch.toClient('S_SPAWN_DROPITEM', 1, {
			id: uid,
			x: position.x,
			y: position.y,
			z: currentLocation.z,
			item: 6515, //Ancient wish
			amount: 1,
			expiry: 999999,
			owners: [{id: playerID}]
	});
	setTimeout(Despawn, time,uid)
	uid--
	}
	
	function Despawn(uid){
	dispatch.toClient('S_DESPAWN_DROPITEM', 1, {
			id : uid
		});
	}
	AND THIS LINE */

}
