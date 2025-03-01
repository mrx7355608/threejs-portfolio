import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export const SetupWoodenSignModels = (scene) => {
    const loader = new GLTFLoader();

    const initWoodenSignModels = () => {
        loader.load("models/wooden-sign2.glb", (gltf) => {
            const sign = gltf.scene;
            sign.scale.set(60, 80, 80);
            sign.rotation.y = -270;
            sign.position.set(-200, -10, -1350);

            sign.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(sign);
        });
    };

    const initLamp = () => {
        loader.load("models/lamp.glb", (gltf) => {
            const lamp = gltf.scene;
            lamp.scale.set(6, 6, 6);
            lamp.position.set(-200, 0, -1250);
            lamp.castShadow = true;

            lamp.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            const light = new THREE.PointLight(0xffcc88, 30000, 200);
            light.position.set(
                lamp.position.x + 30,
                lamp.position.y + 60,
                lamp.position.z,
            );
            light.castShadow = true;
            light.decay = 2;
            scene.add(light);
            scene.add(lamp);
        });
    };

    return { initWoodenSignModels, initLamp };
};
