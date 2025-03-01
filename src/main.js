import { Init } from "./init";
import { Lights } from "./lights";
import { SetupTreeModels } from "./trees";
import { Snowfall } from "./snowfall";
import { SnowPlane } from "./snow-plane";
import { Animations } from "./animations";
import { Text3D } from "./text";
import { SetupWoodenSignModels } from "./wooden-signs";

/* Main setup things */
const { scene, camera, renderer } = Init();

/* Lights */
const { directional, ambient } = Lights();
scene.add(directional);
scene.add(ambient);

/* Snowfall */
const snowfall = Snowfall();
scene.add(snowfall.snowfall);

/* Snow plane */
const { plane } = SnowPlane();
scene.add(plane);

/* Models */
const { initTreeAndTreeRocks } = SetupTreeModels(scene);
const { initWoodenBoardAndLamp } = SetupWoodenSignModels(scene);
initTreeAndTreeRocks();
initWoodenBoardAndLamp();

/* 3D text */
const { createText } = Text3D(scene);
createText("Hello");

/* Animations */
const { playIntroAnimation } = Animations(camera, scene);

/* Animation Loop */
renderer.setAnimationLoop(() => {
    snowfall.animateSnowfall();
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});
document.body.appendChild(renderer.domElement);
document.addEventListener("wheel", (e) => {
    camera.position.z -= e.deltaY / 10;
});

// setTimeout(() => {
//     playIntroAnimation();
// }, 2000);
