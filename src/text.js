import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { getEvents } from "./events";
import gsap from "gsap";

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
                bevelSize: 4,
                bevelSegments: 5,
            });
            const frontMaterial = new THREE.MeshPhongMaterial({
                color: 0xffaa00,
            });
            const sideMaterial = new THREE.MeshPhongMaterial({
                color: 0x44ffff,
            });
            const textMesh = new THREE.Mesh(textGeometry, [
                frontMaterial,
                sideMaterial,
            ]);
            textMesh.castShadow = true;

            textMesh.position.set(50, 70, 1700);
            textMesh.visible = false;
            scene.add(textMesh);

            // FIXME: decouple this animation logic into animations.js file
            getEvents().addEventListener("intro-animation-complete", () => {
                textMesh.visible = true;
                gsap.from(textMesh.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 2,
                    ease: "elastic.out(1, 0.5)",
                });
            });
        });
    };

    return { createText };
};
