import gsap from "gsap";
import { getEvents } from "./events";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
        gsap.to(camera.position, {
            y: 70, // Move down
            z: 2500, // Move forward
            duration: 4,
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
        /* Move camera in z-axis to cross -160 limit */
        gsap.to(camera.position, {
            z: -150,
            duration: 2,
            ease: "power2.out",
            immediateRender: false,
        });

        /* Rotate camera */
        gsap.to(camera.rotation, {
            x: 0,
            y: -Math.PI / 2,
            duration: 2,
            ease: "power2.out",
            immediateRender: true,
        });
    };

    const playReverseRotationAnimation = () => {
        gsap.to(camera.rotation, {
            y: 0,
            x: 0,
            z: 0,
            duration: 1,
            ease: "power2.out",
        });
    };

    return {
        playIntroAnimation,
        playRotationAnimation,
        playReverseRotationAnimation,
    };
};
