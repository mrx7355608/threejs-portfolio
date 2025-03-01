import * as THREE from "three";

export const SnowPlane = () => {
    const loadTexture = () => {
        const loader = new THREE.TextureLoader();
        return {
            rough: loader.load("textures/snow/rough.png"),
            normal: loader.load("textures/snow/normal.png"),
            diffuse: loader.load("textures/snow/diffuse.png"),
            displacement: loader.load("textures/snow/displacement.png"),
            ao: loader.load("textures/snow/ao.jpg"),
        };
    };

    const initPlane = () => {
        const geometry = new THREE.PlaneGeometry(5000, 5000, 128, 128);
        const { ao, rough, normal, diffuse, displacement } = loadTexture();
        const material = new THREE.MeshPhongMaterial({
            color: "white",
        });
        const mesh = new THREE.Mesh(geometry, material);

        /* Config */
        geometry.rotateX(-Math.PI / 2);
        mesh.receiveShadow = true;

        return mesh;
    };

    return { plane: initPlane() };
};
