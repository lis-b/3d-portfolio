import { Canvas, useFrame, type CameraProps } from "@react-three/fiber";
import "./App.css";
import Room from "./assets/Room";
import { MathUtils, Vector3 } from "three";
import { useDetectGPU } from "@react-three/drei";

// const cameraPos = new Vector3(0, 1, 2);
const cameraPos = new Vector3(0, 0, 2);
const cameraProps: CameraProps = { fov: 50, position: cameraPos };
// const cameraAngleX = cameraPos.angleTo(new Vector3(0, cameraPos.y, 0));
const roomPos = new Vector3(0, -1.6, -2); // puts computers around world origin

const CameraMovement = () => {
    useFrame((state) => {
        // using lerp so the camera moves more gently
        state.camera.rotation.x = MathUtils.lerp(state.camera.rotation.x, (state.pointer.y * Math.PI) / 50, 0.05);
        state.camera.rotation.y = MathUtils.lerp(state.camera.rotation.y, (-state.pointer.x * Math.PI) / 10, 0.05);
    });

    return null;
};

const App = () => {
    const GPUTier = useDetectGPU();

    console.log(GPUTier);

    return (
        <>
            <Canvas
                dpr={window.devicePixelRatio}
                // shadows="soft"
                camera={cameraProps}
            >
                <CameraMovement />

                <ambientLight intensity={0.7} />

                <group position={roomPos}>
                    v{" "}
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
        </>
    );
};

export default App;
