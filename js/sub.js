import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const raycaster = new THREE.Raycaster();
renderer.setSize(window.innerWidth,window.innerHeight);

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const baseColorTexture = textureLoader.load('/js/texture/B_b.jpg');
// const heightMapTexture = textureLoader.load('/js/texture/B_h.png');
const normalMapTexture = textureLoader.load('/js/texture/B_n.jpg');
const aoTexture = textureLoader.load('/js/texture/B_ao.jpg');
// const RoughMapTexture = textureLoader.load('/js/texture/C_r.jpg');
const specMap = textureLoader.load('/js/texture/B_s.jpg');
const displacementMapTexture = textureLoader.load('/js/texture/B_d.png')

let count = 0;
document.body.appendChild(renderer.domElement);

const mouse = new THREE.Vector2();

camera.position.z = 5;

document.addEventListener('mousemove', onDocumentMouseMove);

document.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

const ball = new THREE.BoxGeometry(1,1,1);
const geometry = new THREE.TorusKnotBufferGeometry(14, 2, 1024, 20,6, 9);
baseColorTexture.repeat.set(20, 20);
baseColorTexture.wrapS = THREE.RepeatWrapping;
baseColorTexture.wrapT = THREE.RepeatWrapping;

specMap.repeat.set(20, 20);
specMap.wrapS = THREE.RepeatWrapping;
specMap.wrapT = THREE.RepeatWrapping;

normalMapTexture.repeat.set(20, 20);
normalMapTexture.wrapS = THREE.RepeatWrapping;
normalMapTexture.wrapT = THREE.RepeatWrapping;

aoTexture.repeat.set(20, 20);
aoTexture.wrapS = THREE.RepeatWrapping;
aoTexture.wrapT = THREE.RepeatWrapping;

displacementMapTexture.repeat.set(20, 20);
displacementMapTexture.wrapS = THREE.RepeatWrapping;
displacementMapTexture.wrapT = THREE.RepeatWrapping;

const uv = [];

for (let i = 0; i < geometry.attributes.position.count; i++) {
  const x = geometry.attributes.position.getX(i);
  const y = geometry.attributes.position.getY(i);
  const z = geometry.attributes.position.getZ(i);

  const u = x/28+0.4
  const v = z / 28 + 0.4;

  uv.push(u, v);
}

geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2));

const whiteMat = new THREE.MeshBasicMaterial({color: 0xafd3fd});


const material = new THREE.MeshStandardMaterial({
  map: baseColorTexture,
//   displacementMap: heightMapTexture,
//   displacementScale: 1,
  normalMap: normalMapTexture,
  normalScale: new THREE.Vector2(1, 1),
  aoMap: aoTexture,
//   roughnessMap: RoughMapTexture,
  displacementMap: displacementMapTexture,
  displacementScale:0.1,
  spectecularMap: specMap
  
});


  
var cube = new THREE.Mesh ( geometry, whiteMat );
// var thisObj = new THREE.Mesh(ball, material );
// material.color.set('rgb(255,115,0)')
// thisObj.scale.set(0.3,0.3,0.3);

scene.add(cube );
// scene.add(thisObj);


// loader.load(
//   'sword.glb', 
//   function ( gltf ) {
// 	const animation = gltf.animations[0];
	
// 	const mixer = new THREE.AnimationMixer(gltf.scene);
// 	// const active = new THREE.AnimationAction()
// 	const action = mixer.clipAction(animation);
// 	console.log(action)
	
// 	// startIt.play();

//     // obj = gltf.scene
//     // obj.position.set(0,0,2);
// 	gltf.scene.scale.set(1,1,1);
 

//     scene.add( gltf.scene );
//   }
// );




var ambientLight = new THREE.AmbientLight ( 0xffffff, 1)
scene.add( ambientLight )


// point light
var pointLight = new THREE.PointLight( 0xffffff, 0.9 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );


// function colors(){
// 	// console.log(count)
// 	if (count==1){
	
// 	for (let i = 0; i<2;i++){
// 		material.color.set(Math.random() * 0xffffff ); 
// 	  }
//   }
// }

function render() {

let status = false;

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	// console.log(intersects)



// if(intersects.length !=0 && status == false){
// 	count++;
// 	material.opacity.set(0.5)
// 	status = true;
// } else{
// material.color.setRGB(40,40,40)
// status = false;
// count =0;
// 	}
}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {
	requestAnimationFrame( animate )
	// thisObj.position.set(mouse.x, mouse.y,4);
	cube.rotation.x += mouse.y/1200;
	cube.rotation.y -= mouse.x/1200;
	// wireframeCube.rotation.x += mouse.x/40;
	// wireframeCube.rotation.y -= mouse.y/40;
	// pin.rotation.x += mouse.x/40;
	// pin.rotation.y -= mouse.y/40;
	renderer.render( scene, camera );
	window.requestAnimationFrame(render);


	
}

animate()