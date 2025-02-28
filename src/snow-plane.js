import * as THREE from "three";

export const createSnowPlane = () => {
    const geometry = new THREE.PlaneGeometry(5000, 5000, 128, 128);
    geometry.rotateX(-Math.PI / 2);

    /* Loading textures */
    const loader = new THREE.TextureLoader();
    const rough = loader.load("textures/snow/rough.png");
    const normal = loader.load("textures/snow/normal.png");
    const diffuse = loader.load("textures/snow/diffuse.png");
    const displacement = loader.load("textures/snow/displacement.png");

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
    mesh.receiveShadow = true;
    return mesh;
};
