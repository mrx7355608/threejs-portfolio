import * as THREE from "three";

export const Lights = () => {
    const initDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight("#ff9966", 1);
        directionalLight.position.set(100, 400, -1200);
        directionalLight.castShadow = true;

        /* Shadow configurations */
        directionalLight.shadow.camera.left = -2000;
        directionalLight.shadow.camera.right = 2000;
        directionalLight.shadow.camera.top = 2000;
        directionalLight.shadow.camera.bottom = -2000;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 5000;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.radius = 2;
        directionalLight.shadow.bias = -0.001;

        return directionalLight;
    };
    const initAmbientLight = () => new THREE.AmbientLight("#fff", 0.4);

    return {
        directional: initDirectionalLight(),
        ambient: initAmbientLight(),
    };
};
