import * as THREE from "three";
import { modelsLoader, textureLoader } from "./loaders";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const Contacts = (scene, camera) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const fireParticles = new THREE.Group();
    const particleCount = 200;
    const particles = [];
    const fireSharedPosition = new THREE.Vector3(1350, 5, -650);

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
            const pointLight = new THREE.PointLight("#FF4500", 30000);
            pointLight.position.copy(fireSharedPosition);
            scene.add(pointLight);
            scene.add(bonfire);
        });
    };

    const loadCatModel = () => {
        modelsLoader.load("models/cat.glb", (gltf) => {
            const cat = gltf.scene;
            cat.position.set(1350, 0, -720);
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
            bench.position.set(1400, 0, -550);
            bench.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            createBoxes(bench);
            scene.add(bench);
        });
    };

    const createBoxes = (bench) => {
        const githubIcon = textureLoader.load(
            "textures/social-icons/github.png",
        );
        const linkedinIcon = textureLoader.load(
            "textures/social-icons/linkedin.png",
        );
        const emailIcon = textureLoader.load(
            "textures/social-icons/envelope.png",
        );
        const githubUrl = "https://github.com/mrx7355608";
        const linkedinUrl = "https://linkedin.com/in/fawadimran";
        const myEmail = "mailto:fawad.imran.000@gmail.com";
        const github = createSocialIconBox(githubIcon, githubUrl);
        const linkedin = createSocialIconBox(linkedinIcon, linkedinUrl);
        const email = createSocialIconBox(emailIcon, myEmail);

        // Adjust positions
        const { x, y, z } = bench.position;
        github.position.set(x + 5, y + 40, z - 30);
        linkedin.position.set(x + 3, y + 40, z - 10);
        email.position.set(x, y + 40, z + 10);
        scene.add(github);
        scene.add(email);
        scene.add(linkedin);
    };

    const createSocialIconBox = (texture, url) => {
        const boxGeom = new RoundedBoxGeometry(12, 18, 18, 18, 2);
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
        mesh.userData.url = url;
        return mesh;
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

    const initContactSection = () => {
        loadBonfireModel();
        createFire();
        loadCatModel();
        loadBenchModel();
        window.addEventListener("click", onMouseClick);
    };

    return { initContactSection, animateFire };
};
