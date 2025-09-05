import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { color } from 'three/tsl';


// Scene setup
function crcube(color = 0xff0000, position = { x: 0, y: 0, z: 0 }) {
 const geometry = new THREE.BoxGeometry();
 const material = new THREE.MeshBasicMaterial({ color });
 const cube = new THREE.Mesh(geometry, material);
 
 cube.position.set(position.x, position.y, position.z);
 return cube;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 50);

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
//controls.autoRotate = true;


//const rgbeLoader = new RGBELoader();
//rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/cobblestone_street_night_1k.hdr', function(texture) {
  //texture.mapping = THREE.EquirectangularReflectionMapping;
// scene.background = texture;
 //scene.environment = texture;
//});

//const loader = new GLTFLoader();
//loader.load("/blend1.glb", function(gltf) {
 //   scene.add(gltf.scene);
    //gltf.scene.position.y = -1.5;
//});

const sLight = new THREE.DirectionalLight(0xffffff, 0.5);
sLight.position.set(-1.5, 0.5, 1.5);
scene.add(sLight);

const cube1 = crcube(0x666666, {x: 0, y: 0, z: 12});
//const cube2 = crcube(0x00ff00, { x: 0, y: 9, z: 12});

scene.add(cube1);





// Add event listener for mouse clicks
window.addEventListener("click", onMouseClick);

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(12, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      map: loader.load("earthmap1k.jpg")
    });
    const sphere = new THREE.Mesh(geometry, material);
   scene.add(sphere);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();





