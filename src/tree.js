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

            adjustTreeAndAddToScene(scene, tree, 300, 300);
            adjustTreeAndAddToScene(scene, clonedTree1, 300, 500);
            adjustTreeAndAddToScene(scene, clonedTree2, 400, 1000);

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
            const clonedTreesAndRocks = treeAndRocks.clone();
            adjustTreeRocksAndAddToScene(scene, treeAndRocks, -400, 500);
            adjustTreeRocksAndAddToScene(scene, clonedTreesAndRocks, -400, 800);
        },
        undefined,
        function (error) {
            console.error("Error loading the lamp:", error);
        },
    );
};

const adjustTreeAndAddToScene = (scene, tree, x, z) => {
    tree.position.set(x, 0, z);
    tree.scale.set(100, 150, 120);
    tree.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            // child.receiveShadow = true;
        }
    });
    scene.add(tree);
};

const adjustTreeRocksAndAddToScene = (scene, treeAndRocks, x, z) => {
    treeAndRocks.position.set(x, 0, z);
    treeAndRocks.scale.set(10, 12, 10);
    treeAndRocks.rotation.set(0, Math.PI / 2, 0);
    treeAndRocks.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    scene.add(treeAndRocks);
};
