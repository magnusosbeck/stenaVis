var simulatorSetup = function (){
    var simObj = {
        renderer : {},
        scene : {},
        camera : {},
        lights : [],
        objects : []
        }

    const brightness = 0.5
    const backgroundColor = new THREE.Color("rgb(46, 46, 46)");
    const groundColor = new THREE.Color("rgb(150, 150, 150)");
    


    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild( renderer.domElement );
    simObj.renderer = renderer;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor)
    simObj.scene = scene;

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 2000 );
    simObj.camera = camera;

    var light = new THREE.DirectionalLight( 'white', brightness * 1.8, 3000 );
    light.castShadow = true;   
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(200,1,500,2000));         // default false
    light.shadow.radius = 0;
    light.shadow.bias = 0.000001;
    light.shadow.mapSize.width = 2048 * 2;  // default
    light.shadow.mapSize.height = 2048 * 2; // default
    light.shadow.camera.near = 0.5;    // default
    light.shadow.camera.far = 500;     // default
    simObj.lights.push(light)


    var ambLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
    simObj.lights.push(ambLight)


    //Create a plane that receives shadows (but does not cast them)
    var planeGeometry = new THREE.BoxGeometry( 90, 10, 230);
    var planeMaterial = new THREE.MeshLambertMaterial( { color: groundColor } )
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.x = 35;
    plane.position.z = 95;
    plane.position.y = -5;
    plane.receiveShadow = true;
    simObj.objects.push(plane)


    // Light position setup
    light.position.y = 200;
    light.position.x = plane.position.x
    light.position.z = plane.position.z
    light.lookAt(plane.position);


    // Camera position setup
    camera.position.y = 170;
    camera.position.z = plane.position.z + 50;
    camera.position.x = plane.position.x + 120;
    camera.lookAt(plane.position);
    camera.lookAt(plane.position);

    return simObj;
}

export default simulatorSetup();





