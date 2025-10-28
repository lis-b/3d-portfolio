import { Canvas, useFrame, type CameraProps } from "@react-three/fiber";
import Room from "./assets/Room";
import { MathUtils, Matrix4, Vector2, Vector3 } from "three";
import { Container, Svg, Text } from "@react-three/uikit";

const cameraPos = new Vector3(0, 0.75, 3.25);
const cameraProps: CameraProps = { fov: 50, position: cameraPos };
const initCameraAngleX = cameraPos.angleTo(new Vector3(0, 0, 1)); // required since the camera is angled towards the origin
const roomPos = new Vector3(0, -1.6, -0.75); // puts computers around world origin

const monitorSize = new Vector2(1.31, 0.751); // ever so slightly larger to fill in any gaps
const monitorPixelSize = 0.0075;
const monitorTextColor = "#000000";
const monitorColor = "#818b90";
const monitorHoverColor = "#8d989e";
const monitorActiveColor = "#97a4a9";
const pointerChangeFunctions = {
    onPointerEnter: () => {
        document.body.style.cursor = "pointer";
    },
    onPointerLeave: () => {
        document.body.style.cursor = "auto";
    },
};
const fontFamilies = {
    customFont: {
        normal: "/fonts/fixed_ibmplexmono_regular-msdf.json",
        bold: "/fonts/fixed_ibmplexmono_bold-msdf.json",
    },
};

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

const LeftMonitor = () => {
    // generated transformation matrix from the objs extracted from blender
    const transformation = new Matrix4().set(
        0.99429392,
        -0.02397525,
        0.13597025,
        -1.189941,
        0.00000003,
        0.98858372,
        0.17431396,
        1.654782,
        -0.13806781,
        -0.1726573,
        0.97918837,
        0.454409,
        0.0,
        0.0,
        0.0,
        1.0,
    );

    return (
        <group matrix={transformation} matrixAutoUpdate={false}>
            <Container
                fontFamilies={fontFamilies}
                fontFamily="customFont"
                pixelSize={monitorPixelSize}
                backgroundColor={monitorColor}
                sizeX={monitorSize.x}
                sizeY={monitorSize.y}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                onClick={() => window.open("/LisaBrothers_Resume.pdf", "_blank")}
                color={monitorTextColor}
                hover={{ backgroundColor: monitorHoverColor }}
                active={{ backgroundColor: monitorActiveColor }}
                {...pointerChangeFunctions}
            >
                <Svg src="/icons/document.svg" width={45} />
                <Container flexDirection="column" paddingRight={5}>
                    <Text fontWeight="bold">Lisa Brothers</Text>
                    <Text fontWeight="bold">Resume.pdf</Text>
                </Container>
            </Container>
        </group>
    );
};

const RightMonitor = () => {
    // generated transformation matrix from the objs extracted from blender
    const transformation = new Matrix4().set(
        1.00359112,
        0.00383725,
        -0.02176212,
        0.38711075,
        -0.0,
        0.98858391,
        0.1743138,
        1.654782,
        0.02209783,
        -0.17427156,
        0.98834435,
        0.37031575,
        0.0,
        0.0,
        0.0,
        1.0,
    );

    return (
        <group matrix={transformation} matrixAutoUpdate={false}>
            <Container
                fontFamilies={fontFamilies}
                fontFamily="customFont"
                pixelSize={monitorPixelSize}
                backgroundColor={monitorColor}
                sizeX={monitorSize.x}
                sizeY={monitorSize.y}
                flexDirection="column"
                alignItems="stretch"
                justifyContent="center"
                color={monitorTextColor}
                {...pointerChangeFunctions}
            >
                <Container
                    paddingTop={3}
                    paddingBottom={4}
                    onClick={() => window.open("mailto:hello@lisab.dev")}
                    justifyContent="center"
                    hover={{ backgroundColor: monitorHoverColor }}
                    active={{ backgroundColor: monitorActiveColor }}
                >
                    <Text>hello@lisab.dev</Text>
                </Container>

                <Container
                    onClick={() => window.open("https://github.com/lis-b", "_blank")}
                    flexGrow={1}
                    justifyContent="center"
                    hover={{ backgroundColor: monitorHoverColor }}
                    active={{ backgroundColor: monitorActiveColor }}
                    padding={10}
                    flexDirection="row"
                    gap={7}
                >
                    <Svg src="/icons/github.svg" />
                    <Text fontWeight="bold">lis-b</Text>
                </Container>

                <Container
                    paddingTop={3}
                    paddingBottom={4}
                    onClick={() => window.open("https://github.com/lis-b/3d-portfolio", "_blank")}
                    justifyContent="center"
                    hover={{ backgroundColor: monitorHoverColor }}
                    active={{ backgroundColor: monitorActiveColor }}
                >
                    <Text>
                        {"<"}source code{" />"}
                    </Text>
                </Container>
            </Container>
        </group>
    );
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
                <LeftMonitor />
                <RightMonitor />
            </group>
        </Canvas>
    );
};

export default App3D;
