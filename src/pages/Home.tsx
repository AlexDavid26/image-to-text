import React, { useContext, useEffect } from "react";
import MainWebcam from "../components/webcam/Webcam";
import WebcamContext from "../components/webcam/WebcamContext";

import style from "./page.module.scss";

const Home = () => {
    const webcamContext = useContext(WebcamContext);
    useEffect(() => {
        if (webcamContext.loaded && typeof webcamContext.image === "string")
            webcamContext.setImage(null);
    }, [webcamContext.loaded]);

    return (
        <div className={style.page}>
            <div className={style.webcam}>
                <MainWebcam />
            </div>
        </div>
    );
};

export default Home;
