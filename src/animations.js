import gsap from "gsap";

export const Animations = (camera) => {
    const playIntroAnimation = () => {
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
        });
    };

    return { playIntroAnimation };
};
