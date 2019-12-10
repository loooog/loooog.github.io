// import './libs/weapp-adapter/index'
// import './libs/symbol'

// import 'three.52.js'
// import * as THREE from 'three.52.js'
// import './libs/AudioObject'
// import './libs/threejs/plugins/PostProcessing'
// console.log(THREE.AudioObject);
// import './libs/threejs/controls/OrbitControls'

// import TWEEN from './libs/tween'

// var container, meshes, pointCloud;

// var camera, scene, renderer;
// var depthMaterial, depthTarget, composer, ssao, fxaa;

// var has_gl = false;

// var delta;
// var time;
// var oldTime;

// var effectThreshold;
// var materialDepth;
// var thresholdTarget;
// var depthScale = 1.0;
var container;

var camera, scene, renderer;
var composer;

var has_gl = false;

var delta;
var time;
var oldTime;

var world;
var array = [];

var uniforms;
var attributes;

var ribbonArray = [];

var mouseX = 0;
var mouseY = 0;
var imageW, imageH, lineGeometry, vertex2

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('touchmove', onTouchMove, false);


loadImage();

function loadImage() {

  var img = new Image();
  console.log("img");
  console.log(img);
  img.onload = function () {

    // canvas
    var imgCanvas = document.createElement("canvas");
    console.log("imgCanvas");
    console.log(imgCanvas);
    console.log(this.width);
    imgCanvas.width = this.width;
    imgCanvas.height = this.height;

    var context = imgCanvas.getContext("2d");
    context.drawImage(this, 0, 0);

    imageW = imgCanvas.width;
    imageH = imgCanvas.height;

    //data
    var pixels = context.getImageData(0, 0, imageW, imageH).data;
    console.log(pixels.length)
    var index = 0;
    var modCount = 0;
    for (var x = 0; x < imageW; ++x) {
      for (var y = 0; y < imageH; ++y) {
        var r = pixels[index];
        var g = pixels[index + 1];
        var b = pixels[index + 2];
        var a = pixels[index + 3];

        index = (x * 4) + y * (4 * imageW);

        var sum = r + g + b;

        if (sum > 100) {
          var value = { x: x - imageW / 2, y: y - imageH / 2, scale: sum, mod: modCount, delay: 1.0 - x / imageW };
          array.push(value);
        };
      }
      ++modCount;
    }

    init();
    animate()
  };
  img.src = "map_small.jpg";
  img.crossOrigin = "anonymous";

}

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 30, 290);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  // camera.position.z = 200;
  camera.position.z = -200;
  camera.lookAt(scene.position);
  scene.add(camera);

  world = new THREE.Object3D();
  world.rotation.y = Math.PI - 0.4;
  scene.add(world);

  var worldContainer = new THREE.Object3D();
  worldContainer.rotation.x = -Math.PI / 2;
  world.add(worldContainer);

  var radius = 100;

  var geometry = new THREE.Geometry();
  var colors = [];

  var w_step = Math.PI * 2 / 256;
  var h_step = Math.PI / 128;

  for (i = 0; i < array.length; i++) {

    var yy = 0;
    if (array[i].mod % 2 == 0) {
      yy = 0.5;
    };

    var x = array[i].x * w_step;
    var y = (array[i].y - yy) * h_step;
    var s = array[i].scale / (255 * 3);

    var vertex1 = new THREE.Vector3();
    vertex1.x = radius * Math.cos(y) * Math.cos(x);
    vertex1.y = radius * Math.cos(y) * Math.sin(x);
    vertex1.z = radius * -Math.sin(y);

    geometry.vertices.push(vertex1);

  }

  attributes = {

    size: { type: 'f', value: [] },
    time: { type: 'f', value: [] },
    customColor: { type: 'c', value: [] }

  };

  uniforms = {

    color: { type: "c", value: new THREE.Color(0xffffff) },
    globalTime: { type: "f", value: 2.4 },
    texture: { type: "t", value: THREE.ImageUtils.loadTexture("dot.png") },

  };

  var material = new THREE.ShaderMaterial({

    uniforms: uniforms,
    attributes: attributes,
    vertexShader: `
    attribute float size;
			attribute vec3 customColor;
			attribute float time;
			uniform float globalTime;

			varying vec3 vColor;
			varying float fAlpha;

			void main() {

				vColor = customColor;

				vec3 pos = position; 

				float animTime = min(1.4, max(1.0, globalTime - time));

				vec3 animated = vec3( pos.x * animTime, pos.y * animTime, pos.z * animTime );

				vec4 mvPosition = modelViewMatrix * vec4( animated, 1.0 );

				fAlpha = 1.0 - (globalTime*0.5);

				gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );

				gl_Position = projectionMatrix * mvPosition;

			}
    `,
    fragmentShader: `
    uniform vec3 color;
			uniform sampler2D texture;

			varying vec3 vColor;
			varying float fAlpha;

			void main() {

				// fog
				float depth = gl_FragCoord.z / gl_FragCoord.w;
				float near = 30.0;
				float far = 290.0;
				float fog = 0.0 + smoothstep( near, far, depth );

				vec4 outColor = texture2D( texture, gl_PointCoord );
				if ( outColor.a < 0.25 ) discard; // alpha be gone

				gl_FragColor = vec4( color * vColor, fAlpha );
				gl_FragColor = gl_FragColor * outColor;
				gl_FragColor = mix( gl_FragColor, vec4( vec3(0.0,0.0,0.0), gl_FragColor.w ), fog );

			}
    `,

    blending: THREE.NormalBlending,
    depthTest: true,
    transparent: true

  });

  var vertices = geometry.vertices;
  var values_size = attributes.size.value;
  var values_time = attributes.time.value;
  var values_color = attributes.customColor.value;

  var colors = [new THREE.Color(0x587f52), new THREE.Color(0xabb7aa), new THREE.Color(0x0a0d09), new THREE.Color(0x4e8342), new THREE.Color(0x818e7f)];

  console.log(vertices.length + " : " + array.length)
  console.log(attributes)

  for (var v = 0; v < vertices.length; v++) {

    values_size[v] = 1.0 + Math.random() * 3.0;
    values_color[v] = colors[Math.floor(Math.random() * colors.length)];
    values_time[v] = array[v].delay;

  }

  var particles = new THREE.ParticleSystem(geometry, material);
  worldContainer.add(particles);

  // lines
  lineGeometry = new THREE.Geometry();


  for (i = 0; i < array.length; i++) {

    if (Math.random() > 0.985) {

      var vertex1 = geometry.vertices[i].clone();

      if (vertex1.z < -90 || vertex1.z > 90) { continue };

      vertex2 = vertex1.clone();
      vertex2.multiplyScalar(1.1);

      lineGeometry.vertices.push(vertex1);
      lineGeometry.vertices.push(vertex2);

    };

  }

  var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.0, linewidth: 1.0 });

  // var line = new THREE.Line(lineGeometry, lineMaterial, THREE.LinePieces);
  var line = new THREE.Line(lineGeometry, lineMaterial, THREE.LineSegments);
  worldContainer.add(line);

  // outer particles
  var particleGeometry = new THREE.Geometry();

  for (var i = 0; i < lineGeometry.vertices.length; i++) {

    if (i % 2 == 1 && Math.random() > 0.5) {
      var vertex = lineGeometry.vertices[i].clone();
      vertex.multiplyScalar(1.02);
      particleGeometry.vertices.push(vertex);
    };
  };

  var outerMaterial = new THREE.ParticleBasicMaterial({ map: THREE.ImageUtils.loadTexture("hex.png"), opacity: 0.0, size: 3, transparent: true, alphaTest: 0.5 });

  var outerParticles = new THREE.ParticleSystem(particleGeometry, outerMaterial);
  worldContainer.add(outerParticles);

  // ribbons
  for (var k = 0; k < 14; k++) {
    var ribbon = new THREE.Geometry();
    var colors = [];
    for (i = 0; i < 50; i++) {

      ribbon.vertices.push(new THREE.Vector3());

      var color = new THREE.Color(0xffffff);
      color.setHSV(0.15, 0.6, 1.0 - (i / 50));
      // color.setHSL(0.15, 0.6, 1.0 - (i / 50));
      colors.push(color);

    }

    ribbon.colors = colors;

    var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3, vertexColors: THREE.VertexColors });

    var ribbonMesh = new THREE.Line(ribbon, material);
    ribbon.dynamic = true;
    ribbonMesh.frustumCulled = false;
    // worldContainer.add(ribbonMesh);

    ribbonArray.push({ geometry: ribbon, mesh: ribbonMesh, id: k, startPoint: null, endPoint: null, currentPoint: null, animationTime: 0 });

    startLineAnimation(k, 3000 + (k * 200));
  };


  var animTween = new TWEEN.Tween(uniforms.globalTime)
    .to({ value: 0.0 }, 4000)
    .easing(TWEEN.Easing.Linear.EaseNone)
    .delay(100);
  animTween.start();

  var lineTween = new TWEEN.Tween(lineMaterial)
    .to({ opacity: 1.0 }, 2000)
    .easing(TWEEN.Easing.Linear.EaseNone)
    .delay(1500)
  lineTween.start();

  outerParticles.scale.set(0.9, 0.9, 0.9);
  var outerTween = new TWEEN.Tween(outerParticles.scale)
    .to({ x: 1, y: 1, z: 1 }, 3000)
    .easing(TWEEN.Easing.Elastic.EaseOut)
    .delay(2500)
  outerTween.start();

  var outerAlphaTween = new TWEEN.Tween(outerMaterial)
    .to({ opacity: 1.0 }, 3000)
    .easing(TWEEN.Easing.Linear.EaseNone)
    .delay(1000)
  outerAlphaTween.start();


  try {
    // renderer
    // renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // THREEx.WindowResize(renderer, camera);
    
    // update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    container.appendChild(renderer.domElement);
    has_gl = true;
  }
  catch (e) {
    // need webgl
    // document.getElementById('info').innerHTML = "<P><BR><B>Note.</B> You need a modern browser that supports WebGL for this to run the way it is intended.<BR>For example. <a href='http://www.google.com/landing/chrome/beta/' target='_blank'>Google Chrome 9+</a> or <a href='http://www.mozilla.com/firefox/beta/' target='_blank'>Firefox 4+</a>.<BR><BR>If you are already using one of those browsers and still see this message, it's possible that you<BR>have old blacklisted GPU drivers. Try updating the drivers for your graphic card.<BR>Or try to set a '--ignore-gpu-blacklist' switch for the browser.</P><CENTER><BR><img src='../general/WebGL_logo.png' border='0'></CENTER>";
    // document.getElementById('info').style.display = "block";
    return;
  }

}

function startLineAnimation(id, delay) {

  var o = ribbonArray[id];

  var index = Math.floor(Math.random() * lineGeometry.vertices.length / 2) * 2;
  o.startPoint = lineGeometry.vertices[index].clone();
  var index = Math.floor(Math.random() * lineGeometry.vertices.length / 2) * 2;
  o.endPoint = lineGeometry.vertices[index].clone();

  var distance = o.startPoint.distanceTo(o.endPoint);
  var time = Math.max(3000, (distance * 40));

  o.currentPoint = o.startPoint.clone();

  o.animationTime = 0;

  var d = delay || 0;

  var timeTween = new TWEEN.Tween(o)
    .to({ animationTime: 0.35 }, time)
    .easing(TWEEN.Easing.Sinusoidal.EaseIn)
    .delay(d)
    .onComplete(function () {
      setTimeout(startLineAnimation(id, 200 + Math.random() * 300), 1500);
    }
    );
  timeTween.start();

  for (var i = 0; i < o.geometry.vertices.length; i++) {
    o.geometry.vertices[i] = o.currentPoint.clone();
  };

  o.geometry.verticesNeedUpdate = true;

}

function runLineAnimations() {
  for (var k = 0; k < ribbonArray.length; k++) {
    var o = ribbonArray[k];

    o.currentPoint.lerpSelf(o.endPoint, o.animationTime);
    var lng = 110;

    for (var i = 0; i < o.geometry.vertices.length; i++) {
      if (i == 0) {
        o.geometry.vertices[i] = o.currentPoint.clone().setLength(lng);
      } else {
        o.geometry.vertices[i].lerpSelf(o.geometry.vertices[i - 1], 0.35).setLength(lng);
      };
    };

    o.geometry.verticesNeedUpdate = true;

  };

}

function onDocumentMouseMove(event) {

  var windowHalfX = window.innerWidth >> 1;
  var windowHalfY = window.innerHeight >> 1;

  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);

}

function onTouchMove(event) {
  event.preventDefault();

  var windowHalfX = window.innerWidth >> 1;
  var windowHalfY = window.innerHeight >> 1;

  mouseX = (event.touches[0].clientX - windowHalfX) * -1;
  mouseY = (event.touches[0].clientY - windowHalfY) * -1;

}

function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {
  // console.log(1)

  time = new Date().getTime();
  delta = time - oldTime;
  oldTime = time;

  if (isNaN(delta) || delta > 1000 || delta == 0) {
    delta = 1000 / 60;
  }

  camera.position.y += (-150 * Math.sin(mouseY / 500) - camera.position.y) / 10;

  camera.lookAt(scene.position);

  world.rotation.y -= mouseX / 20000;

  // TWEEN.update();

  runLineAnimations();

  if (has_gl) {
    renderer.render(scene, camera);
  }

}