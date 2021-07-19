import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";

const PhotoUpload = () => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dz4ioqyl1/image/upload`;
    const cld = new Cloudinary({
        cloud: {
            cloudName: "demo",
        },
    });
    const myImage = cld.image("sample");

    return <div></div>;
};

export default PhotoUpload;
