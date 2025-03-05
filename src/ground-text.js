import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const loader = new FontLoader();
export const createGroundText = ({ scene, text, zPos, xPos }) => {
    if (!text) {
        throw new Error("No text provided");
    }

    loader.load("fonts/ibm_blex.typeface.json", (font) => {
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
        textMesh.visible = true;
        scene.add(textMesh);
    });
};
