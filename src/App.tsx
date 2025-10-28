import { Suspense } from "react";
import "./App.css";
import { useDetectGPU } from "@react-three/drei";
import AppLoader from "./AppLoader";
import App3D from "./App3D";
import AppFallback from "./AppFallback";

const App = () => {
    const gpu = useDetectGPU();

    const shouldRender = gpu.type === "BENCHMARK" && gpu.tier !== 0 && !gpu.isMobile; // some computers seem to render without GPU, but the type is "FALLBACK"

    return <Suspense fallback={<AppLoader />}>{shouldRender ? <App3D /> : <AppFallback gpu={gpu} />}</Suspense>;
};

export default App;
