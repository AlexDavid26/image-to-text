import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebcamContext, { Image } from "./components/webcam/WebcamContext";

import Home from "./pages/Home";
import Process from "./pages/Process";

import "./globals.scss";

const App = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [image, setImage] = useState<Image>(null);

    // getting the image from the local storage, siiiiii
    useEffect(() => {
        setImage(localStorage.getItem("screenshot"));
        setLoaded(true);
    }, []);

    return (
        <WebcamContext.Provider
            value={{
                loaded: loaded,
                image: image,
                setImage: (newImage) => {
                    if (localStorage.getItem("screenshot") !== null)
                        localStorage.removeItem("screenshot");
                    if (typeof newImage === "string")
                        localStorage.setItem("screenshot", newImage);
                    setImage(newImage);
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path={"/process"} element={<Process />} />
                </Routes>
            </BrowserRouter>
        </WebcamContext.Provider>
    );
};

export default App;
