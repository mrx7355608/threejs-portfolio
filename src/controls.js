export const setupControls = () => {
    const controls = new FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 400;
    controls.lookSpeed = 0.05;
    controls.lookVertical = false;
    return controls;
};
