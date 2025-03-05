import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { loadingManager } from "./loadingManager";

const fontLoader = new FontLoader(loadingManager);
const textureLoader = new TextureLoader(loadingManager);
const modelsLoader = new GLTFLoader(loadingManager);

export { fontLoader, textureLoader, modelsLoader };
