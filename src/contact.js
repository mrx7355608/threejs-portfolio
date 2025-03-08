import * as THREE from "three";
import { modelsLoader, textureLoader, fontLoader } from "./loaders";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const Contacts = (scene, camera) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const fireParticles = new THREE.Group();
    const particleCount = 200;
    const particles = [];
    const fireSharedPosition = new THREE.Vector3(1400, 5, -650);

    const loadBonfireModel = () => {
        modelsLoader.load("models/bonfire.glb", (gltf) => {
            const bonfire = gltf.scene;
            bonfire.position.copy(fireSharedPosition);
            bonfire.scale.set(140, 140, 140);
            bonfire.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            const pointLight = new THREE.PointLight("yellow", 30000);
            pointLight.position.copy(fireSharedPosition);
            scene.add(pointLight);
            scene.add(bonfire);
        });
    };

    const loadCatModel = () => {
        modelsLoader.load("models/cat.glb", (gltf) => {
            const cat = gltf.scene;
            cat.position.set(1400, 0, -720);
            cat.scale.set(0.2, 0.2, 0.2);
            cat.rotation.y = 20;
            cat.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(cat);
        });
    };

    const createFire = () => {
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(3, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: "#FF4500",
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });

            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                (Math.random() - 0.5) * 10,
                Math.random() * Math.random(),
                (Math.random() - 0.5) * 20,
            );
            particles.push(particle);
            fireParticles.add(particle);
        }
        fireParticles.position.copy(fireSharedPosition);
        scene.add(fireParticles);
    };

    const animateFire = () => {
        particles.forEach((p, index) => {
            if (index % 2 == 0) {
                p.position.y += Math.random() * (Math.random() * 3); // Move particles upward
                p.material.opacity -= 0.05; // Fade out effect

                if (p.material.opacity <= 0) {
                    p.position.y = Math.random(); // Reset to the bottom
                    p.material.opacity = 1; // Reset opacity
                }
            } else {
                p.position.y += Math.random() * (Math.random() * 3); // Move particles upward
                p.material.opacity -= 0.03; // Fade out effect

                if (p.material.opacity <= 0) {
                    p.position.y = 0; // Reset to the bottom
                    p.material.opacity = 1; // Reset opacity
                }
            }
        });
    };

    const loadBenchModel = () => {
        modelsLoader.load("models/bench.glb", (gltf) => {
            const bench = gltf.scene;
            bench.scale.set(200, 200, 200);
            bench.rotation.y = -30;
            bench.position.set(1500, 0, -550);
            bench.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            // createBoxes(bench);
            scene.add(bench);
        });
    };

    const onMouseClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (clickedObject.userData.url) {
                window.open(clickedObject.userData.url, "_blank");
            }
        }
    };

    const create3dText = ({ text, zPos, yPos = 0, xPos, rotateY = 0 }) => {
        if (!text) {
            throw new Error("No text provided");
        }

        fontLoader.load("fonts/ibm_blex.typeface.json", (font) => {
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 15,
                depth: 0,
                bevelEnabled: true,
                bevelSize: 2,
                bevelOffset: 1,
                curveSegments: 5,
            });
            const material = new THREE.MeshPhongMaterial({
                color: "#ff9966",
            });
            const textMesh = new THREE.Mesh(textGeometry, material);
            textMesh.castShadow = true;
            textMesh.receiveShadow = true;
            textMesh.position.set(xPos, yPos, zPos);
            textMesh.rotation.y = rotateY;
            scene.add(textMesh);
        });
    };

    const initContactSection = () => {
        loadBonfireModel();
        createFire();
        loadCatModel();
        loadBenchModel();
        create3dText({
            text: "GITHUB",
            zPos: -600,
            xPos: 1500,
            rotateY: -1.8,
            yPos: 35,
        });
        create3dText({
            text: "LINKED IN",
            zPos: -550,
            yPos: 2,
            xPos: 1440,
            rotateY: -90,
        });
        create3dText({
            text: "EMAIL",
            zPos: -700,
            xPos: 1490,
            rotateY: -Math.PI / 2,
        });
        window.addEventListener("click", onMouseClick);
    };

    return { initContactSection, animateFire };
};
