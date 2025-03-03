import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SetupSkillBoards = (scene) => {
    const modelsLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const PLANE_WIDTH = 27;
    const PLANE_HEIGHT = 32;

    const createSkillBoards = () => {
        // Load board model
        modelsLoader.load("models/wooden-sign.glb", function (gltf) {
            const board = gltf.scene;
            createBoard(board, "react", 300, 350, 31);
            createBoard(board, "linux", 300, -400, 30);
            createBoard(board, "nextjs", -200, 380, -270);
            createBoard(board, "nodejs", -200, -350, -270);
            createBoard(board, "mongodb", 320, 550, 30);
            createBoard(board, "typescript", -200, -200, 20);
            // createBoard(board, "git", 300, -400, 30);
        });
    };

    const createBoard = (boardModel, tech, xPos, zPos, yRotationAngle) => {
        /* Clone the pre-loaded model */
        const board = boardModel.clone();

        /* Set board positions and rotations */
        board.position.set(xPos, 0, zPos);
        board.rotation.y = yRotationAngle;
        board.scale.set(25, 25, 25);
        board.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        /* Attach the skill plane texture */
        attachSkillTexturePlane(board, tech);
    };
    const attachSkillTexturePlane = (board, skill) => {
        const { x, y, z } = board.position;

        /* Create a transparent plane to display skill */
        const geom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
        const texture = loadTexture(skill);
        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            reflectivity: 0.3,
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        mesh.position.set(x < 0 ? x + 1 : x - 1, y + 40, z + 1);
        geom.rotateY(board.rotation.y);

        scene.add(mesh);
        scene.add(board);
    };

    const loadTexture = (tech) => {
        const path = `textures/techstack/icons8-${tech}-96.png`;
        const texture = textureLoader.load(path);
        texture.minFilter = THREE.LinearFilter; // Avoid blurriness from mipmaps
        texture.magFilter = THREE.NearestFilter; // Ensures pixel-perfect scaling
        texture.anisotropy = 8; // Increase sharpness
        texture.needsUpdate = true;
        return texture;
    };

    return { createSkillBoards };
};
