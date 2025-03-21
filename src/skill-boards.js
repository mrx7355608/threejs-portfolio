import * as THREE from "three";
import { modelsLoader, textureLoader } from "./loaders";

export const SetupSkillBoards = (scene) => {
    const PLANE_WIDTH = 52;
    const PLANE_HEIGHT = 20;

    const createSkillBoards = () => {
        // Load board model
        modelsLoader.load("models/wooden-sign.glb", function (gltf) {
            const board = gltf.scene;
            createBoard(board, "react", 280, 850, 31);
            createBoard(board, "nextjs", 300, 950, 30);
            createBoard(board, "prisma", -180, 900, -270);
            createBoard(board, "git", -180, 1050, 20);
            createBoard(board, "linux", 280, 650, 31);
            createBoard(board, "mongodb", -140, 480, -270);
            createBoard(board, "typescript", -180, 600, 20);
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
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        mesh.position.set(x < 0 ? x + 1 : x - 1, y + 42, z + 1);
        geom.rotateY(board.rotation.y);

        scene.add(mesh);
        scene.add(board);
    };

    const loadTexture = (tech) => {
        const path = `textures/techstack/${tech}.png`;
        const texture = textureLoader.load(path);
        texture.minFilter = THREE.LinearFilter; // Avoid blurriness from mipmaps
        texture.magFilter = THREE.NearestFilter; // Ensures pixel-perfect scaling
        texture.anisotropy = 16; // Increase sharpness
        texture.needsUpdate = true;
        return texture;
    };

    return { createSkillBoards };
};
