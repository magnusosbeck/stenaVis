var sizeRegister = [
    {model:'Mini car', color: new THREE.Color("rgb(209, 119, 208)"), width: 1665+1780/2, height:1414+1578/2, length:3821+4084/2},
    {model:'Family car', color: new THREE.Color("rgb(119, 164, 209)"), width: 1810+1910/2, height:1418+1575/2, length:4425+4726/2},
    {model:'Compact SUV', color: new THREE.Color("rgb(119, 209, 123)"), width: 1790+1925/2, height:1494+1740/2, length:4255+4735/2},
    {model:'Compact SUV', color: new THREE.Color("rgb(46, 58, 148)"), width: 1760+2008/2, height:1623+2035/2, length:4662+5130/2},
    {model:'Pickup', color: new THREE.Color("rgb(35, 37, 54)"), width: 1760+2008/2, height:1775+1815/2, length:5205+5632/2}
]





var counter = 0;
export default class Vehicle{
    
    wColor = "red"
    
    constructor(){
        var modelFromList = this.getRandomModel();
        var scaleFactor = 300;
        var spaceFactor = 1000 / scaleFactor; 

        var randomWireColor = 'white'

        var vehicleSize = {
            width : (modelFromList.width / scaleFactor), 
            height : (modelFromList.height / scaleFactor), 
            length : (modelFromList.length / scaleFactor),
        }
        var vehicleGeometry = new THREE.BoxGeometry(vehicleSize.width, vehicleSize.height, vehicleSize.length);
        var vehicleMaterial = new THREE.MeshLambertMaterial( {color: modelFromList.color, wireframe:false} );
        var vehicle = new THREE.Mesh(vehicleGeometry, vehicleMaterial );
        vehicle.castShadow = true; //default is false
        vehicle.receiveShadow = true; //default



        var reqSpace = this.getRandomRequirements();
        
        var spaceSize = {
            width : (modelFromList.width / scaleFactor) + ((reqSpace.left * spaceFactor) + (reqSpace.right * spaceFactor)), 
            height : (modelFromList.height / scaleFactor), 
            length : (modelFromList.length / scaleFactor) + ((reqSpace.front * spaceFactor) + (reqSpace.back * spaceFactor)),
            offsetX : reqSpace.offsetX * spaceFactor,
            offsetZ : reqSpace.offsetZ * spaceFactor
        }
        var spaceGeometry2 = new THREE.BoxGeometry(spaceSize.width, spaceSize.height, spaceSize.length);
        var spaceMaterial = new THREE.MeshBasicMaterial( {wireframe: true, color: randomWireColor } );
        var space = new THREE.Mesh(spaceGeometry2, spaceMaterial );
        
        
        vehicle.size = vehicleSize;
        space.size = spaceSize;
        vehicle.space = space;
        reqSpace.story = modelFromList.model + ': ' + reqSpace.story;
        vehicle.reqSpace = reqSpace;

        return vehicle;
    }
    getRandomModel(){
        return sizeRegister[this.getRandomInt(0, 5)]
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    getRandomRequirements(){
        // Example
        /*
        console.log(Math.random() >= 0.1) // %90 probability of get "true"
        console.log(Math.random() >= 0.4) // %60 probability of get "true"
        console.log(Math.random() >= 0.5) // %50 probability of get "true"
        console.log(Math.random() >= 0.8) // %20 probability of get "true"
        console.log(Math.random() >= 0.9) // %10 probability of get "true"
        */
        var req = {
            driver: 1,
            frontPassanger: Math.random() >= 0.5,
            backPassanger: Math.random() >= 0.5,
            accesToFront : Math.random() >= 0.9,
            accessToTrunk : Math.random() >= 0.8
        }
        /*var req = {
            driver: 0,
            frontPassanger: 0,
            backPassanger: 1,
            accesToFront : 0,
            accessToTrunk : 0
        }*/
        
        var res = {
            left : 0,
            front : 0,
            right : 0,
            back : 0,
            offsetX : 0,
            offsetZ : 0,
            story : ''  
        }
        if(req.driver){
            res.left = 1;
            res.story += 'Driver, '
        }
        if(req.frontPassanger){
            res.right = 1;
            res.story += 'F.Passenger, '
        }
        if(req.backPassanger){
            res.left = 1;
            res.story += 'B.Passenger, '
        }
        if(req.accesToFront){
            res.front = 1;
            res.story += 'F.Trunk, '
        }
        if(req.accessToTrunk){
            res.back = 1;
            res.story += 'B.Trunk, '
        }

        if(res.left && !res.right){
            res.offsetX = 1;    
        }
        if(res.left && res.right){
            res.offsetX = 0;    
        }

        if(res.front && !res.back){
            res.offsetZ = 1;    
        }
        if(res.back && !res.front){
            res.offsetZ = -1;    
        }

        

        return res;

    }
}

