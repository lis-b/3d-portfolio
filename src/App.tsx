import "./App.css";
import { useDetectGPU } from "@react-three/drei";
import App3D from "./App3D";
import { Suspense } from "react";

const AppLoader = () => {
    return <>Loader</>;
};

const AppFallback = () => {
    return <>Fallback</>;
};

const App = () => {
    const gpu = useDetectGPU();

    const shouldRender = gpu.type === "BENCHMARK" && gpu.tier !== 0 && !gpu.isMobile; // some computers seem to render without GPU, but the type is "FALLBACK"

    return <Suspense fallback={<AppLoader />}>{shouldRender ? <App3D /> : <AppFallback />}</Suspense>;
};

export default App;
