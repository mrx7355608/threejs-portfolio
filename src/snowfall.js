import * as THREE from "three";
import { textureLoader } from "./loaders";

const numFlakes = 15000;
const maxRange = -5000;
const minRange = maxRange / 2;
const minHeight = 250;

export const Snowfall = () => {
    const positions = [];
    const velocities = [];

    const initPositionsAndVelocities = () => {
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
    };

    const initSnowfall = () => {
        initPositionsAndVelocities();
        const pos = new THREE.Float32BufferAttribute(positions, 3);
        const vels = new THREE.Float32BufferAttribute(velocities, 3);

        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", pos);
        geom.setAttribute("velocity", vels);

        const texture = textureLoader.load("textures/snow/snow-ball.png");
        const material = new THREE.PointsMaterial({
            map: texture,
            size: 2,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.5,
            depthTest: false,
        });

        return new THREE.Points(geom, material);
    };

    const snowfall = initSnowfall();

    const animateSnowfall = () => {
        const { position, velocity } = snowfall.geometry.attributes;
        for (let i = 0; i < numFlakes * 3; i += 3) {
            position.array[i] -= velocity.array[i];
            position.array[i + 1] -= velocity.array[i + 1];
            position.array[i + 2] -= velocity.array[i + 2];

            if (position.array[i + 1] < 0) {
                position.array[i] = Math.floor(
                    Math.random() * maxRange - minRange,
                );
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

    return { snowfall, animateSnowfall };
};
