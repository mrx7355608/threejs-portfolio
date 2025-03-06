import * as THREE from "three";

export const Fire = (scene) => {
    let fireParticles;
    let fireGeometry;

    const createFire = () => {
        // Create a buffer geometry for fire particles
        fireGeometry = new THREE.BufferGeometry();
        fireParticles = new Float32Array(800 * 3); // 100 particles, each with x, y, z

        for (let i = 0; i < fireParticles.length; i += 3) {
            fireParticles[i] = (Math.random() - 0.5) * 20; // X-axis spread
            fireParticles[i + 1] = Math.random() * 70; // Height of fire
            fireParticles[i + 2] = (Math.random() - 0.5) * 20; // Z-axis spread
        }

        fireGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(fireParticles, 3),
        );

        const fireMaterial = new THREE.PointsMaterial({
            color: "yellow",
            size: 3,
            depthWrite: false,
            blending: THREE.AdditiveBlending, // Makes it glow
        });

        // Create fire object
        const fire = new THREE.Points(fireGeometry, fireMaterial);
        fire.position.set(1280, 20, -620); // Adjust position over campfire
        scene.add(fire);
    };

    const animateFire = () => {
        const positions = fireGeometry.attributes.position.array;

        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += 0.09; // Move particles upwards
            if (positions[i] > 20) {
                positions[i] = 0; // Reset position to bottom
            }
        }

        fireGeometry.attributes.position.needsUpdate = true;
    };

    return { createFire, animateFire };
};
