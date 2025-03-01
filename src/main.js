import { Init } from "./init";
import { Lights } from "./lights";
import { SetupModels } from "./tree";
import { Snowfall } from "./snowfall";
import { SnowPlane } from "./snow-plane";
import { Animations } from "./animations";

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
const { init } = SetupModels(scene);
init();

/* Animation Loop */
renderer.setAnimationLoop(() => {
    snowfall.animateSnowfall();
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});
document.body.appendChild(renderer.domElement);
document.addEventListener("wheel", (e) => {
    camera.position.z -= e.deltaY / 100;
});

const { playIntroAnimation } = Animations(camera);
setTimeout(playIntroAnimation, 2000);
