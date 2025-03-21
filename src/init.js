import * as THREE from "three";

export const Init = () => {
    const initScene = () => {
        const scene = new THREE.Scene();
        scene.background = createGradientTexture("#8f6a6a", "#ff9966");
        scene.fog = new THREE.FogExp2("#DCB8AC", 0.0018);
        scene.position.set(0, 0, 700);
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
        const far = 2000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // camera.position.y = 80;
        // camera.position.z = 200;
        // camera.position.x = 80;

        /* Used for animations */
        camera.position.y = 700;
        camera.lookAt(0, 0, 0);
        camera.position.x = 80;
        camera.position.z = 2500;

        return camera;
    };

    const createGradientTexture = (color1, color2) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 128);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 128);

        return new THREE.CanvasTexture(canvas);
    };

    return {
        scene: initScene(),
        camera: initCamera(),
        renderer: initRenderer(),
    };
};
