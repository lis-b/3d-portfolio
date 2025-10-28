import type { useDetectGPU } from "@react-three/drei";
import "./AppFallback.css";

type AppFallbackProps = {
    gpu: ReturnType<typeof useDetectGPU>;
};

const AppFallback: React.FC<AppFallbackProps> = ({ gpu }) => {
    let message: string;

    if (gpu.isMobile) {
        message = "you're on mobile, and for the moment I've disabled mobile rendering for perfomance reasons.";
    } else if (gpu.tier === 0) {
        message = "you have a low end GPU, which I have disabled for performance reasons as this is a website.";
    } else if (gpu.type === "FALLBACK") {
        message =
            "you're somehow on a fallback GPU. In my experience, this is usually SwiftShader running entirely on your CPU, and my site will have extremely low frames on some CPUs due to this.";
    } else {
        message = "my site is having trouble detecting your GPU to load my 3D assets.";
    }

    return (
        <div id="fallback">
            <div id="wrapper">
                <div className="section">
                    <b>Hiya, I'm Lisa Brothers!</b>
                </div>

                <div className="section">
                    Unfortunately you're unable to view my full 3D portfolio site on this device. This is likely because{" "}
                    {message}
                </div>
                <div className="section">Please check this out on a different device or browser if possible!</div>

                <div className="section">
                    Feel free to <a href="mailto:hello@lisab.dev">email me</a> if you think this is an issue!
                </div>

                <img src="/screenshot.png" />

                <div className="section">
                    To make sure you get the same information as those who can view my site in its full glory, you can:
                    <br />
                    <a href="LisaBrothers_Resume.pdf" target="_blank">
                        view my <b>resume</b>
                    </a>
                    <br />
                    <a href="mailto:hello@lisab.dev">
                        send me an email at <b>hello@lisab.dev</b>
                    </a>
                    <br />
                    <a href="https://github.com/lis-b" target="_blank">
                        visit me on <b>Github</b>, my username is <b>lis-b</b>
                    </a>
                    <br />
                    <a href="https://github.com/lis-b/3d-portfolio" target="_blank">
                        view the site's <b>source code</b>
                    </a>
                    <br />
                </div>

                <div className="section">Thank you for visiting!</div>
            </div>
        </div>
    );
};

export default AppFallback;
