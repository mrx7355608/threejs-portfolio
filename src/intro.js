import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { fontLoader } from "./loaders";

export const Intro = (scene) => {
    const createText = ({ text, size, frontColor, zPos, yPos, xPos }) => {
        if (!text) {
            throw new Error("No text provided");
        }

        fontLoader.load("fonts/ibm_blex.typeface.json", (font) => {
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

    const showIntro = () => {
        createText({
            text: "Hi! I am Fawad",
            size: 30,
            frontColor: "#8B2E2E",
            zPos: 1500,
            yPos: 50,
            xPos: -100,
        });
        createText({
            text: "A Fullstack Developer",
            size: 13,
            frontColor: "#8b2e2e",
            zPos: 1500,
            yPos: 30,
            xPos: 50,
        });
    };

    return { showIntro };
};
