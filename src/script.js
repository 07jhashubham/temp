import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/* 
    Textures
*/
const textureLoader = new THREE.TextureLoader();
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
const matcapsTexture = textureLoader.load("/textures/matcaps/1.png");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* 
    Material
*/

// const material = new THREE.MeshBasicMaterial();
// material.wireframe = true;
// material.side = THREE.DoubleSide;
// material.map = doorColorTexture;
// material.opacity = 1;
// material.visible = false;
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

// const material = new THREE.MeshNormalMaterial();

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapsTexture;

const material = new THREE.MeshLambertMaterial();
material.side = THREE.DoubleSide;
// const material = new THREE.MeshPhongMaterial();

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

//trous
const trous = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
trous.position.x = 1.5;
scene.add(plane, sphere, trous);

/* 
    Light
*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
pointLight.shadow.bias = 0;
scene.add(pointLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Rotation
  plane.rotation.x = elapsedTime * 0.1;
  sphere.rotation.x = elapsedTime * 0.1;
  trous.rotation.x = elapsedTime * 0.1;

  plane.rotation.y = elapsedTime * 0.1;
  sphere.rotation.y = elapsedTime * 0.1;
  trous.rotation.y = elapsedTime * 0.1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
