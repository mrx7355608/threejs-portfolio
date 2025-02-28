import * as THREE from "three";
import { cover } from "three/src/extras/TextureUtils";
import { createSnow, updateSnow } from "./snow";

const start = () => {
    // ==============
    //     Scene
    // ==============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    scene.fog = new THREE.FogExp2("black", 0.0014);

    // ==============
    //     Plain
    // ==============
    const worldWidth = 128;
    const worldDepth = 128;
    const geometry = new THREE.PlaneGeometry(
        2000,
        2000,
        worldWidth - 1,
        worldDepth - 1,
    );
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshPhongMaterial({ color: "white" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
    camera.position.y = 10;

    // ===============
    //     Renderer
    // ===============
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(() => {
        camera.updateProjectionMatrix();
        updateSnow();
        renderer.render(scene, camera);
    });
    document.body.appendChild(renderer.domElement);

    document.addEventListener("wheel", (e) => {
        camera.position.z -= e.deltaY / 100;
    });
};

start();
