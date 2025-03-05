import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { fontLoader, modelsLoader, textureLoader } from "./loaders";

export const Projects = (scene, camera) => {
    const aspect = 1306 / 581;
    const PLANE_WIDTH = 300;
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
        yRotation = -Math.PI / 2,
    }) => {
        createImagePlane({ previewImage, position, yRotation });
        createTitleAndStackTexts({ title, stack, position, yRotation });
        createSourceAndLiveSignBoard({
            position,
            yRotation,
            urls: [code, demo],
        });
    };

    const createImagePlane = ({ previewImage, position, yRotation }) => {
        const geom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
        const texture = textureLoader.load(previewImage);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.copy(position);
        mesh.castShadow = true;
        mesh.rotation.y = yRotation;
        scene.add(mesh);
    };

    const createTitleAndStackTexts = ({
        title,
        stack,
        position,
        yRotation,
    }) => {
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
                size: 18,
                depth: 0,
            });
            const material = new THREE.MeshBasicMaterial({
                color: "red",
            });
            const mesh1 = new THREE.Mesh(titleTextGeom, material);
            mesh1.castShadow = true;
            mesh1.receiveShadow = true;
            mesh1.position.x = position.x;
            mesh1.position.y = position.y - 90;
            mesh1.position.z = position.z + 20;
            mesh1.rotation.y = yRotation;
            scene.add(mesh1);

            /* Stack text */
            const stackTextGeom = new TextGeometry(stack, {
                font: font,
                size: 10,
                depth: 0,
            });
            const material2 = new THREE.MeshBasicMaterial({
                color: "blue",
            });
            const mesh2 = new THREE.Mesh(stackTextGeom, material2);
            mesh2.castShadow = true;
            mesh2.receiveShadow = true;
            mesh2.position.x = position.x;
            mesh2.position.y = position.y - 100;
            mesh2.position.z = position.z + 20;
            mesh2.rotation.y = yRotation;
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
    const createSourceAndLiveSignBoard = ({ position, yRotation, urls }) => {
        modelsLoader.load("models/wooden-sign2.glb", (gltf) => {
            const board = gltf.scene;
            board.scale.set(80, 80, 80);
            board.position.y = 0;
            board.position.x = position.x;
            board.position.z = position.z + 200;
            board.rotation.y = yRotation;
            if (yRotation === 0) {
                board.position.x = position.x + 190;
                board.position.z = position.z + 20;
            }
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
        // createProject({
        //     title: "CHAT APPLICATION",
        //     stack: "MongoDB, Nextjs, Prisma, Ably Realtime",
        //     previewImage: "textures/projects/chatapplication.png",
        //     code: "https://github.com/mrx7355608/chatapplication",
        //     demo: null,
        //     position: new THREE.Vector3(50, 110, -1100),
        //     first: true,
        // });
        createProject({
            title: "Linux Rice",
            stack: "Archlinux, Hyprland, Waybar, Kitty, Neovim",
            previewImage: "textures/projects/linux-rice.png",
            code: "https://github.com/mrx7355608/dotfiles",
            demo: null,
            position: new THREE.Vector3(50, 110, -1100),
            yRotation: 0,
        });
        createProject({
            title: "Medium.com Clone",
            stack: "MERN",
            previewImage: "textures/projects/medium-clone.png",
            code: "https://github.com/mrx7355608/chatapplication",
            demo: null,
            position: new THREE.Vector3(1100, 110, -900),
        });
        createProject({
            title: "Facebook clone",
            stack: "MERN",
            previewImage: "textures/projects/facebook-clone.png",
            code: "https://github.com/mrx7355608/chatapplication",
            demo: null,
            position: new THREE.Vector3(1500, 110, -900),
        });
    };

    return { addProjectsToScene };
};
