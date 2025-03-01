import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#9966cc", 3);
        directionalLight.position.set(0, 300, -1500);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -800;
        directionalLight.shadow.camera.right = 800;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -1000;
        directionalLight.shadow.camera.near = 10;
        directionalLight.shadow.camera.far = 4000;
        directionalLight.shadow.darkness = 1;
        directionalLight.shadow.mapSize.width = 2048; // Increase shadow resolution
        directionalLight.shadow.mapSize.height = 2048;

        return directionalLight;
    };

    const initAmbientLight = () => new THREE.AmbientLight("#ffffff", 0.5);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
