import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const Projects = (scene) => {
    const modelsLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const PLANE_WIDTH = 200;
    const PLANE_HEIGHT = 110;

    const createImagePlane = () => {
        const geom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
        const texture = textureLoader.load("textures/snow/diffuse.png");
        const material = new THREE.MeshStandardMaterial({
            color: "white",
            map: texture,
        });
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.set(10, 120, -1100);
        mesh.castShadow = true;
        scene.add(mesh);
    };

    const createSourceAndLiveSignBoard = () => {
        modelsLoader.load("models/wooden-sign2.glb", (gltf) => {
            const board = gltf.scene;
            board.scale.set(70, 80, 20);
            board.position.set(200, 0, -1100);
            board.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });
            scene.add(board);
        });
    };

    const addProjectsToScene = () => {
        createImagePlane();
        createSourceAndLiveSignBoard();
    };

    return { addProjectsToScene };
};
