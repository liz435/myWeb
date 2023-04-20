import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




function initJs(){
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const raycaster = new THREE.Raycaster();
renderer.setSize(window.innerWidth, window.innerHeight);
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const baseColorTexture = textureLoader.load('/js/texture/L_b.jpg');
const heightMapTexture = textureLoader.load('/js/texture/L_h.png');
const normalMapTexture = textureLoader.load('/js/texture/L_n.jpg');
const aoTexture = textureLoader.load('/js/texture/L_ao.jpg');
const RoughMapTexture = textureLoader.load('/js/texture/L_r.jpg');
const eMapTexture = textureLoader.load('/js/texture/L_e');
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
const geometry = new THREE.TorusKnotBufferGeometry(15,0.9, 1024, 30,6, 10);
const k = 1;
const l = 1;

}


function texture(){
    baseColorTexture.repeat.set(k, l);
baseColorTexture.wrapS = THREE.RepeatWrapping;
baseColorTexture.wrapT = THREE.RepeatWrapping;

heightMapTexture.repeat.set(k, l);
heightMapTexture.wrapS = THREE.RepeatWrapping;
heightMapTexture.wrapT = THREE.RepeatWrapping;

normalMapTexture.repeat.set(k, l);
normalMapTexture.wrapS = THREE.RepeatWrapping;
normalMapTexture.wrapT = THREE.RepeatWrapping;

aoTexture.repeat.set(k, l);
aoTexture.wrapS = THREE.RepeatWrapping;
aoTexture.wrapT = THREE.RepeatWrapping;

RoughMapTexture.repeat.set(k, l);
RoughMapTexture.wrapS = THREE.RepeatWrapping;
RoughMapTexture.wrapT = THREE.RepeatWrapping;

const uv = [];

for (let i = 0; i < geometry.attributes.position.count; i++) {
  const x = geometry.attributes.position.getX(i);
  const y = geometry.attributes.position.getY(i);
  const z = geometry.attributes.position.getZ(i);

  const u = Math.atan2(y, x) / (2 * Math.PI) + 0.9;
  const v = z / 28 + 0.9;

  uv.push(u, v);
}

geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2));

const whiteMat = new THREE.MeshBasicMaterial({color: 0xAC7D0C});

const material = new THREE.MeshStandardMaterial({
  map: baseColorTexture,
  displacementMap: heightMapTexture,
  displacementScale: 1,
  normalMap: normalMapTexture,
  normalScale: new THREE.Vector2(0.1, 0.1),
  aoMap: aoTexture,
  roughnessMap: RoughMapTexture,
  emissiveMap: eMapTexture
  
});


} 




  
var cube = new THREE.Mesh ( geometry, material );
var thisObj = new THREE.Mesh(ball, material );
scene.add(cube );


var ambientLight = new THREE.AmbientLight ( 0xffffff, 1)
scene.add( ambientLight )


// point light
var pointLight = new THREE.PointLight( 0xffffff, 0.9 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );



function render() {

let status = false;

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	// console.log(intersects)


}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {
	requestAnimationFrame( animate )
	// thisObj.position.set(mouse.x, mouse.y,4);
	cube.rotation.x -= mouse.y/200;
	cube.rotation.y += mouse.x/200;
	// wireframeCube.rotation.x += mouse.x/40;
	// wireframeCube.rotation.y -= mouse.y/40;
	// pin.rotation.x += mouse.x/40;
	// pin.rotation.y -= mouse.y/40;
	renderer.render( scene, camera );
	window.requestAnimationFrame(render);
}

export const func = animate();