import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
        gsap.to(camera.position, {
            y: 70, // Move down
            z: -100, // Move forward
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
