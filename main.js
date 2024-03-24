import * as THREE from 'https://unpkg.com/three@0.125.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.125.2/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.125.2/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.125.2/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black for space

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(20, 15, -25);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bloom effect setup
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 1.5; // lower this if the scene is too bright or increase it if too dark
bloomPass.radius = 0;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Lighting
const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(-100, 0, 100);
sunLight.castShadow = true;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x333333); // Soft white light
scene.add(ambientLight);

// Add stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
const starsVertices = [];

for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Mercury
const mercuryMaterial = new THREE.MeshPhongMaterial({
    color: 0x909090, // Grayish
    specular: 0x222222,
    shininess: 10
});

// Venus
const venusMaterial = new THREE.MeshPhongMaterial({
    color: 0xffd28e, // Creamy brown
    specular: 0x444444,
    shininess: 5
});

// Earth
const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff, // Blueish
    specular: 0x555555,
    shininess: 5
});

// Mars
const marsMaterial = new THREE.MeshPhongMaterial({
    color: 0xff5733, // Reddish
    specular: 0x222222,
    shininess: 10
});

// Jupiter
const jupiterMaterial = new THREE.MeshPhongMaterial({
    color: 0xc8a415, // Brownish yellow
    specular: 0x666666,
    shininess: 5
});

// Saturn
const saturnMaterial = new THREE.MeshPhongMaterial({
    color: 0xe2bd75, // Pale gold
    specular: 0x444444,
    shininess: 5
});

// Uranus
const uranusMaterial = new THREE.MeshPhongMaterial({
    color: 0x66ccff, // Light blue
    specular: 0x555555,
    shininess: 5
});

// Neptune
const neptuneMaterial = new THREE.MeshPhongMaterial({
    color: 0x3366ff, // Deep blue
    specular: 0x222222,
    shininess: 5
});


// Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Mercury
const mercury = createPlanet(0.383, 0x909090, 7); // Size, color, and distance from Sun adjusted for visualization
scene.add(mercury);

// Venus
const venus = createPlanet(0.949, 0xFFD700, 9); // Size, color, and distance from Sun adjusted for visualization
scene.add(venus);

// Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
// const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, specular: 0x555555, shininess: 15 });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 13;
scene.add(earth);

// Moon
const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = earth.position.x + 1.5; // Keep the moon close to earth
scene.add(moon);

// Mars
const mars = createPlanet(0.6, 0xFF4500, 18); // Using the `createPlanet` function
scene.add(mars);

// Jupiter - Assuming you add Jupiter
const jupiter = createPlanet(2.5, 0xB9A159, 26); // Example size and distance
scene.add(jupiter);

// Saturn
const saturn = createPlanet(2.5, 0xF4C542, 34);
scene.add(saturn);
// Saturn's Ring
const saturnRing = createRing(saturn, 3.0, 3.1, 0x888888);

// Uranus
const uranus = createPlanet(1.0, 0xD98BA, 44)
scene.add(uranus);
// Uranus ring 
const uranusRing = createRing(uranus, 1.7, 1.8, 0x888888);

// Neptune 
const neptune = createPlanet(1.0, 0x07FFF, 53)
scene.add(neptune);
// Neptune Ring 
const neptuneRing = createRing(neptune, 1.7, 1.8, 0x888888);

// Pluto

earth.name = 'earth';
moon.name = 'moon';
mercury.name = 'mercury';
venus.name = 'venus';
mars.name = 'mars';
jupiter.name = 'jupiter';
saturn.name = 'saturn';
uranus.name = 'uranus';
neptune.name = 'neptune';

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 10;
controls.maxDistance = 50;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(sun.position.x, sun.position.y, sun.position.z);

const animationState = {
    running: false,
    progress: 0,
    duration: 10000, // Duration of one orbit in milliseconds
};

// Helper function to create planets
function createPlanet(size, color, distanceFromSun, texture = null) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    let material;

    if (texture) {
        const loader = new THREE.TextureLoader();
        material = new THREE.MeshStandardMaterial({ map: loader.load(texture) });
    } else {
        material = new THREE.MeshStandardMaterial({ color: color });
    }

    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distanceFromSun;

    return planet;
}

// Helper function to create rings
function createRing(planet, innerRadius, outerRadius, ringColor) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
    const material = new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(geometry, material);

    // Set initial diagonal orientation
    ring.rotation.x = Math.PI / 4; // Diagonal rotation
    planet.add(ring);

    // Returning the ring so you can manipulate it outside the function
    return ring;
}


// Helper function for bounding box calculations
function calculateSceneBoundingBox() {
    const boundingBox = new THREE.Box3();

    scene.traverse(function (object) {
        if (object.isMesh) {
            object.geometry.computeBoundingBox();
            boundingBox.expandByObject(object);
        }
    });

    return boundingBox;
}

// Helper function to define the optimal camera position for the scene 
function getOptimalCameraDistance(boundingBox) {
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2)); // Basic trigonometry
    
    cameraZ *= 2; // Adjust based on your scene requirements
    return cameraZ;
}

// Helper function to calculate the updated FOV for zoom out 
function calculateNewFOV(boundingBox, cameraPosition) {
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = cameraPosition.distanceTo(boundingBox.getCenter(new THREE.Vector3()));

    // Calculate the FOV required to fit the largest dimension
    const fov = 2 * Math.atan(maxDim / (2 * distance)) * (180 / Math.PI); // Convert radians to degrees
    return fov;
}

// Define an object holding references to each planet
const planets = {
    mercury: mercury,
    venus: venus,
    earth: earth,
    mars: mars,
    jupiter: jupiter,
    saturn: saturn,
    uranus: uranus,
    neptune: neptune,
};

const earthOrbitRadius = 10; // baseline for calculations
const orbitRadii = {
    mercury: earthOrbitRadius * 0.39, // Closer to the current scale
    venus: earthOrbitRadius * 0.72,
    earth: earthOrbitRadius,
    mars: earthOrbitRadius * 1.52,
    jupiter: earthOrbitRadius * 2.0, // Adjusted to be closer
    saturn: earthOrbitRadius * 3.0, // Adjusted to be closer
    uranus: earthOrbitRadius * 4.0, // Adjusted to be closer
    neptune: earthOrbitRadius * 5.0, // Adjusted to be closer
};

planets.mercury.userData = { orbitRadius: orbitRadii.mercury, speedFactor: 2.15 };
planets.venus.userData = { orbitRadius: orbitRadii.venus, speedFactor: 1.32 };
planets.earth.userData = { orbitRadius: orbitRadii.earth, speedFactor: 1 };
planets.mars.userData = { orbitRadius: orbitRadii.mars, speedFactor: 0.8 };
planets.jupiter.userData = { orbitRadius: orbitRadii.jupiter, speedFactor: 0.73 };
planets.saturn.userData = { orbitRadius: orbitRadii.saturn, speedFactor: 0.52 };
planets.uranus.userData = { orbitRadius: orbitRadii.uranus, speedFactor: 0.32 };
planets.neptune.userData = { orbitRadius: orbitRadii.neptune, speedFactor: 0.28 };

// Global variable to control the animation state
let animationRunning = false; // Assume animation is stopped initially

function animate() {
    requestAnimationFrame(animate);

    if (animationRunning) {
        animationState.progress += 1000 / 60; // Increment based on 60 FPS

        // Define orbital speeds relative to Earth; these are not accurate but serve to demonstrate the concept.
        // In reality, orbital speed is determined by a variety of factors including the distance from the Sun.
        // Orbital speeds (arbitrary units, smaller means faster)
        const orbitalSpeeds = {
            mercury: 2.15, // Completes an orbit faster
            venus: 1.32,
            earth: 1, // Base speed
            mars: 0.8,
            jupiter: 0.73,
            saturn: 0.52,
            uranus: 0.32,
            neptune: 0.28, // Completes an orbit slower
        };

        Object.keys(orbitalSpeeds).forEach(planetName => {
            const planet = planets[planetName]; // Access from the planets object
            if (!planet || !planet.userData) {
                console.error('Missing userData for:', planetName);
                return;
            }
            const orbitRadius = planet.userData.orbitRadius;
            const speedFactor = orbitalSpeeds[planetName];
            const planetProgress = (animationState.progress * speedFactor) % animationState.duration;
            const progressRatio = planetProgress / animationState.duration;
            const angle = progressRatio * 2 * Math.PI;
        
            planet.position.x = Math.cos(angle) * orbitRadius;
            planet.position.z = Math.sin(angle) * orbitRadius;
        });
    }

    // Static rotations for visual effect
    rotatePlanetsAndMoons();

    controls.update();
    composer.render();
}

function rotatePlanetsAndMoons() {
    // Your existing rotation logic
    // Earth and Moon rotation and Moon orbit
    earth.rotation.y += 0.005;
    moon.rotation.y += 0.003;
    if (!animationState.running) { // Only update Moon's orbit from here if not animating orbit
        moon.position.set(
            earth.position.x + Math.cos(Date.now() * 0.001) * 2,
            0,
            earth.position.z + Math.sin(Date.now() * 0.001) * 2
        );
    }

    // Rotate Saturn and its ring
    saturnRing.rotation.y += 0.01;
    saturn.rotation.y += 0.004;

    // Rotate Mars
    mars.rotation.y += 0.004;

    // Rotate Neptune and Uranus
    neptune.rotation.y += 0.004;
    uranus.rotation.y += 0.004;

    // Rotate rings of Neptune and Uranus
    uranusRing.rotation.y += 0.01;
    neptuneRing.rotation.y += 0.01;
}

document.getElementById('zoomOutButton').addEventListener('click', function () {
    const boundingBox = calculateSceneBoundingBox();
    const distance = getOptimalCameraDistance(boundingBox);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    // Adjust the camera position
    camera.position.set(center.x, center.y, distance);
    controls.target.set(center.x, center.y, 0);

    // Calculate and set the new FOV
    const newFOV = calculateNewFOV(boundingBox, camera.position);
    camera.fov = newFOV;
    camera.updateProjectionMatrix(); // Important to apply the new FOV

    controls.update();
});

// Start Animation Button
document.getElementById('startButton').addEventListener('click', function() {
    animationRunning = true; // Assuming animationRunning is a global variable controlling the animation
    animate(); // Start the animation if not already running
});

// Stop Animation Button
document.getElementById('stopButton').addEventListener('click', function() {
    animationRunning = false; // This will stop the animation loop
});

requestAnimationFrame(animate);
