import { Init } from "./init";
import { Lights } from "./lights";
import { SetupTreeModels } from "./trees";
import { Snowfall } from "./snowfall";
import { SnowPlane } from "./snow-plane";
import { Animations } from "./animations";
import { Intro } from "./intro";
import { SetupLampModel } from "./lamp";
import { SetupSkillBoards } from "./skill-boards";
import { Projects } from "./projects";
import { Contacts } from "./contact";
// import { loadingManager } from "./loadingManager";
// import { getEvents } from "./events";

/* Main setup things */
const { scene, camera, renderer } = Init();

/* Lights */
const { directional, ambient } = Lights();
scene.add(directional);
scene.add(ambient);

/* Snowfall */
const snowfall = Snowfall();
scene.add(snowfall.snowfall);

/* Plane */
const { displayPlane } = SnowPlane(scene);
displayPlane();

/* Models */
const { initTreeAndTreeRocks } = SetupTreeModels(scene);
const { initLamp, initStreetLamp } = SetupLampModel(scene);
initLamp();
initStreetLamp();
initTreeAndTreeRocks();

/* Intro */
const { showIntro } = Intro(scene);
showIntro();

/* Skills */
const { createSkillBoards } = SetupSkillBoards(scene);
createSkillBoards();

/* Projects */
const { addProjectsToScene } = Projects(scene, camera);
addProjectsToScene();

/* Contacts */
const { initContactSection, animateFire } = Contacts(scene, camera);
initContactSection();

/* Animations */
const {
    playIntroAnimation,
    playRotationAnimation,
    playReverseRotationAnimation,
} = Animations(camera, scene);

/* Add scroll event listener */
document.body.appendChild(renderer.domElement);

let isRotated = false;
document.addEventListener("wheel", (e) => {
    const isScrollingUp = e.deltaY < 0;
    if (isScrollingUp) {
        if (camera.position.x < 80 && isRotated) {
            playReverseRotationAnimation();
            camera.updateProjectionMatrix();
            isRotated = false;
            return;
        }
    }

    if (camera.position.z < 50 && !isRotated) {
        playRotationAnimation();
        camera.updateProjectionMatrix();
        isRotated = true;
        return;
    }
    if (isRotated) {
        camera.position.x += e.deltaY / 10;
        camera.updateProjectionMatrix();
        return;
    }

    camera.position.z -= e.deltaY / 10;
    camera.updateProjectionMatrix();
});

/* Animation Loop */
const animate = () => {
    snowfall.animateSnowfall();
    animateFire();
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

// loadingManager.onLoad = () => {
//     setTimeout(() => {
//         document.getElementById("loading-screen").style.display = "none";
//         renderer.setAnimationLoop(animate);
//         // setTimeout(playIntroAnimation, 1000);
//     }, 2000);
// };
//
// getEvents().addEventListener("intro-animation-complete", () => {
//     const elem = document.getElementById("tip-screen");
//     elem.style.display = "flex";
//
//     setTimeout(() => (elem.style.display = "none"), 8000);
// });
