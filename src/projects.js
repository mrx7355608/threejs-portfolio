import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { fontLoader, modelsLoader, textureLoader } from "./loaders";

export const Projects = (scene, camera) => {
    const aspect = 1920 / 1080;
    const PLANE_WIDTH = 250;
    const PLANE_HEIGHT = PLANE_WIDTH / aspect;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const createProject = ({
        title,
        stack,
        previewImage,
        code,
        demo,
        position,
        rotateY = false,
    }) => {
        createImagePlane({ previewImage, position, rotateY });
        createTitleAndStackTexts({ title, stack, position, rotateY });
        createSourceAndLiveSignBoard({
            position,
            rotateY,
            urls: [code, demo],
        });
    };

    const createImagePlane = ({ previewImage, position, rotateY }) => {
        const geom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
        const texture = textureLoader.load(previewImage);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.copy(position);
        mesh.castShadow = true;
        if (rotateY) {
            mesh.rotation.y = -Math.PI / 2;
            // mesh.rotation.x = 0;
        } else {
            mesh.rotation.y = 0;
            mesh.rotation.x = -Math.PI / 24;
        }
        scene.add(mesh);
    };

    const createTitleAndStackTexts = ({ title, stack, position, rotateY }) => {
        if (!title) {
            throw new Error("Title text is missing");
        }
        if (!stack) {
            throw new Error("Stack text is missing");
        }

        fontLoader.load("fonts/ibm_blex.typeface.json", (font) => {
            /* Title text */
            const titleTextGeom = new TextGeometry(title, {
                font: font,
                size: 14,
                depth: 0,
            });
            const material = new THREE.MeshBasicMaterial({
                color: "#F28D95",
            });
            const mesh1 = new THREE.Mesh(titleTextGeom, material);
            mesh1.castShadow = true;
            mesh1.receiveShadow = true;
            mesh1.position.x = rotateY ? position.x - 10 : position.x - 100;
            mesh1.position.y = position.y - 50;
            mesh1.position.z = rotateY ? position.z - 100 : position.z + 20;
            mesh1.rotation.y = rotateY ? -Math.PI / 2 : 0;
            scene.add(mesh1);

            /* Stack text */
            const stackTextGeom = new TextGeometry(stack, {
                font: font,
                size: 6,
                depth: 0,
            });
            const material2 = new THREE.MeshBasicMaterial({
                color: "#FFF4C2",
            });
            const mesh2 = new THREE.Mesh(stackTextGeom, material2);
            mesh2.castShadow = true;
            mesh2.receiveShadow = true;
            mesh2.position.x = rotateY ? position.x - 10 : position.x - 100;
            mesh2.position.y = position.y - 60;
            mesh2.position.z = rotateY ? position.z - 100 : position.z + 25;
            mesh2.rotation.y = rotateY ? -Math.PI / 2 : 0;
            scene.add(mesh2);
        });
    };

    const addClickListener = (textMesh) => {
        window.addEventListener("click", (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(textMesh);

            if (intersects.length > 0) {
                console.log("Text Clicked!");
                const { text } = textMesh.userData;
                const url = "https://github.com/mrx7355608/threejs-portfolio";
                if (text === "Code") {
                    window.open(url, "_blank");
                }
            }
        });
    };

    const createSourceAndLiveSignBoard = ({ position, rotateY, urls }) => {
        modelsLoader.load("models/wooden-sign2.glb", (gltf) => {
            const board = gltf.scene;
            board.scale.set(80, 80, 80);
            board.position.x = rotateY ? position.x - 10 : position.x + 190;
            board.position.z = rotateY ? position.z + 200 : position.z + 20;
            board.rotation.y = rotateY ? -Math.PI / 2 : 0;
            board.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });
            scene.add(board);

            /* Code button */

            /* Demo button */
        });
    };

    const addProjectsToScene = () => {
        createProject({
            title: "Linux Rice",
            stack: "Archlinux, Hyprland, Waybar, Kitty, Neovim",
            previewImage: "textures/projects/linux-rice.png",
            code: "https://github.com/mrx7355608/dotfiles",
            demo: null,
            position: new THREE.Vector3(600, 80, -650),
            rotateY: true,
        });
        createProject({
            title: "Linux Rice",
            stack: "Archlinux, Hyprland, Waybar, Kitty, Neovim",
            previewImage: "textures/projects/linux-rice.png",
            code: "https://github.com/mrx7355608/dotfiles",
            demo: null,
            position: new THREE.Vector3(50, 80, 100),
        });
        createProject({
            title: "Medium.com Clone",
            stack: "React, Typescript, Express, MongoDB, ChakraUI",
            previewImage: "textures/projects/medium-clone.png",
            code: "https://github.com/mrx7355608/chatapplication",
            demo: null,
            position: new THREE.Vector3(50, 80, -400),
        });
        createProject({
            title: "Facebook clone",
            stack: "React, Nodejs, Express, MongoDB, Tailwindcss",
            previewImage: "textures/projects/facebook-clone.png",
            code: "https://github.com/mrx7355608/chatapplication",
            demo: null,
            position: new THREE.Vector3(900, 80, -650),
            rotateY: true,
        });
        createProject({
            title: "Facebook clone",
            stack: "React, Nodejs, Express, MongoDB, Tailwindcss",
            previewImage: "textures/projects/facebook-clone.png",
            code: "https://github.com/mrx7355608/chatapplication",
            demo: null,
            position: new THREE.Vector3(50, 80, -750),
        });
    };

    return { addProjectsToScene };
};
