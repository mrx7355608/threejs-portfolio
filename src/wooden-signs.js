import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as THREE from "three";

export const SetupWoodenSignModels = (scene) => {
    const modelLoader = new GLTFLoader();
    const fontLoader = new FontLoader();

    const initWoodenSignModel = () => {
        modelLoader.load("models/wooden-sign2.glb", (gltf) => {
            const sign = gltf.scene;
            sign.scale.set(60, 80, 80);
            sign.rotation.y = -270;
            sign.position.set(-200, -10, 1280);

            sign.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(sign);
        });
    };

    const createBoardText = () => {
        fontLoader.load("fonts/ibm_blex.typeface.json", (font) => {
            const textGeometry = new TextGeometry("Projects", {
                font: font,
                size: 9, // Text size
                depth: 2, // Depth (thickness)
                curveSegments: 2, // Smoothness
                bevelEnabled: true, // Optional bevel
                bevelThickness: 2,
                bevelSize: 1,
                bevelSegments: 2,
            });
            const frontMaterial = new THREE.MeshPhongMaterial({
                color: "#FFD700",
            });
            const sideMaterial = new THREE.MeshPhongMaterial({
                color: "#2d2d2d",
            });
            const textMesh = new THREE.Mesh(textGeometry, [
                frontMaterial,
                sideMaterial,
            ]);
            textMesh.castShadow = true;
            textMesh.position.set(-216, 80, 1290);
            textMesh.rotation.y = -270;
            textMesh.rotation.z = -270;
            scene.add(textMesh);
        });
    };

    const initLamp = () => {
        modelLoader.load("models/lamp.glb", (gltf) => {
            const lamp = gltf.scene;
            lamp.scale.set(6, 6, 6);
            lamp.position.set(-200, 0, 1350);
            lamp.castShadow = true;

            lamp.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const lampLight = new THREE.PointLight("#FFB347", 30000, 200);
            lampLight.position.set(
                lamp.position.x + 30,
                lamp.position.y + 80,
                lamp.position.z,
            );
            lampLight.castShadow = true;
            lampLight.decay = 2;
            scene.add(lampLight);
            scene.add(lamp);
        });
    };

    const initWoodenBoardAndLamp = () => {
        initWoodenSignModel();
        initLamp();
        createBoardText();
    };

    return { initWoodenBoardAndLamp };
};
