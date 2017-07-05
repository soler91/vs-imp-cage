const Command = require('command'),
		BossId = [981,2000]
		CAGES = [1205142645,1205142643,1205142642,1205142644];

module.exports = function vshmimpcage(dispatch) {
	const command = Command(dispatch)
	let playerID = null,
		enabled = true,
		boss = null,
		uid = 999999999,
		time = 1200;

	command.add('delay', (str) => {
		time = parseInt(str);
		command.message('Delay set to: '+time);
	});
	
	command.add('impcage', (str) => {
		if(str == 'off'){
			command.message('VSHM-Imp cage module toggled off');
		}
		else if(str == 'on'){
			command.message('VSHM-Imp cage module toggled on');
		}
		else{
			command.message('Invalid input');
		}
		
	});
	
	dispatch.hook('S_LOGIN', 2, (event) => {playerID = event.playerId;});
	
	dispatch.hook('S_SPAWN_NPC', 3, {filter: {fake: null}}, (event) => {
		if(event.huntingZoneId === BossId[0] && event.templateId === BossId[1]){
			boss = event.id;
		}
	});
	
	dispatch.hook('S_ACTION_STAGE', 1, {filter: {fake: null}}, (event) => {
		if (!enabled || !boss) return;
		if(boss - event.source == 0){
			currentLocation = {x: event.x,y: event.y,z: event.z,w: event.w};
			if(event.skill == CAGES[0]){				
				setTimeout(PizzaTwo, 7200);
				setTimeout(PizzaOne, 8200);
				setTimeout(Inner, 9200);
				setTimeout(Donut, 10200);
				setTimeout(PizzaLast, 11200);
			}
			else if(event.skill == CAGES[1]){				
				setTimeout(PizzaOne, 7200);
				setTimeout(PizzaTwo, 8200);
				setTimeout(Donut, 9200);
				setTimeout(Inner, 10200);
				setTimeout(PizzaLast, 11200);
			}
			else if(event.skill == CAGES[2]){				
				setTimeout(PizzaTwo, 6200);
				setTimeout(Inner, 7200);
				setTimeout(Donut, 8200);
				setTimeout(PizzaOne, 9200);
				setTimeout(PizzaLast, 10200);
			}
			else if(event.skill == CAGES[3]){				
				setTimeout(Inner, 6200);
				setTimeout(PizzaOne, 7200);
				setTimeout(PizzaTwo, 8200);
				setTimeout(Donut, 9200);
				setTimeout(PizzaLast, 10200);
			}
		}
    });
	
	function SpawnMarker(degrees, radius) {
	let r = null, rads = null, finalrad = null, spawnx = null, spawny = null, pos = null;
	r = (currentLocation.w / 0x8000) * Math.PI;
	rads = (degrees * Math.PI/180);
	finalrad = r - rads;
	spawnx = currentLocation.x + radius * Math.cos(finalrad);
    spawny = currentLocation.y + radius * Math.sin(finalrad);
	pos = {x:spawnx,y:spawny};
		return pos;
	}
	
	function PizzaOne(){
		SpawnThing(SpawnMarker(17,150));
		SpawnThing(SpawnMarker(75,150));
		SpawnThing(SpawnMarker(133,150));
		SpawnThing(SpawnMarker(195,150));
		SpawnThing(SpawnMarker(318,150));
		SpawnThing(SpawnMarker(253,150));
	}
	
	function PizzaTwo(){
		SpawnThing(SpawnMarker(47,150));
		SpawnThing(SpawnMarker(105,150));
		SpawnThing(SpawnMarker(163,150));
		SpawnThing(SpawnMarker(225,150));
		SpawnThing(SpawnMarker(348,150));
		SpawnThing(SpawnMarker(283,150));
	}
	
	function PizzaLast(){
		SpawnThing(SpawnMarker(285,150));
		SpawnThing(SpawnMarker(105,150));
		SpawnThing(SpawnMarker(17,150));
		SpawnThing(SpawnMarker(195,150));
	}
	
	function Donut(){ //todo fix this shit, works tho
		SpawnThing(SpawnMarker(160,75));
		SpawnThing(SpawnMarker(80,75));
		SpawnThing(SpawnMarker(40,75));
		SpawnThing(SpawnMarker(0,75));
		SpawnThing(SpawnMarker(0,-75));
		SpawnThing(SpawnMarker(160,-75));
		SpawnThing(SpawnMarker(80,-75));
		SpawnThing(SpawnMarker(40,-75));
	}
	
	function Inner(){ //todo fix this shit, works tho
		SpawnThing(SpawnMarker(160,275));
		SpawnThing(SpawnMarker(80,275));
		SpawnThing(SpawnMarker(40,275));
		SpawnThing(SpawnMarker(0,275));
		SpawnThing(SpawnMarker(0,-275));
		SpawnThing(SpawnMarker(160,-275));
		SpawnThing(SpawnMarker(80,-275));
		SpawnThing(SpawnMarker(40,-275));
	}

	function SpawnThing(position){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
			uid : uid,
			item : 151,
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
	
	/* To use item instead of collection just uncomment this block
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
	*/

}
