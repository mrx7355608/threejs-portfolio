import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const createTree = (scene) => {
    const loader = new GLTFLoader();

    // Load the Lamp Model
    loader.load(
        "models/pine-trees.glb",
        function (gltf) {
            const tree = gltf.scene;
            const clonedTree1 = tree.clone();
            const clonedTree2 = tree.clone();
            const clonedTree3 = tree.clone();
            const clonedTree4 = tree.clone();
            const clonedTree5 = tree.clone();
            const clonedTree6 = tree.clone();
            const clonedTree7 = tree.clone();

            adjustTreeAndAddToScene(scene, tree, -300, -300);
            adjustTreeAndAddToScene(scene, clonedTree1, -300, -500);
            adjustTreeAndAddToScene(scene, clonedTree2, -300, -700);
            adjustTreeAndAddToScene(scene, clonedTree3, -300, -900);
            adjustTreeAndAddToScene(scene, clonedTree4, -300, -1100);
            adjustTreeAndAddToScene(scene, clonedTree5, -300, -1300);
            adjustTreeAndAddToScene(scene, clonedTree6, -300, -1500);
            adjustTreeAndAddToScene(scene, clonedTree7, -300, -1700);

            scene.add(tree);
        },
        undefined,
        function (error) {
            console.error("Error loading the lamp:", error);
        },
    );

    loader.load(
        "models/trees-rocks.glb",
        function (gltf) {
            const treeAndRocks = gltf.scene;
            const clonedTreesAndRocks1 = treeAndRocks.clone();
            const clonedTreesAndRocks2 = treeAndRocks.clone();
            const clonedTreesAndRocks3 = treeAndRocks.clone();

            adjustTreeRocksAndAddToScene(scene, treeAndRocks, 600, -500);
            adjustTreeRocksAndAddToScene(
                scene,
                clonedTreesAndRocks1,
                500,
                -1000,
            );
            adjustTreeRocksAndAddToScene(
                scene,
                clonedTreesAndRocks2,
                500,
                -1500,
            );
            adjustTreeRocksAndAddToScene(
                scene,
                clonedTreesAndRocks3,
                500,
                -2000,
            );
        },
        undefined,
        function (error) {
            console.error("Error loading the lamp:", error);
        },
    );
};

const adjustTreeAndAddToScene = (scene, tree, x, z) => {
    tree.position.set(x, 10, z);
    tree.scale.set(200, 250, 220);
    tree.rotation.y = 100 * Math.random();
    tree.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    scene.add(tree);
};

const adjustTreeRocksAndAddToScene = (scene, treeAndRocks, x, z) => {
    treeAndRocks.position.set(x, -10, z);
    treeAndRocks.scale.set(12, 14, 12);
    treeAndRocks.rotation.set(0, -Math.PI / 2, 0);
    treeAndRocks.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    scene.add(treeAndRocks);
};
