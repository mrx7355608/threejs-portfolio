import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export const Text3D = (scene) => {
    const loader = new FontLoader();

    const createText = (text) => {
        if (!text) {
            throw new Error("No text provided");
        }

        loader.load("fonts/ibm_blex.typeface.json", (font) => {
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 50, // Text size
                depth: 15, // Depth (thickness)
                curveSegments: 7, // Smoothness
                bevelEnabled: true, // Optional bevel
                bevelThickness: 5,
                bevelSize: 2,
                bevelSegments: 5,
            });
            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0xffcc00,
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.castShadow = true;

            textMesh.position.set(50, 70, -500);
            scene.add(textMesh);
        });
    };

    return { createText };
};
