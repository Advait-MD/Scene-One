import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { color } from 'three/tsl';
//import canvasStarfield from './src/starfield/canvas-starfield.js';  

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 1, 2);

// Renderer setup
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

const snLight = new THREE. DirectionalLight(0xffffff);
snLight.position.set(-1.5, 0.5, 1.5);
scene.add(snLight);
//const stara = new canvasStarfield();
//scene.add(stara);

const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('star,jpg');

const geometryo = new THREE.SphereGeometry(500, 32, 32);
const materialo = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide
});

const starDome = new THREE.Mesh(geometryo, materialo);
scene.add(starDome);


const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
 const material = new THREE.MeshStandardMaterial({ 
      map: loader.load("earthmap1k.jpg")
    });
 const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const lightMat = new THREE.MeshBasicMaterial({
 map: loader.load("earthlights1k.jpg"),
  blending: THREE.AdditiveBlending
});
const lightMesh = new THREE.Mesh(geometry, lightMat);
scene.add(lightMesh);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.0001;
  lightMesh.rotation.y += 0.0001;
  controls.update();
  renderer.render(scene, camera);
}
animate();
