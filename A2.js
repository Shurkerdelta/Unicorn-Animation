//////////////////////////////////////////////////////////////////
// UBC CPSC 314 (2017_W2)
// Assignment 2:  coding
/////////////////////////////////////////////////////////////////


// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff); // white background colour
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8,3,10);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////

function loadOBJ(objName, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function() {
    console.log('Failed to load ' + file);
  };
  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.name = objName;
    scene.add(object);

  }, onProgress, onError);
}

////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////

  // FLOOR WITH CHECKERBOARD 

var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);
var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x=-70;
light.position.y=100;
light.position.z=70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var brownMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x402020, color: 0x806060, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( { 
    ambient: 0x404040, color: 0x808080, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading
});
var emarldMaterial = new THREE.MeshPhongMaterial({
    ambient: 0x404040, color: 0xFF00FF, specular: 0x808080, shininess: 80.0, shading: THREE.SmoothShading
});
var normalMaterial = new THREE.MeshNormalMaterial();


  // Sphere

var sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
var whiteSphere = new THREE.Mesh( sphereGeometry, whiteMaterial );
scene.add( whiteSphere );
whiteSphere.position.set(3,1,0);

var legLength = 1.0
var legLenFrontUpper = legLength * 0.5;
var legLenFrontMiddle = legLength * 0.4;
var legLenFrontLower = legLength * 0.3;
var legAngle = 40;       // animation parameter
var legOffAngle = 40;
var legMiddleAngle = 40;
var legLowerAngle = 40;

var legGeometry = new THREE.BoxGeometry(0.1, legLength, 0.1);

var hoofGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.1);
var hornGeometry = new THREE.CylinderGeometry(0, 0.04, 0.3);

var legUpperFrontGeometry = new THREE.CylinderGeometry(0.13,0.08,0.55);
var legMiddleFrontGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.5);
var legLowerFrontGeometry = new THREE.CylinderGeometry(0.06, 0.04, 0.2);

var legHipBackGeometry = new THREE.CylinderGeometry(0.13, 0.1, 0.4);
var legUpperBackGeometry = new THREE.CylinderGeometry(0.1, 0.08, 0.25);
var legMiddleBackGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.4);
var legLowerBackGeometry = new THREE.CylinderGeometry(0.06, 0.04, 0.2);

var maneGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);

// Horn
var horn = new THREE.Mesh(hornGeometry, emarldMaterial);
scene.add(horn);
horn.matrixAutoUpdate = false;

// Mane
var flicker = true;
var mane = new THREE.Mesh(maneGeometry, emarldMaterial);
scene.add(mane);
mane.matrixAutoUpdate = false;

// Eyes
var eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);
var eyeLeft = new THREE.Mesh(eyeGeometry, brownMaterial);
scene.add(eyeLeft);
eyeLeft.matrixAutoUpdate = false;
var eyeRight = new THREE.Mesh(eyeGeometry, brownMaterial);
scene.add(eyeRight);
eyeRight.matrixAutoUpdate = false;

// Front Left Leg

//var legAngle = 30;       // animation parameter
//var legGeometry = new THREE.BoxGeometry(0.1, legLength, 0.1);
var legUpperFL = new THREE.Mesh(legUpperFrontGeometry, normalMaterial);
scene.add(legUpperFL);
legUpperFL.matrixAutoUpdate = false;

var legMiddleFL = new THREE.Mesh(legMiddleFrontGeometry, normalMaterial);
scene.add(legMiddleFL);
legMiddleFL.matrixAutoUpdate = false;

var legLowerFL = new THREE.Mesh(legLowerFrontGeometry, normalMaterial);
scene.add(legLowerFL);
legLowerFL.matrixAutoUpdate = false;

var legHoofFL = new THREE.Mesh(hoofGeometry, whiteMaterial);
scene.add(legHoofFL);
legHoofFL.matrixAutoUpdate = false;

// Front Right Leg

//var legAngle = 30;       // animation parameter
//var legGeometry = new THREE.BoxGeometry(0.1, legLength, 0.1);
var legUpperFR = new THREE.Mesh(legUpperFrontGeometry, normalMaterial);
scene.add(legUpperFR);
legUpperFR.matrixAutoUpdate = false;

var legMiddleFR = new THREE.Mesh(legMiddleFrontGeometry, normalMaterial);
scene.add(legMiddleFR);
legMiddleFR.matrixAutoUpdate = false;

var legLowerFR = new THREE.Mesh(legLowerFrontGeometry, normalMaterial);
scene.add(legLowerFR);
legLowerFR.matrixAutoUpdate = false;

var legHoofFR = new THREE.Mesh(hoofGeometry, whiteMaterial);
scene.add(legHoofFR);
legHoofFR.matrixAutoUpdate = false;

 // Back Left Leg

//var legAngle = 30;       // animation parameter
//var legGeometry = new THREE.BoxGeometry(0.1, legLength, 0.1);
var legHipBL = new THREE.Mesh(legHipBackGeometry, normalMaterial);
scene.add(legHipBL);
legHipBL.matrixAutoUpdate = false;

var legUpperBL = new THREE.Mesh(legUpperBackGeometry, normalMaterial);
scene.add(legUpperBL);
legUpperBL.matrixAutoUpdate = false;

var legMiddleBL = new THREE.Mesh(legMiddleBackGeometry, normalMaterial);
scene.add(legMiddleBL);
legMiddleBL.matrixAutoUpdate = false;

var legLowerBL = new THREE.Mesh(legLowerBackGeometry, normalMaterial);
scene.add(legLowerBL);
legLowerBL.matrixAutoUpdate = false;

var legHoofBL = new THREE.Mesh(hoofGeometry, whiteMaterial);
scene.add(legHoofBL);
legHoofBL.matrixAutoUpdate = false;

 // Back Right Leg

//var legAngle = 30;       // animation parameter
//var legGeometry = new THREE.BoxGeometry(0.1, legLength, 0.1);
var legHipBR = new THREE.Mesh(legHipBackGeometry, normalMaterial);
scene.add(legHipBR);
legHipBR.matrixAutoUpdate = false;

var legUpperBR = new THREE.Mesh(legUpperBackGeometry, normalMaterial);
scene.add(legUpperBR);
legUpperBR.matrixAutoUpdate = false;

var legMiddleBR = new THREE.Mesh(legMiddleBackGeometry, normalMaterial);
scene.add(legMiddleBR);
legMiddleBR.matrixAutoUpdate = false;

var legLowerBR = new THREE.Mesh(legLowerBackGeometry, normalMaterial);
scene.add(legLowerBR);
legLowerBR.matrixAutoUpdate = false;

var legHoofBR = new THREE.Mesh(hoofGeometry, whiteMaterial);
scene.add(legHoofBR);
legHoofBR.matrixAutoUpdate = false;



  // Body

loadOBJ('body','horseC/horse_low_poly_torso_with_tail.obj',normalMaterial,1,0,0,0,0,0,0);

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) {       // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}

//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////

var bodyHeight = 0;
var horseFacing = 0;
var moveX = 0;
var moveZ = 0;
var dirShift = 0;
var tiltHorseAngle = 0;
var leanHorseAngle = 0;

function setupBody(parentMatrix) {
//  printMatrix("body parent",parentMatrix);
  body.matrix.copy(parentMatrix);     // copy the parent link transformation
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(0,bodyHeight,0));        // post multiply by translate matrix
  //body.matrix.multiply(new THREE.Matrix4().makeRotationX(-3.0*Math.PI/180.0));      // took out cause it caused
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(moveX, 0, moveZ));

  var turnHorse = horseFacing + dirShift;
  body.matrix.multiply(new THREE.Matrix4().makeRotationY(turnHorse * Math.PI / 180.0));
  body.matrix.multiply(new THREE.Matrix4().makeRotationX(tiltHorseAngle * Math.PI / 180.0));
  body.matrix.multiply(new THREE.Matrix4().makeRotationY(leanHorseAngle * Math.PI / 180.0));

    //Headish
  setupHorn(body.matrix);
  setUpMane(body.matrix);
  setUpEyes(body.matrix);

    //Legs
  setupLegFR(body.matrix);           // draw children, i.e., attached objects
  setupLegFL(body.matrix);
  setupLegBR(body.matrix);
  setupLegBL(body.matrix);
  body.matrix.multiply(new THREE.Matrix4().makeScale(0.3,0.3,0.3));   // post multiply by scale matrix, to scale down body geometry
  body.updateMatrixWorld();         // force update of internal body.matrixWorld
}

//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////

var legAngle = -15;
var legFrontLeftAngle = 5;
var legMiddleLeftAngle = 0;
var legLowerLeftAngle = -30;
var legFrontRightAngle = 5;
var legMiddleRightAngle = 0;
var legLowerRightAngle = -30;

var tiltLeftHoof = 0;
var tiltLeftShoulder = 0;

var legOffAngle = -15;
var manetiltY = -5;
var manetiltX = 0;
var manetiltZ = 0;

function setupHorn(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    horn.matrix.copy(parentMatrix);     // copy the parent link transformation
    horn.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 2.01, 1.1));              // post multiply by translate matrix
    horn.matrix.multiply(new THREE.Matrix4().makeRotationX(45 * Math.PI / 180.0));           // post multiply by rotation matrix
    horn.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 0.05, 0.1));              // post multiply by translate matrix
    horn.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setUpEyes(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    eyeLeft.matrix.copy(parentMatrix);     
    eyeLeft.matrix.multiply(new THREE.Matrix4().makeTranslation(0.11, 1.75, 1.05));              
    eyeLeft.updateMatrixWorld();

    eyeRight.matrix.copy(parentMatrix);
    eyeRight.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.11, 1.75, 1.05));
    eyeRight.updateMatrixWorld();
}

function setUpMane(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    mane.matrix.copy(parentMatrix);     // copy the parent link transformation
    mane.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 1.6, 0.2));              // post multiply by translate matrix
    mane.matrix.multiply(new THREE.Matrix4().makeRotationX(60 * Math.PI / 180.0));           // post multiply by rotation matrix
    mane.matrix.multiply(new THREE.Matrix4().makeTranslation(0, 0.4, 0.06));              // post multiply by translate matrix
    mane.matrix.multiply(new THREE.Matrix4().makeRotationY(manetiltY * Math.PI / 180.0));
    mane.matrix.multiply(new THREE.Matrix4().makeRotationX(manetiltX * Math.PI / 180.0));
    mane.matrix.multiply(new THREE.Matrix4().makeRotationZ(manetiltZ * Math.PI / 180.0));
    horn.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupLegFR(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legUpperFR.matrix.copy(parentMatrix);     // copy the parent link transformation
  legUpperFR.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.2,1.0,0.5));              // post multiply by translate matrix
  legUpperFR.matrix.multiply(new THREE.Matrix4().makeRotationX(legFrontRightAngle*Math.PI/180.0));           // post multiply by rotation matrix
  legUpperFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.15*legLength,0));              // post multiply by translate matrix
  legUpperFR.updateMatrixWorld();         // force update of internal body.matrixWorld

  legMiddleFR.matrix.copy(legUpperFR.matrix);
  legMiddleFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
  legMiddleFR.matrix.multiply(new THREE.Matrix4().makeRotationX(legMiddleRightAngle * Math.PI / 180.0));
  legMiddleFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.25 * legLength, 0));
  legMiddleFR.updateMatrixWorld();

  legLowerFR.matrix.copy(legMiddleFR.matrix);
  legLowerFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
  legLowerFR.matrix.multiply(new THREE.Matrix4().makeRotationX(legLowerRightAngle * Math.PI / 180.0));
  legLowerFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05 * legLength, 0));
  legLowerFR.updateMatrixWorld();

  legHoofFR.matrix.copy(legLowerFR.matrix);
  legHoofFR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.1, -0.04));
  legHoofFR.matrix.multiply(new THREE.Matrix4().makeRotationX(30 * Math.PI / 180.0));
  legHoofFR.updateMatrixWorld();
}

function setupLegFL(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    legUpperFL.matrix.copy(parentMatrix);     // copy the parent link transformation
    legUpperFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0.2, 1.0, 0.5));              // post multiply by translate matrix
    legUpperFL.matrix.multiply(new THREE.Matrix4().makeRotationX(legFrontLeftAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    legUpperFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.15 * legLength, 0));              // post multiply by translate matrix
    legUpperFL.matrix.multiply(new THREE.Matrix4().makeRotationZ(tiltLeftShoulder * Math.PI / 180.0));
    legUpperFL.updateMatrixWorld();         // force update of internal body.matrixWorld

    legMiddleFL.matrix.copy(legUpperFL.matrix);
    legMiddleFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legMiddleFL.matrix.multiply(new THREE.Matrix4().makeRotationX(legMiddleLeftAngle * Math.PI / 180.0));
    legMiddleFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.25 * legLength, 0));
    legMiddleFL.updateMatrixWorld();

    legLowerFL.matrix.copy(legMiddleFL.matrix);
    legLowerFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legLowerFL.matrix.multiply(new THREE.Matrix4().makeRotationX(legLowerLeftAngle * Math.PI / 180.0));
    legLowerFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05 * legLength, 0));
    legLowerFL.matrix.multiply(new THREE.Matrix4().makeRotationZ(tiltLeftHoof * Math.PI / 180.0));
    legLowerFL.updateMatrixWorld();

    legHoofFL.matrix.copy(legLowerFL.matrix);
    legHoofFL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.1, -0.04));
    legHoofFL.matrix.multiply(new THREE.Matrix4().makeRotationX(30 * Math.PI / 180.0));
    legHoofFL.updateMatrixWorld();
}

var legHipRightAngle = 0;
var legBackUpperRightAngle = 25;
var legBackMiddleRightAngle = -25;
var legBackLowerRightAngle = -25;

var legHipLeftAngle = 0;
var legBackUpperLeftAngle = 25;
var legBackMiddleLeftAngle = -25;
var legBackLowerLeftAngle = -25;

var legBackOutRightAngle = 0;
var legBackOutLeftAngle = 0;


function setupLegBR(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    legHipBR.matrix.copy(parentMatrix);     // copy the parent link transformation
    legHipBR.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.2, 0.9, -0.5));              // post multiply by translate matrix
    legHipBR.matrix.multiply(new THREE.Matrix4().makeRotationX(legHipRightAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    legHipBR.matrix.multiply(new THREE.Matrix4().makeRotationZ(legBackOutRightAngle * Math.PI / 180.0));
    //legHipBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.1 * legLength, 0));              // post multiply by translate matrix
    legHipBR.updateMatrixWorld();         // force update of internal body.matrixWorld

    legUpperBR.matrix.copy(legHipBR.matrix);     // copy the parent link transformation
    legUpperBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.15, 0));              // post multiply by translate matrix
    legUpperBR.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackUpperRightAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    legUpperBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.1 * legLength, 0));              // post multiply by translate matrix
    legUpperBR.updateMatrixWorld();         // force update of internal body.matrixWorld

    legMiddleBR.matrix.copy(legUpperBR.matrix);
    legMiddleBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legMiddleBR.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackMiddleRightAngle * Math.PI / 180.0));
    legMiddleBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.12 * legLength, 0));
    legMiddleBR.updateMatrixWorld();

    legLowerBR.matrix.copy(legMiddleBR.matrix);
    legLowerBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legLowerBR.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackLowerRightAngle * Math.PI / 180.0));
    legLowerBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05 * legLength, 0));
    legLowerBR.updateMatrixWorld();

    legHoofBR.matrix.copy(legLowerBR.matrix);
    legHoofBR.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05, -0.04));
    legHoofBR.matrix.multiply(new THREE.Matrix4().makeRotationX(30 * Math.PI / 180.0));
    legHoofBR.updateMatrixWorld();

}

function setupLegBL(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    legHipBL.matrix.copy(parentMatrix);     // copy the parent link transformation
    legHipBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0.2, 0.9, -0.5));              // post multiply by translate matrix
    legHipBL.matrix.multiply(new THREE.Matrix4().makeRotationX(legHipLeftAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    legHipBL.matrix.multiply(new THREE.Matrix4().makeRotationZ(legBackOutLeftAngle * Math.PI / 180.0));
    //egHipBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.5 * legLength, 0));              // post multiply by translate matrix
    legHipBL.updateMatrixWorld();         // force update of internal body.matrixWorld

    legUpperBL.matrix.copy(legHipBL.matrix);     // copy the parent link transformation
    legUpperBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.15, 0));              // post multiply by translate matrix
    legUpperBL.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackUpperLeftAngle * Math.PI / 180.0));           // post multiply by rotation matrix
    legUpperBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.1 * legLength, 0));              // post multiply by translate matrix
    legUpperBL.updateMatrixWorld();         // force update of internal body.matrixWorld

    legMiddleBL.matrix.copy(legUpperBL.matrix);
    legMiddleBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legMiddleBL.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackMiddleLeftAngle * Math.PI / 180.0));
    legMiddleBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.12 * legLength, 0));
    legMiddleBL.updateMatrixWorld();

    legLowerBL.matrix.copy(legMiddleBL.matrix);
    legLowerBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.2, 0));
    legLowerBL.matrix.multiply(new THREE.Matrix4().makeRotationX(legBackLowerLeftAngle * Math.PI / 180.0));
    legLowerBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05 * legLength, 0));
    legLowerBL.updateMatrixWorld();

    legHoofBL.matrix.copy(legLowerBL.matrix);
    legHoofBL.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.05, -0.04));
    legHoofBL.matrix.multiply(new THREE.Matrix4().makeRotationX(30 * Math.PI / 180.0));
    legHoofBL.updateMatrixWorld();

}

//////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

function updateWorld() {
  var modelMatrix = new THREE.Matrix4();
  modelMatrix.identity();
    // only start the matrix setup if the 'body' object has been loaded
  if (body != undefined) {   
    setupBody(modelMatrix);     
  }
}

//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
var mode = 0;
var changedDir = false;
var resetForAnimation = true;
var legSpeed = 6;
var canChangeSpeed = true;
var speedAroundSphere = 1;



function checkKeyboard() {
   body = scene.getObjectByName( 'body' );
   if (body != undefined) {
     body.matrixAutoUpdate = false;
   }

  for (var i=0; i<6; i++)
  {
    if (keyboard.pressed(i.toString()))
    {
      mode = i;
      break;
    }
  }
  switch(mode)
  {
    //add poses here:
      case 0:     // pose: laydown
          headAngle = 0;
          
          legHipRightAngle = -100;
          legBackUpperRightAngle = 45;
          legBackMiddleRightAngle = -45;
          legBackLowerRightAngle = 0;

          legBackOutRightAngle = -30;

          legHipLeftAngle = -100;
          legBackUpperLeftAngle = 45;
          legBackMiddleLeftAngle = -45;
          legBackLowerLeftAngle = 0;

          legBackOutLeftAngle = 30;

          legFrontLeftAngle = -80;
          legMiddleLeftAngle = 150;
          legLowerLeftAngle = 0;

          legFrontRightAngle = -60;
          legMiddleRightAngle = 150;
          legLowerRightAngle = 0;

          bodyHeight = -0.65;
          tiltHorseAngle = 0;
          leanHorseAngle = 0;
          tiltLeftHoof = 0;
          tiltLeftShoulder = 0;

          resetForAnimation = true;

        
      break;     
    case 1:       // pose: rearing up
        headAngle = -20;

        legHipRightAngle = 45;
        legBackUpperRightAngle = 45;
        legBackMiddleRightAngle = -60;
        legBackLowerRightAngle = -22;

        legBackOutLeftAngle = 0;
        legBackOutRightAngle = 0;
       

        legHipLeftAngle = 45;
        legBackUpperLeftAngle = 45;
        legBackMiddleLeftAngle = -60;
        legBackLowerLeftAngle = -22;


        legFrontLeftAngle = -90;
        legMiddleLeftAngle = 45;
        legLowerLeftAngle = 10;

        legFrontRightAngle = -75;
        legMiddleRightAngle = 90;
        legLowerRightAngle = 45;

        tiltHorseAngle = -45;
        leanHorseAngle = 0;
        tiltLeftHoof = 0;
        tiltLeftShoulder = 0;

        bodyHeight = 0.55;

        resetForAnimation = true;
      break;
    case 2:       // pose: headstand
        headAngle = 30;

        legHipRightAngle = 45;
        legBackUpperRightAngle = 45;
        legBackMiddleRightAngle = -60;
        legBackLowerRightAngle = -22;

        legBackOutLeftAngle = -20;
        legBackOutRightAngle = -30;


        legHipLeftAngle = 45;
        legBackUpperLeftAngle = 45;
        legBackMiddleLeftAngle = -60;
        legBackLowerLeftAngle = -22;


        legFrontLeftAngle = -90;
        legMiddleLeftAngle = 0;
        legLowerLeftAngle = 0;

        legFrontRightAngle = -75;
        legMiddleRightAngle = 90;
        legLowerRightAngle = 45;

        tiltHorseAngle = 60;
        leanHorseAngle = -30;
        tiltLeftHoof = 15;
        tiltLeftShoulder = 15;


        bodyHeight = 0.8;

        resetForAnimation = true;
      break;
    case 3:      {     // animation
        var t = clock.getElapsedTime();
        var s = 0;
        var o = 0;
        var adjustForLegDiff = Math.PI / 8;
        

        //Horse running around ball

        if (dirShift == 0) {
            if (horseFacing >= 360) {
                horseFacing = 0;
            } else {
                horseFacing = horseFacing + speedAroundSphere;
            }
            moveX = Math.cos(horseFacing * Math.PI / 180.0) * -3 + 3;
            moveZ = Math.sin(horseFacing * Math.PI / 180.0) * 3;
        } else {
            if (horseFacing <= -360) {
                horseFacing = 0;
            } else {
                horseFacing = horseFacing - speedAroundSphere;
            }
            moveX = Math.cos(horseFacing * Math.PI / 180.0) * -3 + 3;
            moveZ = Math.sin(horseFacing * Math.PI / 180.0) * 3;
        }

        legAngle = 30 * Math.sin(legSpeed * t) + 10;
        
        s = legSpeed * t - (0.5 * Math.PI);
        o = legSpeed * t - Math.PI;
        var frontLeftt = legSpeed * t - adjustForLegDiff;
        var frontLeftS = legSpeed * t - (0.5 * Math.PI) - adjustForLegDiff;

        // Front Left
        legFrontLeftAngle = 40 * Math.sin(frontLeftt) - 10;
        if (Math.sin(frontLeftS) > 0) {
            legMiddleLeftAngle = 90 * Math.sin(frontLeftS);
        } else {
            legMiddleLeftAngle = 0;
        }
        legLowerLeftAngle = 40 * Math.sin(s);


        // Front Right
        legFrontRightAngle = 40 * Math.sin(legSpeed * t) - 10;
        if (Math.sin(s) > 0) {
            legMiddleRightAngle = 90 * Math.sin(s);
        } else {
            legMiddleRightAngle = 0;
        }
        legLowerRightAngle = 40 * Math.sin(s);



        //Back roughly should be pi/2 behind
        var backt = legSpeed * t + (Math.PI * +0.25);
        var backs = legSpeed * t + (0.5 * Math.PI);
        var backLeftt = legSpeed * t + (Math.PI * +0.25) - adjustForLegDiff;
        var backLeftO = legSpeed * t - Math.PI - adjustForLegDiff;

        legHipRightAngle = 40 * Math.sin(backt) - 20;
        if (Math.sin(backLeftO) < 0) {
            legBackUpperRightAngle = -90 * Math.sin(backLeftO);
            legBackMiddleRightAngle = 90 * Math.sin(backLeftO);
        } else {
            legBackUpperRightAngle = 0;
            legBackMiddleRightAngle = 0;
        }
        legBackLowerRightAngle = 45 * Math.sin(backt);


        legHipLeftAngle = 40 * Math.sin(backLeftt) - 20;
        if (Math.sin(o) < 0) {
            legBackUpperLeftAngle = -90 * Math.sin(o);
            legBackMiddleLeftAngle = 90 * Math.sin(o);
        } else {
            legBackUpperLeftAngle = 0;
            legBackMiddleLeftAngle = 0;
        }
        legBackLowerLeftAngle = 45 * Math.sin(backLeftt);


        bodyHeight = -0.1 * Math.sin(legSpeed * t);
        legOffAngle = 30 * Math.sin(legSpeed * s) + 10;
        manetiltY = 10 * Math.sin(legSpeed * t);
        manetiltX = 2 * Math.cos(legSpeed * t);
        manetiltZ = 5 * Math.sin(o);

        if (resetForAnimation) {
            changedDir = false;
            legBackOutLeftAngle = 0;
            legBackOutRightAngle = 0;
            tiltHorseAngle = 0;
            leanHorseAngle = 0;
            tiltLeftHoof = 0;
            tiltLeftShoulder = 0;
            canChangeSpeed = true;
        }

        //TODO:manetilt in y and z about x axises
        //TODO: Want all four legs in proper motion in this order, FL FR BL BR
        //TODO: all parts of legs independent
        
      }
      camera.matrixAutoUpdate = true;
      break;
      case 4:
          if (!changedDir) {
              if (dirShift == 0) {
                  dirShift = 180;
              } else {
                  dirShift = 0;
              }
              changedDir = true;
              resetForAnimation = true;
          }

          mode = 3;
          break;
      case 5:
          if (canChangeSpeed) {
              if (legSpeed == 9) {
                  legSpeed = 0;
                  speedAroundSphere = 0;
              }
              legSpeed = legSpeed + 3;
              speedAroundSphere++;
              canChangeSpeed = false;
              resetForAnimation = true;
          }

          mode = 3;

          break;
    default:
      break;
  }
}

//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
  renderer.render(scene, camera);
}

update();     // launch an infinite drawing loop
