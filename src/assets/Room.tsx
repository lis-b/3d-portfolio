import { useGLTF, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

useGLTF.preload("models/room.glb");

const useTextureNoFlip = (filename: string) =>
    useTexture(filename, (t) => {
        t.flipY = false;
        t.colorSpace = SRGBColorSpace;
        return t;
    });

function Room({ textureIndex, ...props }: any) {
    const { nodes } = useGLTF("models/room.glb") as any;
    const textures = [
        useTextureNoFlip("textures/room.png"),
        useTextureNoFlip("textures/roomA.png"),
        useTextureNoFlip("textures/roomB.png"),
        useTextureNoFlip("textures/roomC.png"),
    ];

    return (
        <group {...props}>
            <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={nodes.Cube.material}>
                <meshStandardMaterial attach="material" map={textures[textureIndex]} />
            </mesh>
        </group>
    );
}

export default Room;
