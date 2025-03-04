import { Init } from "./init";
import { Lights } from "./lights";
import { SetupTreeModels } from "./trees";
import { Snowfall } from "./snowfall";
import { SnowPlane } from "./snow-plane";
import { Animations } from "./animations";
import { Text3D } from "./text";
import { SetupLampModel } from "./lamp";
import { SetupSkillBoards } from "./skill-boards";
import { Projects } from "./projects";
import { createGroundText } from "./ground-text";

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
const { initLamp, initStreetLamp } = SetupLampModel(scene);
const { createSkillBoards } = SetupSkillBoards(scene);
initLamp();
initStreetLamp();
initTreeAndTreeRocks();
createSkillBoards();

/* 3D text */
const { createText } = Text3D(scene);
createText({
    text: "Hello! I am Fawad",
    size: 30,
    frontColor: "#f7cfe7",
    zPos: 1500,
    yPos: 50,
    xPos: -100,
});
createText({
    text: "A Fullstack Developer",
    size: 13,
    frontColor: "#f7cfe7",
    zPos: 1500,
    yPos: 30,
    xPos: 50,
});

const { addProjectsToScene } = Projects(scene);
addProjectsToScene();

/* Animations */
const { playIntroAnimation } = Animations(camera, scene);

createGroundText({ scene, text: "S K I L L S", zPos: 800 });
createGroundText({ scene, text: "P R O J E C T S", zPos: -800 });

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

// setTimeout(playIntroAnimation, 2000);
