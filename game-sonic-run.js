// import './libs/weapp-adapter/index'
// import './js/libs/weapp-adapter'
// import 'game-digger'

// import Main from './js/main'


//import './libs/weapp-adapter/index'
// import './libs/symbol'
// import * as THREE from './libs/threejs/three.min'
// import './libs/threejs/controls/OrbitControls'
// import './libs/threejs/plugins/PostProcessing'
// import './libs/threejs/plugins/GLTFLoader'
// import './libs/threejs/plugins/OBJLoader'


// import { TimelineMax, Power4, Power2, TweenLite, Elastic, TweenMax } from './libs/tweenmax'
// import Music from './js/music'

//低端设备iPhone5s比较卡
//todo:  声音！  特效！ 模型！排行榜
//录视频

//后续：小程序的域名qcloud、发布 周期

//小细节：多次点击、兼容性、性能、模型预加载
//公司的代理可能无法访问腾讯云
//近期：logo替换   rank
// const ring = wx.createAudioContext(audioid, this)
// let audioMan = new Music();
// this = window;
// this.ring = wx.createInnerAudioContext();
// let ring = new Audio();
// this.ring.src = "res/ring.mp3"; // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
let BLOOM_CNT = 30;//bloom持续时间
let MAX_BLOOM_STRENGTH = 0.9;//bloom max
let bloomCounter = 0;

// let controls = new THREE.OrbitControls(camera);

THREE.StereoEffect = function (renderer) {

  var _stereo = new THREE.StereoCamera();
  _stereo.aspect = 0.5;

  this.setEyeSeparation = function (eyeSep) {

    _stereo.eyeSep = eyeSep;

  };

  this.setSize = function (width, height) {

    renderer.setSize(width, height);

  };

  this.render = function (scene, camera) {

    scene.updateMatrixWorld();

    if (camera.parent === null) camera.updateMatrixWorld();

    _stereo.update(camera);

    var size = renderer.getSize();

    if (renderer.autoClear) renderer.clear();
    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, size.width / 2, size.height);
    renderer.setViewport(0, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraL);

    renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
    renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraR);

    renderer.setScissorTest(false);

  };

};

// import {noise} from './libs/noise'
// import * as noise from './libs/noise'

// import  './libs/particulate'

// let Particulate = global.Particulate;
// console.error(noise);
// console.log(noise);

//===================================================== full screen
var requestFullscreen = function(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};
var exitFullscreen = function(ele) {
  if (ele.exitFullscreen) {
    ele.exitFullscreen();
  } else if (ele.webkitExitFullscreen) {
    ele.webkitExitFullscreen();
  } else if (ele.mozCancelFullScreen) {
    ele.mozCancelFullScreen();
  } else if (ele.msExitFullscreen) {
    ele.msExitFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};
//===================================================== add canvas
var bloomPass;
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xd8e7ff, 0);
document.body.appendChild(renderer.domElement);
console.log(renderer.domElement);
console.log(renderer.domElement.width);
let width = window.innerWidth;
let height = window.innerHeight;
console.log(width+":"+height);
renderer.domElement.width = width;
renderer.domElement.height = height;
//===================================================== resize
window.addEventListener("resize", function() {
  
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
//===================================================== add Scene
let scene = new THREE.Scene();
//==============================飞机======================= add plane

var planeGroup = new THREE.Object3D();
var bladeGroup = new THREE.Object3D();
// bladeGroup.add(planeGroup);
// scene.add(planeGroup);

var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xf2ff0a });
// var planeMaterialBlack = new THREE.MeshLambertMaterial({ color: 0x000000 });
var planeMaterialBlack = new THREE.MeshLambertMaterial({ color: 0xeeaaee });
var planeBody = new THREE.CylinderGeometry(0.8, 0.5, 3, 10);
var planeTail = new THREE.CylinderGeometry(0.5, 0.1, 1.2, 10);
var planeTailWing = new THREE.CubeGeometry(3, 0.2, 0.5);
var planeFront = new THREE.CubeGeometry(1, 1, 1);
var planeRotorMiddle = new THREE.SphereGeometry(0.5, 10, 1);
var planeRotorBlade = new THREE.CubeGeometry(4, 0.2, 0.5);
var planeRotorBlade2 = new THREE.CubeGeometry(4, 0.2, 0.5);
var wing1 = new THREE.CubeGeometry(0.1, 1.5, 6);
var wing2 = new THREE.CubeGeometry(0.1, 1.5, 6);
var string = new THREE.CubeGeometry(0.2, 0.2, 1.6);
var string1 = new THREE.CubeGeometry(0.2, 0.2, 1.6);
var planeRotorBlade = new THREE.Mesh(planeRotorBlade, planeMaterialBlack);
var planeRotorBlade2 = new THREE.Mesh(planeRotorBlade2, planeMaterialBlack);

var string = new THREE.Mesh(string, planeMaterialBlack);
var string1 = new THREE.Mesh(string1, planeMaterialBlack);
var wing1 = new THREE.Mesh(wing1, planeMaterial);
var wing2 = new THREE.Mesh(wing2, planeMaterial);
var planeRotorMiddle = new THREE.Mesh(planeRotorMiddle, planeMaterial);
var planeFront = new THREE.Mesh(planeFront, planeMaterial);
var planeBody = new THREE.Mesh(planeBody, planeMaterial);
var planeTail = new THREE.Mesh(planeTail, planeMaterial);
var planeTailWing = new THREE.Mesh(planeTailWing, planeMaterial);

planeFront.position.y = 1.5;
planeRotorMiddle.position.y = 2;
planeRotorBlade.position.y = 2.1;
planeRotorBlade.rotation.y = 0.5 * Math.PI;
planeRotorBlade2.position.y = 2.1;
planeRotorBlade2.rotation.y = 15;
wing1.rotation.y = 0.5 * Math.PI;
wing2.rotation.y = 0.5 * Math.PI;
wing2.position.z = -1.5;
string.position.x = -2.2;
string.position.z = -0.75;
string1.position.x = 2.2;
string1.position.z = -0.75;
planeTail.position.y = -2.1;
planeTailWing.position.y = -2;
planeTailWing.rotation.x = 0.5 * Math.PI;


planeGroup.position.x = -10;
planeGroup.position.y = 20;
planeGroup.position.z = 10;

bladeGroup.add(planeRotorBlade);
bladeGroup.add(planeRotorBlade2);

planeGroup.add(wing1);
planeGroup.add(wing2);
planeGroup.add(bladeGroup);
// planeGroup.rotation.x = Math.PI / 2;
planeGroup.add(planeBody);
planeGroup.add(planeFront);
planeGroup.add(planeRotorMiddle);
planeGroup.add(string);
planeGroup.add(string1);
planeGroup.add(planeTail);
planeGroup.add(planeTailWing);

// planeGroup.rotation.y = -Math.PI / 2;
// planeGroup.rotation.z = -Math.PI / 2;
planeGroup.scale.multiplyScalar(1/8);
// planeGroup.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), -0.5 * Math.PI);
// scene.add(planeGroup);


//===================================================== add plane
//===================================================== add Camera
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
let cameraTarget = new THREE.Vector3(0, 0, 0);
//===================================================== add Group sonic 模型
var group = new THREE.Group();
scene.add(group);
//===================================================== add Controls
var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
//How far you can orbit vertically, upper and lower limits. The maximum is Pi / 2 (90deg). You wont see below the below the line of the horizon
controls.maxPolarAngle = Math.PI / 2.1;
//===================================================== add VR
console.log(window.devicePixelRatio);
//renderer.setPixelRatio(1.5); //VR
var effect = new THREE.StereoEffect(renderer); //VR
effect.setSize(window.innerWidth, window.innerHeight); //VR

var VR = false;
function toggleVR() {
  if (VR) {
    VR = false;
    controls = new THREE.OrbitControls(camera);
  } else {
    VR = true;
    controls = new THREE.DeviceOrientationControls(camera);
    requestFullscreen(document.documentElement);
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//===================================================== curve points exported from blender using python
var points = [

  [1.8117204904556274, 5.987488269805908, 0.29106736183166504],
  [6.005367279052734, 1.7647128105163574, -1.5591322183609009],
  [1.435487985610962, -6.016839504241943, 2.1336286067962646],
  [-4.118395805358887, -6.886471271514893, -0.7294682264328003],
  [-4.732693195343018, 3.405961036682129, 3.1304938793182373],
  [8.304193496704102, 7.593861103057861, 0.3412821292877197],
  [8.038525581359863, -4.391696453094482, 2.687108278274536],
  [1.488401174545288, -9.993440628051758, -2.2956111431121826],
  [-5.277090549468994, -8.481210708618164, -0.719127893447876],
  [-7.250330448150635, -0.9653520584106445, -0.3089699447154999],
  [-6.526705741882324, 5.678538799285889, 0.15560221672058105],
  [-0.885545015335083, 6.678538799285889, 1.5724562406539917],
  [1.614454984664917, 5.678538799285889, 0.24559785425662994],
  [1.8117204904556274, 5.987488269805908, 0.29106736183166504]
  
];

var scale = 5;

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0] * scale;
  var y = points[i][1] * scale;
  var z = points[i][2] * scale;
  points[i] = new THREE.Vector3(x, z, -y);
}

//Create a path from the points
var carPath = new THREE.CatmullRomCurve3(points);
var radius = 0.25;

var geometry = new THREE.TubeGeometry(carPath, 600, radius, 10, false);

//Set a different color on each face
for (var i = 0, j = geometry.faces.length; i < j; i++) {
  geometry.faces[i].color = new THREE.Color(
    "hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)"
  );
}

var material = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  vertexColors: THREE.FaceColors,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 1
});
var tube = new THREE.Mesh(geometry, material);
scene.add(tube);

//===================================================== add lighta
var light = new THREE.DirectionalLight(0xefefff, 1.25);
light.position.set(1, 1, 1).normalize();
scene.add(light);
var light = new THREE.DirectionalLight(0xffefef, 1.25);
light.position.set(-1, -1, -1).normalize();
scene.add(light);

//Create a point light in our scene. Makes everything gloomy
var light = new THREE.PointLight(0xffffff, 1, 100);
scene.add(light);

//===================================================== particles
var mergedGeometry = new THREE.Geometry();

var boxGeometry = new THREE.TetrahedronGeometry(0.25, 0);

var material = new THREE.MeshNormalMaterial({
  color: new THREE.Color("white")
});
var maxCount = 500;
for (var i = 0; i < maxCount; i++) {
  var x = Math.random() * 125 - 75;
  var y = Math.random() * 125 - 75;
  var z = Math.random() * 125 - 75;

  boxGeometry.translate(x, y, z);

  mergedGeometry.merge(boxGeometry);

  boxGeometry.translate(-x, -y, -z);
}

var cubes = new THREE.Mesh(mergedGeometry, material);
scene.add(cubes);

//===================================================== Loader
//3d model from https://sketchfab.com/models/ab92d9b324724e18968377264d05774d

//  "https://raw.githubusercontent.com/baronwatts/models/master/sky-island.glb",

var loader = new THREE.GLTFLoader();
var model;
loader.load(
  // "models/sky-island.bin",
  "sky-island.glb",
// "https://gitee.com/crystalocean/3D-Face-Reconstruction/raw/master/sky-island.glb",
  function(gltf) {
    gltf.scene.traverse(function(node) {
      if (node instanceof THREE.Mesh) {
        // node.castShadow = true;
        node.material.side = THREE.DoubleSide;
      }
    });

    model = gltf.scene;
    model.scale.set(3, 3, 3);
    model.position.set(0, -20, -10);
    //model.rotateY(Math.PI);
    scene.add(model);
  }
);

//===================================================== Loader
//3d model from https://3dwarehouse.sketchup.com/user/0438052632930067253040161/wingedkoopa67?nav=models
var clock = new THREE.Clock();
var mixer = null;
var firstObject;
var loader = new THREE.GLTFLoader();

loader.load(
//   "https://wx01-1258189739.cos.ap-shanghai.myqcloud.com/sonic.bin",

  "sonic.bin",
  function(gltf) {
    gltf.scene.traverse(function(node) {
      if (node instanceof THREE.Mesh) {
        // node.castShadow = true;
        node.material.side = THREE.DoubleSide;
      }
    });

    firstObject = gltf.scene;
    firstObject.scale.set(0.65, 0.65, 0.65);
    group.add(firstObject);

    console.log(gltf.animations); //shows all animations imported into the dopesheet in blender

    mixer = new THREE.AnimationMixer(firstObject);
    mixer.clipAction(gltf.animations[0]).play();

     document.body.addEventListener("click", jump);
    //wx.onTouchEnd(jump);
    function jump() {
      console.log(down);
      mixer.clipAction(gltf.animations[0]).stop();
      mixer.clipAction(gltf.animations[1]).play();
      setTimeout(function() {
        mixer.clipAction(gltf.animations[1]).stop();
        mixer.clipAction(gltf.animations[0]).play();
      }, 900);
    }
  }
);

//===================================================== add model
var size = 0.05;
var meshList = [];

// THREE.OBJ
var jnjlogo, dabaoLogo;
var objLoader = new THREE.OBJLoader();
// objLoader.setMaterials(materials);
// objLoader.setPath("models/");
// objLoader.load("models/j&j2.obj", function (object3d) {
objLoader.load("j&j2.obj", function (object3d) {
  object3d.scale.multiplyScalar(1/28);
  object3d.rotation.x += 1;
  // object3d.rotation.y += 0.3;
  object3d.rotation.z -= 0.3;
  // console.log("car loaded");
  // console.log(typeof object3d);
  // console.log(object3d.children[0].material.color);
  // object3d.children[0].material.color.setRGB(1,0,0 ); 
  // object3d.children[1].material.color.setRGB(1,0,0 ); 
  // object3d.children[2].material.color.setRGB(1,0,0 ); 
  // object3d.children[3].material.color.setRGB(1,0,0 ); 
  for(var i=0; i<object3d.children.length; i++){
    var obj = object3d.children[i];
    obj.material.color.setRGB(1, 0, 0); 
  }
  // console.log(object3d instanceof THREE.Object3D);
  scene.add(object3d);
  // object3d.position.z -= 11;
  jnjlogo = object3d;
  // for (var i=1; i < meshList.length; i += 2) {
  //   var yelring = meshList[i];
  //   var newlogo = object3d.clone();
  //   scene.add(newlogo);
  //   newlogo.position.copy(yelring.position);
  // }
  // if(meshList[0]){
  //   var ringobj = meshList[0];
  //   object3d.position.copy(ringobj.position);
  // }
}, null, null);

// objLoader.load("models/dabao.obj", function (object3d) {
objLoader.load("dabao2.obj", function (object3d) {
  object3d.scale.multiplyScalar(9);
  // object3d.rotation.x += 1;
  object3d.rotation.y += 0.4;
  // object3d.rotation.z += 1;
  // console.log("car loaded");
  // console.log(typeof object3d);
  // console.log(object3d.children[0].material.color);
  object3d.children[0].material.color.setRGB(1, 0, 0);
  // object3d.children[1].material.color.setRGB(1, 0, 0);
  // object3d.children[2].material.color.setRGB(1, 0, 0);
  // object3d.children[3].material.color.setRGB(1, 0, 0);
  // console.log(object3d instanceof THREE.Object3D);
  // scene.add(object3d);
  // object3d.position.z -= 11;
  dabaoLogo = object3d;
  for(var i=0; i < meshList.length; i+=1){
    var yelring = meshList[i];
    var newlogo = object3d.clone();
    scene.add(newlogo);
    newlogo.position.copy(yelring.position);
  }
  // if(meshList[0]){
  //   var ringobj = meshList[0];
  //   object3d.position.copy(ringobj.position);
  // }
}, null, null);

// console.log(carPath.points.length);
for (var i = 0; i < carPath.points.length; i++) {
  var x = carPath.points[i].x;
  var y = carPath.points[i].y;
  var z = carPath.points[i].z;

  var geometry = new THREE.TorusGeometry(3, 0.5, 8, 50);
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color("yellow")
  });
  var secondObject = new THREE.Mesh(geometry, material);
  secondObject.position.set(x, y + 0.75, z);
  secondObject.scale.set(size, size, size);
  //yellow ring
  meshList.push(secondObject);
  // scene.add(secondObject);
}



//===================================================== Collision Detection
function PlaySound() {
  // bflat.play();
  // ring.currentTime = 0
//   audioMan.playRing();

  bloomPass.strength = MAX_BLOOM_STRENGTH;
  bloomCounter = BLOOM_CNT;
}

//calculate distance of the main object
var firstBB = new THREE.Box3().setFromObject(group);
var secondBB;
//calculate distance for all other objects
for (var i = 0; i < meshList.length; i++) {
  secondBB = new THREE.Box3().setFromObject(meshList[i]);
}

var count = 0;
function hit() {
  //recalculate distance for the main object
  firstBB = new THREE.Box3().setFromObject(group);
  //recalcuate distance for all the other objects
  for (var i = 0; i < meshList.length; i++) {
    secondBB = new THREE.Box3().setFromObject(meshList[i]);

    if (firstBB.intersectsBox(secondBB)) {
      PlaySound();
      // meshList[i].rotation.y 
      
      /*
info.style.color = "hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)";
      info.innerHTML =
        Math.random() > 0.25
          ? "Superb!"
          : Math.random() > 0.25 ? "Oustanding!" : "Awesome!";

      TweenLite.to(info, 0.75, {
        css: { fontSize: "50px", opacity: 1 },
        ease: Power4.easeOut,
        onComplete: function() {
          TweenLite.to(info, 0.75, {
            css: { fontSize: "14px", opacity: 0 },
            ease: Power4.easeOut
          }); //end tween
        } //end onComplete
      }); //end tween
      */

    } //end if
  } //end for
} //end hit

//===================================================== bloom
var renderScene = new THREE.RenderPass(scene, camera);
var shaderActive = "none";
// var gui = new dat.GUI();
// dat.GUI.toggleHide();
var composer;

var parameters = {
  x: 0,
  y: 30,
  z: 0,
  bloomStrength: 0.4,
  bloomRadius: 0.9,
  bloomThreshold: 0.45,
  useShaderNone: function() {
    setupShaderNone();
  },
  useShaderBloom: function() {
    setupShaderBloom();
  }
};

// gui.add(parameters, "useShaderNone").name("Display Original Scene");

// var folderBloom = gui.addFolder("Bloom");
// var bloomStrengthGUI = folderBloom
//   .add(parameters, "bloomStrength")
//   .min(0.0)
//   .max(2.0)
//   .step(0.01)
//   .name("Strength")
//   .listen();
// bloomStrengthGUI.onChange(function(value) {
//   setupShaderBloom();
// });
// var bloomRadiusGUI = folderBloom
//   .add(parameters, "bloomRadius")
//   .min(0.0)
//   .max(5.0)
//   .step(0.01)
//   .name("Radius")
//   .listen();
// bloomRadiusGUI.onChange(function(value) {
//   setupShaderBloom();
// });
// var bloomThresholdGUI = folderBloom
//   .add(parameters, "bloomThreshold")
//   .min(0)
//   .max(0.99)
//   .step(0.01)
//   .name("Threshold")
//   .listen();
// bloomThresholdGUI.onChange(function(value) {
//   setupShaderBloom();
// });
// folderBloom.add(parameters, "useShaderBloom").name("Use Bloom Shader");
// folderBloom.open();

//===================================================== functions

function setupShaderNone() {
  shaderActive = "none";
}

function setupShaderBloom() {
  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));

  /*unreal bloom*/
  var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );

  var copyShader = new THREE.ShaderPass(THREE.CopyShader);
  copyShader.renderToScreen = true;

  bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    parameters.bloomStrength,
    parameters.bloomRadius,
    parameters.bloomThreshold
  );
  // console.log(bloomPass.strength);
  composer = new THREE.EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.addPass(renderScene);
  composer.addPass(effectFXAA);
  composer.addPass(bloomPass);
  composer.addPass(copyShader);
  shaderActive = "bloom";
}

//渲染
//todo {制作lowpoly的人物模型-适应低端机型}
//不用composer时会shader报错。
//吸铁石、关卡、爆炸
//奖品
function isShaderActive() {
  if (shaderActive == "none") {
    renderer.render(scene, camera);
  } else {
    // renderer.render(scene, camera);
    composer.render();
  }
}

//active bloom on load
setupShaderBloom();

//===================================================== Animate
var percentage = 0;
var prevTime = Date.now();
var down;
function POV() {
  //bloom取消
if(bloomCounter > 0){
  bloomCounter--;
if(bloomCounter <= 0){
  bloomPass.strength = 0.4;
}
}

  //加速
  percentage += 0.00015;
  // percentage += 0.00045;
  var p1 = carPath.getPointAt(percentage % 1);
  var p2 = carPath.getPointAt((percentage + 0.01) % 1);
  var p3 = carPath.getPointAt((percentage + 0.01 / 2) % 1);
  var p4 = carPath.getPointAt((percentage + 0.01 / 4) % 1);

  camera.lookAt(p2);
  
//sonic 的位置
  group.position.set(p3.x, p3.y + 0.25, p3.z);
  group.lookAt(p2);
  camera.position.x = p4.x + 2;
  camera.position.y = p4.y + 1;
  camera.position.z = p4.z + 2;
  camera.lookAt(group.position);

  planeGroup.position.copy(group.position);
    planeGroup.position.y += 0.33;
    //胡乱抖动
    // let down = planeGroup.localToWorld(new THREE.Vector3(0, -1, 0));
    // planeGroup.rotation.copy(group.rotation);
    down = group.localToWorld(new THREE.Vector3(0, 2, 0));

    // planeGroup.position.set(p3.x, p3.y + 0.25, p3.z);
    //正反?如果是90垂直，lookat怎么旋转
    planeGroup.lookAt(down);
    // planeGroup.lookAt(p2);

    // planeGroup.rotation.x += 0.4 * Math.PI;

  // planeGroup.rotation.z -= 0.5 * Math.PI;//z-axis is along the path

  bladeGroup.rotation.y += 0.3;

  if (jnjlogo) {
    // jnjlogo.position.copy(p2);
    jnjlogo.position.copy(group.position);
    // jnjlogo.lookAt(camera);
  }
  if (dabaoLogo) {
    // jnjlogo.position.copy(p2);
    dabaoLogo.position.copy(group.position);
    dabaoLogo.position.z -= 1;
    // dabaoLogo.lookAt(camera);

  }
}

function animate() {
  POV();
  hit();
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);

  //VR
  if (VR) {
    effect.render(scene, camera);
  } else {
    //renderer.render( scene, camera );
    isShaderActive();
  }

  requestAnimationFrame(animate);
  controls.update();
}
animate();

//set camera position
camera.position.x = 40;
camera.position.y = 50;
camera.position.z = 50;
