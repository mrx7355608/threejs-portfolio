import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { getEvents } from "./events";

export const SetupWoodenSignModels = (scene) => {
    const modelLoader = new GLTFLoader();

    const initLamp = () => {
        modelLoader.load("models/lamp.glb", (gltf) => {
            const lamp = gltf.scene;
            // const clonedLamp1 = lamp.clone();

            setupLampsAndLampsLight(lamp, 300, 750, true);
        });
    };

    const setupLampsAndLampsLight = (lamp, x, z, enableFlicker = false) => {
        lamp.scale.set(6, 6, 6);
        lamp.position.set(x, 0, z);
        lamp.castShadow = true;

        lamp.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        const lampLight = new THREE.PointLight("#FFB347", 30000, 200);
        lampLight.position.set(
            x < 0 ? x + 30 : x - 30,
            lamp.position.y + 80,
            lamp.position.z,
        );
        lampLight.castShadow = true;
        lampLight.decay = 2;
        scene.add(lampLight);
        scene.add(lamp);
        if (enableFlicker) {
            getEvents().addEventListener("intro-animation-complete", () => {
                flickerLightAnimation(lampLight);
            });
        }
    };

    const flickerLightAnimation = (lampLight) => {
        lampLight.intensity = 5 + Math.random() * 30000; // Random intensity between 5-7
        setTimeout(() => flickerLightAnimation(lampLight), Math.random() * 300); // Random delay (0-200ms)
    };

    return { initLamp };
};
