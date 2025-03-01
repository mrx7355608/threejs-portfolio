import * as THREE from "three";

export const SnowPlane = () => {
    const loadTexture = () => {
        const loader = new THREE.TextureLoader();
        return {
            rough: loader.load("textures/snow/rough.png"),
            normal: loader.load("textures/snow/normal.png"),
            diffuse: loader.load("textures/snow/diffuse.png"),
            displacement: loader.load("textures/snow/displacement.png"),
        };
    };

    const initPlane = () => {
        const geometry = new THREE.PlaneGeometry(5000, 5000, 128, 128);
        const { rough, normal, diffuse, displacement } = loadTexture();
        const material = new THREE.MeshStandardMaterial({
            map: diffuse,
            normalMap: normal,
            displacementMap: displacement,
            roughnessMap: rough,
            displacementScale: 200,
            displacementBias: -60,
            roughness: 2,
        });
        const mesh = new THREE.Mesh(geometry, material);

        /* Config */
        geometry.rotateX(-Math.PI / 2);
        mesh.receiveShadow = true;

        return mesh;
    };

    return { plane: initPlane() };
};
