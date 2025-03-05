import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#7D5F68", 2);
        directionalLight.position.set(200, 800, -2000);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -600;
        directionalLight.shadow.camera.right = 600;
        directionalLight.shadow.camera.top = 300;
        directionalLight.shadow.camera.bottom = -600;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 5000;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.intensity = 3;

        return directionalLight;
    };

    const initAmbientLight = () => new THREE.AmbientLight("#AB99B3", 0.1);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
