import { Canvas, useFrame, type CameraProps } from "@react-three/fiber";
import Room from "./assets/Room";
import { MathUtils, Vector3 } from "three";

const cameraPos = new Vector3(0, 0.75, 3.25);
const cameraProps: CameraProps = { fov: 50, position: cameraPos };
const initCameraAngleX = cameraPos.angleTo(new Vector3(0, 0, 1)); // required since the camera is angled towards the origin
const roomPos = new Vector3(0, -1.6, -0.75); // puts computers around world origin

const CameraMovement = () => {
    useFrame((state) => {
        // using lerp so the camera moves more gently
        state.camera.rotation.x = MathUtils.lerp(
            state.camera.rotation.x,
            (state.pointer.y * Math.PI) / 50 - initCameraAngleX,
            0.05,
        );
        state.camera.rotation.y = MathUtils.lerp(state.camera.rotation.y, (-state.pointer.x * Math.PI) / 15, 0.05);
    });

    return null;
};

const App3D = () => {
    return (
        <Canvas dpr={window.devicePixelRatio} shadows="soft" camera={cameraProps}>
            <CameraMovement />

            <ambientLight intensity={0.7} />

            <group position={roomPos}>
                <pointLight
                    intensity={50}
                    position={[0, 5, 6]}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    shadow-radius={2}
                />
                <Room position={[0, 0, 0]} />
            </group>
        </Canvas>
    );
};

export default App3D;
