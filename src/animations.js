import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = (cb) => {
        gsap.to(camera.position, {
            y: 70, // Move down
            z: 2500, // Move forward
            duration: 3,
            ease: "power1.out",
            autoAlpha: 1,
        });

        gsap.to(camera.rotation, {
            y: 0,
            x: -0.2,
            duration: 3,
            ease: "power1.out",
            autoAlpha: 1,
            onComplete: () => {
                cb();
                getEvents().dispatchEvent(
                    new Event("intro-animation-complete"),
                );
            },
        });
    };

    const playRotationAnimation = (cb) => {
        gsap.to(camera.position, {
            z: 70,
            duration: 1.5,
            ease: "power2.out",
            immediateRender: false,
        });

        /* Rotate camera */
        gsap.to(camera.rotation, {
            x: 0,
            y: -Math.PI / 2,
            duration: 1.5,
            ease: "power2.out",
            immediateRender: true,
            ease: "power2.out",
            onComplete: cb,
        });
    };

    const playReverseRotationAnimation = (cb) => {
        gsap.to(camera.rotation, {
            y: 0,
            x: 0,
            z: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: cb,
        });
    };

    return {
        playIntroAnimation,
        playRotationAnimation,
        playReverseRotationAnimation,
    };
};
