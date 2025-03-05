import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export const Projects = (scene, camera) => {
    const modelsLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const PLANE_WIDTH = 200;
    const PLANE_HEIGHT = 110;
    const loader = new FontLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const createImagePlane = () => {
        const geom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
        const texture = textureLoader.load("textures/snow/diffuse.png");
        const material = new THREE.MeshStandardMaterial({
            color: "white",
            map: texture,
        });
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.set(10, 120, -1100);
        mesh.castShadow = true;
        createText({
            text: "CHAT APPLICATION",
            size: 18,
            frontColor: "orange",
            zPos: mesh.position.z,
            yPos: mesh.position.y - 90,
            xPos: mesh.position.x - 40,
        });
        createText({
            text: "Nextjs, Prisma, Ably Realtime, MongoDB",
            size: 12,
            frontColor: "orange",
            zPos: mesh.position.z,
            yPos: mesh.position.y - 110,
            xPos: mesh.position.x - 140,
        });
        scene.add(mesh);
    };

    const createSourceAndLiveSignBoard = () => {
        modelsLoader.load("models/wooden-sign2.glb", (gltf) => {
            const board = gltf.scene;
            board.scale.set(70, 80, 20);
            board.position.set(200, 0, -1100);
            board.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });
            createText({
                text: "Code",
                size: 10,
                frontColor: "white",
                zPos: board.position.z + 2,
                yPos: board.position.y + 130,
                xPos: board.position.x - 25,
            });
            createText({
                text: "Demo",
                size: 10,
                frontColor: "white",
                zPos: board.position.z + 2,
                yPos: board.position.y + 55,
                xPos: board.position.x - 20,
            });
            scene.add(board);
        });
    };

    const createText = ({ text, size, frontColor, zPos, yPos, xPos }) => {
        if (!text) {
            throw new Error("No text provided");
        }

        loader.load("fonts/ibm_blex.typeface.json", (font) => {
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: size,
                depth: 0,
            });
            const frontMaterial = new THREE.MeshPhongMaterial({
                color: frontColor,
            });
            const textMesh = new THREE.Mesh(textGeometry, frontMaterial);
            textMesh.castShadow = true;
            textMesh.receiveShadow = true;
            textMesh.position.set(xPos, yPos, zPos);
            textMesh.visible = true;
            textMesh.userData.text = text;
            scene.add(textMesh);

            window.addEventListener("click", (event) => {
                // Convert mouse position to normalized device coordinates (-1 to +1)
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Raycast from the camera through the mouse position
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(textMesh);

                if (intersects.length > 0) {
                    console.log("Text Clicked!");
                    const { text } = textMesh.userData;
                    const url =
                        "https://github.com/mrx7355608/threejs-portfolio";
                    if (text === "Code") {
                        window.open(url, "_blank");
                    }
                }
            });
        });
    };

    const addProjectsToScene = () => {
        createImagePlane();
        createSourceAndLiveSignBoard();
    };

    return { addProjectsToScene };
};
