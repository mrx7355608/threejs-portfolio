import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
        camera.position.y = 1100;
        camera.lookAt(0, 0, 0);
        camera.position.x = 150;

        gsap.to(camera.position, {
            y: 80, // Move down
            z: -200, // Move forward
            duration: 3,
            ease: "power2.out",
        });

        gsap.to(camera.rotation, {
            x: -Math.PI / 11,
            duration: 3,
            ease: "power2.out",
            onComplete: () => {
                getEvents().dispatchEvent(
                    new Event("intro-animation-complete"),
                );
            },
        });
    };

    return { playIntroAnimation };
};
