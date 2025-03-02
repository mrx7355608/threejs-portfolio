import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SetupWoodenBoard = (scene) => {
    const modelsLoader = new GLTFLoader();

    const loadWoodenBoardModel = () => {
        modelsLoader.load("models/wooden-sign.glb", function (gltf) {
            const board = gltf.scene;
            const board1 = board.clone();
            const board2 = board.clone();
            const board3 = board.clone();
            const board4 = board.clone();
            const board5 = board.clone();
            const board6 = board.clone();

            setupBoard(board, 320, 550, 30);
            setupBoard(board1, 300, 350, 31);
            setupBoard(board2, -200, 380, -270);
            setupBoard(board3, -200, -350, -270);
            setupBoard(board4, -200, -350, -270);
            setupBoard(board5, -200, -200, 20);
            setupBoard(board6, 300, -400, 30);
        });
    };

    const setupBoard = (board, x, z, yRotation) => {
        board.position.set(x, 0, z);
        board.rotation.y = yRotation;
        board.scale.set(25, 25, 25);
        board.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(board);
    };

    return { loadWoodenBoardModel };
};
