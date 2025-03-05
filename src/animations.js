import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
        gsap.to(camera.position, {
            y: 70, // Move down
            z: 2500, // Move forward
            duration: 3,
            ease: "power2.out",
            immediateRender: false,
        });

        gsap.to(camera.rotation, {
            y: 0,
            x: -0.2,
            duration: 3,
            ease: "power2.out",
            immediateRender: true,
            onComplete: () => {
                getEvents().dispatchEvent(
                    new Event("intro-animation-complete"),
                );
            },
        });
    };

    const playRotationAnimation = () => {
        gsap.to(camera.rotation, {
            x: 0,
            y: -Math.PI / 2,
            duration: 2,
            ease: "power2.out",
        });
    };

    return { playIntroAnimation, playRotationAnimation };
};
