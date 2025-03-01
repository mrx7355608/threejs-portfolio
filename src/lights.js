import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#ff9966", 3);
        directionalLight.position.set(0, 700, 0);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -800;
        directionalLight.shadow.camera.right = 800;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -1000;
        directionalLight.shadow.camera.near = 10;
        directionalLight.shadow.camera.far = 2000;
        directionalLight.shadow.intensity = 0.9;
        directionalLight.shadow.mapSize.width = 1024; // Increase shadow resolution
        directionalLight.shadow.mapSize.height = 2048;

        return directionalLight;
    };

    const initAmbientLight = () => new THREE.AmbientLight("#fff", 0.2);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
