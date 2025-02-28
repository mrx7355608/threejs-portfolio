import * as THREE from "three";
import { cover } from "three/src/extras/TextureUtils";
import { createSnow, updateSnow } from "./snowfall";
import { createSnowPlane } from "./snow-plane";
import { setupControls } from "./controls";

const start = () => {
    // ==============
    //     Scene
    // ==============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    scene.fog = new THREE.FogExp2("black", 0.0014);

    // ============
    //     Snow
    // ============
    const snow = createSnow();
    scene.add(snow);

    // ==============
    //     Lights
    // ==============
    const ambientLight = new THREE.AmbientLight("white");
    const directionalLight = new THREE.DirectionalLight("black");
    directionalLight.position.set(0, 0, -2500);
    scene.add(ambientLight);
    scene.add(directionalLight);

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

    // ==============
    //     Plain
    // ==============
    const plainMesh = createSnowPlane(renderer);
    scene.add(plainMesh);

    // ================
    //     Controls
    // ================
    const controls = setupControls(camera, renderer);

    renderer.setAnimationLoop(() => {
        updateSnow();
        controls.update();
        renderer.render(scene, camera);
    });
    document.body.appendChild(renderer.domElement);

    document.addEventListener("wheel", (e) => {
        camera.position.z -= e.deltaY / 100;
    });
};

start();
