import * as THREE from "three";

export const SnowPlane = () => {
    const initPlane = () => {
        const geometry = new THREE.PlaneGeometry(5700, 5700, 128, 128);
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
