import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export const Text3D = (scene) => {
    const loader = new FontLoader();

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

            textMesh.position.set(xPos, yPos, zPos);
            textMesh.visible = true;
            scene.add(textMesh);
        });
    };

    return { createText };
};
