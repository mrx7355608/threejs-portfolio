import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#ff9966", 0.3);
        directionalLight.position.set(200, 400, -1500);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -2500;
        directionalLight.shadow.camera.right = 2500;
        directionalLight.shadow.camera.top = 2500;
        directionalLight.shadow.camera.bottom = -2500;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 10000;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.intensity = 5;

        return directionalLight;
    };
    const initAmbientLight = () => new THREE.AmbientLight("#fff", 0.4);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
