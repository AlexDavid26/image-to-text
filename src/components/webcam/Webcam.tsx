import React, { useState, useEffect, useRef, useContext } from "react";
import WebcamContext from "./WebcamContext";
import Webcam from "react-webcam";

import style from "./webcam.module.scss";

interface WindowSize {
    width: number;
    height: number;
}

const videoConstraints = {
    maxHeight: 100,
};

const MainWebcam: React.FC = () => {
    const webcamContext = useContext(WebcamContext);
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        const onWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return (
        <div>
            <Webcam
                ref={webcamRef}
                style={{
                    height: "85vh",
                    width: "100%",
                    objectFit: "cover",
                    // position: "absolute",
                }}
                screenshotFormat={"image/jpeg"}
                // width={windowSize.width}
                // height={windowSize.height}
            />
            <div className={style.buttons}>
                <img className={style.moreButton} src="./public/images.png" />

                <div className={style.buttonBorder}>
                    <div
                        onClick={() => {
                            if (webcamRef.current === null) return;
                            const screenshot =
                                webcamRef.current.getScreenshot();
                            webcamContext.setImage(screenshot);
                            window.location.href = "/process";
                        }}
                        className={style.button}
                    >
                        {/* Screenshot */}
                    </div>
                </div>

                <img className={style.addButton} src="./public/add.png" />
            </div>
        </div>
    );
};

export default MainWebcam;
