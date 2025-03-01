import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SetupModels = (scene) => {
    const loader = new GLTFLoader();

    const loadTrees = () => {
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

                adjustTreeAndAddToScene(tree, -300, -300);
                adjustTreeAndAddToScene(clonedTree1, -300, -500);
                adjustTreeAndAddToScene(clonedTree2, -300, -700);
                adjustTreeAndAddToScene(clonedTree3, -300, -900);
                adjustTreeAndAddToScene(clonedTree4, -300, -1100);
                adjustTreeAndAddToScene(clonedTree5, -300, -1300);
                adjustTreeAndAddToScene(clonedTree6, -300, -1500);
                adjustTreeAndAddToScene(clonedTree7, -300, -1700);

                scene.add(tree);
            },
            undefined,
            function (error) {
                console.error("Error loading the lamp:", error);
            },
        );
    };

    const loadTreeAndRocks = () => {
        loader.load(
            "models/trees-rocks.glb",
            function (gltf) {
                const treeAndRocks = gltf.scene;
                const clonedTreesAndRocks1 = treeAndRocks.clone();
                const clonedTreesAndRocks2 = treeAndRocks.clone();
                const clonedTreesAndRocks3 = treeAndRocks.clone();

                adjustTreeRocksAndAddToScene(treeAndRocks, 600, -500);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks1, 500, -1000);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks2, 500, -1500);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks3, 500, -2000);
            },
            undefined,
            function (error) {
                console.error("Error loading the lamp:", error);
            },
        );
    };

    const adjustTreeAndAddToScene = (tree, x, z) => {
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

    const adjustTreeRocksAndAddToScene = (treeAndRocks, x, z) => {
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

    const init = () => {
        loadTrees();
        loadTreeAndRocks();
    };

    return { init };
};
