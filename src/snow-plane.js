import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { fontLoader } from "./loaders";

export const SnowPlane = (scene) => {
    const initPlane = () => {
        const geometry = new THREE.PlaneGeometry(5000, 6500, 128, 128);
        const material = new THREE.MeshPhongMaterial({
            color: "white",
        });
        const mesh = new THREE.Mesh(geometry, material);

        /* Config */
        geometry.rotateX(-Math.PI / 2);
        mesh.receiveShadow = true;
        scene.add(mesh);
    };

    const displayPlane = () => {
        initPlane();
        createGroundText({ text: "S K I L L S", zPos: 800, xPos: 0 });
        createGroundText({
            text: "P R O J E C T S",
            zPos: -400,
            xPos: -50,
        });
    };

    const createGroundText = ({ text, zPos, xPos }) => {
        if (!text) {
            throw new Error("No text provided");
        }

        fontLoader.load("fonts/ibm_blex.typeface.json", (font) => {
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 25,
                depth: 0,
                bevelEnabled: true,
                bevelSize: 4,
                bevelOffset: 1,
                bevelSegments: 60,
            });
            const frontMaterial = new THREE.MeshPhongMaterial({
                color: "pink",
            });
            const textMesh = new THREE.Mesh(textGeometry, frontMaterial);

            textGeometry.rotateX(-Math.PI / 2);
            textMesh.castShadow = true;
            textMesh.receiveShadow = true;
            textMesh.position.set(xPos, -6, zPos);
            scene.add(textMesh);
        });
    };

    return { displayPlane };
};
