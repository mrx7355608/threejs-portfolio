import * as THREE from "three";
import { getEvents } from "./events";
import { modelsLoader } from "./loaders";

export const SetupLampModel = (scene) => {
    const initLamp = () => {
        modelsLoader.load("models/kerosene-lamp.glb", (gltf) => {
            const lamp = gltf.scene;
            const lamp1 = lamp.clone();

            setupKeroseneLampAndLampsLight(lamp, -150, 450);
        });
    };

    const initStreetLamp = () => {
        modelsLoader.load("models/street-lamp.glb", (gltf) => {
            const lamp = gltf.scene;
            const lamp2 = lamp.clone();
            const lamp3 = lamp.clone();
            const lamp4 = lamp.clone();

            setupStreetLamp(lamp, 300, 450);
            setupStreetLamp(lamp2, -200, -250, true);
            setupStreetLamp(lamp3, 700, -800);
            // setupStreetLamp(lamp4, 300, 1600, true);
        });
    };

    const setupKeroseneLampAndLampsLight = (
        lamp,
        x,
        z,
        enableFlicker = false,
    ) => {
        lamp.scale.set(70, 70, 50);
        lamp.position.set(x, 20, z);
        lamp.castShadow = true;

        lamp.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        const lampLight = new THREE.PointLight("#FFB347", 30000);
        lampLight.position.set(
            x < 0 ? x + 10 : x - 10,
            lamp.position.y + 20,
            lamp.position.z,
        );
        lampLight.castShadow = true;
        lampLight.decay = 2;
        lampLight.shadow.mapSize.width = 1024;
        lampLight.shadow.mapSize.height = 1024;
        scene.add(lampLight);
        scene.add(lamp);
        if (enableFlicker) {
            getEvents().addEventListener("intro-animation-complete", () => {
                flickerLightAnimation(lampLight);
            });
        }
    };

    const setupStreetLamp = (lamp, x, z, enableFlicker = false) => {
        lamp.scale.set(8, 8, 8);
        lamp.position.set(x, 0, z);

        lamp.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        const lampLight = new THREE.PointLight("#FFB347", 60000);
        lampLight.position.set(
            x < 0 ? x + 50 : x - 50,
            lamp.position.y + 100,
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

    return { initLamp, initStreetLamp };
};
