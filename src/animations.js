import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
        camera.position.y = 1500;
        camera.lookAt(0, 0, 0);
        camera.position.x = 150;
        camera.position.z = 350;

        gsap.to(camera.position, {
            y: 70, // Move down
            z: 0, // Move forward
            duration: 3,
            ease: "power2.out",
        });

        gsap.to(camera.rotation, {
            x: -Math.PI / 12,
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
