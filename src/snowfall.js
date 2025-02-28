import * as THREE from "three";

let positions = [];
let velocities = [];
const numFlakes = 5000;
const maxRange = 1000;
const minRange = maxRange / 2;
const minHeight = 150;

let particles;

export const createSnow = () => {
    const geom = new THREE.BufferGeometry();

    for (let i = 0; i < numFlakes; i++) {
        positions.push(
            Math.floor(Math.random() * maxRange - minRange),
            Math.floor(Math.random() * minRange + minHeight),
            Math.floor(Math.random() * maxRange - minRange),
        );

        velocities.push(
            Math.floor(Math.random() * 6 - 3) * 0.1,
            Math.floor(Math.random() * 5 + 0.12) * 0.18,
            Math.floor(Math.random() * 6 - 3) * 0.1,
        );
    }

    geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
    );
    geom.setAttribute(
        "velocity",
        new THREE.Float32BufferAttribute(velocities, 3),
    );

    const texture = new THREE.TextureLoader().load(
        "textures/snow/snow-ball.png",
    );
    const material = new THREE.PointsMaterial({
        map: texture,
        size: 2,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
        depthTest: false,
    });

    particles = new THREE.Points(geom, material);
    return particles;
};

export const updateSnow = () => {
    const { position, velocity } = particles.geometry.attributes;
    for (let i = 0; i < numFlakes * 3; i += 3) {
        position.array[i] -= velocity.array[i];
        position.array[i + 1] -= velocity.array[i + 1];
        position.array[i + 2] -= velocity.array[i + 2];

        if (position.array[i + 1] < 0) {
            position.array[i] = Math.floor(Math.random() * maxRange - minRange);
            position.array[i + 1] = Math.floor(
                Math.random() * minRange + minHeight,
            );
            position.array[i + 2] = Math.floor(
                Math.random() * maxRange - minRange,
            );
        }
    }

    position.needsUpdate = true;
};
