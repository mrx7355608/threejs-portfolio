import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#ff9966", 2);
        directionalLight.position.set(100, 500, -1200);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -1800;
        directionalLight.shadow.camera.right = 300;
        directionalLight.shadow.camera.top = 2000;
        directionalLight.shadow.camera.bottom = -2000;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 5000;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.radius = 2;

        return directionalLight;
    };
    const initAmbientLight = () => new THREE.AmbientLight("#ff9966", 0.2);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
