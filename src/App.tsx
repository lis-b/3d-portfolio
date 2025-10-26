import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Room from "./assets/Room";
import { OrbitControls } from "@react-three/drei";

const App = () => {
    const [textureIndex, setTextureIndex] = useState(0);

    return (
        <>
            <Canvas dpr={window.devicePixelRatio} camera={{ fov: 50, position: [0, 3, 10] }} shadows>
                <OrbitControls />

                <ambientLight intensity={0.7} />
                <pointLight intensity={50} position={[0, 5, 5]} castShadow shadow-mapSize={[8000, 8000]} />

                <Room position={[0, 0, 0]} textureIndex={textureIndex} />
            </Canvas>
            <div id="selectors">
                <button onClick={() => setTextureIndex(0)}>Default</button>
                <button onClick={() => setTextureIndex(1)}>A</button>
                <button onClick={() => setTextureIndex(2)}>B</button>
                <button onClick={() => setTextureIndex(3)}>C</button>
            </div>
        </>
    );
};

export default App;
