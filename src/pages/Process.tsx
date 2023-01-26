import React, { useContext, useEffect, useState, useRef } from "react";
import WebcamContext, { Image } from "../components/webcam/WebcamContext";
import ReactCrop, { Crop } from "react-image-crop";
import axios from "axios";
import "react-image-crop/src/ReactCrop.scss";
import style from "./page.module.scss";

interface ScreenshotProps {
    image: Image;
    imageRef: React.Ref<HTMLImageElement>;
}

//@ts-ignore
const getCroppedImg = ({ image, pixelCrop, fileName }) => {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    if (ctx === null) return;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            //@ts-ignore
            file.name = fileName;
            resolve(file);
        }, "image/jpeg");
    });
};

const Screenshot: React.FC<ScreenshotProps> = ({ image, imageRef }) => {
    // console.log(image);
    const [crop, setCrop] = useState<Crop>({
        unit: "%", // Can be 'px' or '%'
        x: 5,
        y: 5,
        width: 90,
        height: 90,
    });

    if (image === null) return <></>;

    return (
        <div>
            <div className={style.screenshotContainer}>
                <ReactCrop crop={crop} onChange={setCrop}>
                    <img
                        src={image}
                        className={style.screenshot}
                        ref={imageRef}
                    />
                </ReactCrop>
            </div>
            <div
                className={style.button}
                onClick={() => {
                    axios
                        .post("http://localhost:5000/process", { image: image })
                        .then((resp) => {
                            alert(
                                "Formula: " +
                                    resp.data +
                                    "\nResponse: " +
                                    eval(resp.data)
                            );
                        });
                }}
            >
                <img className={style.image} src="./public/save.png" />
                Save
            </div>
        </div>
    );
};

const Process = () => {
    const webcamContext = useContext(WebcamContext);
    const imageRef = useRef(null);

    // check for image
    useEffect(() => {
        if (webcamContext.loaded && webcamContext.image === null)
            window.location.href = "/";
    }, [webcamContext.loaded]);

    return (
        <div className={style.page} style={{ padding: "2rem" }}>
            <Screenshot image={webcamContext.image} imageRef={imageRef} />
        </div>
    );
};

export default Process;
