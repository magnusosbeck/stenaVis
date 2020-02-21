import Vehicle from "./Vehicle.js";
import simulatorSetup from "./Simulator.js";


// setup simulation
var mySim = simulatorSetup;
var renderer = mySim.renderer;
var scene = mySim.scene;
var camera = mySim.camera;
mySim.lights.forEach((light) => scene.add(light));
mySim.objects.forEach((obj) => scene.add(obj));
//-----


// Add cars to simulation
const carbatchNumber = 20;
var cars = [];
for (var i = 0; i < carbatchNumber; i++){
	var car = new Vehicle()
	car.position.x = 13 * i;
	cars.push(car);
	scene.add(car);
	scene.add(car.space);
	
	var node = document.createElement("span");                 // Create a <li> node
	var textnode = document.createTextNode(JSON.stringify('#' + i + ' ' + car.reqSpace.story));         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	document.getElementById("info").appendChild(node);  
	
}

console.log(cars)

//-----




var carCounter = 1;
/*for(var posX = 0; posX < 6; posX++){
	for(var posZ = 0; posZ < 8; posZ++){
		cars[carCounter].position.x = (4100/300 * posX);
		cars[carCounter].position.z = (8200/300 * posZ);
		scene.add(cars[carCounter]);
		carCounter++;
	}
}
*/

var controls = new THREE.DragControls(cars, camera, renderer.domElement);
/*
function onDocumentMouseMove (event){
	console.log('banan')
	console.log(event);
}
controls.addEventListener('mousemove', onDocumentMouseMove, true);
*/






// Add text to sumulation
//document.getElementById("info").innerHTML = 'RoPax packing game - ' + (posX) + ' Lanes, ' + (posZ) + ' Stacked cars per lane, Total ' + carCounter + ' cars';



// Render Simulation
renderer.render(scene, camera);

var animate = function () {
	cars.forEach((car) => {
		car.position.y = car.size.height/2;
		car.space.position.y = car.size.height/2;
		car.space.position.x = (car.position.x + car.space.size.offsetX);
		car.space.position.z = (car.position.z + car.space.size.offsetZ);
	});
	
	
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
};
animate();
//----