import * as THREE from "three";

export const Init = () => {
    const initScene = () => {
        const scene = new THREE.Scene();
        scene.background = createGradientTexture("#ff9e9e", "#d8a1ff");
        scene.fog = new THREE.FogExp2("#b38aff", 0.0014);
        return scene;
    };

    const initRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        return renderer;
    };

    const initCamera = () => {
        const fov = 60;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1;
        const far = 20000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.y = 50;
        camera.position.x = 50;
        return camera;
    };

    const createGradientTexture = (color1, color2) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        return new THREE.CanvasTexture(canvas);
    };

    return {
        scene: initScene(),
        camera: initCamera(),
        renderer: initRenderer(),
    };
};
