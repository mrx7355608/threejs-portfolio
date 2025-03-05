import { modelsLoader } from "./loaders";

export const SetupTreeModels = (scene) => {
    const loadTrees = () => {
        modelsLoader.load(
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
                const clonedTree8 = tree.clone();
                const clonedTree9 = tree.clone();
                const clonedTree10 = tree.clone();

                adjustTreeAndAddToScene(clonedTree1, -400, 1100);
                adjustTreeAndAddToScene(clonedTree2, -400, 1500);
                adjustTreeAndAddToScene(clonedTree3, -400, 700);
                adjustTreeAndAddToScene(clonedTree4, -400, 200);
                adjustTreeAndAddToScene(clonedTree5, -400, -100);
                adjustTreeAndAddToScene(clonedTree6, -400, -500);
                adjustTreeAndAddToScene(clonedTree7, -400, -900);
                adjustTreeAndAddToScene(clonedTree8, -300, -1600, true);
                adjustTreeAndAddToScene(clonedTree9, 100, -1700, true);
                adjustTreeAndAddToScene(clonedTree10, -400, -2000);
                adjustTreeAndAddToScene(tree, -400, -1300);

                scene.add(tree);
            },
            undefined,
            function (error) {
                console.error("Error loading the lamp:", error);
            },
        );
    };

    const loadTreeAndRocks = () => {
        modelsLoader.load(
            "models/trees-rocks.glb",
            function (gltf) {
                const treeAndRocks = gltf.scene;
                const clonedTreesAndRocks1 = treeAndRocks.clone();
                const clonedTreesAndRocks2 = treeAndRocks.clone();
                const clonedTreesAndRocks3 = treeAndRocks.clone();

                adjustTreeRocksAndAddToScene(treeAndRocks, 500, 1200);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks1, 600, 500);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks2, 600, -300);
                adjustTreeRocksAndAddToScene(clonedTreesAndRocks3, 600, -1600);
            },
            undefined,
            function (error) {
                console.error("Error loading the lamp:", error);
            },
        );
    };

    const adjustTreeAndAddToScene = (tree, x, z, rotateY = false) => {
        tree.position.set(x, -10, z);
        tree.scale.set(200, 250, 220);
        tree.rotation.y = 100 * Math.random();
        tree.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        if (rotateY) {
            tree.rotation.y = 30;
        }
        scene.add(tree);
    };

    const adjustTreeRocksAndAddToScene = (treeAndRocks, x, z) => {
        treeAndRocks.position.set(x, -20, z);
        treeAndRocks.scale.set(12, 14, 12);
        treeAndRocks.rotation.set(0, -Math.PI / 2, 0);
        treeAndRocks.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        scene.add(treeAndRocks);
    };

    const initTreeAndTreeRocks = () => {
        loadTrees();
        loadTreeAndRocks();
    };

    return { initTreeAndTreeRocks };
};
