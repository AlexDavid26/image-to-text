import React from "react";

export type Image = string | null;
export interface IWebcamContext {
    loaded: boolean;
    image: Image;
    setImage: (newImage: Image) => void;
}

const WebcamContext = React.createContext<IWebcamContext>({} as IWebcamContext);
export default WebcamContext;
