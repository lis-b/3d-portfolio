// @ts-nocheck - temp to run
import { useGLTF, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

useGLTF.preload("models/room.glb");

const useTextureNoFlip = (filename: string) =>
    useTexture(filename, (t) => {
        t.flipY = false;
        t.colorSpace = SRGBColorSpace;
        return t;
    });

function Room(props) {
    const { nodes } = useGLTF("models/room.glb");
    const texture = useTextureNoFlip("textures/room.png");

    return (
        <group {...props}>
            <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={nodes.Cube.material}>
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
        </group>
    );
}

export default Room;
