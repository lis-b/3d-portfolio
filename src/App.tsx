import { Canvas, useFrame, type CameraProps } from "@react-three/fiber";
import "./App.css";
import Room from "./assets/Room";
import { MathUtils } from "three";

const CameraMovement = () => {
    useFrame((state) => {
        // using lerp so the camera moves more gently
        state.camera.rotation.x = MathUtils.lerp(state.camera.rotation.x, (state.pointer.y * Math.PI) / 40, 0.05);
        state.camera.rotation.y = MathUtils.lerp(state.camera.rotation.y, (-state.pointer.x * Math.PI) / 25, 0.05);
    });

    return null;
};

const App = () => {
    const cameraProps: CameraProps = { fov: 50, position: [0, 0, 10], zoom: 2.2 };

    return (
        <>
            <Canvas dpr={window.devicePixelRatio} shadows="soft" camera={cameraProps}>
                <CameraMovement />

                <ambientLight intensity={0.7} />

                <group position={[0, -1.5, 0]}>
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
