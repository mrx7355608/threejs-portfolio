import * as THREE from "three";
import { createSnow, updateSnow } from "./snowfall";
import { createSnowPlane } from "./snow-plane";
import { setupControls } from "./controls";
import { createTree } from "./tree";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

const start = () => {
    // ==============
    //     Scene
    // ==============
    const scene = new THREE.Scene();
    scene.background = createGradientTexture("#FF9966", "#336699");
    scene.fog = new THREE.FogExp2("#BBBBBB", 0.0017);

    // ============
    //     Snow
    // ============
    const snow = createSnow();
    scene.add(snow);

    // ==============
    //     Lights
    // ==============
    const directionalLight = new THREE.DirectionalLight("#3366AF", 7);
    directionalLight.position.set(0, 300, 1500);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight("white", 0.5);
    scene.add(ambientLight);

    directionalLight.shadow.camera.left = -800;
    directionalLight.shadow.camera.right = 800;
    directionalLight.shadow.camera.top = 1000;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 4000;
    directionalLight.shadow.darkness = 0.8;
    directionalLight.shadow.mapSize.width = 2048; // Increase shadow resolution
    directionalLight.shadow.mapSize.height = 2048;

    // ==============
    //     Camera
    // ==============
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 20000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.y = 20;
    camera.position.z = -100;

    // ===============
    //     Renderer
    // ===============
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const ssaoPass = new SSAOPass(scene, camera);
    ssaoPass.kernelRadius = 16; // Adjust for stronger effect
    ssaoPass.minDistance = 0.005;
    ssaoPass.maxDistance = 0.1;
    composer.addPass(ssaoPass);

    // ==============
    //     Plain
    // ==============
    const plainMesh = createSnowPlane(renderer);
    scene.add(plainMesh);

    createTree(scene);

    // ================
    //     Controls
    // ================
    const controls = setupControls(camera, renderer);

    renderer.setAnimationLoop(() => {
        updateSnow();
        camera.updateProjectionMatrix();
        controls.update();
        renderer.render(scene, camera);
    });
    document.body.appendChild(renderer.domElement);

    document.addEventListener("wheel", (e) => {
        camera.position.z -= e.deltaY / 100;
    });
};

function createGradientTexture(color1, color2) {
    const canvas = document.createElement("canvas");
    canvas.width = 1; // Only 1px wide, stretched over the scene
    canvas.height = 256; // Gradient height
    const ctx = canvas.getContext("2d");

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, color1); // Top color (e.g., warm sunset)
    gradient.addColorStop(1, color2); // Bottom color (e.g., cold snow)

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);

    return new THREE.CanvasTexture(canvas);
}

start();
