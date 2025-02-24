import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const createText = (font, string, posZ) => {
    const fontOptions = {
        font: font,
        depth : 1,
        size : 5,
        hover : 30,
        curveSegments : 4,
        bevelThickness : 2,
        bevelSize : 1.5
    }
    const text = new TextGeometry(string, fontOptions);
    const textMesh = new THREE.Mesh(text, [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
    ]);
    textMesh.position.x = -10;
    textMesh.position.y = 10;
    textMesh.position.z = posZ;
    return textMesh;
}

const start = () => {
    // ==============
    //     Scene
    // ==============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaccff);
    scene.fog = new THREE.FogExp2(0xaaccff, 0.006);

    // ==============
    //     Plain
    // ==============
    const worldWidth = 128;
    const worldDepth = 128;
    const geometry = new THREE.PlaneGeometry(
        20000,
        20000,
        worldWidth - 1,
        worldDepth - 1,
    );
    geometry.rotateX(-Math.PI / 2);

    // Texture
    const texture = new THREE.TextureLoader().load("textures/ground.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Material & mesh
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // =========
    //    Sun
    // =========
    const sunTexture = new THREE.TextureLoader().load("textures/sun.png");
    const sunGeometry = new THREE.SphereGeometry(200);
    const sunMaterial = new THREE.MeshPhongMaterial({
        map: sunTexture,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -2000); // Place the sun in the distance
    scene.add(sun);

    // =============
    //    3D text
    // =============
    const loader = new FontLoader();
    const font = loader.load("fonts/gentilis_regular.typeface.json", (font) => {
        const text1 = createText(font, "Hello Dear", -350);
        const text2 = createText(font, "How are you?", -650);
        const text3 = createText(font, "Fuck you", -1150);
        const text4 = createText(font, "The End", -1650);
        scene.add(text1);
        scene.add(text2);
        scene.add(text3);
        scene.add(text4);
    });

    // ==============
    //     Lights
    // ==============
    const ambientLight = new THREE.AmbientLight("yellow");
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
        renderer.render(scene, camera);
    });
    document.body.appendChild(renderer.domElement);

    window.addEventListener("wheel", (e) => {
        camera.position.z -= e.deltaY / 30;
    });
};

start();
