import * as THREE from "three";
import { modelsLoader, textureLoader } from "./loaders";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const Contacts = (scene) => {
    const loadBonfireModel = () => {
        modelsLoader.load("models/bonfire.glb", (gltf) => {
            const bonfire = gltf.scene;
            bonfire.position.set(1320, 5, -620);
            bonfire.scale.set(140, 140, 140);
            bonfire.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            const pointLight = new THREE.PointLight("yellow", 20000);
            pointLight.position.set(1320, 30, -620);
            scene.add(pointLight);
            scene.add(bonfire);
        });
    };

    const createSpheres = (bench) => {
        const githubIcon = textureLoader.load(
            "textures/social-icons/github.png",
        );
        const linkedinIcon = textureLoader.load(
            "textures/social-icons/linkedin.png",
        );
        const emailIcon = textureLoader.load(
            "textures/social-icons/envelope.png",
        );
        const wtspIcon = textureLoader.load(
            "textures/social-icons/whatsapp.png",
        );
        const github = createSocialIconBox(githubIcon, bench);
        const linkedin = createSocialIconBox(linkedinIcon, bench);
        const email = createSocialIconBox(emailIcon, bench);
        const whatsapp = createSocialIconBox(wtspIcon, bench);

        // Adjust positions
        const { x, y, z } = bench.position;
        github.position.set(x + 5, y + 37, z - 30);
        linkedin.position.set(x + 3, y + 37, z - 10);
        email.position.set(x, y + 37, z + 30);
        whatsapp.position.set(x, y + 37, z + 10);
        scene.add(github);
        scene.add(whatsapp);
        scene.add(email);
        scene.add(linkedin);
    };

    const createSocialIconBox = (texture) => {
        const boxGeom = new RoundedBoxGeometry(16, 16, 16, 16, 2);
        const sideMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        const frontMaterial = new THREE.MeshStandardMaterial({
            color: "white",
            map: texture,
        });

        // BoxGeometry with different materials for each face
        const materials = [
            sideMaterial, // Right
            frontMaterial, // Front
            sideMaterial, // Left
            sideMaterial, // Top (will be replaced)
            sideMaterial, // Bottom
            sideMaterial, // Back
        ];

        const mesh = new THREE.Mesh(boxGeom, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.y = -0.2;
        return mesh;
    };

    const createPointLight = (color) => {};

    const createBench = () => {
        modelsLoader.load("models/bench.glb", (gltf) => {
            const bench = gltf.scene;
            const bench2 = bench.clone();

            bench.scale.set(200, 200, 200);
            bench.rotation.y = -30;
            bench.position.set(1400, 0, -550);
            bench.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            createSpheres(bench);

            bench2.scale.set(200, 200, 200);
            bench2.rotation.y = -180;
            bench2.position.set(1400, 0, -700);
            bench2.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(bench);
            scene.add(bench2);
        });
    };

    const initContactSection = () => {
        loadBonfireModel();
        createBench();
    };

    return { initContactSection };
};
