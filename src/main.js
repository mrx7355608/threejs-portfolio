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
import gsap from "gsap";

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

/* Animations */
const { playIntroAnimation } = Animations(camera, scene);

/* Animation Loop */
renderer.setAnimationLoop(() => {
    snowfall.animateSnowfall();
    camera.updateProjectionMatrix();

    if (camera.position.z < -250) {
        gsap.to(camera.rotation, {
            y: -Math.PI / 2,
            duration: 2,
            ease: "power2.out",
        });
    }

    renderer.render(scene, camera);
});
document.body.appendChild(renderer.domElement);
document.addEventListener("wheel", (e) => {
    if (camera.position.z <= -250) {
        camera.position.x += e.deltaY / 10;
        return;
    }
    camera.position.z -= e.deltaY / 10;
});

// setTimeout(playIntroAnimation, 4000);
