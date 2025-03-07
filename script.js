let scene, camera, renderer, road, car;
let carSpeed = 0;
const clock = new THREE.Clock();

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();

  // Load the road model
  loader.load('road_glb.glb', (gltf) => {
    road = gltf.scene;
    scene.add(road);
  });

  // Load the car model
  loader.load('ferrari_f1_2019.glb', (gltf) => {
    car = gltf.scene;
    car.position.set(0, 0, 0); // Starting position on the road
    scene.add(car);
  });

  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('keydown', onDocumentKeyDown, false);
}

function onDocumentKeyDown(event) {
  if (event.key === "ArrowUp") {
    carSpeed = 0.2;
  } else if (event.key === "ArrowDown") {
    carSpeed = -0.2;
  }
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (car) {
    car.position.z -= carSpeed;
  }
  renderer.render(scene, camera);
  carSpeed *= 0.95; // simple damping for smoother stop
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
