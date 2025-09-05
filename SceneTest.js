import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color, rotate } from 'three/tsl';


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2);

// Renderer setup
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Create custom dialog
const dialog = document.createElement('div');
dialog.className = 'dialog-box';
dialog.style.display = 'none'; // Ensure dialog is hidden initially

const closeButton = document.createElement('button');
closeButton.className = 'dialog-close-button';
closeButton.textContent = 'RGR';

const message = document.createElement('p');
message.className = 'dialog-message';
message.textContent = 'It Is The Brand !';

dialog.appendChild(message);
dialog.appendChild(closeButton);
document.body.appendChild(dialog);

// Add click event listener for close button
closeButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    dialog.style.display = 'none';
    controls.autoRotate = true;
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true,    
});

//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting


// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Modify the click handler to show dialog
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    // Check if cube was clicked
    if (intersects.length > 0 && intersects[0].object === cube) {
        dialog.style.display = 'block';
        controls.autoRotate = false;
    }
}

// Add click event listener to window
window.addEventListener('click', onMouseClick);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
